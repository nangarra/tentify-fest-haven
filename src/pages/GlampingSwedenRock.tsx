import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  Bed,
  Tent,
  Sparkles,
  Users,
  PackageCheck,
  Music,
  Moon,
  HeartHandshake,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import TermsModal from "@/components/TermsModal";
import heroImg from "@/assets/lyxigt-glampingtalt-festival-tentify.webp";
import inutiImg from "@/assets/festival-glamping-talt-inuti-komfort.webp";
import utomhusImg from "@/assets/glamping-talt-utomhusmobler-festival.webp";
import sangImg from "@/assets/camping-sang-lyxig-festival-boende.webp";

const FESTIVAL_KEY = "sweden-rock-2026";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const included = [
  { icon: Bed, text: "Sovplats för två gäster (täcke, kudde, bäddmadrass)" },
  { icon: Users, text: "Plats för upp till fyra gäster i tältet" },
  { icon: Sparkles, text: "Mysig inredning – matta, belysning och detaljer" },
  { icon: Tent, text: "Tältet står färdigt när ni kommer" },
  { icon: PackageCheck, text: "Extra madrasser, täcken och kuddar som tillval" },
];

const whyGlamping = [
  { icon: PackageCheck, title: "Slipp packa tält", text: "Tältet står redo när du kommer – inget släp, ingen montering." },
  { icon: Moon, title: "Sov bekvämare", text: "Täcke, kudde och bäddmadrass ingår för två personer." },
  { icon: Music, title: "Mer festival, mindre stress", text: "Fokusera på musiken, vännerna och upplevelsen." },
];

const forWho = [
  "Par som vill bo bekvämare",
  "Vänner som vill dela tält",
  "Förstagångsbesökare på Sweden Rock",
  "Festivalgäster som inte vill släpa campingutrustning",
  "Besökare som vill ha ett enklare alternativ till hotell eller stuga",
];

const faq = [
  {
    q: "Vad är glamping på Sweden Rock?",
    a: "Glamping är ett bekvämare sätt att campa under Sweden Rock Festival. Tältet är redan uppsatt och inrett med sovplatser och utrustning.",
  },
  {
    q: "Hur många kan sova i ett Tentify-tält?",
    a: "Två sovplatser ingår, men upp till fyra gäster kan bo i varje tält. Extra uppblåsbara madrasser och täcken kan hyras till.",
  },
  { q: "Ingår täcke och kudde?", a: "Ja, täcke och kudde för två personer ingår." },
  { q: "Behöver jag ta med eget tält?", a: "Nej, tältet står färdigt när du kommer." },
  {
    q: "Är detta ett alternativ till hotell under Sweden Rock?",
    a: "Ja, det passar dig som vill bo nära festivalstämningen men bekvämare än i ett vanligt campingtält.",
  },
  {
    q: "Kan man boka Sweden Rock 2026 direkt?",
    a: "Ja, välj Sweden Rock 2026 i bokningssystemet på sidan.",
  },
];

