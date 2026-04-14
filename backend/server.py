from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Resend API setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'info@alsapro.cz')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class OrderRequest(BaseModel):
    product: str
    packaging: str
    quantity: str
    name: str
    phone: str
    email: str
    idNumber: str
    note: str = ""
    isCompany: bool = False
    companyName: str = ""
    ico: str = ""
    dic: str = ""

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/order")
async def create_order(order: OrderRequest):
    """
    Endpoint pro příjem objednávek z formuláře.
    Ukládá objednávku do MongoDB a vrací úspěch.
    """
    try:
        # Připravit data objednávky
        order_data = {
            "id": str(uuid.uuid4()),
            "product": order.product,
            "packaging": order.packaging,
            "quantity": order.quantity,
            "customer_name": order.name,
            "customer_phone": order.phone,
            "customer_email": order.email,
            "customer_id_number": order.idNumber,
            "note": order.note,
            "is_company": order.isCompany,
            "company_name": order.companyName if order.isCompany else None,
            "ico": order.ico if order.isCompany else None,
            "dic": order.dic if order.isCompany else None,
            "status": "nová",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        # Uložit do MongoDB
        await db.orders.insert_one(order_data)
        
        logger.info(f"Nová objednávka: {order.name} - {order.product} ({order.quantity})")
        
        return {
            "success": True,
            "message": "Objednávka byla úspěšně přijata. Brzy vás budeme kontaktovat."
        }
    except Exception as e:
        logger.error(f"Chyba při zpracování objednávky: {str(e)}")
        return {
            "success": False,
            "message": "Chyba při zpracování objednávky."
        }

@api_router.post("/contact")
async def send_contact_email(contact: ContactRequest):
    """
    Endpoint pro odeslání kontaktní zprávy přes Resend.
    """
    try:
        # Sestavit HTML email
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #FF5500; border-bottom: 2px solid #FF5500; padding-bottom: 10px;">
                        Nová zpráva z kontaktního formuláře
                    </h2>
                    
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Od:</strong> {contact.name}</p>
                        <p><strong>Email:</strong> <a href="mailto:{contact.email}">{contact.email}</a></p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #333;">Zpráva:</h3>
                        <p style="background: white; padding: 15px; border-left: 4px solid #FF5500;">
                            {contact.message}
                        </p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    
                    <p style="color: #666; font-size: 12px;">
                        Tato zpráva byla odeslána z kontaktního formuláře na alsapro.cz
                    </p>
                </div>
            </body>
        </html>
        """
        
        # Odeslat email přes Resend (non-blocking)
        params = {
            "from": SENDER_EMAIL,
            "to": [RECIPIENT_EMAIL],
            "subject": f"Kontaktní formulář: {contact.name}",
            "html": html_content,
            "reply_to": contact.email
        }
        
        email = await asyncio.to_thread(resend.Emails.send, params)
        
        logger.info(f"Kontaktní email odeslán: {contact.name} ({contact.email})")
        
        return {
            "success": True,
            "message": "Zpráva byla úspěšně odeslána. Brzy vás budeme kontaktovat."
        }
    except Exception as e:
        logger.error(f"Chyba při odesílání emailu: {str(e)}")
        return {
            "success": False,
            "message": f"Chyba při odesílání zprávy: {str(e)}"
        }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()