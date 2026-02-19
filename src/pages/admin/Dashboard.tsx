import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Image, Package, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { fetchProducts } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [shopifyCount, setShopifyCount] = useState(0);
  const [manualCount, setManualCount] = useState(0);
  const [bannerCount, setBannerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [products, banners, manual] = await Promise.all([
          fetchProducts(50),
          supabase.from("banners").select("*", { count: "exact", head: true }).eq("is_active", true),
          supabase.from("manual_products").select("*", { count: "exact", head: true }).eq("is_active", true),
        ]);
        setShopifyCount(products.length);
        setBannerCount(banners.count || 0);
        setManualCount(manual.count || 0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = [
    { title: "Produtos Manuais", value: manualCount, icon: Package, color: "text-primary" },
    { title: "Produtos Shopify", value: shopifyCount, icon: ShoppingBag, color: "text-blue-600" },
    { title: "Banners Ativos", value: bannerCount, icon: Image, color: "text-accent" },
    { title: "Total Produtos", value: manualCount + shopifyCount, icon: TrendingUp, color: "text-green-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua loja virtual</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{loading ? "..." : stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between" onClick={() => navigate("/admin/produtos")}>
              <span className="flex items-center gap-2"><Plus className="w-4 h-4" />Adicionar Produto Manual</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between" onClick={() => navigate("/admin/banners")}>
              <span className="flex items-center gap-2"><Plus className="w-4 h-4" />Criar Banner Promocional</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between" onClick={() => navigate("/admin/configuracoes")}>
              <span className="flex items-center gap-2"><Image className="w-4 h-4" />Configurar Logo/Favicon</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Produtos Manuais:</strong> Cadastrados diretamente no painel, vendidos via WhatsApp.</p>
            <p>• <strong>Produtos Shopify:</strong> Sincronizados do Shopify, com carrinho e checkout integrado.</p>
            <p>• <strong>Banners:</strong> Exibidos na loja para promoções e comunicados.</p>
            <p>• <strong>Configurações:</strong> Logo e favicon do site e loja.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
