
-- Roles enum and user_roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Promotional banners table
CREATE TABLE public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  badge_text TEXT,
  cta_text TEXT DEFAULT 'Ver Ofertas',
  cta_link TEXT DEFAULT '/loja',
  bg_color TEXT DEFAULT '#1a5276',
  text_color TEXT DEFAULT '#ffffff',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Anyone can read active banners (public storefront)
CREATE POLICY "Anyone can view active banners"
ON public.banners FOR SELECT
USING (is_active = true);

-- Admins can manage banners
CREATE POLICY "Admins can insert banners"
ON public.banners FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update banners"
ON public.banners FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete banners"
ON public.banners FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can also see inactive banners
CREATE POLICY "Admins can view all banners"
ON public.banners FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Site settings table (for logos, payment config, etc.)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

CREATE POLICY "Anyone can view site assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

CREATE POLICY "Admins can upload site assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_banners_updated_at
BEFORE UPDATE ON public.banners
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
