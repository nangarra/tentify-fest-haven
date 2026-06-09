ALTER TABLE public.tent_inventory DROP CONSTRAINT IF EXISTS tent_inventory_tent_type_check;
ALTER TABLE public.tent_inventory ADD CONSTRAINT tent_inventory_tent_type_check
  CHECK (tent_type = ANY (ARRAY['singel'::text, 'dubbel'::text, 'medium-extra'::text, 'deluxe'::text]));

INSERT INTO public.tent_inventory (festival, tent_type, total_count, available_count)
VALUES ('clsr-boutique-2026', 'deluxe', 9, 9)
ON CONFLICT (festival, tent_type) DO NOTHING;