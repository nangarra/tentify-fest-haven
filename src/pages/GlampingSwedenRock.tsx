import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
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
import heroImg from "@/assets/sweden-rock-glamping-4-2.webp.asset.json";
import camplineImg from "@/assets/sweden-rock-glamping-5-2.webp.asset.json";
import fardigtTaltImg from "@/assets/sweden-rock-glamping-6-2.webp.asset.json";
import interiorImg from "@/assets/sweden-rock-glamping-7.webp.asset.json";
import bekvamtBoendeImg from "@/assets/sweden-rock-glamping-8-2.webp.asset.json";
import sovplatsImg from "@/assets/sweden-rock-glamping-9-3.webp.asset.json";
import hero2027Img from "@/assets/sweden-rock-2027-hero.png.asset.json";

const WAITLIST_VIDEO_URL = "https://swedenrock-prod.storage.googleapis.com/wp-content/uploads/2026/06/SRF_Recap_Hemsida_16x9_.mp4#t=0.1";

const upgrades = [
  "Härlig hotellfrukost",
  "Uppgraderad säng",
  "Bäddset",
  "Kylskåp",
  "Extra komfort och praktiska tillval",
];

const FESTIVAL_KEY = "sweden-rock-2027";
const WAITLIST_CAP = 100;

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
    q: "Kan jag boka glamping till Sweden Rock 2027?",
    a: "Just nu kan du skriva upp dig på väntelistan för Sweden Rock 2027. Då får du information när nya platser eller bokningsmöjligheter öppnar.",
  },
  {
    q: "Vad ingår i glampingtältet?",
    a: "Exakt innehåll kan variera beroende på paket, men målet är att erbjuda ett färdigt och bekvämt tält med sovplats, inredning och mysig känsla.",
  },
  {
    q: "Är detta ett alternativ till vanlig camping?",
    a: "Ja, Tentifys glamping är för dig som vill bo bekvämare än i ett vanligt tält och slippa ta med all campingutrustning själv.",
  },
  {
    q: "Hur fungerar väntelistan?",
    a: "Du skriver upp dig med dina kontaktuppgifter och får information när platser eller bokningsmöjligheter inför Sweden Rock 2027 öppnar.",
  },
  {
    q: "Är platserna begränsade?",
    a: "Ja, antalet glampingtält är begränsat och tidigare år har intresset varit stort. Därför rekommenderar vi att skriva upp sig på väntelistan.",
  },
  {
    q: "Var ligger tälten?",
    a: "Exakt platsinformation uppdateras inför 2027 när campingen och upplägget är fastställt.",
  },
];

const galleryImages = [
  { src: heroImg.url, alt: "Glampingtält på Sweden Rock 2027 i kvällsljus" },
  { src: camplineImg.url, alt: "Festivalboende med glampingtält i rad under Sweden Rock" },
  { src: fardigtTaltImg.url, alt: "Färdigt uppsatt glampingtält till Sweden Rock 2027" },
  { src: sovplatsImg.url, alt: "Bekväm sovplats med dubbelsäng i glampingtält på Sweden Rock" },
  { src: interiorImg.url, alt: "Inrett glampingtält med säng och mysig inredning på Sweden Rock" },
  { src: bekvamtBoendeImg.url, alt: "Bekvämt festivalboende med två sovplatser i Tentifys glampingtält" },
];

