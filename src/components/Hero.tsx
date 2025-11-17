import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5513982156120?text=Olá! Gostaria de solicitar um orçamento.", "_blank");
  };

  const scrollToForm = () => {
    const element = document.getElementById("orcamento");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 md:pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Técnicos da Clinserv realizando manutenção" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/40"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in">
            Soluções em Engenharia e Manutenção Hospitalar com{" "}
            <span className="text-white font-extrabold bg-gradient-to-r from-white to-accent-glow bg-clip-text text-transparent drop-shadow-lg">Excelência</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/95 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Atendemos clínicas, hospitais e prefeituras com manutenção preventiva e corretiva, 
            fornecimento de peças e calibração técnica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent-glow hover:scale-105 font-semibold text-lg shadow-accent transition-all duration-300 group"
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Falar com um especialista
            </Button>
            <Button
              onClick={scrollToForm}
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/80 bg-primary-foreground/5 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 font-semibold text-lg transition-all duration-300"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Solicitar orçamento gratuito
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center md:text-left group cursor-default">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1 transition-transform group-hover:scale-110">+10</div>
              <div className="text-sm text-primary-foreground/90 font-medium">Anos de experiência</div>
            </div>
            <div className="text-center md:text-left group cursor-default">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1 transition-transform group-hover:scale-110">100%</div>
              <div className="text-sm text-primary-foreground/90 font-medium">Certificação técnica</div>
            </div>
            <div className="text-center md:text-left col-span-2 md:col-span-1 group cursor-default">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1 transition-transform group-hover:scale-110">24/7</div>
              <div className="text-sm text-primary-foreground/90 font-medium">Atendimento emergencial</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
