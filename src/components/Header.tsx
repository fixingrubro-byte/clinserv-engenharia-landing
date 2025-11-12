import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Instagram } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-lg" : "bg-primary/95"
      }`}
    >
      {/* Top Bar - Contact Info */}
      <div className="bg-primary/90 border-b border-primary-foreground/10">
        <div className="section-container py-2">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-3 text-xs md:text-sm text-primary-foreground/90">
            <a href="tel:+5513982156120" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">(13) 98215-6120 — Atendimento em toda a Baixada Santista</span>
              <span className="sm:hidden">(13) 98215-6120</span>
            </a>
            <div className="flex items-center gap-4">
              <a href="mailto:clinservengenharia@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden md:inline">clinservengenharia@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/clinservengenharia2024"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span className="hidden sm:inline">@clinservengenharia2024</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="section-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl md:text-2xl font-bold text-primary-foreground hover:text-accent transition-colors"
          >
            Clinserv <span className="text-white font-extrabold">Engenharia</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-primary-foreground hover:text-accent transition-colors font-medium"
            >
              Sobre nós
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-primary-foreground hover:text-accent transition-colors font-medium"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("diferenciais")}
              className="text-primary-foreground hover:text-accent transition-colors font-medium"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-primary-foreground hover:text-accent transition-colors font-medium"
            >
              Contato
            </button>
            <button
              onClick={() => scrollToSection("produtos")}
              className="text-primary-foreground hover:text-accent transition-colors font-medium"
            >
              Produtos
            </button>
            <Button
              onClick={() => scrollToSection("orcamento")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              Solicite um orçamento
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary-foreground p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-primary-foreground/10">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-primary-foreground hover:text-accent transition-colors font-medium text-left"
              >
                Sobre nós
              </button>
              <button
                onClick={() => scrollToSection("servicos")}
                className="text-primary-foreground hover:text-accent transition-colors font-medium text-left"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("diferenciais")}
                className="text-primary-foreground hover:text-accent transition-colors font-medium text-left"
              >
                Diferenciais
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-primary-foreground hover:text-accent transition-colors font-medium text-left"
              >
                Contato
              </button>
              <button
                onClick={() => scrollToSection("produtos")}
                className="text-primary-foreground hover:text-accent transition-colors font-medium text-left"
              >
                Produtos
              </button>
              <Button
                onClick={() => scrollToSection("orcamento")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              >
                Solicite um orçamento
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
