import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ExternalLink, ShoppingBag, Phone } from "lucide-react";

const AdminPayments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pagamentos & Checkout</h1>
        <p className="text-muted-foreground">Configure métodos de pagamento e checkout da loja</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Shopify Checkout
              </CardTitle>
              <Badge className="bg-green-100 text-green-800">Ativo</Badge>
            </div>
            <CardDescription>
              Checkout integrado via Shopify Storefront API. O pagamento é processado pelo Shopify.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => window.open("https://admin.shopify.com/settings/payments", "_blank")}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Configurar no Shopify
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Stripe
              </CardTitle>
              <Badge variant="secondary">Disponível</Badge>
            </div>
            <CardDescription>
              Integração com Stripe para pagamentos diretos. Peça ao assistente para ativar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Diga "Ativar Stripe" no chat para configurar pagamentos via Stripe.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                WhatsApp
              </CardTitle>
              <Badge className="bg-green-100 text-green-800">Ativo</Badge>
            </div>
            <CardDescription>
              Consulta e orçamento via WhatsApp. Link direto configurado no site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Número: (13) 98215-6120</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPayments;
