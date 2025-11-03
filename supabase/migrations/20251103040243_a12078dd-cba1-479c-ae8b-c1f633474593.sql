-- Create function to decrease tent inventory
CREATE OR REPLACE FUNCTION public.decrease_tent_inventory(
  p_festival TEXT,
  p_tent_type TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.tent_inventory
  SET available_count = GREATEST(available_count - 1, 0)
  WHERE festival = p_festival 
    AND tent_type = p_tent_type;
END;
$$;