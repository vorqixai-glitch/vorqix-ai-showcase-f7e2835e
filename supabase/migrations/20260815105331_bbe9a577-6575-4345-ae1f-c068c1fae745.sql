CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Leads: anon create" ON public.leads;
CREATE POLICY "Leads: anon create" ON public.leads FOR INSERT TO anon WITH CHECK (user_id IS NULL);
DROP POLICY IF EXISTS "Leads: auth create" ON public.leads;
CREATE POLICY "Leads: auth create" ON public.leads FOR INSERT TO authenticated WITH CHECK (user_id IS NULL OR user_id = auth.uid());
DROP POLICY IF EXISTS "Leads: admins read" ON public.leads;
CREATE POLICY "Leads: admins read" ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
DROP POLICY IF EXISTS "Leads: admins update" ON public.leads;
CREATE POLICY "Leads: admins update" ON public.leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
DROP POLICY IF EXISTS "Leads: admins delete" ON public.leads;
CREATE POLICY "Leads: admins delete" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.newsletter_subscribers TO anon;
GRANT SELECT, INSERT, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Newsletter: anyone subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Newsletter: anyone subscribe" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Newsletter: admins read" ON public.newsletter_subscribers;
CREATE POLICY "Newsletter: admins read" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
DROP POLICY IF EXISTS "Newsletter: admins delete" ON public.newsletter_subscribers;
CREATE POLICY "Newsletter: admins delete" ON public.newsletter_subscribers FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));