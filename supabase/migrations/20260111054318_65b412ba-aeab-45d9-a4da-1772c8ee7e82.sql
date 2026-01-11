-- Drop the overly restrictive policy that is blocking admin access
DROP POLICY IF EXISTS "Public cannot view bookings" ON public.bookings;