import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { Loader2, ExternalLink, ShoppingBag } from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts(50);
        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground">Gerencie os produtos da sua loja Shopify</p>
        </div>
        <Button onClick={() => window.open("https://admin.shopify.com", "_blank")} variant="outline">
          <ExternalLink className="w-4 h-4 mr-2" />
          Shopify Admin
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Catálogo ({products.length} produtos)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Nenhum produto cadastrado. Crie produtos no Shopify ou peça para o assistente criar.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagem</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Variantes</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => {
                  const { node } = p;
                  const image = node.images.edges[0]?.node;
                  const price = node.priceRange.minVariantPrice;
                  const available = node.variants.edges.some(v => v.node.availableForSale);
                  return (
                    <TableRow key={node.id}>
                      <TableCell>
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                          {image ? (
                            <img src={image.url} alt={node.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="w-5 h-5 text-muted-foreground" /></div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">{node.title}</TableCell>
                      <TableCell>{formatPrice(price.amount, price.currencyCode)}</TableCell>
                      <TableCell>{node.variants.edges.length}</TableCell>
                      <TableCell>
                        <Badge variant={available ? "default" : "destructive"}>
                          {available ? "Disponível" : "Indisponível"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
