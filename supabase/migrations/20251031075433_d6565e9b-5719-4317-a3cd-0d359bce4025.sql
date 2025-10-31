-- Temporarily allow public access to update/delete for admin panel
-- (Proper authentication should be added later for production use)

DROP POLICY IF EXISTS "Authenticated users can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can delete bookings" ON public.bookings;

-- Allow anyone to update bookings (temporary - add auth later)
CREATE POLICY "Anyone can update bookings"
ON public.bookings
FOR UPDATE
TO public
USING (true);

-- Allow anyone to delete bookings (temporary - add auth later)
CREATE POLICY "Anyone can delete bookings"
ON public.bookings
FOR DELETE
TO public
USING (true);