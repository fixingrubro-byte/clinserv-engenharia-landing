import { useEffect, useState } from "react";
import StoreHeader from "@/components/store/StoreHeader";
import ProductCard from "@/components/store/ProductCard";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { Loader2, ShoppingBag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PromoBanner from "@/components/store/PromoBanner";

const Store = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts(50);
        setProducts(data);
      } catch (e) {
        console.error("Failed to load products:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = products.filter(p =>
    p.node.title.toLowerCase().includes(search.toLowerCase()) ||
    p.node.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />
      <PromoBanner />

      {/* Hero */}
      <section className="pt-36 pb-16 bg-primary text-primary-foreground">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Loja Virtual</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Equipamentos médicos e odontológicos de alta qualidade com entrega em toda a Baixada Santista
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white text-foreground border-0 h-12 text-base"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="flex-1 section-padding" style={{ backgroundColor: "hsl(var(--section-bg))" }}>
        <div className="section-container">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="ml-3 text-muted-foreground">Carregando produtos...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {search ? "Nenhum produto encontrado" : "Nenhum produto disponível"}
              </h2>
              <p className="text-muted-foreground">
                {search ? "Tente outro termo de busca." : "Em breve teremos novidades! Entre em contato para mais informações."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
              {filtered.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Store;
