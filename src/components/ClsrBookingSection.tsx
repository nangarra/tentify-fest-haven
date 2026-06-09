import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import TermsModal from "./TermsModal";
import clsrCastle from "@/assets/clsr-castle.webp.asset.json";
import clsrDeluxe from "@/assets/clsr-deluxe.webp.asset.json";
import clsrTentsNight from "@/assets/clsr-tents-night.webp.asset.json";
import clsrCampPath from "@/assets/clsr-camp-path.webp.asset.json";
import clsrHeroVideo from "@/assets/clsr-hero.mp4.asset.json";



const FESTIVAL_KEY = "clsr-boutique-2026";
const TENT_TYPE = "deluxe";
const TOTAL_TENTS = 9;
const PRICE = 16800;
const ADVANCE = Math.round(PRICE * 0.2); // 3360 kr
const DEPOSIT = 1500;

const EVENT_START = new Date("2026-06-26T10:00:00Z");

const included = [
  "Glampingtält",
  "Dubbelsäng (färdigbäddad för 2 gäster)",
  "Duntäcke för 2 gäster",
  "Kuddar för 2 gäster",
  "Bäddmadrass till dubbelsängen",
  "Stolar",
  "Bord",
  "Mattor",
  "Lyktor",
  "Mysig styling",
  "Parkering nära tältet",
  "Deluxe-lås",
  "Goodiebag",
];

const benefits = [
  { icon: MapPin, text: "5 minuters promenad från scenen" },
  { icon: Users, text: "Plats för upp till 4 gäster per tält" },
  { icon: Sparkles, text: "Privat och diskret område" },
  { icon: Calendar, text: "Parkering nära tältet" },
];

const slideshowImages = [
  { src: clsrDeluxe.url, alt: "Deluxe glampingtält interiör med bäddad säng" },
  { src: clsrTentsNight.url, alt: "Glampingtält i skymningen med lyktor" },
  { src: clsrCampPath.url, alt: "Stigen till glampingområdet vid Stora Sundby Slott" },
  { src: clsrCastle.url, alt: "Stora Sundby Slott i solnedgång" },
];

