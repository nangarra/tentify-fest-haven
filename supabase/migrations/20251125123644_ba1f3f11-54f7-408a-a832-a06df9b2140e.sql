-- Create a function to get real-time tent availability based on actual bookings
CREATE OR REPLACE FUNCTION public.get_tent_availability(p_festival text)
RETURNS TABLE(
  tent_type text,
  total_count integer,
  booked_count bigint,
  available_count integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    ti.tent_type,
    ti.total_count,
    COALESCE(COUNT(b.id) FILTER (WHERE b.status IN ('new', 'deposit_confirmed', 'confirmed')), 0) as booked_count,
    GREATEST(ti.total_count - COALESCE(COUNT(b.id) FILTER (WHERE b.status IN ('new', 'deposit_confirmed', 'confirmed')), 0)::integer, 0) as available_count
  FROM public.tent_inventory ti
  LEFT JOIN public.bookings b 
    ON b.meta->>'festival' = ti.festival 
    AND (b.meta->>'tentSize' = ti.tent_type OR 
         (b.meta->>'tentSize' = 'singel' AND ti.tent_type = 'medium-tent') OR
         (b.meta->>'tentSize' = 'dubbel' AND ti.tent_type = 'medium-plus'))
  WHERE ti.festival = p_festival
  GROUP BY ti.tent_type, ti.total_count, ti.festival
  ORDER BY ti.tent_type;
$$;

-- Update tent_inventory to use new tent type names (but keep old values for backward compatibility mapping)
-- We'll keep 'singel' and 'dubbel' as internal IDs for now to maintain backward compatibility with existing bookings

-- Reset the available_count to match actual bookings (one-time recount)
UPDATE public.tent_inventory ti
SET available_count = GREATEST(
  ti.total_count - (
    SELECT COUNT(*)::integer
    FROM public.bookings b
    WHERE b.meta->>'festival' = ti.festival
      AND b.meta->>'tentSize' = ti.tent_type
      AND b.status IN ('new', 'deposit_confirmed', 'confirmed')
  ), 0
)
WHERE ti.festival = 'sweden-rock';