import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Package } from "lucide-react";
import type { ManualProduct } from "@/pages/Store";

interface ManualProductCardProps {
  product: ManualProduct;
}

const ManualProductCard = ({ product }: ManualProductCardProps) => {
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  return (
    <Link to={`/produto/manual/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border hover:border-accent/50 group bg-card/80 backdrop-blur-sm h-full flex flex-col">
        <div className="relative h-56 overflow-hidden bg-muted">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Package className="w-12 h-12" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {hasDiscount && (
            <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
              -{Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)}%
            </Badge>
          )}
          {product.stock <= 0 && (
            <Badge variant="destructive" className="absolute top-3 right-3">Indisponível</Badge>
          )}
          {product.category && (
            <Badge variant="secondary" className="absolute bottom-3 left-3">{product.category}</Badge>
          )}
        </div>

        <CardHeader className="pb-3 flex-1">
          <CardTitle className="text-lg leading-tight line-clamp-2">{product.name}</CardTitle>
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
          )}
        </CardHeader>

        <CardContent className="pb-3">
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-accent">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
            </p>
            {hasDiscount && (
              <p className="text-sm text-muted-foreground line-through">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.compare_at_price!)}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`https://wa.me/5513982156120?text=${encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name}`)}`, "_blank");
            }}
            className="w-full bg-accent hover:bg-accent/90"
            size="sm"
            disabled={product.stock <= 0}
          >
            <Phone className="w-4 h-4 mr-2" />Consultar via WhatsApp
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ManualProductCard;
