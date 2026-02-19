import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { fetchProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ExternalLink, ShoppingBag, Plus, Pencil, Trash2, Package } from "lucide-react";
import { toast } from "sonner";

interface ManualProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  images: string[];
  category: string | null;
  is_active: boolean;
  stock: number;
  sku: string | null;
  sort_order: number;
}

const emptyForm = {
  name: "",
  description: "",
  price: 0,
  compare_at_price: 0,
  category: "",
  is_active: true,
  stock: 0,
  sku: "",
  sort_order: 0,
};

const AdminProducts = () => {
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [manualProducts, setManualProducts] = useState<ManualProduct[]>([]);
  const [loadingShopify, setLoadingShopify] = useState(true);
  const [loadingManual, setLoadingManual] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts(50).then(d => { setShopifyProducts(d); setLoadingShopify(false); }).catch(() => setLoadingShopify(false));
    loadManualProducts();
  }, []);

  const loadManualProducts = async () => {
    setLoadingManual(true);
    const { data } = await supabase.from("manual_products").select("*").order("sort_order");
    setManualProducts((data as ManualProduct[]) || []);
    setLoadingManual(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error("Nome é obrigatório"); return; }
    if (form.price <= 0) { toast.error("Preço deve ser maior que zero"); return; }
    setSaving(true);
    try {
      let image_url: string | null = null;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `products/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("site-assets").upload(path, imageFile);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from("site-assets").getPublicUrl(path);
        image_url = publicUrl;
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: form.price,
        compare_at_price: form.compare_at_price || null,
        category: form.category.trim() || null,
        is_active: form.is_active,
        stock: form.stock,
        sku: form.sku.trim() || null,
        sort_order: form.sort_order,
        ...(image_url ? { image_url } : {}),
      };

      if (editing) {
        const { error } = await supabase.from("manual_products").update(payload).eq("id", editing);
        if (error) throw error;
        toast.success("Produto atualizado!");
      } else {
        const { error } = await supabase.from("manual_products").insert(payload);
        if (error) throw error;
        toast.success("Produto criado!");
      }

      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm);
      setImageFile(null);
      loadManualProducts();
    } catch (err: any) {
      toast.error("Erro ao salvar", { description: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (p: ManualProduct) => {
    setEditing(p.id);
    setForm({
      name: p.name,
      description: p.description || "",
      price: p.price,
      compare_at_price: p.compare_at_price || 0,
      category: p.category || "",
      is_active: p.is_active,
      stock: p.stock,
      sku: p.sku || "",
      sort_order: p.sort_order,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este produto?")) return;
    const { error } = await supabase.from("manual_products").delete().eq("id", id);
    if (error) toast.error("Erro ao excluir");
    else { toast.success("Produto excluído"); loadManualProducts(); }
  };

  const toggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase.from("manual_products").update({ is_active: !current }).eq("id", id);
    if (error) toast.error("Erro ao atualizar");
    else loadManualProducts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground">Gerencie produtos Shopify e manuais</p>
        </div>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">
            <Package className="w-4 h-4 mr-2" />
            Manuais ({manualProducts.length})
          </TabsTrigger>
          <TabsTrigger value="shopify">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Shopify ({shopifyProducts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditing(null); setForm(emptyForm); setImageFile(null); } }}>
              <DialogTrigger asChild>
                <Button><Plus className="w-4 h-4 mr-2" />Novo Produto</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editing ? "Editar Produto" : "Novo Produto"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Nome *</Label>
                    <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nome do produto" />
                  </div>
                  <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Descrição do produto" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preço (R$) *</Label>
                      <Input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Preço Anterior (R$)</Label>
                      <Input type="number" step="0.01" min="0" value={form.compare_at_price} onChange={e => setForm(f => ({ ...f, compare_at_price: parseFloat(e.target.value) || 0 }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Ex: Equipamentos" />
                    </div>
                    <div className="space-y-2">
                      <Label>SKU</Label>
                      <Input value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} placeholder="Código único" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Estoque</Label>
                      <Input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: parseInt(e.target.value) || 0 }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Ordem</Label>
                      <Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Imagem</Label>
                    <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={form.is_active} onCheckedChange={v => setForm(f => ({ ...f, is_active: v }))} />
                    <Label>Ativo na loja</Label>
                  </div>
                  <Button className="w-full" onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {editing ? "Atualizar" : "Criar"} Produto
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              {loadingManual ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
              ) : manualProducts.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">Nenhum produto manual cadastrado. Crie o primeiro!</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagem</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {manualProducts.map(p => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                            {p.image_url ? (
                              <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><Package className="w-5 h-5 text-muted-foreground" /></div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{p.name}</p>
                            {p.category && <p className="text-xs text-muted-foreground">{p.category}</p>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">R$ {p.price.toFixed(2)}</p>
                            {p.compare_at_price && p.compare_at_price > p.price && (
                              <p className="text-xs text-muted-foreground line-through">R$ {p.compare_at_price.toFixed(2)}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={p.stock > 0 ? "default" : "destructive"}>
                            {p.stock > 0 ? `${p.stock} un.` : "Sem estoque"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Switch checked={p.is_active} onCheckedChange={() => toggleActive(p.id, p.is_active)} />
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}><Pencil className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shopify">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Catálogo Shopify ({shopifyProducts.length})
                </CardTitle>
                <Button onClick={() => window.open("https://admin.shopify.com", "_blank")} variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />Shopify Admin
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingShopify ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
              ) : shopifyProducts.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">Nenhum produto Shopify cadastrado.</p>
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
                    {shopifyProducts.map(p => {
                      const { node } = p;
                      const image = node.images.edges[0]?.node;
                      const price = node.priceRange.minVariantPrice;
                      const available = node.variants.edges.some(v => v.node.availableForSale);
                      return (
                        <TableRow key={node.id}>
                          <TableCell>
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                              {image ? <img src={image.url} alt={node.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="w-5 h-5 text-muted-foreground" /></div>}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium max-w-[200px] truncate">{node.title}</TableCell>
                          <TableCell>{formatPrice(price.amount, price.currencyCode)}</TableCell>
                          <TableCell>{node.variants.edges.length}</TableCell>
                          <TableCell>
                            <Badge variant={available ? "default" : "destructive"}>{available ? "Disponível" : "Indisponível"}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProducts;
