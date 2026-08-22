import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Calendar,
  MapPin,
  Users,
  Check,
  Plus,
  Minus,
  X,
  BedDouble,
  Bed,
  Coffee,
  Bath,
  Refrigerator,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  Info,
  Package,
  Backpack,
  Moon,
  Clock,
  Wrench,
  Car,


} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  getFestival,
  type AddOnType,
  type FestivalConfig,
  type Lang,
  type TentType,
} from "@/config/festivals";
import { t } from "@/lib/booking-i18n";
import { PAYMENT_INFO } from "@/config/payment-info";
import srLogo from "@/assets/glamping_Swedenrock_tentify_2027.webp.asset.json";

const addOnIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "luxury-bed": BedDouble,
  "extra-bed": Bed,
  bedding: Sparkles,
  breakfast: Coffee,
  towel: Bath,
  fridge: Refrigerator,
  "comfort-pack": Package,
  "festival-survival-pack": Backpack,
};


const fmt = (n: number, currency: string) =>
  `${n.toLocaleString("sv-SE")} ${currency}`;

type Step = "booking" | "checkout" | "confirmation";

const LanguageToggle = ({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) => (
  <div className="inline-flex rounded-full border bg-background/90 backdrop-blur-sm p-0.5 text-xs">
    {(["sv", "en"] as Lang[]).map((l) => (
      <button
        key={l}
        onClick={() => onChange(l)}
        className={`px-3 py-1 rounded-full font-medium transition ${
          lang === l ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
        }`}
      >
        {l === "sv" ? "Svenska" : "English"}
      </button>
    ))}
  </div>
);

const EventBookingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const festival = slug ? getFestival(slug) : undefined;

  if (!festival) return <Navigate to="/" replace />;

  return <BookingFlow festival={festival} />;
};

