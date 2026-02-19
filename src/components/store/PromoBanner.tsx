import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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
}

const PromoBanner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("banners")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (data && data.length > 0) setBanners(data);
    };
    load();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => setCurrent(c => (c + 1) % banners.length), 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) {
    // Default fallback banner
    return (
      <section className="bg-gradient-to-r from-accent to-primary py-4">
        <div className="section-container flex items-center justify-center gap-3 text-primary-foreground">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <p className="text-sm md:text-base font-semibold">
            🔥 Ofertas especiais em equipamentos médicos e odontológicos! Fale conosco.
          </p>
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
      </section>
    );
  }

  const banner = banners[current];

  return (
    <section
      className="relative overflow-hidden py-4 md:py-5 transition-all duration-500"
      style={{
        backgroundColor: banner.bg_color || "hsl(210, 100%, 55%)",
        color: banner.text_color || "#ffffff",
      }}
    >
      {banner.image_url && (
        <div className="absolute inset-0">
          <img src={banner.image_url} alt="" className="w-full h-full object-cover opacity-30" />
        </div>
      )}
      <div className="section-container relative flex items-center justify-between gap-4">
        {banners.length > 1 && (
          <button onClick={() => setCurrent(c => (c - 1 + banners.length) % banners.length)} className="p-1 opacity-70 hover:opacity-100 transition-opacity">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <div className="flex-1 flex items-center justify-center gap-3 text-center">
          {banner.badge_text && (
            <Badge className="bg-white/20 text-inherit border-white/30 text-xs font-bold">
              {banner.badge_text}
            </Badge>
          )}
          <div>
            <p className="text-sm md:text-base font-bold">{banner.title}</p>
            {banner.subtitle && <p className="text-xs md:text-sm opacity-80">{banner.subtitle}</p>}
          </div>
          {banner.cta_text && banner.cta_link && (
            <Link to={banner.cta_link}>
              <Button size="sm" variant="secondary" className="text-xs font-bold whitespace-nowrap">
                {banner.cta_text}
              </Button>
            </Link>
          )}
        </div>
        {banners.length > 1 && (
          <button onClick={() => setCurrent(c => (c + 1) % banners.length)} className="p-1 opacity-70 hover:opacity-100 transition-opacity">
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  );
};

export default PromoBanner;
