import { useState, useEffect, createContext, useContext } from "react";
import { Menu, X, ChevronRight, Target, Shield, Award, Clock, Mail, Phone, MapPin, ArrowRight, Factory, Crosshair, Zap, Package, Box, MessageCircle, Send, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

// Cart Context
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, packaging) => {
    const existingItem = cart.find(item => 
      item.product.name === product.name && item.packaging.quantity === packaging.quantity
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.product.name === product.name && item.packaging.quantity === packaging.quantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, packaging, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map((item, i) => 
      i === index ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// ALSA PRO Logo Component - using original logo from website
const AlsaProLogo = ({ className = "", size = "normal" }) => {
  const logoHeight = size === "large" ? "h-12" : "h-10";
  
  return (
    <img 
      src="https://alsapro.cz/wp-content/uploads/2020/06/alsa-pro-white2.png" 
      alt="ALSA PRO"
      className={`${logoHeight} w-auto object-contain ${className}`}
    />
  );
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Náboje", href: "#produkty" },
    { name: "Střely", href: "#strely" },
    { name: "O nás", href: "#o-nas" },
    { name: "Galerie", href: "#galerie" },
    { name: "Novinky", href: "#novinky" },
    { name: "Kontakt", href: "#kontakt" },
  ];

  return (
    <>
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" data-testid="logo-link" className="flex items-center">
            <AlsaProLogo size="normal" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`nav-${link.name.toLowerCase().replace(/\s/g, "-")}-link`}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-[#FF5500] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF5500] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-button"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass border-t border-white/10 animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s/g, "-")}-link`}
                  className="block text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
    <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
  </>
  );
};

// Hero Section
const Hero = () => {
  // Fotky z galerie pro kompilaci
  const heroImages = [
    "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/vpn7qxu0_528466060_1047309594053911_78701655181985494_n.jpg",
    "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/ry7jmqe8_543365495_1070773675040836_1968627207079102298_n.jpg",
    "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/xfnbhvu0_543438092_1070774198374117_5815107108003671204_n.jpg",
    "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/ox9ku5jh_550504160_1082861480498722_8997586912541867193_n.jpg",
    "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/diemq42g_556067858_1087506830034187_2141532419407337348_n.jpg",
  ];

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image Collage */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
        <div className="col-span-2 row-span-2 relative">
          <img 
            src={heroImages[0]} 
            alt="" 
            className="w-full h-full object-cover brightness-[1.6]"
          />
        </div>
        <div className="relative overflow-hidden">
          <img 
            src={heroImages[1]} 
            alt="" 
            className="w-full h-full object-cover object-left brightness-150"
          />
        </div>
        <div className="relative">
          <img 
            src={heroImages[3]} 
            alt="" 
            className="w-full h-full object-cover brightness-150"
          />
        </div>
      </div>
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5500] mb-6 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            Výrobce střel a nábojů od roku 2010
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            Přesnost<br />
            <span className="gradient-text">v každém</span><br />
            výstřelu
          </h1>
          <p
            className="text-lg text-zinc-400 mb-10 max-w-lg leading-relaxed animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            Vyrábíme přebíjené náboje a celoplášťové střely FMJ 9mm nejvyšší kvality 
            pro náročné střelce z celé Evropy.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <a
              href="#produkty"
              data-testid="hero-cta-button"
              className="btn-primary px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2"
            >
              Prozkoumat produkty
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="#o-nas"
              data-testid="hero-secondary-button"
              className="btn-secondary px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2"
            >
              Více o nás
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#FF5500] rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

// Stats Section
const Stats = () => {
  const stats = [
    { value: "30+", label: "let zkušeností s přebíjením nábojů", icon: Clock },
    { value: "20+", label: "Zemí v EU", icon: Target },
    { value: "100%", label: "Kontrola kvality", icon: Shield },
    { value: "EU", label: "Distribuce", icon: Award },
  ];

  return (
    <section className="bg-[#121212] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              data-testid={`stat-${index}`}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-[#FF5500] mx-auto mb-4" />
              <p className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Anton, sans-serif' }}>
                {stat.value}
              </p>
              <p className="text-sm text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Products Section
const Products = () => {
  const { addToCart } = useCart();
  const products = [
    {
      id: 1,
      name: "Náboj 9mm Luger ALSA PRO",
      description: "Nejprodávanější přebíjený náboj nejvyšší kvality. Certifikace C.I.P.",
      comment: "Jseš na střelnici častěji než v koupelně? Tak tohle balení nábojů je přesně pro tebe! Maximum muziky za pár kaček.",
      specs: { střela: "124 gr FMJ CuZn 30", typ: "non magnetic", balení: "1000ks sypané" },
      price: "4,70 Kč/ks",
      featured: true,
    },
    {
      id: 7,
      name: "Náboj PCC 9mm Luger ALSA PRO",
      description: "Přebíjený náboj nejvyšší kvality. Certifikace C.I.P.",
      comment: "Jseš na střelnici častěji než v koupelně? Tak tohle balení nábojů je přesně pro tebe! Maximum muziky za pár kaček.",
      specs: { střela: "115 gr FMJ CuZn 30", typ: "non magnetic", balení: "1000ks sypané" },
      price: "4,99 Kč/ks",
      featured: true,
      label: "Pro PCC střelce",
    },
    {
      id: 8,
      name: "Náboj 9mm LUGER SUBSONIC ALSA PRO",
      description: "Subsonický náboj pro tlumené zbraně. Certifikace C.I.P.",
      comment: "Máš tlumič a nechceš budit sousedy? Tyhle náboje jsou tišší než tchyně když spí. Ideální pro noční tréninky!",
      specs: { střela: "147 gr FMJ subsonic", typ: "non magnetic", balení: "1000ks, 10x100ks" },
      price: "5,50 Kč/ks",
      featured: true,
      label: "Subsonic",
    },
    {
      id: 6,
      name: "Náboj 9mm Luger pro IPSC OPEN MAJOR",
      description: "Přebíjený náboj pro IPSC divizi OPEN.",
      comment: "Už nevíš co by aby si tě Evička všimla! Kup si pořádného kvéra co je postavený do divize OPEN IPSC, nabij naše Open náboje a uslyší tě i přesto že jsi od ní 3km!",
      specs: { střela: "124 gr FMJ CuZn 30, prach SP2", typ: "non magnetic", balení: "1000ks sypané" },
      featured: true,
      label: "Pro Open střelce",
      priceNote: "cena na dotaz tel.: 608 718 212",
    },
  ];

  return (
    <section id="produkty" data-testid="products-section" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5500] mb-4">
            Naše produkty
          </p>
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            Náboje
          </h2>
          <div className="text-zinc-400 max-w-3xl space-y-3">
            <p>
              Náboj je laborován z již vystřelené nábojnice, která prochází kontrolou kvality, kalibrací a chemickým čištěním. 
              Střela FMJ RN non-magnetic CuZn30. Nábojnice různých výrobců - přeznačeno AP 9x19.
            </p>
            <p className="text-sm text-zinc-500">
              <span className="text-[#FF5500] font-semibold">Výrobce:</span> ALSA PRO s.r.o. | 
              <span className="text-[#FF5500] font-semibold ml-2">Balení:</span> karton 1000ks sypané
            </p>
            <p className="text-xs text-zinc-500 border-l-2 border-[#FF5500] pl-3 mt-4">
              Střelivo na zbrojní oprávnění možno vyzvednout pouze osobně.
            </p>
          </div>
        </div>

        {/* Products Grid - Hero + 3 Cards Layout */}
        <div className="space-y-4">
          {/* Hero Card - Card #1 (Full Width, Prominent) */}
          {products[0] && (
            <div
              data-testid="product-hero"
              className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] border-2 border-[#FF5500] card-hover rounded-sm overflow-hidden"
            >
              <div className="p-10 md:p-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <div className="flex items-center gap-3 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-[#FF5500] rounded-sm flex items-center justify-center">
                      <Crosshair className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF5500] block">
                        {products[0].label || "Nejprodávanější"}
                      </span>
                      <h3 className="text-3xl md:text-4xl text-white font-bold mt-1">{products[0].name}</h3>
                    </div>
                  </div>
                  {products[0].price && (
                    <div className="bg-[#FF5500] px-6 py-4 rounded-sm">
                      <span className="text-sm text-white/80 uppercase block mb-1">Akční cena</span>
                      <p className="text-3xl font-bold text-white">{products[0].price}</p>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-zinc-300 mb-4 text-base leading-relaxed">{products[0].description}</p>
                    {products[0].comment && (
                      <p className="text-base text-[#FF5500] italic border-l-4 border-[#FF5500] pl-4">
                        "{products[0].comment}"
                      </p>
                    )}
                  </div>
                  
                  {/* Tech Specs - Larger */}
                  <div className="tech-grid rounded-sm overflow-hidden">
                    <div className="grid grid-cols-3 gap-px bg-zinc-800">
                      {Object.entries(products[0].specs).map(([key, value]) => (
                        <div key={key} className="bg-[#1a1a1a] p-4 text-center">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{key}</p>
                          <p className="text-white font-bold text-base">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Large CTA Button */}
                <button
                  onClick={() => {
                    const packaging = products[0].specs.balení || 'standardní balení';
                    addToCart(
                      { name: products[0].name, price: products[0].price },
                      { quantity: packaging, detail: packaging }
                    );
                  }}
                  className="btn-primary px-8 py-4 rounded-sm flex items-center justify-center gap-3 text-base font-bold w-full md:w-auto"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Přidat do košíku
                </button>
              </div>
            </div>
          )}

          {/* Three Smaller Cards - Cards 2, 3, 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.slice(1).map((product, index) => (
              <div
                key={product.id}
                data-testid={`product-card-${index + 2}`}
                className="bg-[#121212] card-hover rounded-sm overflow-hidden border border-zinc-800 hover:border-[#FF5500] transition-colors"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-[#FF5500]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5500]">
                        {product.label || "Featured"}
                      </span>
                    </div>
                  </div>

                  {product.price && (
                    <div className="bg-[#FF5500] px-3 py-2 rounded-sm mb-3 text-center">
                      <p className="text-lg font-bold text-white">{product.price}</p>
                    </div>
                  )}
                  {product.priceNote && (
                    <div className="bg-zinc-900 border border-[#FF5500] px-3 py-2 rounded-sm mb-3 text-center">
                      <p className="text-xs text-[#FF5500] font-semibold">{product.priceNote}</p>
                    </div>
                  )}

                  <h3 className="text-lg text-white mb-2 font-semibold">{product.name}</h3>
                  <p className="text-zinc-400 mb-3 text-xs leading-relaxed">{product.description}</p>
                  
                  {product.comment && (
                    <p className="text-xs text-[#FF5500] italic mb-4 flex-grow">"{product.comment}"</p>
                  )}
                  
                  {/* Compact Tech Specs */}
                  <div className="tech-grid rounded-sm overflow-hidden mb-4">
                    <div className="grid grid-cols-3 gap-px bg-zinc-800">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="bg-[#1a1a1a] p-2 text-center">
                          <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">{key}</p>
                          <p className="text-white font-semibold text-xs">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compact CTA Button */}
                  <button
                    onClick={() => {
                      const packaging = product.specs.balení || 'standardní balení';
                      addToCart(
                        { name: product.name, price: product.price },
                        { quantity: packaging, detail: packaging }
                      );
                    }}
                    className="btn-primary px-4 py-2.5 rounded-sm flex items-center justify-center gap-2 text-xs font-semibold mt-auto"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Přidat do košíku
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Cart Modal Component
const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [quantityErrors, setQuantityErrors] = useState({});

  // Parse carton size from packaging quantity (e.g., "2500 ks" -> 2500)
  const getCartonSize = (packagingQuantity) => {
    const match = packagingQuantity.match(/(\d+)/);
    return match ? parseInt(match[1]) : 1000; // default to 1000 if can't parse
  };

  // Validate quantity (quantity = number of cartons)
  const validateQuantity = (index, newQuantity, packagingQuantity) => {
    const cartonSize = getCartonSize(packagingQuantity);
    
    if (newQuantity < 1) {
      setQuantityErrors(prev => ({
        ...prev,
        [index]: `Minimální objednávka: 1 karton (${cartonSize} ks)`
      }));
      return false;
    }
    
    // Clear error if valid
    setQuantityErrors(prev => {
      const newErrors = {...prev};
      delete newErrors[index];
      return newErrors;
    });
    return true;
  };

  const handleQuantityChange = (index, newQuantity, packagingQuantity) => {
    if (validateQuantity(index, newQuantity, packagingQuantity)) {
      updateQuantity(index, newQuantity);
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    let totalPieces = 0;
    let totalPrice = 0;

    cart.forEach(item => {
      const cartonSize = getCartonSize(item.packaging.quantity);
      const pieces = item.quantity * cartonSize;
      totalPieces += pieces;

      // Extract price per piece
      const priceStr = item.product.price || item.product.pricePerPc;
      const priceMatch = priceStr.match(/([\d,]+)/);
      if (priceMatch) {
        const pricePerPc = parseFloat(priceMatch[1].replace(',', '.'));
        totalPrice += pieces * pricePerPc;
      }
    });

    return {
      totalPieces,
      totalPrice: totalPrice.toFixed(2).replace('.', ',')
    };
  };

  const totals = cart.length > 0 ? calculateTotals() : null;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Check if there are any quantity errors
    if (Object.keys(quantityErrors).length > 0) {
      alert('Opravte prosím chyby v množství před pokračováním.');
      return;
    }
    
    // Trigger order form with cart items
    const event = new CustomEvent('openOrderForm', { 
      detail: { 
        cartItems: cart,
        isMultiProduct: true
      } 
    });
    window.dispatchEvent(event);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#121212] border-2 border-[#FF5500] rounded-sm max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-[#FF5500]" />
            <h3 className="text-2xl font-bold text-white">Košík ({cart.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400">Váš košík je prázdný</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => {
                const cartonSize = getCartonSize(item.packaging.quantity);
                const totalPieces = item.quantity * cartonSize;
                
                // Calculate item total price
                const priceStr = item.product.price || item.product.pricePerPc;
                const priceMatch = priceStr.match(/([\d,]+)/);
                const pricePerPc = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : 0;
                const itemTotalPrice = (totalPieces * pricePerPc).toFixed(2).replace('.', ',');
                
                return (
                  <div key={index} className="bg-zinc-900 rounded-sm p-4 border border-zinc-800">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{item.product.name}</h4>
                        <p className="text-sm text-zinc-400">
                          Balení: {item.packaging.quantity}
                          {item.packaging.detail && ` (${item.packaging.detail})`}
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-zinc-500">
                            Cena za kus: <span className="text-zinc-400">{pricePerPc.toFixed(2).replace('.', ',')} Kč/ks</span>
                          </p>
                          <p className="text-xs text-zinc-500">
                            Celkem kusů: <span className="text-white font-semibold">{totalPieces.toLocaleString('cs-CZ')} ks</span>
                          </p>
                          <p className="text-sm font-bold">
                            Cena za položku: <span className="text-[#FF5500] text-lg">{itemTotalPrice} Kč</span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-zinc-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-zinc-400">Kartony:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity - 1, item.packaging.quantity)}
                            className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-sm flex items-center justify-center text-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQty = parseInt(e.target.value) || 1;
                              handleQuantityChange(index, newQty, item.packaging.quantity);
                            }}
                            className="w-20 bg-zinc-800 text-white text-center px-2 py-1 rounded-sm border border-zinc-700"
                            min="1"
                          />
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity + 1, item.packaging.quantity)}
                            className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-sm flex items-center justify-center text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-xs text-zinc-500">× {cartonSize} ks</span>
                      </div>
                      
                      {/* Error Message */}
                      {quantityErrors[index] && (
                        <p className="text-xs text-red-500">{quantityErrors[index]}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-zinc-800 space-y-4">
            {/* Totals Summary */}
            <div className="bg-zinc-900 rounded-sm p-4 border border-zinc-800">
              <h4 className="text-white font-semibold mb-3 uppercase text-sm tracking-wider">Souhrn objednávky</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Celkový počet kusů:</span>
                  <span className="text-white font-bold text-lg">{totals.totalPieces.toLocaleString('cs-CZ')} ks</span>
                </div>
                <div className="border-t border-zinc-800 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Celková cena:</span>
                    <span className="text-[#FF5500] font-bold text-2xl">{totals.totalPrice} Kč</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={clearCart}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-sm text-sm transition-colors"
            >
              Vyprázdnit košík
            </button>
            <button
              onClick={handleCheckout}
              className="w-full btn-primary px-6 py-3 rounded-sm flex items-center justify-center gap-2"
            >
              Pokračovat k objednávce
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Order Form Modal Component
const OrderFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productData, setProductData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isMultiProduct, setIsMultiProduct] = useState(false);
  const { clearCart } = useCart();
  const [formData, setFormData] = useState({
    product: '',
    packaging: '',
    quantity: '',
    name: '',
    phone: '',
    email: '',
    idNumber: '',
    note: '',
    isCompany: false,
    companyName: '',
    ico: '',
    dic: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const handleOpenForm = (e) => {
      if (e.detail.isMultiProduct) {
        // Multiple products from cart
        setCartItems(e.detail.cartItems);
        setIsMultiProduct(true);
        setFormData(prev => ({
          ...prev,
          product: `${e.detail.cartItems.length} produktů`,
          packaging: ''
        }));
      } else {
        // Single product
        setProductData(e.detail);
        setIsMultiProduct(false);
        const defaultPackaging = e.detail.packaging?.find(p => p.featured) || e.detail.packaging?.[0];
        setFormData(prev => ({
          ...prev,
          product: e.detail.product,
          packaging: defaultPackaging?.quantity || ''
        }));
      }
      setIsOpen(true);
    };

    window.addEventListener('openOrderForm', handleOpenForm);
    return () => window.removeEventListener('openOrderForm', handleOpenForm);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const orderData = isMultiProduct 
        ? {
            ...formData,
            products: cartItems.map(item => ({
              name: item.product.name,
              packaging: item.packaging.quantity,
              quantity: item.quantity,
              price: item.product.price || item.product.pricePerPc
            }))
          }
        : formData;

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        if (isMultiProduct) {
          clearCart(); // Clear cart after successful order
        }
        setTimeout(() => {
          setIsOpen(false);
          setFormData({ 
            product: '', 
            packaging: '', 
            quantity: '', 
            name: '', 
            phone: '', 
            email: '', 
            idNumber: '', 
            note: '',
            isCompany: false,
            companyName: '',
            ico: '',
            dic: ''
          });
          setSubmitStatus(null);
          setCartItems([]);
          setIsMultiProduct(false);
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121212] border-2 border-[#FF5500] rounded-sm max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Objednávkový formulář</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {submitStatus === 'success' ? (
            <div className="bg-green-500/10 border border-green-500 rounded-sm p-4 text-center">
              <p className="text-green-500 font-semibold mb-2">✓ Objednávka odeslána!</p>
              <p className="text-zinc-400 text-sm">Brzy vás budeme kontaktovat.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Products Summary */}
              {isMultiProduct ? (
                <div>
                  <label className="block text-sm text-[#FF5500] font-semibold mb-2">Objednávané produkty ({cartItems.length})</label>
                  <div className="bg-zinc-900 rounded-sm border border-zinc-800 p-4 space-y-2 max-h-48 overflow-y-auto">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="text-sm border-b border-zinc-800 pb-2 last:border-0">
                        <p className="text-white font-semibold">{item.product.name}</p>
                        <p className="text-zinc-400 text-xs">
                          {item.packaging.quantity} × {item.quantity} ks
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Product */}
                  <div>
                    <label className="block text-sm text-[#FF5500] font-semibold mb-2">Produkt</label>
                    <input
                      type="text"
                      value={formData.product}
                      readOnly
                      className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800"
                    />
                  </div>

                  {/* Packaging */}
                  <div>
                    <label className="block text-sm text-[#FF5500] font-semibold mb-2">Balení *</label>
                    <select
                      value={formData.packaging}
                      onChange={(e) => setFormData({...formData, packaging: e.target.value})}
                      required
                      className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800"
                    >
                      {productData?.packaging.map((pack, i) => (
                        <option key={i} value={pack.quantity}>
                          {pack.quantity} - {pack.detail} {pack.featured ? '(VÝHODNĚJI)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm text-[#FF5500] font-semibold mb-2">Množství (ks) *</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      required
                      min="1"
                      placeholder="Např. 10000"
                      className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800 placeholder:text-zinc-600"
                    />
                  </div>
                </>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm text-[#FF5500] font-semibold mb-2">Jméno a příjmení *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Jan Novák"
                  className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800 placeholder:text-zinc-600"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-[#FF5500] font-semibold mb-2">Telefon *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  placeholder="608 123 456"
                  className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800 placeholder:text-zinc-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-[#FF5500] font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="jan@example.com"
                  className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800 placeholder:text-zinc-600"
                />
              </div>

              {/* ID Number */}
              <div>
                <label className="block text-sm text-[#FF5500] font-semibold mb-2">Číslo OP *</label>
                <input
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                  required
                  placeholder="123456789"
                  className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800 placeholder:text-zinc-600"
                />
              </div>

              {/* Company Purchase Toggle */}
              <div className="border-t border-zinc-800 pt-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.isCompany}
                    onChange={(e) => setFormData({...formData, isCompany: e.target.checked})}
                    className="w-5 h-5 bg-zinc-900 border-2 border-zinc-700 rounded-sm checked:bg-[#FF5500] checked:border-[#FF5500] cursor-pointer"
                  />
                  <span className="text-white font-semibold group-hover:text-[#FF5500] transition-colors">
                    Nakoupit na firmu
                  </span>
                </label>
              </div>

              {/* Company Fields (conditional) */}
              {formData.isCompany && (
                <div className="space-y-4 bg-zinc-900/50 p-4 rounded-sm border border-zinc-800">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm text-[#FF5500] font-semibold mb-2">Název firmy *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      required={formData.isCompany}
                      placeholder="ALSA PRO s.r.o."
                      className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800 placeholder:text-zinc-600"
                    />
                  </div>

                  {/* IČO */}
                  <div>
                    <label className="block text-sm text-[#FF5500] font-semibold mb-2">IČO *</label>
                    <input
                      type="text"
                      value={formData.ico}
                      onChange={(e) => setFormData({...formData, ico: e.target.value})}
                      required={formData.isCompany}
                      placeholder="12345678"
                      className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800 placeholder:text-zinc-600"
                    />
                  </div>

                  {/* DIČ */}
                  <div>
                    <label className="block text-sm text-[#FF5500] font-semibold mb-2">DIČ (volitelné)</label>
                    <input
                      type="text"
                      value={formData.dic}
                      onChange={(e) => setFormData({...formData, dic: e.target.value})}
                      placeholder="CZ12345678"
                      className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800 placeholder:text-zinc-600"
                    />
                  </div>
                </div>
              )}

              {/* Note */}
              <div>
                <label className="block text-sm text-[#FF5500] font-semibold mb-2">Poznámka (volitelné)</label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  rows="3"
                  placeholder="Doplňující informace..."
                  className="w-full bg-zinc-900 text-white px-4 py-2 rounded-sm border border-zinc-800 placeholder:text-zinc-600 resize-none"
                />
              </div>

              {/* Error */}
              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500 rounded-sm p-3 text-center">
                  <p className="text-red-500 text-sm">Chyba při odesílání. Zkuste to prosím znovu.</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary px-6 py-3 rounded-sm inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Odesílám...' : 'Odeslat objednávku'}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>

              <p className="text-zinc-500 text-xs text-center">
                Po odeslání vás budeme kontaktovat pro potvrzení objednávky.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Bullets/Střely Section
const Bullets = () => {
  const { addToCart } = useCart();
  const bullets = [
    {
      id: 1,
      name: "Střela 9mm FMJ 124gr",
      description: "Standardní celoplášťová střela pro sportovní a rekreační střelbu.",
      specs: { hmotnost: "124 gr", typ: "FMJ RN", materiál: "CuZn30 non-magnetic" },
      price: "1 700 Kč",
      pricePerPc: "1,70 Kč/ks",
      packaging: [
        { quantity: "3000 ks", detail: "Volně sypané", featured: true }
      ],
      featured: true,
      label: "Nejprodávanější",
    },
    {
      id: 2,
      name: "Střela 9mm FMJ 115gr",
      description: "Lehčí varianta pro dynamickou střelbu. Nižší zpětný ráz.",
      specs: { hmotnost: "115 gr", typ: "FMJ RN", materiál: "CuZn30 non-magnetic" },
      price: "1 700 Kč",
      pricePerPc: "1,70 Kč/ks",
      packaging: [
        { quantity: "3000 ks", detail: "Volně sypané", featured: true }
      ],
      featured: true,
    },
    {
      id: 3,
      name: "Střela 9mm FMJ 140gr",
      description: "Střední hmotnost pro univerzální použití.",
      specs: { hmotnost: "140 gr", typ: "FMJ RN", materiál: "CuZn30 non-magnetic" },
      price: "1 800 Kč",
      pricePerPc: "1,80 Kč/ks",
      packaging: [
        { quantity: "3000 ks", detail: "Volně sypané", featured: true }
      ],
      featured: true,
    },
    {
      id: 4,
      name: "Střela 9mm FMJ 147gr",
      description: "Těžší varianta pro subsonickou střelbu. Ideální pro tlumené zbraně.",
      specs: { hmotnost: "147 gr", typ: "FMJ RN", materiál: "CuZn30 non-magnetic" },
      price: "1 900 Kč",
      pricePerPc: "1,90 Kč/ks",
      packaging: [
        { quantity: "2500 ks", detail: "Volně sypané", featured: true }
      ],
      featured: true,
      label: "Subsonic",
    },
  ];

  return (
    <section id="strely" data-testid="bullets-section" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#006341] mb-4">
            Naše produkty
          </p>
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            Střely
          </h2>
          <div className="text-zinc-400 max-w-3xl space-y-3">
            <p>
              Celoplášťové střely 9mm FMJ vyrábíme od roku 2011. Nabízíme několik variant hmotností, 
              které pokrývají poptávku po kvalitních střelách v této ráži.
            </p>
            <p className="text-sm text-zinc-500">
              <span className="text-[#006341] font-semibold">Materiál:</span> CuZn30 non-magnetic | 
              <span className="text-[#006341] font-semibold ml-2">Výrobce:</span> ALSA PRO s.r.o.
            </p>
          </div>
        </div>

        {/* Bullets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bullets.map((bullet) => (
            <div
              key={bullet.id}
              data-testid={`bullet-${bullet.id}`}
              className="bg-[#121212] card-hover rounded-sm overflow-hidden"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#006341]" />
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#006341]">
                      {bullet.label || "Střela"}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg text-white mb-2">{bullet.name}</h3>
                <p className="text-zinc-400 text-sm mb-4 flex-grow">{bullet.description}</p>
                
                {/* Price */}
<div className="bg-[#006341] px-4 py-3 rounded-sm mb-4 text-center">
                  <p className="text-2xl font-bold text-white">{bullet.pricePerPc}</p>
                </div>
                
                {/* Specs */}
                <div className="space-y-2 text-sm mb-4">
                  {Object.entries(bullet.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-zinc-500 capitalize">{key}</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
                
                {/* Balení */}
                <div className="border-t border-zinc-800 pt-3 mb-4">
                  <p className="text-xs text-[#006341] font-bold uppercase tracking-wider mb-3">
                    Balení{bullet.packaging.length > 1 ? ' - Vyberte si' : ''}:
                  </p>
                  <div className="space-y-2">
                    {bullet.packaging.map((pack, index) => {
                      // Only show price if multiple packaging options exist
                      const showPrice = bullet.packaging.length > 1;
                      const basePriceMatch = bullet.pricePerPc.match(/([\d,]+)/);
                      const basePrice = basePriceMatch ? parseFloat(basePriceMatch[1].replace(',', '.')) : 0;
                      const packPrice = pack.featured ? basePrice : basePrice + 0.05;
                      const displayPrice = packPrice.toFixed(2).replace('.', ',');
                      
                      return (
                        <div 
                          key={index}
                          className={pack.featured 
                            ? "bg-gradient-to-r from-[#006341]/10 to-transparent rounded-sm p-2 border border-[#006341]/30 relative"
                            : "bg-zinc-900 rounded-sm p-2 border border-zinc-800"
                          }
                        >
                          {pack.featured && bullet.packaging.length > 1 && (
                            <div className="absolute -top-2 -right-2 bg-[#006341] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">
                              VÝHODNĚJI
                            </div>
                          )}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {pack.featured ? (
                                <Box className="w-4 h-4 text-[#006341]" />
                              ) : (
                                <Package className="w-4 h-4 text-zinc-400" />
                              )}
                              <div>
                                <p className={`text-xs font-semibold ${pack.featured ? 'text-white' : 'text-white'}`}>
                                  {pack.quantity}
                                </p>
                                <p className={`text-[10px] ${pack.featured ? 'text-[#006341]' : 'text-zinc-500'}`}>
                                  {pack.detail}
                                </p>
                              </div>
                            </div>
                            {showPrice && (
                              <div className="text-right">
                                <p className={`text-xs font-bold ${pack.featured ? 'text-[#006341]' : 'text-white'}`}>
                                  {displayPrice} Kč/ks
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Add to Cart Button(s) */}
                <div className="mt-auto space-y-2">
                  {bullet.packaging.length === 1 ? (
                    // Single packaging option - one simple button
                    <button
                      onClick={() => {
                        addToCart(
                          { name: bullet.name, pricePerPc: bullet.pricePerPc },
                          bullet.packaging[0]
                        );
                      }}
                      className="w-full bg-[#006341] hover:bg-[#004d2e] text-white px-4 py-3 rounded-sm flex items-center justify-center gap-2 text-sm font-semibold transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Přidat do košíku</span>
                    </button>
                  ) : (
                    // Multiple packaging options - two buttons with price adjustment
                    bullet.packaging.map((pack, packIdx) => {
                      const basePriceMatch = bullet.pricePerPc.match(/([\d,]+)/);
                      const basePrice = basePriceMatch ? parseFloat(basePriceMatch[1].replace(',', '.')) : 0;
                      const adjustedPrice = pack.featured ? basePrice : basePrice + 0.05;
                      const adjustedPriceStr = adjustedPrice.toFixed(2).replace('.', ',') + ' Kč/ks';
                      
                      return (
                        <button
                          key={packIdx}
                          onClick={() => {
                            addToCart(
                              { name: bullet.name, pricePerPc: adjustedPriceStr },
                              pack
                            );
                          }}
                          className={`w-full px-4 py-3 rounded-sm flex items-center justify-center gap-2 text-sm font-semibold transition-colors ${
                            pack.featured 
                              ? 'bg-[#006341] hover:bg-[#004d2e] text-white' 
                              : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Přidat {pack.quantity}</span>
                          {pack.featured && (
                            <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-sm">VÝHODNĚJI</span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sponsorship Offer Section
const SponsorshipOffer = () => {
  return (
    <section className="py-16 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative border-2 border-[#FF5500] rounded-sm bg-gradient-to-br from-[#121212] to-[#0a0a0a] p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5500] opacity-5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Header with icon */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shield className="w-12 h-12 text-[#FF5500]" />
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
                SPONZORSKÝ PROGRAM PRO ZÁVODNÍ STŘELCE
              </h2>
              <Award className="w-12 h-12 text-[#FF5500]" />
            </div>

            <p className="text-xl text-zinc-300 text-center mb-8">
              Jste aktivní závodní střelec? Získejte exkluzivní sponzorskou cenu!
            </p>

            {/* Main offer */}
            <div className="bg-[#FF5500] rounded-sm p-6 mb-8 text-center">
              <p className="text-white text-lg mb-2">Střela 9mm FMJ 124gr</p>
              <div className="flex items-center justify-center gap-4">
                <p className="text-5xl font-bold text-white">1,50 Kč/ks</p>
              </div>
              <p className="text-white/80 text-sm mt-2">(Běžná cena: 1,75 Kč/ks)</p>
            </div>

            {/* Conditions */}
            <div className="bg-[#1a1a1a] rounded-sm p-6 md:p-8 border border-zinc-800">
              <h3 className="text-xl font-bold text-[#FF5500] mb-6 uppercase tracking-wider">
                Podmínky:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF5500] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-zinc-300">Aktivní účast na střeleckých závodech</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF5500] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-zinc-300">Viditelné logo ALSAPRO na výstroji</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF5500] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-zinc-300">Pozitivní prezentace značky ALSAPRO</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF5500] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-zinc-300">Minimální odběr: 10 000 ks (osobní převzetí v sídle společnosti)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF5500] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-zinc-300">Osobní pohovor a schválení</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF5500] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-zinc-300">Pouze pro fyzické osoby, platba v hotovosti</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <p className="text-2xl text-white font-bold mb-6">
                Staňte se součástí týmu ALSAPRO!
              </p>
              <div className="bg-[#1a1a1a] border-2 border-[#FF5500] rounded-sm p-6 inline-block">
                <p className="text-zinc-400 text-sm mb-3 uppercase tracking-wider">Kontaktujte přímo:</p>
                <p className="text-white text-2xl font-bold mb-2">Pavel Marcinek</p>
                <a
                  href="tel:+420608718212"
                  className="btn-primary px-8 py-4 rounded-sm inline-flex items-center gap-3 text-xl"
                >
                  <Phone className="w-6 h-6" />
                  608 718 212
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const About = () => {
  const milestones = [
    { year: "2010", title: "Založení společnosti", description: "Start výroby přebíjených nábojů 9mm Luger" },
    { year: "2011", title: "Výroba střel", description: "Zahájení výroby celoplášťových střel 9mm FMJ" },
    { year: "2015", title: "Modernizace", description: "Nákup nové moderní výrobní linky" },
    { year: "Dnes", title: "Evropská distribuce", description: "Zákazníci z celé Evropy" },
  ];

  return (
    <section id="o-nas" data-testid="about-section" className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5500] mb-4">
              O společnosti
            </p>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              Více než 30 let<br />zkušeností
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Společnost <strong className="text-white">ALSA PRO s.r.o.</strong> je výrobcem 
              celoplášťových střel a přebíjených nábojů. Navazujeme na více než 30 let 
              zkušeností s přebíjením nábojů, které získal majitel společnosti Pavel Marcinek.
            </p>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              U všech našich produktů především dbáme na jejich vysokou kvalitu a přesnost, 
              tak abychom splnili náročná očekávání našich zákazníků z celé Evropy.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Factory className="w-5 h-5 text-[#FF5500]" />
                <span className="text-white">Vlastní výroba</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#FF5500]" />
                <span className="text-white">Kontrola kvality</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#FF5500]" />
                <span className="text-white">Moderní technologie</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#FF5500]" />
                <span className="text-white">Certifikovaná výroba</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  data-testid={`milestone-${index}`}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-[#050505] border-2 border-[#FF5500] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#FF5500]" />
                  </div>
                  <p className="text-[#FF5500] font-bold text-sm uppercase tracking-wider mb-1">
                    {milestone.year}
                  </p>
                  <h4 className="text-xl text-white mb-2">{milestone.title}</h4>
                  <p className="text-zinc-400 text-sm">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Gallery Section - Naši střelci
const Gallery = () => {
  const images = [
    {
      id: 1,
      src: "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/vpn7qxu0_528466060_1047309594053911_78701655181985494_n.jpg",
      alt: "Střelkyně Lenka Horejší a kolegyně",
    },
    {
      id: 2,
      src: "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/ip5nwfgs_543365495_1070773675040836_1968627207079102298_n.jpg",
      alt: "Sportovní střelec v akci",
    },
    {
      id: 3,
      src: "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/1v312qyv_543438092_1070774198374117_5815107108003671204_n.jpg",
      alt: "Střelec Shooting Club Atlas s ALSA PRO",
    },
    {
      id: 4,
      src: "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/ox9ku5jh_550504160_1082861480498722_8997586912541867193_n.jpg",
      alt: "Střelkyně APT Shooting Team",
    },
    {
      id: 5,
      src: "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/134r2788_550514431_1082869187164618_1661481268788016156_n.jpg",
      alt: "Sportovní střelec při soutěži",
    },
    {
      id: 6,
      src: "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/rz8pqf3e_550598969_1082864003831803_9047864909319402101_n.jpg",
      alt: "Střelkyně APT v akci",
    },
    {
      id: 7,
      src: "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/ie7m8zyt_552232673_1082864177165119_9127602939320838347_n.jpg",
      alt: "Střelkyně APT s alsapro",
    },
    {
      id: 8,
      src: "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/a6no34hm_552296866_1082866460498224_6611358121180163557_n.jpg",
      alt: "Střelec APT Shooting Team",
    },
    {
      id: 9,
      src: "https://customer-assets.emergentagent.com/job_design-showcase-796/artifacts/diemq42g_556067858_1087506830034187_2141532419407337348_n.jpg",
      alt: "ALSA PRO Shooting Team - Jiří a kolegyně",
    },
  ];

  return (
    <section id="galerie" data-testid="gallery-section" className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5500] mb-4">
            Galerie
          </p>
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            ALSA PRO náboje a střely v akci
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Sportovní střelci z celé Evropy důvěřují kvalitě ALSA PRO střeliva.
          </p>
        </div>

        {/* Photo Grid - Bento style */}
        <div className="grid grid-cols-12 gap-4">
          {/* Row 1: Large featured + 2 side */}
          <div className="col-span-12 md:col-span-8 aspect-[16/10] overflow-hidden rounded-sm">
            <img 
              src={images[0].src}
              alt={images[0].alt}
              data-testid="gallery-image-1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4">
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img 
                src={images[1].src}
                alt={images[1].alt}
                data-testid="gallery-image-2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img 
                src={images[2].src}
                alt={images[2].alt}
                data-testid="gallery-image-3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          
          {/* Row 2: 3 equal images */}
          <div className="col-span-12 sm:col-span-4 aspect-square overflow-hidden rounded-sm">
            <img 
              src={images[3].src}
              alt={images[3].alt}
              data-testid="gallery-image-4"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="col-span-12 sm:col-span-4 aspect-square overflow-hidden rounded-sm">
            <img 
              src={images[4].src}
              alt={images[4].alt}
              data-testid="gallery-image-5"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="col-span-12 sm:col-span-4 aspect-square overflow-hidden rounded-sm">
            <img 
              src={images[5].src}
              alt={images[5].alt}
              data-testid="gallery-image-6"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Row 3: 2 side + Large */}
          <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4">
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img 
                src={images[6].src}
                alt={images[6].alt}
                data-testid="gallery-image-7"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img 
                src={images[7].src}
                alt={images[7].alt}
                data-testid="gallery-image-8"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 aspect-[16/10] overflow-hidden rounded-sm">
            <img 
              src={images[8].src}
              alt={images[8].alt}
              data-testid="gallery-image-9"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// News/Blog Section
const News = () => {
  const articles = [
    {
      id: 1,
      title: "Úspěch našich střelců na mezinárodní soutěži",
      excerpt: "Sportovci sponzorovaní značkou ALSA PRO dosáhli výborných výsledků na prestižní evropské střelecké soutěži. Naše střelivo prokázalo svou kvalitu i v náročných podmínkách.",
      date: "Prosinec 2025",
      category: "Novinky",
      image: "https://images.unsplash.com/photo-1761144530756-47ecd564f8ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxzaG9vdGluZyUyMGNvbXBldGl0aW9uJTIwc3BvcnRzJTIwdGFyZ2V0fGVufDB8fHx8MTc3NjEwMTc3N3ww&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 2,
      title: "Nová produktová řada střel .308",
      excerpt: "Rozšiřujeme naši nabídku o další varianty střel v kalibru .308 Winchester. Nové produkty jsou dostupné ihned na e-shopu.",
      date: "Listopad 2025",
      category: "Produkty",
      image: "https://images.unsplash.com/photo-1761144438625-196d586f54d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwyfHxzaG9vdGluZyUyMGNvbXBldGl0aW9uJTIwc3BvcnRzJTIwdGFyZ2V0fGVufDB8fHx8MTc3NjEwMTc3N3ww&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 3,
      title: "Certifikace kvality ISO 9001",
      excerpt: "S hrdostí oznamujeme, že naše výroba splňuje všechny náročné standardy mezinárodní certifikace ISO 9001 pro systémy managementu kvality.",
      date: "Říjen 2025",
      category: "Firma",
      image: "https://images.unsplash.com/photo-1761144281580-e3b2c3b5ed32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwzfHxzaG9vdGluZyUyMGNvbXBldGl0aW9uJTIwc3BvcnRzJTIwdGFyZ2V0fGVufDB8fHx8MTc3NjEwMTc3N3ww&ixlib=rb-4.1.0&q=85"
    },
  ];

  return (
    <section id="novinky" data-testid="news-section" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5500] mb-4">
              Novinky
            </p>
            <h2 className="text-4xl sm:text-5xl text-white">
              Aktuality & Blog
            </h2>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              data-testid={`news-article-${article.id}`}
              className="bg-[#121212] card-hover rounded-sm overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-60"></div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                    {article.category}
                  </span>
                  <span className="text-xs text-zinc-500">{article.date}</span>
                </div>
                <h3 className="text-xl text-white mb-3 group-hover:text-[#FF5500] transition-colors">
                  {article.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const teamContacts = [
    { 
      role: "Logistika, e-shop", 
      name: "Vladimír Kolář", 
      phone: "+420 777 754 403", 
      email: "info@alsapro.cz" 
    },
    { 
      role: "Zahraniční obchod, ekonom", 
      name: "Ing. Naděžda Marcinková", 
      phone: "+420 608 064 356", 
      email: "info@alsapro.cz" 
    },
    { 
      role: "Majitel, technické dotazy a připomínky", 
      name: "Pavel Marcinek", 
      phone: "+420 608 718 212", 
      email: "info@alsapro.cz" 
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="kontakt"
      data-testid="contact-section"
      className="py-24 bg-[#121212] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF5500] mb-4">
              Kontakt
            </p>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              ALSA PRO s.r.o.
            </h2>
            
            {/* Main Contact Info */}
            <div className="space-y-4 mb-8">
              <a
                href="https://maps.google.com/?q=Návesní+1,+Zlín+Mladcová+760+01"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-address"
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-sm bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-[#FF5500] transition-colors flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#FF5500]" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Adresa</p>
                  <p className="text-white group-hover:text-[#FF5500] transition-colors">Návesní 1, Zlín – Mladcová 760 01</p>
                </div>
              </a>
              
              <a
                href="tel:+420777754403"
                data-testid="contact-phone"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-sm bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-[#FF5500] transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#FF5500]" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Telefon</p>
                  <p className="text-white group-hover:text-[#FF5500] transition-colors">+420 777 754 403</p>
                </div>
              </a>
              
              <a
                href="mailto:info@alsapro.cz"
                data-testid="contact-email"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-sm bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-[#FF5500] transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#FF5500]" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Email</p>
                  <p className="text-white group-hover:text-[#FF5500] transition-colors">info@alsapro.cz</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-[#050505] border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#FF5500]" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Otevírací doba</p>
                  <p className="text-white">PO – PÁ: 9:00 – 12:00, 13:00 – 15:00</p>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="p-4 bg-[#050505] border border-[#FF5500]/30 rounded-sm mb-8">
              <p className="text-zinc-400 text-sm">
                <span className="text-[#FF5500] font-semibold">Upozornění:</span> Není zde prodejna. Návštěvu prosím domluvte předem na tel: +420 777 754 403
              </p>
            </div>

            {/* Company Info */}
            <div className="flex gap-8 text-sm text-zinc-400 mb-8">
              <div>
                <span className="text-zinc-500">IČ:</span> <span className="text-white">25329511</span>
              </div>
              <div>
                <span className="text-zinc-500">DIČ:</span> <span className="text-white">CZ25329511</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl text-white mb-6">Napište nám</h3>
            
            {submitStatus === 'success' ? (
              <div className="bg-green-500/10 border border-green-500 rounded-sm p-6 text-center">
                <p className="text-green-500 font-semibold mb-2">✓ Zpráva odeslána!</p>
                <p className="text-zinc-400 text-sm">Děkujeme za vaši zprávu. Brzy vás budeme kontaktovat.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm text-[#FF5500] font-semibold mb-2">
                    Jméno a příjmení *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Jan Novák"
                    className="w-full bg-[#050505] text-white px-4 py-3 rounded-sm border border-white/10 focus:border-[#FF5500] focus:outline-none transition-colors placeholder:text-zinc-600"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-[#FF5500] font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="jan@example.com"
                    className="w-full bg-[#050505] text-white px-4 py-3 rounded-sm border border-white/10 focus:border-[#FF5500] focus:outline-none transition-colors placeholder:text-zinc-600"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-[#FF5500] font-semibold mb-2">
                    Zpráva *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows="6"
                    placeholder="Vaše zpráva..."
                    className="w-full bg-[#050505] text-white px-4 py-3 rounded-sm border border-white/10 focus:border-[#FF5500] focus:outline-none transition-colors placeholder:text-zinc-600 resize-none"
                  />
                </div>

                {/* Error */}
                {submitStatus === 'error' && (
                  <div className="bg-red-500/10 border border-red-500 rounded-sm p-3 text-center">
                    <p className="text-red-500 text-sm">
                      Chyba při odesílání. Zkuste to prosím znovu nebo nás kontaktujte telefonicky.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary px-6 py-4 rounded-sm inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Odesílám...' : 'Odeslat zprávu'}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>
              </form>
            )}

            {/* Team Contacts Below Form */}
            <div className="mt-12">
              <h4 className="text-lg text-white mb-6">Nebo kontaktujte přímo</h4>
              <div className="space-y-4">
                {teamContacts.map((contact, index) => (
                  <div 
                    key={index}
                    data-testid={`team-contact-${index}`}
                    className="p-4 bg-[#050505] border border-white/10 rounded-sm hover:border-[#FF5500]/50 transition-colors"
                  >
                    <p className="text-xs text-[#FF5500] uppercase tracking-wider mb-1">{contact.role}</p>
                    <h5 className="text-base text-white mb-2">{contact.name}</h5>
                    <div className="space-y-1 text-sm">
                      <a 
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-zinc-400 hover:text-[#FF5500] transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </a>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-2 text-zinc-400 hover:text-[#FF5500] transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        {contact.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <AlsaProLogo size="large" className="mb-4" />
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Výrobce celoplášťových střel a přebíjených nábojů 9mm. 
              Kvalita a přesnost pro náročné střelce z celé Evropy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Rychlé odkazy
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#produkty" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  Produkty
                </a>
              </li>
              <li>
                <a href="#o-nas" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  O nás
                </a>
              </li>
              <li>
                <a href="#novinky" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  Novinky
                </a>
              </li>
              <li>
                <a href="#kontakt" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Kontakt
            </h4>
            <ul className="space-y-3 text-zinc-400 text-sm">
              <li>info@alsapro.cz</li>
              <li>Česká republika</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} ALSA PRO s.r.o. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">
              Obchodní podmínky
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">
              Ochrana osobních údajů
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#050505]">
        <Navigation />
        <Hero />
        <Stats />
        <Products />
        <Bullets />
        <SponsorshipOffer />
        <About />
        <Gallery />
        <News />
        <Contact />
        <Footer />
        <OrderFormModal />
      </div>
    </CartProvider>
  );
}

export default App;