const GlampingSwedenRock = () => {
  const [mode, setMode] = useState<"booking" | "waitlist">("booking");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | "booking" | "waitlist">(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error("Fyll i namn, e-post och telefon.");
      return;
    }
    if (mode === "booking" && !accepted) {
      toast.error("Du måste godkänna villkoren.");
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "booking") {
        const message =
          `Glamping Sweden Rock 2026\n` +
          `Antal gäster: ${guests}\n` +
          `Önskemål: ${notes || "-"}`;
        const { error } = await supabase.from("bookings").insert({
          name,
          email,
          phone,
          message,
          meta: {
            festival: FESTIVAL_KEY,
            event: "Glamping Sweden Rock 2026",
            guests,
            source: "/glamping-sweden-rock",
          },
        });
        if (error) throw error;
        setDone("booking");
      } else {
        const { error } = await supabase.from("waitlist").insert({
          festival: FESTIVAL_KEY,
          name,
          email,
          phone,
        });
        if (error) throw error;
        setDone("waitlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Något gick fel. Försök igen.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Glamping Sweden Rock 2026 | Färdigt festivaltält nära Sweden Rock</title>
        <meta
          name="description"
          content="Bo bekvämt under Sweden Rock 2026 med färdigt glampingtält från Tentify. Sängplats, täcke, kudde, bäddmadrass och mysig inredning. Boka direkt online."
        />
        <link rel="canonical" href="https://tentify.se/glamping-sweden-rock" />
        <meta property="og:title" content="Glamping Sweden Rock 2026 | Tentify" />
        <meta
          property="og:description"
          content="Färdigt glampingtält till Sweden Rock 2026 – sängplats, täcke, kudde och mysig inredning. Boka direkt online."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tentify.se/glamping-sweden-rock" />
        <meta property="og:image" content={heroImg} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden pt-20">
          <img
            src={heroImg}
            alt="Glamping Sweden Rock med färdigt tält från Tentify"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-4xl py-16">
            <Badge className="mb-6 bg-white/15 text-white border-white/30 backdrop-blur-sm">
              Sweden Rock Festival · 3–6 juni 2026
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
            >
              Glamping Sweden Rock 2026
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Bo bekvämt under Sweden Rock Festival med färdiga glampingtält, sängplats,
              täcke, kudde och mysig inredning. Kom fram, checka in och njut av festivalen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="btn-hero" onClick={() => scrollTo("boka-sweden-rock")}>
                Boka Sweden Rock 2026
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white"
                onClick={() => scrollTo("vad-ingar")}
              >
                Vad ingår?
              </Button>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Färdigt boende till Sweden Rock
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Vill du bo bekvämt under Sweden Rock utan att släpa med tält, madrasser och
              all utrustning? Tentify erbjuder färdiga glampingtält för Sweden Rock med
              sovplats, täcke, kudde, bäddmadrass och mysig inredning. Det är ett enkelt
              alternativ för dig som vill ha festivalstämning men sova bättre än på vanlig
              camping.
            </p>
          </div>
        </section>

        {/* VAD INGÅR */}
        <section id="vad-ingar" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Vad ingår i våra glampingtält under Sweden Rock?
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {included.map((item) => (
                <Card key={item.text} className="p-5 flex items-start gap-4 shadow-card">
                  <div className="bg-primary/10 w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground leading-relaxed">{item.text}</p>
                </Card>
              ))}
            </div>
            <div className="mt-8 bg-accent/20 border border-accent/40 rounded-lg p-5 text-center">
              <p className="font-medium text-foreground">
                Två sovplatser ingår. Upp till fyra gäster per tält är möjligt mot tillval
                av extra madrasser och täcken.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <img
                src={inutiImg}
                alt="Sweden Rock glamping med sängplats och inredning"
                className="w-full h-56 object-cover rounded-lg shadow-card"
                loading="lazy"
              />
              <img
                src={utomhusImg}
                alt="Färdigt festivaltält till Sweden Rock"
                className="w-full h-56 object-cover rounded-lg shadow-card"
                loading="lazy"
              />
              <img
                src={sangImg}
                alt="Bekvämt boende under Sweden Rock Festival"
                className="w-full h-56 object-cover rounded-lg shadow-card"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* VARFÖR */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Därför väljer fler glamping på Sweden Rock
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Sweden Rock är flera dagar av musik, sena kvällar och festivalhäng. Med ett
              färdigt glampingtält slipper du lägga tid på att packa, bära, slå upp tält
              och sova obekvämt. Du får känslan av camping, men med mer komfort.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {whyGlamping.map((b) => (
                <Card key={b.title} className="p-6 text-center shadow-card hover:shadow-elegant transition-smooth">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* BOKNING */}
        <section id="boka-sweden-rock" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Boka glamping till Sweden Rock 2026
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Välj Sweden Rock 2026 i bokningssystemet nedan och boka ditt glampingtält.
              Antalet tält är begränsat.
            </p>

            <Card className="p-6 md:p-8 shadow-elegant">
              {done ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">
                    {done === "booking" ? "Tack för din bokning!" : "Du är på väntelistan!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {done === "booking"
                      ? "Vi har tagit emot din förfrågan för Glamping Sweden Rock 2026 och hör av oss inom kort med bekräftelse och betalningsinstruktioner."
                      : "Vi hör av oss så snart ett tält blir tillgängligt för Sweden Rock 2026."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex gap-2 mb-6">
                    <Button
                      type="button"
                      variant={mode === "booking" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setMode("booking")}
                    >
                      Boka tält
                    </Button>
                    <Button
                      type="button"
                      variant={mode === "waitlist" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setMode("waitlist")}
                    >
                      Skriv upp mig på väntelistan
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="event">Evenemang</Label>
                      <Input id="event" value="Glamping Sweden Rock 2026" readOnly className="bg-muted/50" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="sr-name">Namn *</Label>
                        <Input id="sr-name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
                      </div>
                      <div>
                        <Label htmlFor="sr-phone">Telefon *</Label>
                        <Input id="sr-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={30} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sr-email">E-post *</Label>
                      <Input id="sr-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
                    </div>

                    {mode === "booking" && (
                      <>
                        <div>
                          <Label htmlFor="sr-guests">Antal gäster (max 4)</Label>
                          <Input
                            id="sr-guests"
                            type="number"
                            min={1}
                            max={4}
                            value={guests}
                            onChange={(e) =>
                              setGuests(Math.max(1, Math.min(4, parseInt(e.target.value) || 1)))
                            }
                          />
                          <p className="text-xs text-muted-foreground mt-1.5">
                            Två sovplatser ingår. Extra madrasser, täcken och kuddar kan
                            hyras som tillval.
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="sr-notes">Önskemål (valfritt)</Label>
                          <Textarea
                            id="sr-notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            maxLength={500}
                            rows={3}
                          />
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="sr-terms"
                            checked={accepted}
                            onCheckedChange={(c) => setAccepted(c === true)}
                          />
                          <Label htmlFor="sr-terms" className="text-sm leading-relaxed cursor-pointer">
                            Jag godkänner{" "}
                            <TermsModal
                              trigger={
                                <button type="button" className="underline text-primary">
                                  villkoren
                                </button>
                              }
                            />
                            .
                          </Label>
                        </div>
                      </>
                    )}

                    <Button type="submit" size="lg" className="w-full btn-hero" disabled={submitting}>
                      {submitting
                        ? "Skickar..."
                        : mode === "booking"
                        ? "Boka Sweden Rock 2026"
                        : "Skriv upp mig på väntelistan"}
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </section>

        {/* FÖR VEM */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Perfekt för dig som vill ha festival men lite mer komfort
            </h2>
            <ul className="space-y-3">
              {forWho.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <HeartHandshake className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Vanliga frågor om Glamping Sweden Rock
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="text-center text-sm text-muted-foreground mt-10">
              Se även våra övriga tjänster:{" "}
              <Link to="/hyr-glamping" className="underline text-primary">
                Hyr glampingtält i Skåne
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default GlampingSwedenRock;
