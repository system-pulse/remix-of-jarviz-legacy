CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "submissions_public_insert"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "submissions_public_read"
  ON public.contact_submissions FOR SELECT
  USING (true);

CREATE POLICY "submissions_public_update"
  ON public.contact_submissions FOR UPDATE
  USING (true);

CREATE POLICY "submissions_public_delete"
  ON public.contact_submissions FOR DELETE
  USING (true);

CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);
CREATE INDEX idx_contact_submissions_is_read ON public.contact_submissions (is_read);