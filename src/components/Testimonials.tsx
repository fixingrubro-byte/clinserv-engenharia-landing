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
    <section id="depoimentos" className="section-padding bg-secondary">
      <div className="section-container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A confiança dos nossos parceiros é o nosso maior patrimônio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-2 hover:border-accent hover:shadow-xl transition-all duration-300 animate-slide-up group bg-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="mb-4">
                  <Quote className="w-10 h-10 text-accent/30 group-hover:text-accent transition-colors" />
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
