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
import heroImg from "@/assets/glamping-sweden-rock-2027-tentify.webp.asset.json";
import camplineImg from "@/assets/sweden-rock-glamping-talt.webp.asset.json";
import fardigtTaltImg from "@/assets/fardigt-talt-sweden-rock.webp.asset.json";
import interiorImg from "@/assets/glampingtalt-sweden-rock-interior.webp.asset.json";
import bekvamtBoendeImg from "@/assets/bekvamt-boende-sweden-rock-glamping.webp.asset.json";

const FESTIVAL_KEY = "sweden-rock-2027";
const WAITLIST_CAP = 100;

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const enthalten = [
  { icon: Bed, text: "Schlafplatz für zwei Personen mit Decke, Kissen und Matratze" },
  { icon: Users, text: "Bis zu vier Personen pro Zelt möglich" },
  { icon: Sparkles, text: "Gemütliche Einrichtung – Teppich, Beleuchtung und Details" },
  { icon: Tent, text: "Das Zelt ist bei Ankunft fertig aufgebaut" },
  { icon: PackageCheck, text: "Zusätzliche Luftmatratzen und Decken können angefragt werden" },
];

const vorteile = [
  { icon: PackageCheck, title: "Weniger Gepäck", text: "Kein eigenes Zelt notwendig – alles steht für dich bereit." },
  { icon: Moon, title: "Bequem schlafen", text: "Decke, Kissen und Matratze für zwei Personen sind enthalten." },
  { icon: Music, title: "Mehr Festival", text: "Konzentriere dich auf Musik, Freunde und Atmosphäre." },
];

const fuerWen = [
  "Weniger Gepäck auf der Reise",
  "Kein eigenes Zelt notwendig",
  "Komfortabler als klassisches Camping",
  "Gute Alternative zu Hotel oder Ferienhaus",
  "Persönlicher Kontakt mit Tentify",
];

const faq = [
  {
    q: "Gibt es Glamping beim Sweden Rock Festival?",
    a: "Ja, Tentify bietet fertig aufgebaute Glamping-Zelte für Besucher des Sweden Rock Festivals.",
  },
  {
    q: "Was ist im Glamping-Zelt enthalten?",
    a: "Im Zelt enthalten sind Schlafplatz, Decke, Kissen, Matratze und gemütliche Einrichtung für zwei Personen.",
  },
  {
    q: "Kann man ohne eigene Campingausrüstung anreisen?",
    a: "Ja, das Zelt ist bereits aufgebaut und vorbereitet, wenn du ankommst.",
  },
  {
    q: "Wie viele Personen können in einem Zelt übernachten?",
    a: "Zwei Schlafplätze sind enthalten. Bis zu vier Personen pro Zelt sind möglich, wenn zusätzliche Luftmatratzen und Decken angefragt werden.",
  },
  {
    q: "Ist die Seite für Besucher aus Deutschland geeignet?",
    a: "Ja, die Seite richtet sich auch an Festivalbesucher aus Deutschland, die eine komfortable Unterkunft beim Sweden Rock Festival suchen.",
  },
  {
    q: "Kann man direkt buchen?",
    a: "Aktuell gibt es eine Warteliste. Setze dich auf die Warteliste, um Informationen zu erhalten, sobald Plätze für Sweden Rock 2027 verfügbar werden.",
  },
];

const galleryImages = [
  { src: heroImg.url, alt: "Sweden Rock Glamping Unterkunft mit fertig aufgebautem Zelt" },
  { src: camplineImg.url, alt: "Glamping-Zelt für Sweden Rock Festival Besucher" },
  { src: fardigtTaltImg.url, alt: "Komfortables Festival Camping in Schweden" },
  { src: interiorImg.url, alt: "Fertig eingerichtetes Glamping-Zelt von Tentify" },
  { src: bekvamtBoendeImg.url, alt: "Unterkunft beim Sweden Rock Festival mit Glamping-Zelt" },
];

