import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, Clock, FileText, Award } from "lucide-react";

const differentials = [
  {
    icon: UserCheck,
    title: "Equipe técnica certificada",
    description: "Profissionais qualificados e com certificações atualizadas",
  },
  {
    icon: Clock,
    title: "Atendimento rápido e eficaz",
    description: "Resposta ágil para minimizar tempo de inatividade",
  },
  {
    icon: FileText,
    title: "Relatórios técnicos detalhados",
    description: "Documentação completa de todos os serviços realizados",
  },
  {
    icon: Award,
    title: "Mais de 10 anos de experiência",
    description: "Tradição e confiabilidade no mercado de saúde",
  },
];

const Differentials = () => {
  return (
    <section id="diferenciais" className="section-padding bg-secondary">
      <div className="section-container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Por que escolher a Clinserv?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Diferenciais que fazem da Clinserv a escolha certa para sua instituição
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:border-accent hover:shadow-xl transition-all duration-300 animate-slide-up group bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 rounded-full border-2 border-accent">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <Award className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">Excelência e Confiabilidade Técnica</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;
