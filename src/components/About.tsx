import { Button } from "@/components/ui/button";
import teamImage from "@/assets/team-about.jpg";

const About = () => {
  const scrollToServices = () => {
    const element = document.getElementById("servicos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="sobre" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="animate-fade-in order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary-light rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <img
                src={teamImage}
                alt="Equipe Clinserv Engenharia"
                className="relative rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-accent to-accent-glow text-accent-foreground px-8 py-5 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold">+10</div>
                <div className="text-sm font-medium">Anos no mercado</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-slide-up order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Sobre a Clinserv Engenharia
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              A <span className="text-accent font-semibold">Clinserv Engenharia</span> é uma empresa 
              especializada em manutenção preventiva e corretiva de equipamentos médicos e odontológicos.
            </p>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Atuamos há mais de 10 anos na <span className="font-semibold">Baixada Santista e São Paulo</span>, 
              oferecendo soluções técnicas completas, com foco em segurança, eficiência e agilidade no atendimento.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Experiência Comprovada:</strong> Mais de uma década atendendo 
                  instituições de saúde de diversos portes
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Equipe Especializada:</strong> Técnicos certificados e 
                  constantemente atualizados
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Atendimento Personalizado:</strong> Soluções customizadas 
                  para cada cliente
                </p>
              </div>
            </div>

            <Button
              onClick={scrollToServices}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent-glow hover:scale-105 shadow-accent font-semibold transition-all duration-300"
            >
              Saiba mais sobre nossos serviços
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
