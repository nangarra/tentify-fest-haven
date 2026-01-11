-- Add explicit RESTRICTIVE SELECT policy to deny public access to bookings
-- This is a defense-in-depth measure to ensure public users cannot view bookings
CREATE POLICY "Public cannot view bookings" 
ON public.bookings 
AS RESTRICTIVE
FOR SELECT 
TO public 
USING (false);