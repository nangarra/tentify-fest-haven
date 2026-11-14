CREATE OR REPLACE FUNCTION public.create_verified_festival_booking(p_id uuid, p_name text, p_email text, p_phone text, p_message text, p_meta jsonb)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE available integer;
BEGIN
  IF p_meta->>'pricingVersion' <> 'sweden-rock-2027-v2' OR p_meta->>'festival' <> 'sweden-rock-2027' THEN
    RAISE EXCEPTION 'Ogiltigt bokningsunderlag';
  END IF;
  PERFORM 1 FROM public.tent_inventory WHERE festival = 'sweden-rock-2027' AND tent_type = p_meta->>'tentType' FOR UPDATE;
  SELECT a.available_count INTO available FROM public.get_tent_availability('sweden-rock-2027') a WHERE a.tent_type = p_meta->>'tentType';
  IF available IS NULL OR available <= 0 THEN RAISE EXCEPTION 'Tältet är slutsålt'; END IF;
  INSERT INTO public.bookings(id, name, email, phone, message, meta) VALUES(p_id, p_name, p_email, p_phone, p_message, p_meta);
END;
$$;
REVOKE ALL ON FUNCTION public.create_verified_festival_booking(uuid,text,text,text,text,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_verified_festival_booking(uuid,text,text,text,text,jsonb) TO service_role;
CREATE OR REPLACE FUNCTION public.protect_verified_booking_insert() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.meta->>'pricingVersion' = 'sweden-rock-2027-v2' AND current_user <> 'service_role' AND current_user <> 'postgres' THEN
    RAISE EXCEPTION 'Nya bokningar måste verifieras på servern';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER verify_new_festival_booking BEFORE INSERT ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.protect_verified_booking_insert();