const DeSwedenRockGlamping = () => {
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
      toast.error("Bitte Name, E-Mail und Telefonnummer ausfüllen.");
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
      setDone(true);
      setCount((c) => c + 1);
    } catch (err) {
      console.error(err);
      toast.error("Etwas ist schiefgelaufen. Bitte erneut versuchen.");
    } finally {
      setSubmitting(false);
    }
  };

  const progressValue = Math.min(100, (count / WAITLIST_CAP) * 100);

  return (
    <>
      <Helmet>
        <html lang="de" />
        <title>Sweden Rock Glamping Unterkunft 2027 | Warteliste für Festival Camping</title>
        <meta
          name="description"
          content="Komfortabel übernachten beim Sweden Rock Festival 2027. Tentify bietet Glamping-Zelte mit Schlafplatz, Decke, Kissen, Matratze und gemütlicher Einrichtung. Jetzt auf die Warteliste setzen."
        />
        <link rel="canonical" href="https://tentify.se/de/sweden-rock-glamping-unterkunft" />
        <link rel="alternate" hrefLang="de" href="https://tentify.se/de/sweden-rock-glamping-unterkunft" />
        <link rel="alternate" hrefLang="sv" href="https://tentify.se/glamping-sweden-rock" />
        <link rel="alternate" hrefLang="x-default" href="https://tentify.se/glamping-sweden-rock" />
        <meta property="og:title" content="Sweden Rock Glamping Unterkunft 2027 | Tentify" />
        <meta
          property="og:description"
          content="Komfortabel übernachten beim Sweden Rock Festival 2027 mit Glamping-Zelten von Tentify."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:url" content="https://tentify.se/de/sweden-rock-glamping-unterkunft" />
        <meta property="og:image" content={heroImg.url} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "de",
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
            src={heroImg.url}
            alt="Sweden Rock Glamping Unterkunft 2027 mit fertig aufgebautem Tentify-Zelt"
            className="absolute inset-0 w-full h-full object-cover"
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
              Sweden Rock Glamping Unterkunft 2027
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Komfortabel übernachten beim Sweden Rock Festival mit fertig aufgebauten
              Glamping-Zelten, Schlafplatz, Decke, Kissen, Matratze und gemütlicher Einrichtung.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="btn-hero" onClick={() => scrollTo("warteliste")}>
                Auf die Warteliste setzen
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white"
                onClick={() => scrollTo("enthalten")}
              >
                Was ist enthalten?
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/80">
              <Link to="/glamping-sweden-rock" className="underline hover:text-white">
                Schwedisch? Zur schwedischen Seite wechseln.
              </Link>
            </p>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Komfortabel übernachten beim Sweden Rock Festival
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Erlebe das Sweden Rock Festival 2027 mit mehr Komfort. Tentify bietet fertig
              aufgebaute Glamping-Zelte mit Schlafplatz, Decke, Kissen, Matratze und
              gemütlicher Einrichtung. Ideal für Festivalbesucher aus Deutschland, die nicht
              mit eigener Campingausrüstung reisen möchten.
            </p>
          </div>
        </section>

        {/* ENTHALTEN */}
        <section id="enthalten" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Was ist im Glamping-Zelt enthalten?
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {enthalten.map((item) => (
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
                Zwei Schlafplätze sind enthalten. Bis zu vier Personen pro Zelt sind möglich,
                wenn zusätzliche Matratzen und Decken angefragt werden.
              </p>
            </div>
          </div>
        </section>

        {/* WARUM */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Darum wählen immer mehr Glamping beim Sweden Rock
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Sweden Rock bedeutet mehrere Tage Musik, lange Nächte und Festivalatmosphäre. Mit
              einem fertig aufgebauten Glamping-Zelt sparst du dir Packen, Tragen und unbequemes
              Schlafen – Campinggefühl mit deutlich mehr Komfort.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {vorteile.map((b) => (
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

        {/* FÜR BESUCHER AUS DEUTSCHLAND */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Ideal für Festivalbesucher aus Deutschland
            </h2>
            <p className="text-center text-muted-foreground mb-10 leading-relaxed">
              Wenn du aus Deutschland zum Sweden Rock Festival reist, musst du keine eigene
              Campingausrüstung mitbringen. Dein Glamping-Zelt ist bereits aufgebaut und
              vorbereitet. So kannst du leichter reisen und dich direkt auf das Festival
              konzentrieren.
            </p>
            <ul className="space-y-3">
              {fuerWen.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <HeartHandshake className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* WARTELISTE */}
        <section id="warteliste" className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Auf die Warteliste für Sweden Rock 2027 setzen
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Wir öffnen die Interessenliste für Glamping beim Sweden Rock Festival 2027.
              Setze dich auf die Warteliste und erhalte zuerst Informationen, wenn Plätze
              verfügbar werden.
            </p>

            <Card className="p-6 md:p-8 shadow-elegant">
              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Plätze auf der Warteliste</span>
                  <span className={isFull ? "text-destructive" : "text-primary"}>
                    {count} / {WAITLIST_CAP}
                  </span>
                </div>
                <Progress value={progressValue} className="h-2" />
                {isFull && (
                  <p className="text-center mt-3 font-semibold text-destructive">
                    Die Warteliste ist voll
                  </p>
                )}
              </div>

              {done ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Du stehst auf der Warteliste!</h3>
                  <p className="text-muted-foreground">
                    Vielen Dank! Wir melden uns, sobald Plätze für Sweden Rock 2027 verfügbar werden.
                  </p>
                </div>
              ) : isFull ? (
                <div className="text-center py-4">
                  <p className="text-lg text-foreground">
                    Die Warteliste für Sweden Rock 2027 ist derzeit voll.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="de-name">Name *</Label>
                      <Input id="de-name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
                    </div>
                    <div>
                      <Label htmlFor="de-phone">Telefonnummer *</Label>
                      <Input id="de-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={30} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="de-email">E-Mail *</Label>
                    <Input id="de-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
                  </div>
                  <div>
                    <Label htmlFor="de-guests">Anzahl Personen</Label>
                    <Input
                      id="de-guests"
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
                    <Label htmlFor="de-notes">Nachricht oder Frage (optional)</Label>
                    <Textarea
                      id="de-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      maxLength={500}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full btn-hero" disabled={submitting}>
                    {submitting ? "Wird gesendet..." : "Auf die Warteliste setzen"}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </section>

        {/* GALERIE */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Bilder unserer Glamping-Zelte
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
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Häufige Fragen zu Sweden Rock Glamping
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
              <Link to="/glamping-sweden-rock" className="underline text-primary">
                Schwedisch? Zur schwedischen Seite wechseln.
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default DeSwedenRockGlamping;
