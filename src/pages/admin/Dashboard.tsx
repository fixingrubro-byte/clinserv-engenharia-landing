import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Image, DollarSign, TrendingUp } from "lucide-react";
import { fetchProducts } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [bannerCount, setBannerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [products, { count }] = await Promise.all([
          fetchProducts(50),
          supabase.from("banners").select("*", { count: "exact", head: true }),
        ]);
        setProductCount(products.length);
        setBannerCount(count || 0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = [
    { title: "Produtos", value: productCount, icon: ShoppingBag, color: "text-primary" },
    { title: "Banners Ativos", value: bannerCount, icon: Image, color: "text-accent" },
    { title: "Vendas (mês)", value: "—", icon: DollarSign, color: "text-green-600" },
    { title: "Visitas (mês)", value: "—", icon: TrendingUp, color: "text-orange-500" },
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
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Nenhuma atividade recente registrada.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Use o menu lateral para gerenciar produtos, banners e configurações da loja.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
