-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM ('new', 'deposit_confirmed', 'confirmed', 'cancelled');

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status public.booking_status DEFAULT 'new' NOT NULL,
  deposit_confirmed BOOLEAN DEFAULT false NOT NULL,
  deposit_confirmed_at TIMESTAMP WITH TIME ZONE,
  admin_note TEXT,
  meta JSONB
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for booking form submissions)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users (admins) to view all bookings
CREATE POLICY "Authenticated users can view all bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users (admins) to update bookings
CREATE POLICY "Authenticated users can update bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users (admins) to delete bookings
CREATE POLICY "Authenticated users can delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (true);

-- Create trigger function to update updated_at
CREATE OR REPLACE FUNCTION public.update_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_bookings_updated_at();