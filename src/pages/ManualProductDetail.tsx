import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StoreHeader from "@/components/store/StoreHeader";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Phone, Package } from "lucide-react";

interface ManualProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  category: string | null;
  stock: number;
}

const ManualProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ManualProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const { data } = await supabase.from("manual_products").select("*").eq("id", id).eq("is_active", true).maybeSingle();
      setProduct(data as ManualProduct | null);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <div className="flex-1 flex items-center justify-center pt-32">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <div className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
            <Link to="/loja"><Button>Voltar para a Loja</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const formatBRL = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1 pt-36 pb-20" style={{ backgroundColor: "hsl(var(--section-bg))" }}>
        <div className="section-container">
          <Link to="/loja" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Voltar para a Loja
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square rounded-2xl overflow-hidden bg-card border shadow-lg">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Package className="w-20 h-20" />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                {product.category && <Badge variant="secondary" className="mb-3">{product.category}</Badge>}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{product.name}</h1>
                <div className="flex items-baseline gap-3">
                  <p className="text-2xl font-bold text-accent">{formatBRL(product.price)}</p>
                  {hasDiscount && (
                    <p className="text-lg text-muted-foreground line-through">{formatBRL(product.compare_at_price!)}</p>
                  )}
                </div>
              </div>

              <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                {product.stock > 0 ? `${product.stock} em estoque` : "Sem estoque"}
              </Badge>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  className="w-full bg-accent hover:bg-accent/90 h-14 text-lg"
                  onClick={() => window.open(`https://wa.me/5513982156120?text=${encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name}`)}`, "_blank")}
                  disabled={product.stock <= 0}
                >
                  <Phone className="w-5 h-5 mr-2" />Consultar via WhatsApp
                </Button>
              </div>

              {product.description && (
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ManualProductDetail;
