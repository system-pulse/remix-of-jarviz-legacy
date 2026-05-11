CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  photo_url TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "testimonials_public_read" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "testimonials_public_insert" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "testimonials_public_update" ON public.testimonials FOR UPDATE USING (true);
CREATE POLICY "testimonials_public_delete" ON public.testimonials FOR DELETE USING (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('testimonial-photos', 'testimonial-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "testimonial_photos_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'testimonial-photos');
CREATE POLICY "testimonial_photos_public_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'testimonial-photos');
CREATE POLICY "testimonial_photos_public_update" ON storage.objects FOR UPDATE USING (bucket_id = 'testimonial-photos');
CREATE POLICY "testimonial_photos_public_delete" ON storage.objects FOR DELETE USING (bucket_id = 'testimonial-photos');

INSERT INTO public.testimonials (name, role, quote, rating, photo_url, featured, sort_order) VALUES
('Rajesh M.', 'Academic Director, Sunrise Institute', 'They delivered our entire college website in under 10 days. Clean, fast, and no unnecessary back-and-forth.', 5, '', true, 1),
('Priya S.', 'Owner, GreenLeaf Kitchen', 'Our QR menu system increased table turnover by 20%. Jarviz Solutions actually understood what we needed.', 5, '', true, 2),
('Arun K.', 'Founder, UrbanCraft Studio', 'Professional team. They built exactly what we asked for and didn''t overcomplicate anything.', 5, '', true, 3);
