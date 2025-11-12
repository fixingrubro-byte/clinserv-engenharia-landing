import { ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Autoclave Digital 21L",
    category: "Equipamento Odontológico",
    description: "Autoclave digital de última geração para esterilização de instrumentos odontológicos",
    price: "R$ 3.500,00",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Cadeira Odontológica Premium",
    category: "Equipamento Odontológico",
    description: "Cadeira odontológica com design ergonômico e sistema hidráulico",
    price: "R$ 12.800,00",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Monitor Multiparâmetros",
    category: "Equipamento Médico",
    description: "Monitor de sinais vitais com tela touchscreen de 12 polegadas",
    price: "R$ 8.900,00",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Fotopolimerizador LED",
    category: "Equipamento Odontológico",
    description: "Aparelho de fotopolimerização LED de alta potência",
    price: "R$ 890,00",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Oxímetro de Pulso",
    category: "Equipamento Médico",
    description: "Oxímetro portátil com display OLED e leitura rápida",
    price: "R$ 250,00",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Compressor Odontológico",
    category: "Equipamento Odontológico",
    description: "Compressor de ar isento de óleo para consultórios odontológicos",
    price: "R$ 4.200,00",
    image: "https://images.unsplash.com/photo-1631248055138-b9282083aa66?w=400&h=300&fit=crop"
  }
];

const Products = () => {
  const handleContact = (productName: string) => {
    const message = `Olá! Gostaria de mais informações sobre o produto: ${productName}`;
    window.open(`https://wa.me/5513982156120?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="produtos" className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Produtos Médicos e Odontológicos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Equipamentos de alta qualidade para sua clínica ou consultório
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-2xl font-bold text-primary">{product.price}</p>
              </CardContent>
              
              <CardFooter className="flex gap-2">
                <Button
                  onClick={() => handleContact(product.name)}
                  className="flex-1 bg-accent hover:bg-accent/90"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Consultar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleContact(product.name)}
                  className="flex-1"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Comprar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Não encontrou o que procura? Entre em contato para consultar outros produtos!
          </p>
          <Button
            onClick={() => window.open("https://wa.me/5513982156120?text=Olá! Gostaria de consultar outros produtos.", "_blank")}
            size="lg"
            className="bg-primary hover:bg-primary/90"
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
