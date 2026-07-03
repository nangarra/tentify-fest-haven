import { useEffect, useMemo, useState } from "react";
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
  const [selectedTentId, setSelectedTentId] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [available, setAvailable] = useState<number>(festival.totalTents);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Sverige");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [paymentOption, setPaymentOption] = useState<"deposit" | "full">("deposit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("get_tent_availability", {
        p_festival: festival.id,
      });
      const total = (data as any[])?.reduce(
        (sum, r) => sum + (r.available_count ?? 0),
        0,
      );
      if (typeof total === "number" && total > 0) {
        setAvailable(Math.min(total, festival.totalTents));
      }
    })();
  }, [festival.id]);

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
  const depositAmount = Math.round(total * 0.2);

  const canCheckout = !!selectedTent && guests > 0;
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

  const handleConfirm = async () => {
    if (!canConfirm || !selectedTent) return;
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
        `Tillval: ${addOnLines.map((l) => `${l.addOn.name.sv} (${l.total} kr)`).join(", ") || "Inga"}\n` +
        `Totalt: ${total} kr\nBetalning: ${paymentOption === "deposit" ? `Handpenning ${depositAmount} kr` : "Hela beloppet"}`;

      const { error } = await supabase.from("bookings").insert({
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
          guests,
          addOns: addOnMeta,
          totalPrice: total,
          deposit: depositAmount,
          paymentOption,
          address: { country, address, postalCode, city },
          eventDates: `${festival.checkIn.sv} – ${festival.checkOut.sv}`,
          language: lang,
        },
      });
      if (error) throw error;

      await supabase.rpc("decrease_tent_inventory", {
        p_festival: festival.id,
        p_tent_type: selectedTent.id,
      });
      setStep("confirmation");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      console.error(e);
      toast.error(t("errorSubmit", lang));
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
      onCheckout={() => {
        setStep("checkout");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
  );

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[52vh] min-h-[380px] overflow-hidden">
          <img
            src={festival.heroImage}
            alt={`${festival.name} glamping`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          <div className="absolute top-4 right-4 z-20">
            <LanguageToggle lang={lang} onChange={setLang} />
          </div>
          <div className="relative z-10 h-full container mx-auto px-4 flex items-end pb-10 md:pb-14">
            <div className="text-white max-w-3xl">
              <Badge className="mb-4 bg-white/15 border-white/30 backdrop-blur-sm text-white">
                {t("bookingOpen", lang)}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
                {festival.displayTitle[lang]}
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl">
                {festival.subtitle[lang]}
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6 mt-5 text-sm text-white/90">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {festival.location[lang]}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {festival.checkIn[lang]} → {festival.checkOut[lang]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-6 relative z-20">
          <Card className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold">
                  {lang === "sv"
                    ? `Endast ${available} av ${festival.totalTents} tält kvar`
                    : `${available} of ${festival.totalTents} tents left`}
                </span>
                <span className="text-muted-foreground">{t("limitedAvailability", lang)}</span>
              </div>
              <Progress
                value={((festival.totalTents - available) / festival.totalTents) * 100}
              />
            </div>
            <div className="text-sm text-muted-foreground md:border-l md:pl-6">
              <span className="font-medium text-foreground">
                {festival.nights} {t("nights", lang)}
              </span>{" "}
              · {t("checkinTime", lang)}
            </div>
          </Card>
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
                      onSelect={() => setSelectedTentId(tent.id)}
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
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
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
                <h2 className="text-2xl font-bold mb-6">{t("payment", lang)}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <PaymentOption
                    active={paymentOption === "deposit"}
                    onClick={() => setPaymentOption("deposit")}
                    title={t("payDeposit", lang)}
                    subtitle={t("payDepositDesc", lang)}
                    price={fmt(depositAmount, festival.currency)}
                    label={t("depositLabel", lang)}
                  />
                  <PaymentOption
                    active={paymentOption === "full"}
                    onClick={() => setPaymentOption("full")}
                    title={t("payFull", lang)}
                    subtitle={t("payFullDesc", lang)}
                    price={fmt(total, festival.currency)}
                    label={t("fullAmountLabel", lang)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-4 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  {t("paymentNote", lang)}
                </p>
              </Card>

              <Button size="lg" className="w-full" onClick={handleConfirm} disabled={!canConfirm || isSubmitting}>
                {isSubmitting ? t("submitting", lang) : t("confirmBooking", lang)}
              </Button>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">{summary}</div>
            </aside>
          </div>
        )}

        {step === "confirmation" && selectedTent && (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 md:p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-3">{t("thanks", lang)}</h1>
              <p className="text-muted-foreground mb-6">
                {t("thanksBody", lang)}{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </p>
              <div className="text-left bg-muted/40 rounded-lg p-5 mb-6 text-sm space-y-2">
                <div className="flex justify-between"><span>{t("step1", lang)}</span><span className="font-medium">{selectedTent.name[lang]}</span></div>
                <div className="flex justify-between"><span>{t("guestsLabel", lang)}</span><span className="font-medium">{guests}</span></div>
                <div className="flex justify-between"><span>{t("total", lang)}</span><span className="font-semibold text-primary">{fmt(total, festival.currency)}</span></div>
              </div>
              <Button asChild variant="outline">
                <Link to="/">{t("backHome", lang)}</Link>
              </Button>
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
                <Button size="sm" onClick={() => { setStep("checkout"); window.scrollTo({ top: 0, behavior: "smooth" }); }} disabled={!canCheckout}>
                  {t("continue", lang)} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button size="sm" onClick={handleConfirm} disabled={!canConfirm || isSubmitting}>
                  {t("confirmBooking", lang)}
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
  tent, lang, currency, selected, onSelect,
}: { tent: TentType; lang: Lang; currency: string; selected: boolean; onSelect: () => void }) => (
  <Card
    className={`overflow-hidden transition-all cursor-pointer ${selected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"}`}
    onClick={onSelect}
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      <img src={tent.image} alt={tent.name[lang]} className="w-full h-full object-cover" loading="lazy" />
      {selected && (
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow">
          <Check className="w-4 h-4" />
        </div>
      )}
    </div>
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
      <p className="text-sm text-muted-foreground mb-4">{tent.description[lang]}</p>

      {tent.includedStandard && tent.includedStandard.length > 0 && (
        <div className="mb-4 rounded-lg border bg-muted/30 p-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            {t("includedAsStandard", lang)}
          </div>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
            {tent.includedStandard.map((item, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <span aria-hidden className="text-base leading-none">{item.icon}</span>
                <span className="text-foreground/80">{item.label[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button variant={selected ? "default" : "outline"} className="w-full" onClick={(e) => { e.stopPropagation(); onSelect(); }}>
        {selected ? (<><Check className="w-4 h-4 mr-1" /> {t("selected", lang)}</>) : t("select", lang)}
      </Button>
    </div>
  </Card>
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
