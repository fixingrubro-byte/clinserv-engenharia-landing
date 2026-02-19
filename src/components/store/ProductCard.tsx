import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho!", { description: node.title });
  };

  return (
    <Link to={`/produto/${node.handle}`}>
      <Card className="overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border hover:border-accent/50 group bg-card/80 backdrop-blur-sm h-full flex flex-col">
        <div className="relative h-56 overflow-hidden bg-muted">
          {image ? (
            <img src={image.url} alt={image.altText || node.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingCart className="w-12 h-12" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {variant && !variant.availableForSale && (
            <Badge variant="destructive" className="absolute top-3 right-3">Indisponível</Badge>
          )}
        </div>

        <CardHeader className="pb-3 flex-1">
          <CardTitle className="text-lg leading-tight line-clamp-2">{node.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{node.description}</p>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-xl font-bold text-accent">{formatPrice(price.amount, price.currencyCode)}</p>
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-accent hover:bg-accent/90"
            size="sm"
            disabled={isLoading || !variant?.availableForSale}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingCart className="w-4 h-4 mr-2" />Adicionar ao Carrinho</>}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
