import { Phone, Mail, MapPin, Instagram } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="section-container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Clinserv <span className="text-accent">Engenharia</span>
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              Soluções completas em manutenção hospitalar e odontológica.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/clinservengenharia2024"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-accent hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-lg"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("sobre")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("servicos")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Contato
                </button>
              </li>
              <li>
                <button className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Política de Privacidade
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+5513982156120"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span>(13) 98215-6120</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:clinservengenharia@gmail.com"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors break-all"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>clinservengenharia@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Baixada Santista - SP<br />Atendimento em todo o estado</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="section-container py-6">
          <p className="text-center text-primary-foreground/80 text-sm">
            © 2025 Clinserv Engenharia — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
