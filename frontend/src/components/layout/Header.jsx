import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartModal from '../cart/CartModal';

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

const Header = () => {
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

            {/* Cart Button */}
            <div className="hidden md:flex items-center gap-4">
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

export default Header;
