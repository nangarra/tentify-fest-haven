import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import Stripe from 'npm:stripe@17.5.0';

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

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: description,
              description: `Förskott 20% – Bokning ${String(bookingId).slice(0, 8).toUpperCase()}`,
            },
            unit_amount: Math.round(amount * 100), // to öre
          },
          quantity: 1,
        },
      ],
      success_url: `${successUrl}${successUrl.includes('?') ? '&' : '?'}stripe=success&booking=${bookingId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cancelUrl}${cancelUrl.includes('?') ? '&' : '?'}stripe=cancel&booking=${bookingId}`,
      metadata: { bookingId },
    });

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
