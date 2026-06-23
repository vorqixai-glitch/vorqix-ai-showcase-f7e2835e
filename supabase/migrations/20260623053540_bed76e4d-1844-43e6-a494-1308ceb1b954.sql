
-- Restrict EXECUTE on SECURITY DEFINER helpers (they're only used internally)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Tighten bookings insert: anon must leave user_id NULL; auth must use own id
DROP POLICY "Bookings: anyone can create" ON public.bookings;
CREATE POLICY "Bookings: anon create" ON public.bookings
  FOR INSERT TO anon
  WITH CHECK (user_id IS NULL);
CREATE POLICY "Bookings: auth create" ON public.bookings
  FOR INSERT TO authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());
