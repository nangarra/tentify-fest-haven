import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { calculateBooking, assertQuotedTotal, PRICING_VERSION } from "../_shared/booking-pricing.ts";

Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const respond = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
    status, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
  try {
    const body = await req.json();
    if (body.pricingVersion !== PRICING_VERSION || body.termsAccepted !== true) {
      return respond({ error: "Bokningsvillkoren måste godkännas och prisversionen vara giltig." }, 400);
    }
    const quote = calculateBooking(body.tentType, body.guests, body.addOnIds);
    assertQuotedTotal(quote, body.totalPrice);
    const { customer } = body;
    for (const key of ["firstName", "lastName", "email", "phone", "address", "postalCode", "city"]) {
      if (typeof customer?.[key] !== "string" || !customer[key].trim() || customer[key].length > 320) {
        return respond({ error: "Fyll i giltiga kunduppgifter." }, 400);
      }
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer.email) || customer.phone.length > 50 ||
        !["swish", "stripe"].includes(body.paymentMethod)) {
      return respond({ error: "Kontrollera e-post, telefon och betalsätt." }, 400);
    }
    const name = `${customer.firstName.trim()} ${customer.lastName.trim()}`;
    if (name.length > 200) return respond({ error: "Namnet är för långt." }, 400);
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) throw new Error("Bokningen är tillfälligt otillgänglig.");
    const db = createClient(url, key);
    const id = crypto.randomUUID();
    const paymentToken = crypto.randomUUID();
    const meta = {
      ...quote, festival: "sweden-rock-2027", event: "Sweden Rock Festival 2027",
      address: { country: customer.country ?? "Sverige", address: customer.address, postalCode: customer.postalCode, city: customer.city },
      paymentOption: body.paymentMethod === "stripe" ? "stripe_advance" : "swish_advance",
      paymentMethod: body.paymentMethod,
      paymentStatus: body.paymentMethod === "stripe" ? "awaiting_stripe" : "awaiting_swish",
      bookingStatus: "pending_confirmation", language: "sv", termsAccepted: true,
      termsAcceptedAt: new Date().toISOString(), paymentToken,
      eventDates: `${quote.checkIn} – ${quote.checkOut}`,
    };
    const message = `Sweden Rock Festival 2027\nTält: ${quote.tentName}\nGäster: ${quote.guests}\nPlats: ${quote.location}\nIncheckning: ${quote.checkIn}\nUtcheckning: ${quote.checkOut}\nNätter: ${quote.nights}\nTillval: ${quote.addOns.map(a => `${a.name} (${a.total} kr)`).join(", ") || "Inga"}\nTotalt: ${quote.totalPrice} kr\nFörskott 20%: ${quote.deposit} kr\nBetalmetod: ${body.paymentMethod === "stripe" ? "Kort" : "Swish"}`;
    const { error } = await db.rpc("create_verified_festival_booking", {
      p_id: id, p_name: name, p_email: customer.email.trim(), p_phone: customer.phone.trim(), p_message: message, p_meta: meta,
    });
    if (error) return respond({ error: error.message.includes("slutsålt") ? "Tältet är slutsålt. Välj ett annat tält." : "Kunde inte spara bokningen. Försök igen." }, 400);
    return respond({ bookingId: id, paymentToken, quote });
  } catch (e) {
    return respond({ error: e instanceof Error ? e.message : "Kunde inte skapa bokningen." }, 400);
  }
});