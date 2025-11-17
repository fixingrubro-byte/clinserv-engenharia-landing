import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Serviço impecável e rápido. A Clinserv sempre nos atende com responsabilidade e qualidade.",
    author: "Hospital São Lucas",
    role: "Diretor Técnico",
  },
  {
    quote: "Excelente atendimento técnico e agilidade na entrega. Equipe extremamente profissional.",
    author: "Clínica Sorriso+",
    role: "Coordenadora de Manutenção",
  },
  {
    quote: "Equipe extremamente profissional. Recomendo para qualquer unidade de saúde.",
    author: "Prefeitura Municipal de Santos",
    role: "Secretaria de Saúde",
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="section-padding bg-gradient-to-b from-background to-secondary relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A confiança dos nossos parceiros é o nosso maior patrimônio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border hover:border-accent/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 animate-slide-up group bg-card/90 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-12 h-12 text-accent/30 group-hover:text-accent/50 transition-colors" />
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed italic text-lg">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-accent/20 pt-6">
                  <p className="font-bold text-lg text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground mt-1">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
