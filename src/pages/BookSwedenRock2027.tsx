import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SWEDEN_ROCK_2027, type AddOnType, type FestivalConfig, type TentType } from "@/config/festivals";

const festival: FestivalConfig = SWEDEN_ROCK_2027;

const addOnIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "luxury-bed": BedDouble,
  "extra-bed": Bed,
  bedding: Sparkles,
  breakfast: Coffee,
  towel: Bath,
  fridge: Refrigerator,
};

const fmt = (n: number) => `${n.toLocaleString("sv-SE")} ${festival.currency}`;

type Step = "booking" | "checkout" | "confirmation";

const BookSwedenRock2027 = () => {
  const [step, setStep] = useState<Step>("booking");
  const [selectedTentId, setSelectedTentId] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [available, setAvailable] = useState<number>(festival.totalTents);

  // Checkout form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Sweden");
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
      const total = (data as any[])?.reduce((sum, r) => sum + (r.available_count ?? 0), 0);
      if (typeof total === "number" && total > 0) {
        setAvailable(Math.min(total, festival.totalTents));
      }
    })();
  }, []);

  useEffect(() => {
    document.title = `Book ${festival.shortName} Glamping | Tentify`;
  }, []);

  const selectedTent = useMemo(
    () => festival.tents.find((t) => t.id === selectedTentId) ?? null,
    [selectedTentId],
  );

  const maxGuests = selectedTent?.id === "medium" ? 2 : 4;

  useEffect(() => {
    if (guests > maxGuests) setGuests(maxGuests);
  }, [maxGuests, guests]);

  const extraGuestsCost = Math.max(0, guests - 1) * festival.extraGuestPrice;

  const addOnLines = useMemo(() => {
    return festival.addOns
      .filter((a) => selectedAddOns.has(a.id))
      .map((a) => {
        const total = a.perPerson ? a.price * guests : a.price;
        return { addOn: a, total };
      });
  }, [selectedAddOns, guests]);

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
        name: l.addOn.name,
        qty: l.addOn.perPerson ? guests : 1,
        unitPrice: l.addOn.price,
        total: l.total,
      }));

      const message =
        `${festival.name}\n` +
        `Tent: ${selectedTent.name} (${selectedTent.size})\n` +
        `Guests: ${guests}\n` +
        `Check-in: ${festival.checkIn}\nCheck-out: ${festival.checkOut}\n` +
        `Add-ons: ${addOnLines.map((l) => `${l.addOn.name} (${l.total} kr)`).join(", ") || "None"}\n` +
        `Total: ${total} kr\nPayment: ${paymentOption === "deposit" ? `Deposit ${depositAmount} kr` : "Full amount"}`;

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
          tentName: selectedTent.name,
          guests,
          addOns: addOnMeta,
          totalPrice: total,
          deposit: depositAmount,
          paymentOption,
          address: { country, address, postalCode, city },
          eventDates: `${festival.checkIn} – ${festival.checkOut}`,
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
      toast.error("Could not submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const summary = (
    <BookingSummary
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
    <div className="min-h-screen bg-[hsl(var(--muted))]/40">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[52vh] min-h-[380px] overflow-hidden">
          <img
            src={festival.heroImage}
            alt={`${festival.name} glamping hero`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          <div className="relative z-10 h-full container mx-auto px-4 flex items-end pb-10 md:pb-14">
            <div className="text-white max-w-3xl">
              <Badge className="mb-4 bg-white/15 border-white/30 backdrop-blur-sm text-white">
                Booking open
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
                Sweden Rock 2027 Glamping
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl">
                Book your ready-made glamping tent for Sweden Rock Festival 2027.
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6 mt-5 text-sm text-white/90">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {festival.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {festival.checkIn} → {festival.checkOut}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Availability strip */}
        <div className="container mx-auto px-4 -mt-6 relative z-20">
          <Card className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold">
                  {available} of {festival.totalTents} tents left
                </span>
                <span className="text-muted-foreground">Limited availability</span>
              </div>
              <Progress value={((festival.totalTents - available) / festival.totalTents) * 100} />
            </div>
            <div className="text-sm text-muted-foreground md:border-l md:pl-6">
              <span className="font-medium text-foreground">{festival.nights} nights</span> · Check-in 15:00
            </div>
          </Card>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        {step === "booking" && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-10">
              {/* Step 1: Tent */}
              <StepBlock number={1} title="Choose your tent">
                <div className="grid md:grid-cols-2 gap-5">
                  {festival.tents.map((tent) => (
                    <TentCard
                      key={tent.id}
                      tent={tent}
                      selected={selectedTentId === tent.id}
                      onSelect={() => setSelectedTentId(tent.id)}
                    />
                  ))}
                </div>
              </StepBlock>

              {/* Step 2: Guests */}
              <StepBlock number={2} title="Guests">
                <Card className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Number of guests</div>
                        <div className="text-sm text-muted-foreground">
                          Extra guest: {fmt(festival.extraGuestPrice)} per person
                          {selectedTent && ` · Max ${maxGuests} in ${selectedTent.name}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        disabled={guests <= 1}
                        aria-label="Decrease guests"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold text-lg">{guests}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
                        disabled={guests >= maxGuests}
                        aria-label="Increase guests"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </StepBlock>

              {/* Step 3: Comfort */}
              <StepBlock number={3} title="Bedding & comfort">
                <div className="grid md:grid-cols-2 gap-4">
                  {festival.addOns
                    .filter((a) => a.category === "comfort")
                    .map((a) => (
                      <AddOnCard
                        key={a.id}
                        addOn={a}
                        guests={guests}
                        selected={selectedAddOns.has(a.id)}
                        onToggle={() => toggleAddOn(a.id)}
                      />
                    ))}
                </div>
              </StepBlock>

              {/* Step 4: Food & extras */}
              <StepBlock number={4} title="Food & extras">
                <div className="grid md:grid-cols-2 gap-4">
                  {festival.addOns
                    .filter((a) => a.category !== "comfort")
                    .map((a) => (
                      <AddOnCard
                        key={a.id}
                        addOn={a}
                        guests={guests}
                        selected={selectedAddOns.has(a.id)}
                        onToggle={() => toggleAddOn(a.id)}
                      />
                    ))}
                </div>
              </StepBlock>
            </div>

            {/* Desktop summary */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">{summary}</div>
            </aside>
          </div>
        )}

        {step === "checkout" && selectedTent && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-6">
              <Button variant="ghost" onClick={() => setStep("booking")} className="-ml-3">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to booking
              </Button>
              <Card className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Customer details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="First name" value={firstName} onChange={setFirstName} required />
                  <Field label="Last name" value={lastName} onChange={setLastName} required />
                  <Field label="Email" type="email" value={email} onChange={setEmail} required />
                  <Field label="Phone" type="tel" value={phone} onChange={setPhone} required />
                  <Field label="Country" value={country} onChange={setCountry} />
                  <Field label="Address" value={address} onChange={setAddress} required />
                  <Field label="Postal code" value={postalCode} onChange={setPostalCode} required />
                  <Field label="City" value={city} onChange={setCity} required />
                </div>
              </Card>

              <Card className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Payment</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <PaymentOption
                    active={paymentOption === "deposit"}
                    onClick={() => setPaymentOption("deposit")}
                    title="Pay deposit today"
                    subtitle="Secure your tent now and pay the remaining balance later."
                    price={fmt(depositAmount)}
                    label="20% deposit"
                  />
                  <PaymentOption
                    active={paymentOption === "full"}
                    onClick={() => setPaymentOption("full")}
                    title="Pay full amount now"
                    subtitle="Complete your booking with a single payment."
                    price={fmt(total)}
                    label="Full amount"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-4 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  Payment provider will be connected shortly. You will receive payment instructions by email after confirming.
                </p>
              </Card>

              <Button
                size="lg"
                className="w-full"
                onClick={handleConfirm}
                disabled={!canConfirm || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Confirm booking"}
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
              <h1 className="text-3xl font-bold mb-3">Thank you for your booking!</h1>
              <p className="text-muted-foreground mb-6">
                We have received your booking for {festival.name}. You will receive a confirmation
                email at <span className="font-medium text-foreground">{email}</span> shortly with
                payment instructions.
              </p>
              <div className="text-left bg-muted/40 rounded-lg p-5 mb-6 text-sm space-y-2">
                <div className="flex justify-between"><span>Tent</span><span className="font-medium">{selectedTent.name}</span></div>
                <div className="flex justify-between"><span>Guests</span><span className="font-medium">{guests}</span></div>
                <div className="flex justify-between"><span>Total</span><span className="font-semibold text-primary">{fmt(total)}</span></div>
                <div className="flex justify-between"><span>Payment</span><span className="font-medium">{paymentOption === "deposit" ? `Deposit ${fmt(depositAmount)}` : "Full amount"}</span></div>
              </div>
              <Button asChild variant="outline">
                <Link to="/">Back to homepage</Link>
              </Button>
            </Card>
          </div>
        )}
      </section>

      {/* Mobile sticky summary */}
      {step !== "confirmation" && (
        <div className="lg:hidden sticky bottom-0 z-40 bg-background border-t shadow-lg">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="text-lg font-bold text-primary">{fmt(total)}</div>
            </div>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ShoppingBag className="w-4 h-4 mr-1" /> Summary
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Your booking</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">{summary}</div>
                </SheetContent>
              </Sheet>
              {step === "booking" ? (
                <Button
                  size="sm"
                  onClick={() => {
                    setStep("checkout");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={!canCheckout}
                >
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button size="sm" onClick={handleConfirm} disabled={!canConfirm || isSubmitting}>
                  Confirm
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

const StepBlock = ({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) => (
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
  tent,
  selected,
  onSelect,
}: {
  tent: TentType;
  selected: boolean;
  onSelect: () => void;
}) => (
  <Card
    className={`overflow-hidden transition-all cursor-pointer ${
      selected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
    }`}
    onClick={onSelect}
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      <img src={tent.image} alt={tent.name} className="w-full h-full object-cover" loading="lazy" />
      {selected && (
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow">
          <Check className="w-4 h-4" />
        </div>
      )}
    </div>
    <div className="p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="font-bold text-lg">{tent.name}</h3>
          <p className="text-sm text-muted-foreground">
            {tent.size} · {tent.bestFor}
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">
            {tent.price.toLocaleString("sv-SE")} SEK
          </div>
          <div className="text-xs text-muted-foreground">total stay</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{tent.description}</p>
      <Button
        variant={selected ? "default" : "outline"}
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {selected ? (
          <>
            <Check className="w-4 h-4 mr-1" /> Selected
          </>
        ) : (
          "Select tent"
        )}
      </Button>
    </div>
  </Card>
);

const AddOnCard = ({
  addOn,
  guests,
  selected,
  onToggle,
}: {
  addOn: AddOnType;
  guests: number;
  selected: boolean;
  onToggle: () => void;
}) => {
  const Icon = addOnIcons[addOn.id] ?? Sparkles;
  const totalPrice = addOn.perPerson ? addOn.price * guests : addOn.price;
  return (
    <Card className={`p-5 transition-all ${selected ? "ring-2 ring-primary bg-primary/5" : ""}`}>
      <div className="flex gap-4 mb-3">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{addOn.name}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{addOn.description}</p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-3 mb-4">
        <div>
          <div className="text-lg font-bold text-primary">
            {addOn.price.toLocaleString("sv-SE")} SEK
            {addOn.perPerson && <span className="text-xs font-normal text-muted-foreground"> per person</span>}
          </div>
          {addOn.perPerson && (
            <div className="text-xs text-muted-foreground">
              Total: {totalPrice.toLocaleString("sv-SE")} SEK for {guests} {guests === 1 ? "guest" : "guests"}
            </div>
          )}
        </div>
      </div>
      {selected ? (
        <div className="flex gap-2">
          <Button variant="default" className="flex-1" disabled>
            <Check className="w-4 h-4 mr-1" /> Added
          </Button>
          <Button variant="outline" size="icon" onClick={onToggle} aria-label="Remove">
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button variant="ghost" className="flex-1" onClick={onToggle}>
            No thanks
          </Button>
          <Button variant="default" className="flex-1" onClick={onToggle}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      )}
    </Card>
  );
};

const BookingSummary = ({
  selectedTent,
  guests,
  extraGuestsCost,
  addOnLines,
  total,
  canCheckout,
  step,
  onCheckout,
}: {
  selectedTent: TentType | null;
  guests: number;
  extraGuestsCost: number;
  addOnLines: { addOn: AddOnType; total: number }[];
  total: number;
  canCheckout: boolean;
  step: Step;
  onCheckout: () => void;
}) => (
  <Card className="p-6">
    <h3 className="text-lg font-bold mb-1">Your booking</h3>
    <p className="text-sm text-muted-foreground mb-4">{festival.name}</p>

    <div className="text-sm space-y-1 mb-4">
      <div className="flex justify-between"><span className="text-muted-foreground">Check-in</span><span>{festival.checkIn}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Check-out</span><span>{festival.checkOut}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Nights</span><span>{festival.nights}</span></div>
    </div>

    <Separator className="my-4" />

    {selectedTent ? (
      <div className="text-sm space-y-3">
        <div className="flex justify-between">
          <div>
            <div className="font-medium">{selectedTent.name}</div>
            <div className="text-xs text-muted-foreground">{selectedTent.size}</div>
          </div>
          <span>{fmt(selectedTent.price)}</span>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="font-medium">Guests</div>
            <div className="text-xs text-muted-foreground">
              {guests} {guests === 1 ? "guest" : "guests"}
            </div>
          </div>
          <span>{extraGuestsCost > 0 ? `+${fmt(extraGuestsCost)}` : "Included"}</span>
        </div>

        {addOnLines.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              {addOnLines.map(({ addOn, total }) => (
                <div key={addOn.id} className="flex justify-between text-sm">
                  <div>
                    <div>{addOn.name}</div>
                    {addOn.perPerson && (
                      <div className="text-xs text-muted-foreground">
                        {guests} × {addOn.price} SEK
                      </div>
                    )}
                  </div>
                  <span>{fmt(total)}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <Separator />
        <div className="flex justify-between items-baseline">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary">{fmt(total)}</span>
        </div>
      </div>
    ) : (
      <p className="text-sm text-muted-foreground">Select a tent to see your price.</p>
    )}

    {step === "booking" && (
      <Button className="w-full mt-6" size="lg" disabled={!canCheckout} onClick={onCheckout}>
        Continue to checkout
      </Button>
    )}
  </Card>
);

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) => (
  <div>
    <Label className="mb-1.5 block">{label}{required && " *"}</Label>
    <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
  </div>
);

const PaymentOption = ({
  active,
  onClick,
  title,
  subtitle,
  price,
  label,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  price: string;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-left rounded-lg border-2 p-5 transition-all ${
      active ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
    }`}
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

export default BookSwedenRock2027;
