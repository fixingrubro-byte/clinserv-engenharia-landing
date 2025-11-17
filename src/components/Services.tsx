import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Package, Settings, Ambulance } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Manutenção Preventiva e Corretiva",
    description:
      "Garantimos o pleno funcionamento dos equipamentos médicos e odontológicos, evitando falhas e paradas inesperadas.",
  },
  {
    icon: Package,
    title: "Fornecimento de Peças",
    description:
      "Cabos, baterias, sensores, lâmpadas e componentes técnicos para reposição imediata.",
  },
  {
    icon: Settings,
    title: "Limpeza e Calibração Técnica",
    description:
      "Serviços técnicos com certificação e padrões hospitalares.",
  },
  {
    icon: Ambulance,
    title: "Atendimento Emergencial",
    description:
      "Priorizamos equipamentos críticos com suporte técnico ágil e eficaz.",
  },
];

const Services = () => {
  const scrollToForm = () => {
    const element = document.getElementById("orcamento");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="servicos" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Soluções completas em manutenção e engenharia hospitalar para garantir o melhor funcionamento dos seus equipamentos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border hover:border-accent/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up group bg-card/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 mb-6 group-hover:from-accent group-hover:to-accent-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md">
                    <Icon className="w-10 h-10 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent-glow hover:scale-105 shadow-accent font-semibold text-lg transition-all duration-300"
          >
            Solicite um orçamento personalizado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
