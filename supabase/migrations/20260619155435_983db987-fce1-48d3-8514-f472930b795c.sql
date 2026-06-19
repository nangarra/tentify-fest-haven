
-- 1) Tighten public INSERT policies with input validation
DROP POLICY IF EXISTS "Public can create bookings" ON public.bookings;
CREATE POLICY "Public can create bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(phone) BETWEEN 3 AND 50
  AND char_length(message) BETWEEN 1 AND 5000
);

DROP POLICY IF EXISTS "Public can create waitlist entries" ON public.waitlist;
CREATE POLICY "Public can create waitlist entries"
ON public.waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(phone) BETWEEN 3 AND 50
  AND char_length(festival) BETWEEN 1 AND 100
);

-- 2) Explicit deny policies on user_roles to prevent privilege escalation
CREATE POLICY "No client inserts on user_roles"
ON public.user_roles
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "No client updates on user_roles"
ON public.user_roles
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No client deletes on user_roles"
ON public.user_roles
FOR DELETE
TO anon, authenticated
USING (false);

-- 3) get_tent_availability only reads public-readable data; switch to INVOKER
ALTER FUNCTION public.get_tent_availability(text) SECURITY INVOKER;

-- 4) Restrict EXECUTE on remaining SECURITY DEFINER functions
REVOKE ALL ON FUNCTION public.decrease_tent_inventory(text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.decrease_tent_inventory(text, text) TO service_role;

REVOKE ALL ON FUNCTION public.update_bookings_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_bookings_updated_at() TO service_role;

-- has_role is used inside RLS policies; keep EXECUTE for authenticated, revoke from anon and public
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