export const BookingFlow = ({ festival }: { festival: FestivalConfig }) => {
  const [lang, setLang] = useState<Lang>("sv");
  const [step, setStep] = useState<Step>("booking");
  const [selectedTentId, setSelectedTentId] = useState<string | null>(
    festival.tents.find((tt) => tt.id === "medium")?.id ?? festival.tents[0]?.id ?? null,
  );
  const [guests, setGuests] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());

  // Per-tent-type real availability from backend.
  const initialAvailability = useMemo(() => {
    const rec: Record<string, number> = {};
    festival.tents.forEach((tt) => {
      rec[tt.id] = tt.totalCount ?? 0;
    });
    return rec;
  }, [festival]);
  const [availabilityByType, setAvailabilityByType] =
    useState<Record<string, number>>(initialAvailability);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Sverige");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"swish" | "stripe">("swish");

  const checkoutTopRef = useRef<HTMLDivElement | null>(null);
  const confirmationTopRef = useRef<HTMLDivElement | null>(null);

  const smoothScrollTo = (el: HTMLElement | null) => {
    if (!el) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    });
  };

  const goToCheckout = () => {
    setStep("checkout");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => smoothScrollTo(checkoutTopRef.current));
    });
  };



  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("get_tent_availability", {
        p_festival: festival.id,
      });
      if (Array.isArray(data) && data.length) {
        const rec: Record<string, number> = { ...initialAvailability };
        (data as any[]).forEach((r) => {
          if (r.tent_type in rec) {
            rec[r.tent_type] = Math.max(0, r.available_count ?? 0);
          }
        });
        setAvailabilityByType(rec);
      }
    })();
  }, [festival.id, initialAvailability]);


  // Social-proof fake bookings: show 3 booked in the header, but never block real customers.
  const FAKE_BOOKED = 3;
  const realAvailable = Object.values(availabilityByType).reduce((s, n) => s + n, 0);
  const realBookings = festival.totalTents - realAvailable;
  const displayBooked =
    realBookings < festival.totalTents - FAKE_BOOKED
      ? realBookings + FAKE_BOOKED
      : realBookings;
  const available = festival.totalTents - displayBooked;
  const soldOut = realAvailable <= 0;
  const soldOutByType: Record<string, boolean> = {};
  festival.tents.forEach((tt) => {
    soldOutByType[tt.id] = (availabilityByType[tt.id] ?? 0) <= 0;
  });

  useEffect(() => {
    document.title = `${festival.displayTitle[lang]} | Tentify`;
  }, [festival, lang]);

  const selectedTent = useMemo(
    () => festival.tents.find((x) => x.id === selectedTentId) ?? null,
    [selectedTentId, festival],
  );
  const maxGuests = selectedTent?.maxGuests ?? 4;

  useEffect(() => {
    if (guests > maxGuests) setGuests(maxGuests);
  }, [maxGuests, guests]);

  const extraGuestsCost = Math.max(0, guests - 1) * festival.extraGuestPrice;
  const addOnLines = useMemo(
    () =>
      festival.addOns
        .filter((a) => selectedAddOns.has(a.id))
        .map((a) => ({
          addOn: a,
          total: a.perPerson ? a.price * guests : a.price,
        })),
    [selectedAddOns, guests, festival],
  );
  const addOnsTotal = addOnLines.reduce((s, l) => s + l.total, 0);
  const tentPrice = selectedTent?.price ?? 0;
  const total = tentPrice + extraGuestsCost + addOnsTotal;
  const depositAmount = Math.round(total * 0.2); // 20% förskott via Swish

  const canCheckout = !!selectedTent && guests > 0 && !soldOut;
  const canConfirm =
    canCheckout &&
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    phone.trim() &&
    address.trim() &&
    postalCode.trim() &&
    city.trim();

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const remainingAmount = total - depositAmount;

  const handleConfirm = async () => {
    if (!canConfirm || !selectedTent) return;

    // Re-check availability just before saving so we don't oversell.
    try {
      const { data: latest } = await supabase.rpc("get_tent_availability", {
        p_festival: festival.id,
      });
      const row = Array.isArray(latest)
        ? (latest as any[]).find((r) => r.tent_type === selectedTent.id)
        : null;
      if (row && (row.available_count ?? 0) <= 0) {
        toast.error(t("soldOutTypeError", lang));
        // Refresh local availability
        if (Array.isArray(latest)) {
          const rec = { ...availabilityByType };
          (latest as any[]).forEach((r) => {
            if (r.tent_type in rec) rec[r.tent_type] = Math.max(0, r.available_count ?? 0);
          });
          setAvailabilityByType(rec);
        }
        return;
      }
    } catch (e) {
      console.error(e);
    }

    setIsSubmitting(true);
    try {
      const addOnMeta = addOnLines.map((l) => ({
        id: l.addOn.id,
        name: l.addOn.name.sv,
        qty: l.addOn.perPerson ? guests : 1,
        unitPrice: l.addOn.price,
        total: l.total,
      }));
      const message =
        `${festival.name}\n` +
        `Tält: ${selectedTent.name.sv} (${selectedTent.size})\n` +
        `Gäster: ${guests}\n` +
        `Incheckning: ${festival.checkIn.sv}\nUtcheckning: ${festival.checkOut.sv}\n` +
        `Nätter: ${festival.nights}\n` +
        `Tillval: ${addOnLines.map((l) => `${l.addOn.name.sv} (${l.total} kr)`).join(", ") || "Inga"}\n` +
        `Totalt: ${total} kr\n` +
        `Förskott 20%: ${depositAmount} kr\n` +
        `Betalmetod: ${paymentMethod === "stripe" ? "Kort (Stripe)" : "Swish"}\n` +
        `Status: ${paymentMethod === "stripe" ? "Väntar på kortbetalning" : "Väntar på Swish-betalning (manuell bekräftelse)"}`;

      const newBookingId = crypto.randomUUID();
      const { error } = await supabase
        .from("bookings")
        .insert({
          id: newBookingId,
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          message,
          meta: {
            festival: festival.id,
            event: festival.name,
            tentType: selectedTent.id,
            tentBatch: selectedTent.id,
            tentName: selectedTent.name.sv,
            tentBasePrice: selectedTent.price,
            guests,
            extraGuestsCost,
            addOns: addOnMeta,
            addOnsTotal,
            totalPrice: total,
            deposit: depositAmount,
            depositPercent: 20,
            remainingAmount: total - depositAmount,
            paymentOption: paymentMethod === "stripe" ? "stripe_advance" : "swish_advance",
            paymentMethod,
            paymentStatus: paymentMethod === "stripe" ? "awaiting_stripe" : "awaiting_swish",
            bookingStatus: "pending_confirmation",
            checkIn: festival.checkIn.sv,
            checkOut: festival.checkOut.sv,
            nights: festival.nights,
            address: { country, address, postalCode, city },
            eventDates: `${festival.checkIn.sv} – ${festival.checkOut.sv}`,
            language: lang,
          },
        });
      if (error) throw error;
      setBookingId(newBookingId);

      await supabase.rpc("decrease_tent_inventory", {
        p_festival: festival.id,
        p_tent_type: selectedTent.id,
      });
      setAvailabilityByType((prev) => ({
        ...prev,
        [selectedTent.id]: Math.max(0, (prev[selectedTent.id] ?? 0) - 1),
      }));

      if (paymentMethod === "stripe") {
        const origin = window.location.origin;
        console.log("[stripe] invoking edge function", { newBookingId, depositAmount });
        try {
          const { data, error: fnError } = await supabase.functions.invoke(
            "create-stripe-checkout",
            {
              body: {
                bookingId: newBookingId,
                amount: depositAmount,
                currency: "sek",
                description: `${festival.name} – ${selectedTent.name.sv} (20% förskott)`,
                customerEmail: email,
                successUrl: `${origin}/booking/${festival.id}`,
                cancelUrl: `${origin}/booking/${festival.id}`,
              },
            },
          );
          console.log("[stripe] response", { data, fnError });
          if (fnError) {
            toast.error(`Stripe-fel: ${fnError.message ?? "okänt fel"}`);
            return;
          }
          if (!data?.url) {
            toast.error(`Stripe returnerade ingen URL: ${JSON.stringify(data)}`);
            return;
          }
          window.location.href = data.url as string;
        } catch (err: any) {
          console.error("[stripe] invoke threw", err);
          toast.error(`Kunde inte nå Stripe: ${err?.message ?? err}`);
        }
        return;
      }

      setStep("confirmation");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => smoothScrollTo(confirmationTopRef.current));
      });

    } catch (e: any) {
      console.error(e);
      toast.error(`${t("errorSubmit", lang)}: ${e?.message ?? e}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  const summary = (
    <BookingSummary
      festival={festival}
      lang={lang}
      selectedTent={selectedTent}
      guests={guests}
      extraGuestsCost={extraGuestsCost}
      addOnLines={addOnLines}
      total={total}
      canCheckout={canCheckout}
      step={step}
      onCheckout={goToCheckout}
    />
  );

  return (
    <div className="theme-sweden-rock min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,hsl(220_6%_16%)_0%,hsl(0_0%_5%)_55%,hsl(0_0%_0%)_100%)]" />

        <div className="absolute top-4 right-4 z-20">
          <LanguageToggle lang={lang} onChange={setLang} />
        </div>
        <div className="relative z-10 container mx-auto px-4 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
          <img
            src={srLogo.url}
            alt="Tentify Glamping – Sweden Rock Festival Sölvesborg 2027"
            className="mx-auto w-full max-w-[440px] md:max-w-[680px] h-auto object-contain"
            loading="eager"
          />
          <h1 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(40_18%_92%)] leading-[1.2] tracking-tight text-balance">
            {lang === "sv" ? "Glamping till Sweden Rock" : "Glamping at Sweden Rock"}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-[hsl(40_12%_84%)] max-w-2xl mx-auto leading-relaxed text-balance">
            {lang === "sv"
              ? "Boka ditt färdiga boende till Sweden Rock Festival 2027"
              : "Book your ready-made stay for Sweden Rock Festival 2027"}
          </p>
          <p className="mt-2 text-base md:text-lg text-[hsl(40_14%_88%)] max-w-2xl mx-auto leading-relaxed text-balance">
            {lang === "sv" ? "Plats: Ingemars Camping" : "Location: Ingemars Camping"}
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg md:text-xl text-[hsl(40_14%_88%)]">
            <span className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 opacity-80" /> 8–12 juni 2027
            </span>
            <span className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 opacity-80" /> Sölvesborg
            </span>
          </div>

          <div className="mt-9 mx-auto w-fit max-w-full sr-info-box rounded-2xl px-6 py-6 md:px-10 md:py-8">
            <ul className="flex flex-col gap-4 md:gap-5">
              {(lang === "sv"
                ? [
                    { Icon: Moon, label: "4 nätter" },
                    { Icon: Clock, label: "Incheckning från kl. 15.00" },
                    { Icon: BedDouble, label: "Fullt möblerat tält" },
                    { Icon: MapPin, label: "10 minuter från festivalen" },
                    { Icon: Car, label: "Parkering ingår" },
                  ]
                : [
                    { Icon: Moon, label: "4 nights" },
                    { Icon: Clock, label: "Check-in from 3 pm" },
                    { Icon: BedDouble, label: "Fully furnished tent" },
                    { Icon: MapPin, label: "10 minutes from the festival" },
                    { Icon: Car, label: "Parking included" },
                  ]
              ).map(({ Icon, label }) => (
                <li key={label} className="grid grid-cols-[2.5rem_1fr] items-center gap-4 text-left text-lg md:text-xl text-[hsl(40_14%_88%)] leading-relaxed">
                  <span className="w-10 h-10 rounded-full bg-white/[0.07] border border-white/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 opacity-90" aria-hidden />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>



      {/* Body */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        {step === "booking" && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-10">
              <StepBlock number={1} title={t("step1", lang)}>
                <div className="grid md:grid-cols-2 gap-5">
                  {festival.tents.map((tent) => (
                    <TentCard
                      key={tent.id}
                      tent={tent}
                      lang={lang}
                      currency={festival.currency}
                      selected={selectedTentId === tent.id}
                      soldOut={!!soldOutByType[tent.id]}
                      available={availabilityByType[tent.id] ?? 0}
                      onSelect={() => {
                        if (soldOutByType[tent.id]) return;
                        setSelectedTentId(tent.id);
                      }}
                    />
                  ))}
                </div>
              </StepBlock>

              <StepBlock number={2} title={t("step2", lang)}>
                <Card className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{t("numGuests", lang)}</div>
                        <div className="text-sm text-muted-foreground">
                          {t("extraGuest", lang)}: {fmt(festival.extraGuestPrice, festival.currency)} {t("perPerson", lang)}
                          {selectedTent &&
                            ` · ${t("max", lang)} ${maxGuests} ${t("in", lang)} ${selectedTent.name[lang]}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        disabled={guests <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold text-lg">{guests}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
                        disabled={guests >= maxGuests}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {selectedTent?.id === "medium" && guests >= maxGuests && (
                    <p className="mt-3 text-xs text-muted-foreground flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      {lang === "sv"
                        ? "Medium tält har plats för upp till 3 gäster. Välj Deluxe för fler gäster."
                        : "The Medium tent fits up to 3 guests. Choose Deluxe for more guests."}
                    </p>
                  )}
                </Card>
              </StepBlock>

              <StepBlock number={3} title={t("step3", lang)}>
                <div className="grid md:grid-cols-2 gap-4">
                  {festival.addOns
                    .filter((a) => a.category === "comfort")
                    .map((a) => (
                      <AddOnCard
                        key={a.id}
                        addOn={a}
                        lang={lang}
                        currency={festival.currency}
                        guests={guests}
                        selected={selectedAddOns.has(a.id)}
                        onToggle={() => toggleAddOn(a.id)}
                      />
                    ))}
                </div>
              </StepBlock>

              <StepBlock number={4} title={t("step4", lang)}>
                <div className="grid md:grid-cols-2 gap-4">
                  {festival.addOns
                    .filter((a) => a.category !== "comfort")
                    .map((a) => (
                      <AddOnCard
                        key={a.id}
                        addOn={a}
                        lang={lang}
                        currency={festival.currency}
                        guests={guests}
                        selected={selectedAddOns.has(a.id)}
                        onToggle={() => toggleAddOn(a.id)}
                      />
                    ))}
                </div>
              </StepBlock>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">{summary}</div>
            </aside>
          </div>
        )}

        {step === "checkout" && selectedTent && (
          <div ref={checkoutTopRef} className="grid lg:grid-cols-[1fr_380px] gap-8 scroll-mt-24">
            <div className="space-y-6">
              <Button variant="ghost" onClick={() => setStep("booking")} className="-ml-3">
                <ChevronLeft className="w-4 h-4 mr-1" /> {t("backToBooking", lang)}
              </Button>
              <Card className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">{t("customerDetails", lang)}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={t("firstName", lang)} value={firstName} onChange={setFirstName} required />
                  <Field label={t("lastName", lang)} value={lastName} onChange={setLastName} required />
                  <Field label={t("email", lang)} type="email" value={email} onChange={setEmail} required />
                  <Field label={t("phone", lang)} type="tel" value={phone} onChange={setPhone} required />
                  <Field label={t("country", lang)} value={country} onChange={setCountry} />
                  <Field label={t("address", lang)} value={address} onChange={setAddress} required />
                  <Field label={t("postalCode", lang)} value={postalCode} onChange={setPostalCode} required />
                  <Field label={t("city", lang)} value={city} onChange={setCity} required />
                </div>
              </Card>

              <Card className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">{t("reviewBooking", lang)}</h2>
                <div className="rounded-lg border bg-muted/30 p-4 md:p-5 space-y-2 text-sm">
                  <SummaryRow label={t("step1", lang)} value={selectedTent.name[lang]} />
                  <SummaryRow
                    label={`${t("checkin", lang)} → ${t("checkout", lang)}`}
                    value={`${festival.checkIn[lang]} → ${festival.checkOut[lang]}`}
                  />
                  <SummaryRow
                    label={t("nightsLabel", lang)}
                    value={String(festival.nights)}
                  />
                  <SummaryRow label={t("guestsLabel", lang)} value={String(guests)} />
                  {addOnLines.length > 0 && (
                    <SummaryRow
                      label={t("step3", lang)}
                      value={addOnLines.map((l) => l.addOn.name[lang]).join(", ")}
                    />
                  )}
                  <Separator className="my-2" />
                  <SummaryRow
                    label={t("total", lang)}
                    value={fmt(total, festival.currency)}
                    strong
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-4 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  {t("thanksBody", lang)}
                </p>
              </Card>

              <Card className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-1">
                  {lang === "sv" ? "Välj betalsätt" : "Choose payment method"}
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  {lang === "sv"
                    ? `Betala 20% förskott (${fmt(depositAmount, festival.currency)}) nu. Resterande betalas vid ankomst.`
                    : `Pay 20% deposit (${fmt(depositAmount, festival.currency)}) now. The rest is paid on arrival.`}
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("swish")}
                    className={`text-left rounded-lg border-2 p-4 transition ${
                      paymentMethod === "swish"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">Swish</span>
                      {paymentMethod === "swish" && <Check className="w-4 h-4 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {lang === "sv"
                        ? "Manuell bekräftelse inom 24 timmar."
                        : "Manual confirmation within 24 hours."}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("stripe")}
                    className={`text-left rounded-lg border-2 p-4 transition ${
                      paymentMethod === "stripe"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">
                        {lang === "sv" ? "Kort (Stripe)" : "Card (Stripe)"}
                      </span>
                      {paymentMethod === "stripe" && <Check className="w-4 h-4 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {lang === "sv"
                        ? "Betala direkt med kort. Bokning bekräftas automatiskt."
                        : "Pay by card immediately. Booking confirmed automatically."}
                    </p>
                  </button>
                </div>
              </Card>

              <Button size="lg" className="w-full" onClick={handleConfirm} disabled={!canConfirm || isSubmitting}>
                {isSubmitting
                  ? t("submitting", lang)
                  : paymentMethod === "stripe"
                  ? lang === "sv"
                    ? `Betala ${fmt(depositAmount, festival.currency)} med kort`
                    : `Pay ${fmt(depositAmount, festival.currency)} by card`
                  : t("sendBookingRequest", lang)}
              </Button>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">{summary}</div>
            </aside>
          </div>
        )}

        {step === "confirmation" && selectedTent && (
          <div ref={confirmationTopRef} className="max-w-2xl mx-auto scroll-mt-24">
            <Card className="p-8 md:p-10">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-3">{t("thanks", lang)}</h1>
                <p className="text-muted-foreground mb-6">
                  {t("thanksBody", lang)}
                </p>
              </div>

              {bookingId && (
                <div className="text-center mb-6 text-sm">
                  <span className="text-muted-foreground">{t("bookingNumber", lang)}: </span>
                  <span className="font-mono font-semibold text-foreground">
                    {bookingId.slice(0, 8).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="rounded-lg border bg-muted/30 p-5 mb-4 text-sm space-y-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                  {t("paymentInfo", lang)}
                </div>
                <SummaryRow
                  label={t("totalAmountLabel", lang)}
                  value={fmt(total, festival.currency)}
                />
                <SummaryRow
                  label={t("depositLine", lang)}
                  value={fmt(depositAmount, festival.currency)}
                  strong
                />
                <SummaryRow
                  label={t("remainingLine", lang)}
                  value={fmt(total - depositAmount, festival.currency)}
                />
              </div>

              <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-5 mb-4 text-sm">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                  {t("swishTitle", lang)}
                </div>
                <div className="mb-3">
                  {lang === "sv"
                    ? `Swisha ${fmt(depositAmount, festival.currency)} (20% förskott) till:`
                    : `Swish ${fmt(depositAmount, festival.currency)} (20% deposit) to:`}
                </div>
                <div className="text-2xl font-bold font-mono text-primary mb-2">
                  {PAYMENT_INFO.swish}
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  Nangarra Invest AB
                </div>
                <p className="text-xs text-muted-foreground">
                  {lang === "sv"
                    ? `Märk betalningen med ditt namn${bookingId ? ` och bokningsnummer ${bookingId.slice(0, 8).toUpperCase()}` : ""}. Vi bekräftar din bokning manuellt inom 24 timmar.`
                    : `Mark the payment with your name${bookingId ? ` and booking number ${bookingId.slice(0, 8).toUpperCase()}` : ""}. We will confirm your booking manually within 24 hours.`}
                </p>
              </div>

              <div className="rounded-lg bg-accent/20 border border-accent/30 p-4 mb-6 text-sm">
                <div className="font-semibold mb-1">{t("confirmationTitle", lang)}</div>
                <p className="text-muted-foreground">{t("confirmationBody", lang)}</p>
              </div>



              <div className="text-center">
                <Button asChild variant="outline">
                  <Link to="/">{t("backHome", lang)}</Link>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </section>

      {/* Mobile sticky */}
      {step !== "confirmation" && (
        <div className="lg:hidden sticky bottom-0 z-40 bg-background border-t shadow-lg">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-muted-foreground">{t("total", lang)}</div>
              <div className="text-lg font-bold text-primary">{fmt(total, festival.currency)}</div>
            </div>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ShoppingBag className="w-4 h-4 mr-1" /> {t("summary", lang)}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{t("yourBooking", lang)}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">{summary}</div>
                </SheetContent>
              </Sheet>
              {step === "booking" ? (
                <Button size="sm" onClick={goToCheckout} disabled={!canCheckout}>
                  {t("continue", lang)} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button size="sm" onClick={handleConfirm} disabled={!canConfirm || isSubmitting}>
                  {t("sendBookingRequest", lang)}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- Subcomponents ---------- */

const StepBlock = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
        {number}
      </div>
      <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
    </div>
    {children}
  </div>
);

const TentCard = ({
  tent, lang, currency, selected, soldOut, available, onSelect,
}: {
  tent: TentType;
  lang: Lang;
  currency: string;
  selected: boolean;
  soldOut: boolean;
  available: number;
  onSelect: () => void;
}) => {
  const totalT = tent.totalCount ?? 0;
  const images = tent.gallery && tent.gallery.length > 0 ? tent.gallery : [tent.image];
  const [activeIdx, setActiveIdx] = useState(0);
  const touchX = useRef<number | null>(null);
  return (
    <Card
      className={`overflow-hidden transition-all ${
        soldOut
          ? "opacity-60 cursor-not-allowed"
          : selected
          ? "ring-2 ring-primary shadow-lg cursor-pointer"
          : "hover:shadow-md cursor-pointer"
      }`}
      onClick={soldOut ? undefined : onSelect}
      aria-disabled={soldOut}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/50">
        <img
          src={images[activeIdx] ?? tent.image}
          alt={tent.name[lang]}
          className="w-full h-full object-contain"
          loading="lazy"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null || images.length < 2) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) {
              setActiveIdx((i) => (i + (dx < 0 ? 1 : -1) + images.length) % images.length);
            }
            touchX.current = null;
          }}
        />
        {selected && !soldOut && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow">
            <Check className="w-4 h-4" />
          </div>
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge className="bg-background text-foreground text-sm px-3 py-1">
              {tent.id === "medium"
                ? t("mediumSoldOut", lang)
                : tent.id === "deluxe"
                ? t("deluxeSoldOut", lang)
                : lang === "sv"
                ? "Slutsålt"
                : "Sold out"}
            </Badge>
          </div>
        )}
      </div>
      {!soldOut && images.length > 1 && (
        <div className="flex gap-2 px-3 pt-3">
          {images.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={(e) => { e.stopPropagation(); setActiveIdx(idx); }}
              className={`relative w-20 aspect-[4/3] rounded-md overflow-hidden border-2 bg-muted/40 transition ${
                idx === activeIdx ? "border-primary" : "border-border/50 hover:border-primary/50"
              }`}
              aria-label={`${tent.name[lang]} bild ${idx + 1}`}
              aria-current={idx === activeIdx}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-bold text-lg">{tent.name[lang]}</h3>
            <p className="text-sm text-muted-foreground">{tent.size} · {tent.bestFor[lang]}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">{tent.price.toLocaleString("sv-SE")} {currency}</div>
            <div className="text-xs text-muted-foreground">{t("totalStay", lang)}</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{tent.description[lang]}</p>

        {totalT > 0 && !selected && (
          <p className="text-xs font-medium mb-4">
            {soldOut ? (
              <span className="text-muted-foreground">
                {tent.id === "medium"
                  ? t("mediumSoldOut", lang)
                  : tent.id === "deluxe"
                  ? t("deluxeSoldOut", lang)
                  : lang === "sv"
                  ? "Slutsålt"
                  : "Sold out"}
              </span>
            ) : (
              <span className="text-foreground/80">
                {available} {t("ofLabel", lang)} {totalT} {t("availabilityLine", lang)}
              </span>
            )}
          </p>
        )}

        {tent.includedStandard && tent.includedStandard.length > 0 && (
          <div className="mb-4 rounded-lg border bg-muted/30 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              {t("includedAsStandard", lang)}
            </div>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {tent.includedStandard.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <item.Icon aria-hidden className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{item.label[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          variant={selected ? "default" : "outline"}
          className="w-full"
          disabled={soldOut}
          onClick={(e) => { e.stopPropagation(); if (!soldOut) onSelect(); }}
        >
          {soldOut
            ? (lang === "sv" ? "Slutsålt" : "Sold out")
            : selected
            ? (<><Check className="w-4 h-4 mr-1" /> {t("selected", lang)}{available > 0 ? ` (${available} ${lang === "sv" ? "tält kvar att boka" : "tents left"})` : ""}</>)
            : (<>{t("select", lang)}{available > 0 ? ` (${available} ${lang === "sv" ? "tält kvar att boka" : "tents left"})` : ""}</>)}

        </Button>
      </div>
    </Card>
  );
};

const SummaryRow = ({
  label, value, strong,
}: { label: string; value: string; strong?: boolean }) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{label}</span>
    <span className={strong ? "font-semibold text-foreground" : "text-foreground"}>{value}</span>
  </div>
);


const AddOnCard = ({
  addOn, lang, currency, guests, selected, onToggle,
}: { addOn: AddOnType; lang: Lang; currency: string; guests: number; selected: boolean; onToggle: () => void }) => {
  const Icon = addOnIcons[addOn.id] ?? Sparkles;
  const totalPrice = addOn.perPerson ? addOn.price * guests : addOn.price;
  const isPackage = addOn.category === "package";
  return (
    <Card className={`p-6 flex flex-col text-center transition-all ${selected ? "ring-2 ring-primary bg-primary/5 shadow-md" : "hover:shadow-md"} ${isPackage ? "border-primary/30" : ""}`}>
      {addOn.image ? (
        <div className="mx-auto mb-4 w-32 h-32 rounded-2xl overflow-hidden bg-muted/40 border border-border/50 shadow-sm">
          <img
            src={addOn.image}
            alt={addOn.name[lang]}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={`mx-auto mb-4 w-20 h-20 rounded-2xl flex items-center justify-center ${isPackage ? "bg-primary text-primary-foreground shadow-sm" : "bg-primary/10 text-primary"}`}>
          <Icon className="w-10 h-10" />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
        <h3 className="font-semibold text-base">{addOn.name[lang]}</h3>
        {addOn.badge && (
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
            {addOn.badge[lang]}
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-4">{addOn.description[lang]}</p>

      {addOn.includedItems && addOn.includedItems.length > 0 && (
        <div className="mb-4 rounded-md bg-muted/40 p-3 text-left">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
            {t("packageIncludes", lang)}
          </div>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
            {addOn.includedItems.map((it, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-foreground/80">{it[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto">
        <div className="mb-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("totalFor", lang)}</div>
          <div className="text-2xl font-bold text-primary leading-tight">
            {totalPrice.toLocaleString("sv-SE")} <span className="text-sm font-medium text-muted-foreground">{currency}</span>
          </div>
          {addOn.perPerson && (
            <div className="text-xs text-muted-foreground mt-0.5">
              {guests} × {addOn.price.toLocaleString("sv-SE")} {currency}
            </div>
          )}
        </div>

        {selected ? (
          <div className="flex gap-2">
            <Button variant="default" className="flex-1 shadow-sm" disabled>
              <Check className="w-4 h-4 mr-1" /> {t("added", lang)}
            </Button>
            <Button variant="outline" size="icon" onClick={onToggle} aria-label={t("remove", lang)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <Button variant="outline" onClick={onToggle} className="text-muted-foreground hover:text-foreground">
              {t("noThanks", lang)}
            </Button>
            <Button
              onClick={onToggle}
              className="font-semibold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 mr-1" /> {t("add", lang)}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};


const BookingSummary = ({
  festival, lang, selectedTent, guests, extraGuestsCost, addOnLines, total, canCheckout, step, onCheckout,
}: {
  festival: FestivalConfig; lang: Lang; selectedTent: TentType | null; guests: number;
  extraGuestsCost: number; addOnLines: { addOn: AddOnType; total: number }[]; total: number;
  canCheckout: boolean; step: Step; onCheckout: () => void;
}) => (
  <Card className="p-6">
    <h3 className="text-lg font-bold mb-1">{t("yourBooking", lang)}</h3>
    <p className="text-sm text-muted-foreground mb-4">{festival.name}</p>

    <div className="text-sm space-y-1 mb-4">
      <div className="flex justify-between"><span className="text-muted-foreground">{t("checkin", lang)}</span><span>{festival.checkIn[lang]}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">{t("checkout", lang)}</span><span>{festival.checkOut[lang]}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">{t("nightsLabel", lang)}</span><span>{festival.nights}</span></div>
    </div>

    <Separator className="my-4" />

    {selectedTent ? (
      <div className="text-sm space-y-3">
        <div className="flex justify-between">
          <div>
            <div className="font-medium">{selectedTent.name[lang]}</div>
            <div className="text-xs text-muted-foreground">{selectedTent.size}</div>
          </div>
          <span>{fmt(selectedTent.price, festival.currency)}</span>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="font-medium">{t("guestsLabel", lang)}</div>
            <div className="text-xs text-muted-foreground">
              {guests} {guests === 1 ? t("guest", lang) : t("guests", lang)}
            </div>
          </div>
          <span>{extraGuestsCost > 0 ? `+${fmt(extraGuestsCost, festival.currency)}` : t("included", lang)}</span>
        </div>

        {addOnLines.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              {addOnLines.map(({ addOn, total }) => (
                <div key={addOn.id} className="flex justify-between text-sm">
                  <div>
                    <div>{addOn.name[lang]}</div>
                    {addOn.perPerson && (
                      <div className="text-xs text-muted-foreground">{guests} × {addOn.price} {festival.currency}</div>
                    )}
                  </div>
                  <span>{fmt(total, festival.currency)}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <Separator />
        <div className="flex justify-between items-baseline">
          <span className="font-semibold">{t("total", lang)}</span>
          <span className="text-2xl font-bold text-primary">{fmt(total, festival.currency)}</span>
        </div>
      </div>
    ) : (
      <p className="text-sm text-muted-foreground">{t("selectTentFirst", lang)}</p>
    )}

    {step === "booking" && (
      <Button className="w-full mt-6" size="lg" disabled={!canCheckout} onClick={onCheckout}>
        {t("continueCheckout", lang)}
      </Button>
    )}
  </Card>
);

const Field = ({
  label, value, onChange, type = "text", required,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) => (
  <div>
    <Label className="mb-1.5 block">{label}{required && " *"}</Label>
    <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
  </div>
);

const PaymentOption = ({
  active, onClick, title, subtitle, price, label,
}: { active: boolean; onClick: () => void; title: string; subtitle: string; price: string; label: string }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-left rounded-lg border-2 p-5 transition-all ${active ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? "border-primary bg-primary" : "border-muted-foreground/40"}`}>
        {active && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
    </div>
    <div className="font-semibold mb-1">{title}</div>
    <div className="text-sm text-muted-foreground mb-3">{subtitle}</div>
    <div className="text-xl font-bold text-primary">{price}</div>
  </button>
);

export default EventBookingPage;
