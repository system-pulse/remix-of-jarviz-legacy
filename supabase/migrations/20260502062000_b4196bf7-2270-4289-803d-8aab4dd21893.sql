
-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tag TEXT NOT NULL DEFAULT 'PROJECT',
  client TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  project_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "projects_public_read" ON public.projects FOR SELECT USING (true);
-- Open write (admin gate is client-side hardcoded password as user requested)
CREATE POLICY "projects_public_insert" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "projects_public_update" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "projects_public_delete" ON public.projects FOR DELETE USING (true);

-- Site settings (singleton: id='main') including How We Work stack
CREATE TABLE public.site_settings (
  id TEXT PRIMARY KEY,
  how_we_work JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings_public_insert" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "settings_public_update" ON public.site_settings FOR UPDATE USING (true);

INSERT INTO public.site_settings (id, how_we_work) VALUES (
  'main',
  '[
    {"tag":"DESIGN","text":"Figma → Clean, functional UI"},
    {"tag":"BUILD","text":"React + Tailwind → Fast, modern code"},
    {"tag":"DEPLOY","text":"Vercel/Netlify → Live in hours"},
    {"tag":"SUPPORT","text":"Always on → Post-launch help"}
  ]'::jsonb
);

-- Storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

CREATE POLICY "project_images_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "project_images_public_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images');
CREATE POLICY "project_images_public_update" ON storage.objects FOR UPDATE USING (bucket_id = 'project-images');
CREATE POLICY "project_images_public_delete" ON storage.objects FOR DELETE USING (bucket_id = 'project-images');
