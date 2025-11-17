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
    <section id="diferenciais" className="section-padding bg-gradient-to-b from-secondary to-background relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Por que escolher a Clinserv?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Diferenciais que fazem da Clinserv a escolha certa para sua instituição
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="border hover:border-accent/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 animate-slide-up group bg-card/90 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 group-hover:from-accent group-hover:to-accent-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md">
                      <Icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-full border-2 border-accent/30 hover:border-accent/50 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center shadow-accent">
              <Award className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">Excelência e Confiabilidade Técnica</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;
