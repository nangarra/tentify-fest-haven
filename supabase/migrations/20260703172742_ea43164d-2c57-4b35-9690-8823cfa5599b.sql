
ALTER TABLE public.tent_inventory DROP CONSTRAINT IF EXISTS tent_inventory_tent_type_check;
ALTER TABLE public.tent_inventory ADD CONSTRAINT tent_inventory_tent_type_check 
  CHECK (tent_type = ANY (ARRAY['singel'::text, 'dubbel'::text, 'medium'::text, 'medium-extra'::text, 'deluxe'::text]));

INSERT INTO public.tent_inventory (festival, tent_type, total_count, available_count)
VALUES 
  ('sweden-rock-2027', 'medium', 10, 10),
  ('sweden-rock-2027', 'deluxe', 10, 10)
ON CONFLICT DO NOTHING;
