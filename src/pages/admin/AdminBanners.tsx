import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Image, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  badge_text: string | null;
  cta_text: string | null;
  cta_link: string | null;
  bg_color: string | null;
  text_color: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
}

const emptyForm = {
  title: "",
  subtitle: "",
  badge_text: "",
  cta_text: "Ver Ofertas",
  cta_link: "/loja",
  bg_color: "#0066cc",
  text_color: "#ffffff",
  is_active: true,
  sort_order: 0,
};

const AdminBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const loadBanners = async () => {
    const { data } = await supabase.from("banners").select("*").order("sort_order");
    setBanners(data || []);
    setLoading(false);
  };

  useEffect(() => { loadBanners(); }, []);

  const handleSave = async () => {
    if (!form.title) { toast.error("Título é obrigatório"); return; }
    setSaving(true);
    try {
      let image_url: string | null = null;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `banners/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("site-assets").upload(path, imageFile);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from("site-assets").getPublicUrl(path);
        image_url = publicUrl;
      }

      const payload: any = { ...form };
      if (image_url) payload.image_url = image_url;

      if (editing) {
        const { error } = await supabase.from("banners").update(payload).eq("id", editing);
        if (error) throw error;
        toast.success("Banner atualizado!");
      } else {
        const { error } = await supabase.from("banners").insert(payload);
        if (error) throw error;
        toast.success("Banner criado!");
      }

      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm);
      setImageFile(null);
      loadBanners();
    } catch (err: any) {
      toast.error("Erro ao salvar", { description: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditing(banner.id);
    setForm({
      title: banner.title,
      subtitle: banner.subtitle || "",
      badge_text: banner.badge_text || "",
      cta_text: banner.cta_text || "Ver Ofertas",
      cta_link: banner.cta_link || "/loja",
      bg_color: banner.bg_color || "#0066cc",
      text_color: banner.text_color || "#ffffff",
      is_active: banner.is_active,
      sort_order: banner.sort_order,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este banner?")) return;
    const { error } = await supabase.from("banners").delete().eq("id", id);
    if (error) toast.error("Erro ao excluir");
    else { toast.success("Banner excluído"); loadBanners(); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Banners Promocionais</h1>
          <p className="text-muted-foreground">Gerencie os banners da loja virtual</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditing(null); setForm(emptyForm); setImageFile(null); } }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Novo Banner</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Editar Banner" : "Novo Banner"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Título *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="🔥 Super Oferta!" />
              </div>
              <div className="space-y-2">
                <Label>Subtítulo</Label>
                <Input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="Até 50% OFF em equipamentos" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Badge</Label>
                  <Input value={form.badge_text} onChange={e => setForm(f => ({ ...f, badge_text: e.target.value }))} placeholder="NOVO" />
                </div>
                <div className="space-y-2">
                  <Label>Ordem</Label>
                  <Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Texto do Botão</Label>
                  <Input value={form.cta_text} onChange={e => setForm(f => ({ ...f, cta_text: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Link do Botão</Label>
                  <Input value={form.cta_link} onChange={e => setForm(f => ({ ...f, cta_link: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cor de Fundo</Label>
                  <div className="flex gap-2">
                    <Input type="color" value={form.bg_color} onChange={e => setForm(f => ({ ...f, bg_color: e.target.value }))} className="w-12 h-10 p-1" />
                    <Input value={form.bg_color} onChange={e => setForm(f => ({ ...f, bg_color: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cor do Texto</Label>
                  <div className="flex gap-2">
                    <Input type="color" value={form.text_color} onChange={e => setForm(f => ({ ...f, text_color: e.target.value }))} className="w-12 h-10 p-1" />
                    <Input value={form.text_color} onChange={e => setForm(f => ({ ...f, text_color: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Imagem de Fundo</Label>
                <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.is_active} onCheckedChange={v => setForm(f => ({ ...f, is_active: v }))} />
                <Label>Ativo</Label>
              </div>
              <Button className="w-full" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editing ? "Atualizar" : "Criar"} Banner
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Image className="w-5 h-5" />Banners ({banners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : banners.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Nenhum banner cadastrado. Crie o primeiro!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Badge</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ordem</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map(b => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.title}</TableCell>
                    <TableCell>{b.badge_text || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={b.is_active ? "default" : "secondary"}>{b.is_active ? "Ativo" : "Inativo"}</Badge>
                    </TableCell>
                    <TableCell>{b.sort_order}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(b)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBanners;
