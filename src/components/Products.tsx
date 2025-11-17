import { ShoppingCart, Phone, Wrench, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import autoclaveImg from "@/assets/products/autoclave.jpg";
import cadeiraImg from "@/assets/products/cadeira-odontologica.jpg";
import monitorImg from "@/assets/products/monitor-multiparametros.jpg";
import fotopolimerizadorImg from "@/assets/products/fotopolimerizador.jpg";
import oximetroImg from "@/assets/products/oximetro.jpg";
import compressorImg from "@/assets/products/compressor.jpg";
import manutencaoPreventivaImg from "@/assets/products/manutencao-preventiva.jpg";
import manutencaoCorretivaImg from "@/assets/products/manutencao-corretiva.jpg";

const products = [
  {
    id: 1,
    name: "Manutenção Preventiva",
    category: "Serviço",
    description: "Manutenção programada para garantir o funcionamento contínuo dos equipamentos hospitalares",
    price: "Valor a Combinar",
    image: manutencaoPreventivaImg,
    isService: true,
    icon: Wrench
  },
  {
    id: 2,
    name: "Manutenção Corretiva",
    category: "Serviço",
    description: "Reparo e correção de falhas em equipamentos médicos e odontológicos",
    price: "Valor a Combinar",
    image: manutencaoCorretivaImg,
    isService: true,
    icon: Hammer
  },
  {
    id: 3,
    name: "Autoclave Digital 21L",
    category: "Equipamento Odontológico",
    description: "Autoclave digital de última geração para esterilização de instrumentos odontológicos",
    price: "R$ 3.500,00",
    image: autoclaveImg
  },
  {
    id: 4,
    name: "Cadeira Odontológica Premium",
    category: "Equipamento Odontológico",
    description: "Cadeira odontológica com design ergonômico e sistema hidráulico",
    price: "R$ 12.800,00",
    image: cadeiraImg
  },
  {
    id: 5,
    name: "Monitor Multiparâmetros",
    category: "Equipamento Médico",
    description: "Monitor de sinais vitais com tela touchscreen de 12 polegadas",
    price: "R$ 8.900,00",
    image: monitorImg
  },
  {
    id: 6,
    name: "Fotopolimerizador LED",
    category: "Equipamento Odontológico",
    description: "Aparelho de fotopolimerização LED de alta potência",
    price: "R$ 890,00",
    image: fotopolimerizadorImg
  },
  {
    id: 7,
    name: "Oxímetro de Pulso",
    category: "Equipamento Médico",
    description: "Oxímetro portátil com display OLED e leitura rápida",
    price: "R$ 250,00",
    image: oximetroImg
  },
  {
    id: 8,
    name: "Compressor Odontológico",
    category: "Equipamento Odontológico",
    description: "Compressor de ar isento de óleo para consultórios odontológicos",
    price: "R$ 4.200,00",
    image: compressorImg
  }
];

const Products = () => {
  const handleContact = (productName: string) => {
    window.open("https://wa.me/5513982156120?text=Vim+Pelo+Site", "_blank");
  };

  return (
    <section id="produtos" className="section-padding relative overflow-hidden" style={{ backgroundColor: "hsl(var(--section-bg))" }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Produtos e Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Equipamentos de alta qualidade e serviços especializados para sua clínica ou consultório
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {products.map((product, index) => {
            const ServiceIcon = product.icon;
            return (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border hover:border-accent/50 group bg-card/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-56 overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {product.isService && ServiceIcon && (
                    <div className="absolute top-3 left-3 bg-accent/95 backdrop-blur-sm p-2.5 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <ServiceIcon className="w-5 h-5 text-accent-foreground" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge variant={product.isService ? "default" : "secondary"} className="text-xs font-semibold shadow-md">
                      {product.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <p className={`text-xl font-bold ${product.isService ? 'text-accent' : 'text-primary'}`}>
                    {product.price}
                  </p>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-2 pt-0">
                  <Button
                    onClick={() => handleContact(product.name)}
                    className="w-full bg-accent hover:bg-accent/90"
                    size="sm"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Consultar via WhatsApp
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center bg-gradient-to-br from-card to-accent/5 rounded-2xl p-10 shadow-lg border-2 border-accent/20 hover:shadow-xl transition-all duration-300">
          <p className="text-muted-foreground mb-6 text-xl font-medium">
            Não encontrou o que procura? Entre em contato para consultar outros produtos e serviços!
          </p>
          <Button
            onClick={() => window.open("https://wa.me/5513982156120?text=Vim+Pelo+Site", "_blank")}
            size="lg"
            className="bg-accent hover:bg-accent-glow hover:scale-105 shadow-accent transition-all duration-300"
          >
            <Phone className="w-5 h-5 mr-2" />
            Falar com um especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
