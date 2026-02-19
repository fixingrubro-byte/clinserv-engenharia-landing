import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StoreHeader from "@/components/store/StoreHeader";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchProductByHandle, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart, Loader2, ArrowLeft, Minus, Plus, Phone } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    if (!handle) return;
    const load = async () => {
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
      } catch (e) {
        console.error("Failed to load product:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [handle]);

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

  const variant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;
  const currentImage = images[selectedImage]?.node;

  const handleAddToCart = async () => {
    if (!variant) return;
    const shopifyProduct: ShopifyProduct = {
      node: product,
    };
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho!", { description: `${product.title} x${quantity}` });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1 pt-36 pb-20" style={{ backgroundColor: "hsl(var(--section-bg))" }}>
        <div className="section-container">
          {/* Breadcrumb */}
          <Link to="/loja" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Voltar para a Loja
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-card border shadow-lg">
                {currentImage ? (
                  <img src={currentImage.url} alt={currentImage.altText || product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ShoppingCart className="w-20 h-20" />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${idx === selectedImage ? 'border-accent shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{product.title}</h1>
                <p className="text-2xl font-bold text-accent">
                  {variant ? formatPrice(variant.price.amount, variant.price.currencyCode) : formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                </p>
              </div>

              {/* Variant selection */}
              {product.options.length > 0 && product.options[0].name !== "Title" && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="text-sm font-semibold text-foreground mb-2 block">{option.name}</label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const variantIdx = product.variants.edges.findIndex(v =>
                            v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                          );
                          return (
                            <button
                              key={value}
                              onClick={() => variantIdx >= 0 && setSelectedVariantIdx(variantIdx)}
                              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                                variantIdx === selectedVariantIdx
                                  ? 'border-accent bg-accent text-accent-foreground'
                                  : 'border-border hover:border-accent/50'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Quantidade</label>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-accent hover:bg-accent/90 h-14 text-lg"
                  disabled={isLoading || !variant?.availableForSale}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShoppingCart className="w-5 h-5 mr-2" />Adicionar ao Carrinho</>}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={() => window.open("https://wa.me/5513982156120?text=Vim+Pelo+Site", "_blank")}
                >
                  <Phone className="w-4 h-4 mr-2" /> Consultar via WhatsApp
                </Button>
              </div>

              {variant && !variant.availableForSale && (
                <Badge variant="destructive" className="text-sm">Produto indisponível no momento</Badge>
              )}

              {/* Description */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
