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
    <section id="hero" className="relative min-h-screen flex items-center pt-32 md:pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Técnicos da Clinserv realizando manutenção" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"></div>
      </div>

      {/* Content */}
      <div className="section-container relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Soluções em Engenharia e Manutenção Hospitalar com{" "}
            <span className="text-accent">Excelência</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Atendemos clínicas, hospitais e prefeituras com manutenção preventiva e corretiva, 
            fornecimento de peças e calibração técnica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg group"
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Falar com um especialista
            </Button>
            <Button
              onClick={scrollToForm}
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold text-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Solicitar orçamento gratuito
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20">
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">+10</div>
              <div className="text-sm text-primary-foreground/80">Anos de experiência</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">100%</div>
              <div className="text-sm text-primary-foreground/80">Certificação técnica</div>
            </div>
            <div className="text-center md:text-left col-span-2 md:col-span-1">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">24/7</div>
              <div className="text-sm text-primary-foreground/80">Atendimento emergencial</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
