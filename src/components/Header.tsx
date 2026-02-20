import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Instagram, ShoppingBag } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-primary/98 backdrop-blur-xl shadow-2xl" : "bg-primary/95 backdrop-blur-md"
      }`}
    >
      {/* Top Bar - Contact Info */}
      <div className={`bg-primary-dark/50 backdrop-blur-md border-b border-primary-foreground/10 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`}>
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-3 text-xs md:text-sm text-primary-foreground/95">
            <a href="tel:+5513982156120" className="flex items-center gap-2 hover:text-accent-glow transition-all duration-300 hover:scale-105">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">(13) 98215-6120 — Atendimento em toda a Baixada Santista</span>
              <span className="sm:hidden">(13) 98215-6120</span>
            </a>
            <div className="flex items-center gap-5">
              <a href="mailto:clinservengenharia@gmail.com" className="flex items-center gap-2 hover:text-accent-glow transition-all duration-300 hover:scale-105">
                <Mail className="w-4 h-4" />
                <span className="hidden md:inline font-medium">clinservengenharia@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/clinservengenharia_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent-glow transition-all duration-300 hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">@clinservengenharia_</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="section-container py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl md:text-2xl font-bold text-primary-foreground hover:text-accent-glow transition-all duration-300 hover:scale-105"
          >
            Clinserv <span className="text-white font-extrabold">Engenharia</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent-glow after:transition-all after:duration-300 hover:after:w-full"
            >
              Sobre nós
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent-glow after:transition-all after:duration-300 hover:after:w-full"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("diferenciais")}
              className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent-glow after:transition-all after:duration-300 hover:after:w-full"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollToSection("produtos")}
              className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent-glow after:transition-all after:duration-300 hover:after:w-full"
            >
              Produtos
            </button>
            <Link
              to="/loja"
              className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold flex items-center gap-1.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent-glow after:transition-all after:duration-300 hover:after:w-full"
            >
              <ShoppingBag className="w-4 h-4" /> Loja
            </Link>
            <Button
              onClick={() => scrollToSection("orcamento")}
              size="sm"
              className="bg-accent hover:bg-accent-glow hover:scale-105 shadow-accent transition-all duration-300 font-semibold"
            >
              Solicitar Orçamento
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary-foreground hover:text-accent-glow transition-all duration-300 p-2 hover:scale-110"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 py-6 border-t border-primary-foreground/20 animate-fade-in">
            <div className="flex flex-col gap-5">
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold text-left hover:translate-x-2"
              >
                Sobre nós
              </button>
              <button
                onClick={() => scrollToSection("servicos")}
                className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold text-left hover:translate-x-2"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("diferenciais")}
                className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold text-left hover:translate-x-2"
              >
                Diferenciais
              </button>
              <button
                onClick={() => scrollToSection("produtos")}
                className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold text-left hover:translate-x-2"
              >
                Produtos
              </button>
              <Link
                to="/loja"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary-foreground hover:text-accent-glow transition-all duration-300 font-semibold text-left hover:translate-x-2 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Loja Virtual
              </Link>
              <Button
                onClick={() => scrollToSection("orcamento")}
                className="bg-accent hover:bg-accent-glow shadow-accent transition-all duration-300 font-semibold mt-2"
              >
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
