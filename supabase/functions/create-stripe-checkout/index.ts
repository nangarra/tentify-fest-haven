import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import Stripe from 'npm:stripe@17.5.0';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { savedDeposit, calculateBooking, PRICING_VERSION } from '../_shared/booking-pricing.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      return new Response(
        JSON.stringify({ error: 'STRIPE_SECRET_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const body = await req.json();
    const {
      bookingId,
      paymentToken,
      amount, // integer SEK (deposit amount)
      currency = 'sek',
      description,
      customerEmail,
      successUrl,
      cancelUrl,
    } = body ?? {};

    if (
      !bookingId ||
      typeof amount !== 'number' ||
      amount <= 0 ||
      !description ||
      !successUrl ||
      !cancelUrl
    ) {
      return new Response(
        JSON.stringify({ error: 'Invalid payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' });
    const dbUrl = Deno.env.get('SUPABASE_URL');
    const dbKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!dbUrl || !dbKey) throw new Error('Betalningen är tillfälligt otillgänglig.');
    const db = createClient(dbUrl, dbKey);
    const { data: booking, error: bookingError } = await db.from('bookings').select('meta,email,status').eq('id', bookingId).single();
    if (bookingError || !booking || booking.status === 'cancelled') throw new Error('Ogiltigt bokningsunderlag.');
    const meta = booking.meta ?? {};
    if (meta.pricingVersion === PRICING_VERSION) {
      if (!paymentToken || paymentToken !== meta.paymentToken) throw new Error('Ogiltigt betalningsunderlag.');
      const verified = calculateBooking(meta.tentType, meta.guests, (meta.addOns ?? []).map((a: { id: string }) => a.id));
      if (verified.totalPrice !== meta.totalPrice) throw new Error('Ogiltigt bokningspris.');
    }
    const verifiedAmount = savedDeposit(meta);
    if (amount !== verifiedAmount) throw new Error('Betalningsbeloppet stämmer inte med bokningen.');
    const allowed = (value: string) => {
      const parsed = new URL(value);
      const origin = req.headers.get('origin');
      const allowedHost = parsed.hostname === 'tentify.se' || parsed.hostname === 'www.tentify.se' ||
        parsed.hostname === 'tentify-fest-haven.lovable.app' ||
        parsed.hostname === 'id-preview--28d4af79-d39e-43d1-91d7-9c68d8d777fc.lovable.app' ||
        (parsed.hostname === 'localhost' && parsed.port === '8080');
      return allowedHost && parsed.origin === origin && parsed.pathname === '/booking/sweden-rock-2027';
    };
    if (!allowed(successUrl) || !allowed(cancelUrl)) throw new Error('Ogiltig returadress.');

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: booking.email,
      line_items: [
        {
          price_data: {
            currency: 'sek',
            product_data: {
              name: `${meta.event ?? 'Tentify'} – ${meta.tentName ?? 'Glamping'} (20% förskott)`,
              description: `Bokning ${String(bookingId).slice(0, 8).toUpperCase()}`,
            },
            unit_amount: Math.round(verifiedAmount * 100), // saved deposit in öre
          },
          quantity: 1,
        },
      ],
      success_url: `${successUrl}${successUrl.includes('?') ? '&' : '?'}stripe=success&booking=${bookingId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cancelUrl}${cancelUrl.includes('?') ? '&' : '?'}stripe=cancel&booking=${bookingId}`,
      metadata: { bookingId },
    }, { idempotencyKey: `tentify-advance-${bookingId}` });

    return new Response(
      JSON.stringify({ url: session.url, id: session.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    console.error('create-stripe-checkout error', e);
    return new Response(
      JSON.stringify({ error: (e as Error).message ?? 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
