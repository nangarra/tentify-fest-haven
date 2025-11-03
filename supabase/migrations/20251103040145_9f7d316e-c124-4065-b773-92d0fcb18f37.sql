-- Create inventory table for tent availability
CREATE TABLE public.tent_inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  festival TEXT NOT NULL,
  tent_type TEXT NOT NULL CHECK (tent_type IN ('singel', 'dubbel')),
  available_count INTEGER NOT NULL DEFAULT 0 CHECK (available_count >= 0),
  total_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(festival, tent_type)
);

-- Enable Row Level Security
ALTER TABLE public.tent_inventory ENABLE ROW LEVEL SECURITY;

-- Public can view inventory (needed for booking form)
CREATE POLICY "Anyone can view tent inventory"
ON public.tent_inventory
FOR SELECT
USING (true);

-- Only admins can update inventory
CREATE POLICY "Admins can update inventory"
ON public.tent_inventory
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert inventory
CREATE POLICY "Admins can insert inventory"
ON public.tent_inventory
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger to update updated_at
CREATE TRIGGER update_tent_inventory_updated_at
BEFORE UPDATE ON public.tent_inventory
FOR EACH ROW
EXECUTE FUNCTION public.update_bookings_updated_at();

-- Insert initial inventory for Sweden Rock
INSERT INTO public.tent_inventory (festival, tent_type, available_count, total_count)
VALUES 
  ('sweden-rock', 'singel', 5, 5),
  ('sweden-rock', 'dubbel', 4, 4);