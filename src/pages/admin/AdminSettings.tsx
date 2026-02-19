import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminSettings = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        data.forEach((s) => {
          if (s.key === "logo_url") setLogoUrl((s.value as any)?.url || "");
          if (s.key === "favicon_url") setFaviconUrl((s.value as any)?.url || "");
        });
      }
      setLoading(false);
    };
    load();
  }, []);

  const uploadFile = async (file: File, path: string) => {
    const { error } = await supabase.storage.from("site-assets").upload(path, file, { upsert: true });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from("site-assets").getPublicUrl(path);
    return publicUrl;
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSaving(true);
    try {
      const url = await uploadFile(file, `branding/logo.${file.name.split(".").pop()}`);
      setLogoUrl(url);
      await supabase.from("site_settings").upsert({ key: "logo_url", value: { url } }, { onConflict: "key" });
      toast.success("Logo atualizado!");
    } catch (err: any) {
      toast.error("Erro ao fazer upload", { description: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSaving(true);
    try {
      const url = await uploadFile(file, `branding/favicon.${file.name.split(".").pop()}`);
      setFaviconUrl(url);
      await supabase.from("site_settings").upsert({ key: "favicon_url", value: { url } }, { onConflict: "key" });
      toast.success("Favicon atualizado!");
    } catch (err: any) {
      toast.error("Erro ao fazer upload", { description: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Personalize a identidade visual da sua loja</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Upload className="w-5 h-5" />Logo</CardTitle>
            <CardDescription>Logo principal do site e loja</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {logoUrl && (
              <div className="w-40 h-20 border rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
              </div>
            )}
            <Input type="file" accept="image/*" onChange={handleLogoUpload} disabled={saving} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5" />Favicon</CardTitle>
            <CardDescription>Ícone exibido na aba do navegador</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {faviconUrl && (
              <div className="w-16 h-16 border rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <img src={faviconUrl} alt="Favicon" className="max-w-full max-h-full object-contain" />
              </div>
            )}
            <Input type="file" accept="image/*" onChange={handleFaviconUpload} disabled={saving} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
