-- Create waitlist table for Sweden Rock
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  festival TEXT NOT NULL DEFAULT 'sweden-rock',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  contacted BOOLEAN NOT NULL DEFAULT false,
  contacted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Public can add themselves to waitlist
CREATE POLICY "Public can create waitlist entries"
ON public.waitlist
FOR INSERT
WITH CHECK (true);

-- Admins can view all waitlist entries
CREATE POLICY "Admins can view all waitlist entries"
ON public.waitlist
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update waitlist entries
CREATE POLICY "Admins can update waitlist entries"
ON public.waitlist
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete waitlist entries
CREATE POLICY "Admins can delete waitlist entries"
ON public.waitlist
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));