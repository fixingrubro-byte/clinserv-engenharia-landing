import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/loja" element={<Store />} />
      <Route path="/produto/:handle" element={<ProductDetail />} />
      
      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="produtos" element={<AdminProducts />} />
        <Route path="banners" element={<AdminBanners />} />
        <Route path="pagamentos" element={<AdminPayments />} />
        <Route path="configuracoes" element={<AdminSettings />} />
      </Route>

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
