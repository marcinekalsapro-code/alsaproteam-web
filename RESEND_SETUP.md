# 📧 Návod: Jak aktivovat kontaktní formulář (Resend)

Kontaktní formulář je již implementovaný, ale k odeslání emailů potřebuje **Resend API klíč**.

## Krok 1: Vytvoření účtu na Resend (ZDARMA)

1. Navštivte: **https://resend.com**
2. Klikněte na "Sign Up" (Registrace)
3. Registrujte se pomocí emailu (nebo GitHub účtu)
4. Potvrďte váš email

## Krok 2: Získání API klíče

1. Po přihlášení do Resend dashboardu:
2. V levém menu klikněte na **"API Keys"**
3. Klikněte na tlačítko **"Create API Key"**
4. Pojmenujte klíč (např. "ALSA PRO Contact Form")
5. **Zkopírujte klíč** - začíná `re_...` (bude vidět jen jednou!)

## Krok 3: Přidání klíče do aplikace

1. Otevřete soubor `/app/backend/.env`
2. Nahraďte placeholder:
   ```
   RESEND_API_KEY=re_placeholder_get_from_resend_dashboard
   ```
   Vaším skutečným klíčem:
   ```
   RESEND_API_KEY=re_VášSkutečnýKlíč123abc
   ```

3. Uložte soubor

4. Restartujte backend:
   ```bash
   sudo supervisorctl restart backend
   ```

## Krok 4: Ověření domény (DŮLEŽITÉ pro produkci!)

⚠️ **V testovacím módu Resend odesílá emaily pouze na vámi ověřené adresy.**

### Pro plnou funkcionalitu (odesílání na info@alsapro.cz):

1. V Resend dashboardu klikněte na **"Domains"**
2. Klikněte **"Add Domain"**
3. Zadejte: `alsapro.cz`
4. Resend vám poskytne DNS záznamy (SPF, DKIM, DMARC)
5. Přidejte tyto záznamy do DNS nastavení vaší domény (u vašeho registrátora)
6. Po ověření (pár minut až hodin) můžete odesílat z `noreply@alsapro.cz`

### Nebo jednoduššeji (pro začátek):

Stačí ověřit email `info@alsapro.cz`:
1. V Resend dashboardu: **Settings** → **Email Addresses**
2. Přidejte `info@alsapro.cz`
3. Potvrďte ověřovací email, který přijde na info@alsapro.cz
4. Teď můžete přijímat zprávy z kontaktního formuláře!

## Krok 5: Aktualizace odesílací adresy (volitelné)

Po ověření domény můžete změnit v `/app/backend/.env`:

```
SENDER_EMAIL=noreply@alsapro.cz
```

Místo výchozího `onboarding@resend.dev`

---

## 💡 Poznámky

- **Free tier**: 100 emailů/den, 3000 emailů/měsíc zdarma
- **Testovací mód**: Bez ověřené domény funguje pouze odesílání na ověřené emaily
- **Produkce**: Po ověření domény můžete odesílat komukoliv

## 🧪 Test funkčnosti

Po přidání API klíče můžete otestovat:

```bash
curl -X POST "https://your-domain.com/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

Měli byste dostat odpověď:
```json
{
  "success": true,
  "message": "Zpráva byla úspěšně odeslána..."
}
```

---

📖 **Dokumentace Resend**: https://resend.com/docs
