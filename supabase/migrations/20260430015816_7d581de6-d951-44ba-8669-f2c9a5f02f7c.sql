-- Allow the new tent batch type
ALTER TABLE public.tent_inventory DROP CONSTRAINT IF EXISTS tent_inventory_tent_type_check;
ALTER TABLE public.tent_inventory
  ADD CONSTRAINT tent_inventory_tent_type_check
  CHECK (tent_type = ANY (ARRAY['singel'::text, 'dubbel'::text, 'medium-extra'::text]));

-- Add release_at column
ALTER TABLE public.tent_inventory
  ADD COLUMN IF NOT EXISTS release_at timestamptz;

-- Insert the new batch (08:00 Europe/Stockholm = 06:00 UTC during CEST)
INSERT INTO public.tent_inventory (festival, tent_type, total_count, available_count, release_at)
VALUES ('sweden-rock', 'medium-extra', 5, 5, '2026-05-01 06:00:00+00')
ON CONFLICT (festival, tent_type) DO UPDATE
  SET total_count = EXCLUDED.total_count,
      release_at = EXCLUDED.release_at;

-- Recreate availability function with release_at and batch-aware counting
DROP FUNCTION IF EXISTS public.get_tent_availability(text);

CREATE FUNCTION public.get_tent_availability(p_festival text)
 RETURNS TABLE(tent_type text, total_count integer, booked_count bigint, available_count integer, release_at timestamptz)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT 
    ti.tent_type,
    ti.total_count,
    COALESCE(COUNT(b.id) FILTER (WHERE b.status IN ('new', 'deposit_confirmed', 'confirmed')), 0) as booked_count,
    GREATEST(ti.total_count - COALESCE(COUNT(b.id) FILTER (WHERE b.status IN ('new', 'deposit_confirmed', 'confirmed')), 0)::integer, 0) as available_count,
    ti.release_at
  FROM public.tent_inventory ti
  LEFT JOIN public.bookings b 
    ON b.meta->>'festival' = ti.festival 
    AND (
      (COALESCE(b.meta->>'tentBatch','') = '' AND b.meta->>'tentSize' = 'singel' AND ti.tent_type IN ('singel','medium-tent')) OR
      (COALESCE(b.meta->>'tentBatch','') = '' AND b.meta->>'tentSize' = 'dubbel' AND ti.tent_type IN ('dubbel','medium-plus')) OR
      (b.meta->>'tentBatch' = ti.tent_type)
    )
  WHERE ti.festival = p_festival
  GROUP BY ti.tent_type, ti.total_count, ti.festival, ti.release_at
  ORDER BY ti.tent_type;
$function$;