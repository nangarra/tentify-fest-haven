-- Update RLS policies to allow public read access for admin panel
-- (Authentication can be added later when needed)

DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON public.bookings;

-- Allow anyone to view bookings (for admin panel)
CREATE POLICY "Anyone can view bookings"
ON public.bookings
FOR SELECT
TO public
USING (true);

-- Keep update/delete for authenticated users (for future auth setup)
-- These policies are already in place from the first migration