import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Instagram, Home, ShoppingBag } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

const StoreHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-primary/98 backdrop-blur-xl shadow-2xl" : "bg-primary/95 backdrop-blur-md"}`}>
      {/* Top Bar */}
      <div className={`bg-primary-dark/50 backdrop-blur-md border-b border-primary-foreground/10 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`}>
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-3 text-xs md:text-sm text-primary-foreground/95">
            <a href="tel:+5513982156120" className="flex items-center gap-2 hover:text-accent-glow transition-all duration-300">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">(13) 98215-6120</span>
              <span className="sm:hidden">(13) 98215-6120</span>
            </a>
            <div className="flex items-center gap-5">
              <a href="mailto:clinservengenharia@gmail.com" className="flex items-center gap-2 hover:text-accent-glow transition-all duration-300">
                <Mail className="w-4 h-4" />
                <span className="hidden md:inline font-medium">clinservengenharia@gmail.com</span>
              </a>
              <a href="https://instagram.com/clinservengenharia_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent-glow transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="section-container py-5">
        <div className="flex items-center justify-between">
          <Link to="/loja" className="text-xl md:text-2xl font-bold text-primary-foreground hover:text-accent-glow transition-all duration-300">
            Clinserv <span className="text-white font-extrabold">Loja</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold flex items-center gap-2">
              <Home className="w-4 h-4" /> Início
            </Link>
            <Link to="/loja" className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Produtos
            </Link>
            <CartDrawer />
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <CartDrawer />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-primary-foreground hover:text-accent-glow transition-all duration-300 p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 py-6 border-t border-primary-foreground/20 animate-fade-in">
            <div className="flex flex-col gap-5">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold text-left flex items-center gap-2">
                <Home className="w-4 h-4" /> Início
              </Link>
              <Link to="/loja" onClick={() => setIsMobileMenuOpen(false)} className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold text-left flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Produtos
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default StoreHeader;
