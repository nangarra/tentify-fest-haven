DROP POLICY IF EXISTS "Public can create bookings" ON public.bookings;
CREATE POLICY "Public can create bookings" ON public.bookings
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  AND char_length(phone) BETWEEN 3 AND 50
  AND char_length(message) BETWEEN 1 AND 5000
);