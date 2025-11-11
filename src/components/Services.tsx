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
    <section id="servicos" className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções completas em manutenção e engenharia hospitalar para garantir o melhor funcionamento dos seus equipamentos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:border-accent hover:shadow-xl transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg"
          >
            Solicite um orçamento personalizado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
