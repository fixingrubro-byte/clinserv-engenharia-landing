import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Image,
  Settings,
  CreditCard,
  LogOut,
  Store,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Produtos", url: "/admin/produtos", icon: ShoppingBag },
  { title: "Banners", url: "/admin/banners", icon: Image },
  { title: "Pagamentos", url: "/admin/pagamentos", icon: CreditCard },
  { title: "Configurações", url: "/admin/configuracoes", icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r flex flex-col">
      <div className="p-6 border-b">
        <Link to="/admin" className="text-xl font-bold text-foreground">
          Clinserv <span className="text-primary">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t space-y-2">
        <Link to="/loja" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
          <Store className="w-4 h-4" />
          Ver Loja
        </Link>
        <Link to="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
          <Home className="w-4 h-4" />
          Ver Site
        </Link>
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