const GlampingSwedenRock = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState<number>(0);

  const loadCount = async () => {
    const { count: c } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("festival", FESTIVAL_KEY);
    setCount(c || 0);
  };

  useEffect(() => {
    loadCount();
  }, []);

  const isFull = count >= WAITLIST_CAP;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error("Fyll i namn, e-post och telefon.");
      return;
    }
    if (isFull) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist").insert({
        festival: FESTIVAL_KEY,
        name,
        email,
        phone,
      });
      if (error) throw error;
      // Note: guests + notes are collected for UX but not persisted (waitlist table has no such columns)
      setDone(true);
      setCount((c) => c + 1);
    } catch (err) {
      console.error(err);
      toast.error("Något gick fel. Försök igen.");
    } finally {
      setSubmitting(false);
    }
  };

  const progressValue = Math.min(100, (count / WAITLIST_CAP) * 100);

  return (
    <>
      <Helmet>
        <title>Glamping Sweden Rock 2027 | Väntelista</title>
        <meta
          name="description"
          content="Bo bekvämt under Sweden Rock 2027. Skriv upp dig på Tentifys väntelista för glamping med färdigt tält, sovplats och mysig inredning."
        />
        <link rel="canonical" href="https://tentify.se/glamping-sweden-rock" />
        <link rel="alternate" hrefLang="sv" href="https://tentify.se/glamping-sweden-rock" />
        <link rel="alternate" hrefLang="de" href="https://tentify.se/de/sweden-rock-glamping-unterkunft" />
        <link rel="alternate" hrefLang="x-default" href="https://tentify.se/glamping-sweden-rock" />
        <meta property="og:title" content="Glamping Sweden Rock 2027 | Väntelista" />
        <meta
          property="og:description"
          content="Bo bekvämt under Sweden Rock 2027. Skriv upp dig på Tentifys väntelista för glamping med färdigt tält, sovplats och mysig inredning."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tentify.se/glamping-sweden-rock" />
        <meta property="og:image" content={heroImg.url} />
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
            src={hero2027Img.url}
            alt="Glampingtält på Sweden Rock 2027 med festivalscen i bakgrunden"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-4xl py-16">
            <Badge className="mb-6 bg-white/15 text-white border-white/30 backdrop-blur-sm">
              Sweden Rock Festival 2027
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
            >
              Glamping Sweden Rock 2027
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Vill du bo bekvämt under Sweden Rock 2027 utan att släpa med tält, madrass och
              campingutrustning? Tentify erbjuder färdiga glampingtält med sovplats, inredning
              och mysig festivalkänsla nära Sweden Rock.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="btn-hero" onClick={() => scrollTo("vantelista")}>
                Skriv upp mig på väntelistan
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
            <p className="mt-6 text-sm text-white/80">
              <Link to="/de/sweden-rock-glamping-unterkunft" className="underline hover:text-white">
                Deutsch? Hier finden Sie unsere Sweden Rock Glamping Unterkunft auf Deutsch.
              </Link>
            </p>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Färdigt boende till Sweden Rock 2027
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Vill du bo bekvämt under Sweden Rock 2027 utan att släpa med tält, madrasser och
              all utrustning? Tentify förbereder färdiga glampingtält för Sweden Rock med
              sovplats, täcke, kudde, bäddmadrass och mysig inredning. Skriv upp dig på
              väntelistan så får du information först när platserna släpps.
            </p>
          </div>

          {/* Horisontellt scrollande galleri */}
          <div className="mt-12 -mx-4 md:mx-0">
            <div
              className="flex gap-4 overflow-x-auto px-4 md:px-0 md:max-w-6xl md:mx-auto snap-x snap-mandatory pb-4 scroll-smooth"
              style={{ scrollbarWidth: "thin" }}
              aria-label="Bilder från Tentifys glampingtält"
            >
              {galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="snap-start flex-shrink-0 w-64 h-44 md:w-80 md:h-56 object-cover rounded-xl shadow-card"
                />
              ))}
            </div>
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

        {/* VÄNTELISTA */}
        <section id="vantelista" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Skriv upp dig på väntelistan för Sweden Rock 2027
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Vi öppnar intresseanmälan för glamping till Sweden Rock 2027. Skriv upp dig på
              väntelistan för att få information först när platserna släpps.
            </p>

            <Card className="p-6 md:p-8 shadow-elegant">
              {/* Counter */}
              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Platser på väntelistan</span>
                  <span className={isFull ? "text-destructive" : "text-primary"}>
                    {count} / {WAITLIST_CAP}
                  </span>
                </div>
                <Progress value={progressValue} className="h-2" />
                {isFull && (
                  <p className="text-center mt-3 font-semibold text-destructive">
                    Väntelistan är full
                  </p>
                )}
              </div>

              {done ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Du är på väntelistan!</h3>
                  <p className="text-muted-foreground">
                    Tack! Vi hör av oss så snart platserna för Sweden Rock 2027 släpps.
                  </p>
                </div>
              ) : isFull ? (
                <div className="text-center py-4">
                  <p className="text-lg text-foreground">
                    Väntelistan för Sweden Rock 2027 är just nu full.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div>
                    <Label htmlFor="sr-guests">Antal personer</Label>
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
                  </div>
                  <div>
                    <Label htmlFor="sr-notes">Meddelande eller fråga (valfritt)</Label>
                    <Textarea
                      id="sr-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      maxLength={500}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full btn-hero" disabled={submitting}>
                    {submitting ? "Skickar..." : "Skriv upp mig på väntelistan"}
                  </Button>
                </form>
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

        {/* GALLERI */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Bilder från våra glampingtält
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-48 md:h-56 object-cover rounded-lg shadow-card"
                />
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Fler bilder kommer snart.
            </p>
          </div>
        </section>

        {/* REVIEW */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Tidigare gäster om Tentify på Sweden Rock
              </h2>
              <p className="text-muted-foreground">
                En äkta upplevelse från våra Sweden Rock-gäster.
              </p>
            </div>
            <div className="rounded-2xl bg-accent/20 border border-accent/30 p-6 md:p-8 shadow-sm">
              <div className="flex gap-1 mb-4" aria-label="5 av 5 stjärnor">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-foreground italic leading-relaxed mb-3">
                “Hejsan Niklas. Tack för en underbar Rock Festival, du gjorde den så perfekt
                med din härliga utstrålning, härlig frukost och bra service ❤️ Hoppas att vi
                ses nästa år också ❤️”
              </blockquote>
              <p className="text-sm font-medium text-muted-foreground">– Monica & Micke</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Vanliga frågor om Sweden Rock glamping
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
              Se även:{" "}
              <Link to="/festival-glamping" className="underline text-primary">
                festival glamping
              </Link>
              ,{" "}
              <Link to="/hyra-glampingtalt" className="underline text-primary">
                hyra glampingtält
              </Link>
              ,{" "}
              <Link to="/talt-brollop" className="underline text-primary">
                glamping bröllop
              </Link>{" "}
              och{" "}
              <Link to="/hyra-talt-skane" className="underline text-primary">
                hyra tält i Skåne
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