const ClsrBookingSection = () => {
  const [available, setAvailable] = useState<number>(TOTAL_TENTS);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [now, setNow] = useState<Date>(new Date());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slide, setSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => video.play().catch(() => {});
    video.addEventListener("loadedmetadata", tryPlay);
    tryPlay();
    return () => video.removeEventListener("loadedmetadata", tryPlay);
  }, []);


  useEffect(() => {

    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSlide((p) => (p + 1) % slideshowImages.length), 5000);
    return () => clearInterval(id);
  }, []);

  const fetchAvailability = async () => {
    const { data, error } = await supabase.rpc("get_tent_availability", {
      p_festival: FESTIVAL_KEY,
    });
    if (error) {
      console.error("CLSR availability error:", error);
      return;
    }
    const deluxe = (data as any[])?.find((r) => r.tent_type === TENT_TYPE);
    if (deluxe) setAvailable(deluxe.available_count);
  };

  const countdown = useMemo(() => {
    const diff = Math.max(0, EVENT_START.getTime() - now.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }, [now]);

  const isSoldOut = available <= 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSoldOut) return;
    if (!name || !email || !phone) {
      toast.error("Fyll i namn, e-post och telefon.");
      return;
    }
    if (!acceptedTerms) {
      toast.error("Du måste godkänna villkoren.");
      return;
    }

    setIsSubmitting(true);
    try {
      const message =
        `CLSR Butikfestival – Privat VIP Glamping\n` +
        `Tält: Deluxe (upp till 4 gäster)\n` +
        `Antal gäster: ${guests}\n` +
        `Datum: 26–27 juni 2026, Stora Sundby Slott\n` +
        `Pris: ${PRICE} kr (2 dagar)\n` +
        `Förskott (20%): ${ADVANCE} kr\n` +
        `Deposition: ${DEPOSIT} kr`;

      const { error } = await supabase.from("bookings").insert({
        name,
        email,
        phone,
        message,
        meta: {
          festival: FESTIVAL_KEY,
          event: "CLSR Butikfestival",
          tentType: TENT_TYPE,
          tentBatch: TENT_TYPE,
          guests,
          totalPrice: PRICE,
          advance: ADVANCE,
          deposit: DEPOSIT,
          eventDates: "2026-06-26/2026-06-27",
        },
      });

      if (error) throw error;

      await supabase.rpc("decrease_tent_inventory", {
        p_festival: FESTIVAL_KEY,
        p_tent_type: TENT_TYPE,
      });

      setStep(3);
      fetchAvailability();
    } catch (err: any) {
      console.error(err);
      toast.error("Kunde inte skicka bokningen. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="boka-talt" className="relative">
      {/* HERO */}
      <div className="relative min-h-[88vh] flex items-center justify-center overflow-hidden py-16">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={clsrCastle.url}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={clsrHeroVideo.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-[1]" />


        <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-4xl">
          <Badge className="mb-6 bg-white/15 text-white border-white/30 backdrop-blur-sm">
            CLSR Boutique Festival · 26–27 juni 2026 · Stora Sundby Slott
          </Badge>
          <h2
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
          >
            Private VIP Glamping Stay
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Endast 9 exklusiva VIP-tält tillgängliga — bara 5 minuter från scenen.
            Din egen privata plats att vila, sova, ladda och umgås med vänner under festivalen.
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-10">
            {[
              { label: "Dagar", value: countdown.days },
              { label: "Tim", value: countdown.hours },
              { label: "Min", value: countdown.minutes },
              { label: "Sek", value: countdown.seconds },
            ].map((u) => (
              <div
                key={u.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg py-3"
              >
                <div className="text-2xl md:text-3xl font-bold tabular-nums">
                  {String(u.value).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase tracking-wider text-white/70">
                  {u.label}
                </div>
              </div>
            ))}
          </div>

          {/* Booking Card – contains ALL steps */}
          <Card className="bg-white/95 backdrop-blur-md text-foreground p-0 max-w-2xl mx-auto shadow-2xl overflow-hidden text-left">
            {/* Image collage */}
            <div className="relative p-3 bg-muted/30">
              <div className="grid grid-cols-4 grid-rows-2 gap-2 h-64 md:h-80">
                <div className="relative col-span-2 row-span-2 rounded-lg overflow-hidden">
                  <img
                    src={clsrDeluxe.url}
                    alt="Deluxe VIP glampingtält interiör med bäddad säng"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-background/90 text-foreground border-0 text-xs">
                      Deluxe
                    </Badge>
                  </div>
                </div>
                <div className="relative col-span-2 rounded-lg overflow-hidden">
                  <img
                    src={clsrTentsNight.url}
                    alt="Glampingtält i skymningen med lyktor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={clsrCampPath.url}
                    alt="Stigen till glampingområdet"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={clsrCastle.url}
                    alt="Stora Sundby Slott"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute top-5 right-5 z-10">
                <Badge variant={isSoldOut ? "destructive" : "secondary"} className="text-sm shadow-md">
                  {isSoldOut ? "Slutsålt" : `${available} av ${TOTAL_TENTS} kvar`}
                </Badge>
              </div>
            </div>



            <div className="p-6 md:p-8">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-sm text-muted-foreground">Deluxe VIP Glamping Stay</p>
                  <p className="text-3xl font-bold">16 800 kr</p>
                  <p className="text-xs text-muted-foreground">
                    2 dagar · upp till 4 gäster
                  </p>
                </div>
              </div>

              {step === 1 && (
                <Button
                  size="lg"
                  className="w-full btn-hero"
                  onClick={() => setStep(2)}
                  disabled={isSoldOut}
                >
                  {isSoldOut ? "Slutsålt" : "Boka din privata vistelse"}
                </Button>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold">Slutför din bokning</h3>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="clsr-name">Namn *</Label>
                      <Input id="clsr-name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
                    </div>
                    <div>
                      <Label htmlFor="clsr-phone">Telefon *</Label>
                      <Input id="clsr-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={30} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="clsr-email">E-post *</Label>
                    <Input id="clsr-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
                  </div>

                  <div>
                    <Label htmlFor="clsr-guests">Antal gäster (max 4) *</Label>
                    <Input
                      id="clsr-guests"
                      type="number"
                      min={1}
                      max={4}
                      value={guests}
                      onChange={(e) => setGuests(Math.max(1, Math.min(4, parseInt(e.target.value) || 1)))}
                      required
                    />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Pris (2 dagar)</span>
                      <span className="font-medium">{PRICE.toLocaleString("sv-SE")} kr</span>
                    </div>
                    <div className="flex justify-between text-primary">
                      <span>Förskott vid bokning (20%)</span>
                      <span className="font-bold">{ADVANCE.toLocaleString("sv-SE")} kr</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Deposition (vid ankomst)</span>
                      <span>{DEPOSIT.toLocaleString("sv-SE")} kr</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="clsr-terms"
                      checked={acceptedTerms}
                      onCheckedChange={(c) => setAcceptedTerms(c === true)}
                    />
                    <Label htmlFor="clsr-terms" className="text-sm leading-relaxed cursor-pointer">
                      Jag godkänner{" "}
                      <TermsModal
                        trigger={
                          <button type="button" className="underline text-primary">
                            villkoren
                          </button>
                        }
                      />{" "}
                      och att förskottet är icke återbetalningsbart.
                    </Label>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} disabled={isSubmitting}>
                      Tillbaka
                    </Button>
                    <Button type="submit" className="flex-1 btn-hero" disabled={isSubmitting || isSoldOut}>
                      {isSubmitting ? "Skickar..." : `Boka för ${ADVANCE.toLocaleString("sv-SE")} kr förskott`}
                    </Button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="text-center py-2">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Tack för din bokning!</h3>
                  <p className="text-muted-foreground mb-4">
                    Vi har tagit emot din förfrågan för CLSR Butikfestival.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 text-left text-sm space-y-2">
                    <p>
                      <strong>Betala förskott:</strong> {ADVANCE.toLocaleString("sv-SE")} kr (20%) via Swish till{" "}
                      <strong>123 456 78 90</strong> eller Bankgiro <strong>1234-5678</strong>.
                    </p>
                    <p>
                      Märk betalningen med ditt namn och &quot;CLSR&quot;. Deposition om{" "}
                      {DEPOSIT.toLocaleString("sv-SE")} kr betalas vid ankomst.
                    </p>
                    <p>Vi bekräftar din bokning så snart förskottet är registrerat.</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* DETAILS */}
      <div className="bg-background py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 mb-14">
            <div>
              <h3 className="text-2xl font-bold mb-4">Varför CLSR med Tentify?</h3>
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <b.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{b.text}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Perfekt för att vila, sova över, ta en tupplur eller söka skydd vid regn
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Allt detta ingår</h3>
              <div className="grid grid-cols-2 gap-2">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slideshow gallery */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Upplev miljön</h3>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-elegant bg-muted/40">
              {slideshowImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    i === slide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <button
                onClick={() => setSlide((p) => (p - 1 + slideshowImages.length) % slideshowImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-smooth"
                aria-label="Föregående bild"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setSlide((p) => (p + 1) % slideshowImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-smooth"
                aria-label="Nästa bild"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {slideshowImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === slide ? "bg-white w-6" : "bg-white/50"
                    }`}
                    aria-label={`Gå till bild ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {slideshowImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Visa bild ${i + 1}`}
                  className={`relative aspect-video rounded-lg overflow-hidden transition-all ${
                    i === slide ? "ring-2 ring-primary" : "ring-1 ring-border opacity-80 hover:opacity-100"
                  }`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClsrBookingSection;
