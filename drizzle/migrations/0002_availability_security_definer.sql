ALTER FUNCTION public.get_tent_availability(text) SECURITY DEFINER;
GRANT EXECUTE ON FUNCTION public.get_tent_availability(text) TO anon, authenticated, service_role;