CREATE OR REPLACE FUNCTION public.protect_verified_booking_insert() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE base_price integer; max_guests integer; guests integer; extras integer := 0; item jsonb; unit_price integer; qty integer; expected_qty integer; per_person boolean; total integer; legacy_included integer;
BEGIN
  IF COALESCE(NEW.meta->>'pricingVersion','') <> '' AND NEW.meta->>'festival' = 'sweden-rock-2027' AND current_user <> 'service_role' AND current_user <> 'postgres' THEN
    RAISE EXCEPTION 'Nya bokningar måste verifieras på servern';
  END IF;
  IF NEW.meta->>'festival' = 'sweden-rock-2027' AND COALESCE(NEW.meta->>'pricingVersion','') = '' THEN
    IF NEW.meta->>'tentType' = 'medium' THEN base_price := 7900; max_guests := 3; legacy_included := 1;
    ELSIF NEW.meta->>'tentType' = 'deluxe' THEN base_price := 11900; max_guests := 4; legacy_included := 2;
    ELSE RAISE EXCEPTION 'Ogiltig tälttyp'; END IF;
    guests := (NEW.meta->>'guests')::integer;
    IF guests IS NULL OR guests < 1 OR guests > max_guests OR (NEW.meta->>'tentBasePrice')::integer IS DISTINCT FROM base_price THEN RAISE EXCEPTION 'Ogiltigt bokningsunderlag'; END IF;
    IF jsonb_typeof(NEW.meta->'addOns') IS DISTINCT FROM 'array' THEN RAISE EXCEPTION 'Ogiltiga tillval'; END IF;
    IF (SELECT count(*) FROM jsonb_array_elements(NEW.meta->'addOns')) <> (SELECT count(DISTINCT a->>'id') FROM jsonb_array_elements(NEW.meta->'addOns') a) THEN RAISE EXCEPTION 'Dubbla tillval'; END IF;
    FOR item IN SELECT value FROM jsonb_array_elements(NEW.meta->'addOns') LOOP
      per_person := false;
      CASE item->>'id'
        WHEN 'luxury-bed' THEN unit_price := 500;
        WHEN 'extra-bed' THEN unit_price := 500;
        WHEN 'bedding' THEN unit_price := 400; per_person := true;
        WHEN 'breakfast' THEN unit_price := 599; per_person := true;
        WHEN 'towel' THEN unit_price := 50; per_person := true;
        WHEN 'fridge' THEN unit_price := 500;
        WHEN 'comfort-pack' THEN unit_price := 499;
        WHEN 'festival-survival-pack' THEN unit_price := 499; per_person := true;
        ELSE RAISE EXCEPTION 'Ogiltigt tillval';
      END CASE;
      expected_qty := CASE WHEN per_person THEN guests ELSE 1 END;
      qty := (item->>'qty')::integer;
      IF qty IS DISTINCT FROM expected_qty OR (item->>'unitPrice')::integer IS DISTINCT FROM unit_price OR (item->>'total')::integer IS DISTINCT FROM unit_price * qty THEN RAISE EXCEPTION 'Ogiltigt tillvalspris'; END IF;
      extras := extras + unit_price * qty;
    END LOOP;
    total := (NEW.meta->>'totalPrice')::integer;
    IF total IS NULL OR total NOT IN (base_price + GREATEST(guests - 1, 0) * 500 + extras, base_price + GREATEST(guests - legacy_included, 0) * 850 + extras) THEN RAISE EXCEPTION 'Ogiltigt totalpris'; END IF;
    IF (NEW.meta->>'deposit')::integer IS DISTINCT FROM round(total * 0.2)::integer THEN RAISE EXCEPTION 'Ogiltigt förskott'; END IF;
  END IF;
  RETURN NEW;
END;
$$;