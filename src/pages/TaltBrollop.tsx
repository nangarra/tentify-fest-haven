import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  Info,
  Quote,
  Users,
  Car,
  Clock,
  Truck,
  MapPin,
  Tent,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import brollopVideo from "@/assets/tentify_brolopp.mp4.asset.json";
import brollopInteriör from "@/assets/tentify_brollopstalt_hyra.webp.asset.json";
import brollopTaltrad from "@/assets/tentify_brollopstalt_hyra_talt.webp.asset.json";
import brollopPerson from "@/assets/tentify_brollop_talt.webp.asset.json";
import brollopCamp from "@/assets/tentify_brollopstalt.webp.asset.json";

import glampingNatur from "@/assets/glamping-talt-naturmiljo-skane.webp";
import glampingUtemoebler from "@/assets/glamping-talt-utemoebler-komfort.webp";
import inutiSovplats from "@/assets/glamping-talt-inuti-sovplats.webp";
import dubbelsang from "@/assets/glampingtalt-dubbelsang.webp";

const caseImages = [
  {
    src: brollopTaltrad.url,
    alt: "Glampingby med tio uppsatta glampingtält för bröllopsgäster utanför Helsingborg",
  },
  {
    src: brollopCamp.url,
    alt: "Glampingtält med stolar, bord och ljusslingor på bröllopsplats i Skåne",
  },
  {
    src: brollopInteriör.url,
    alt: "Inuti ett glampingtält med bekväm uppblåsbar Deluxe-säng för bröllopsgäster",
  },
  {
    src: brollopPerson.url,
    alt: "Tentify på plats framför färdigställda glampingtält inför bröllopshelgen",
  },
];

const galleriBilder = [
  { src: glampingNatur, alt: "Glampingtält till bröllop i Skåne i naturmiljö" },
  { src: glampingUtemoebler, alt: "Möblerat glampingtält med utemöbler vid utomhusbröllop" },
  { src: inutiSovplats, alt: "Mysig sovplats inuti glampingtält för övernattande bröllopsgäster" },
  { src: dubbelsang, alt: "Glampingtält med bekväm dubbelsäng för bröllopsgäster" },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const TaltBrollop = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: "",
    guests: "",
    nights: "",
    type: "privat",
    message: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast({
        title: "Fyll i dina kontaktuppgifter",
        description: "Namn, e-post och telefonnummer behövs för att vi ska kunna återkomma.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const message = [
        `Typ: ${form.type === "foretag" ? "Bröllopsanläggning / företag" : "Privat bröllop"}`,
        `Datum: ${form.date || "-"}`,
        `Plats: ${form.location || "-"}`,
        `Antal övernattande gäster: ${form.guests || "-"}`,
        `Antal nätter: ${form.nights || "-"}`,
        "",
        form.message || "(inget meddelande)",
      ].join("\n");

      const { error } = await supabase.from("contact_requests").insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message,
          source_page: "/talt-brollop",
        },
      ]);
      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting wedding quote request:", err);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte skicka din förfrågan. Försök gärna igen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: "Kan man hyra glampingtält till bröllop?",
      answer:
        "Ja, glampingtält passar mycket bra till bröllop där gästerna behöver sova nära festen. Vi levererar, ställer upp och inreder tälten så att gästerna kan checka in direkt.",
    },
    {
      question: "Är era tält festtält eller sovtält?",
      answer:
        "Tentifys tält används som möblerade sovtält och glampingtält för gäster. De är inte stora partytält för middag och dans.",
    },
    {
      question: "Passar glampingtält för lantligt bröllop?",
      answer:
        "Ja, glampingtält passar särskilt bra till lantliga bröllop, trädgårdsbröllop och utomhusbröllop där ni vill skapa en mysig helhetsupplevelse med övernattning på plats.",
    },
    {
      question: "Vad kostar det att hyra tält till bröllop?",
      answer:
        "Priset beror på antal tält, plats, datum, antal nätter och vilken inredning som ska ingå. Skicka in en förfrågan så återkommer vi med ett personligt prisförslag.",
    },
    {
      question: "Levererar ni bröllopstält i Skåne?",
      answer:
        "Tentify utgår från Skåne och hjälper till med glampingtält till bröllop i bland annat Helsingborg, Malmö, Lund och Skåne med omnejd.",
    },
    {
      question: "Kan en bröllopslokal hyra tält för att få fler övernattande gäster?",
      answer:
        "Ja. Slott, gårdar, vingårdar och eventanläggningar kan tillfälligt utöka sin boendekapacitet med kompletta glampingtält, utan permanenta byggprojekt.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Glampingtält till bröllop i Skåne | Boende för bröllopsgäster</title>
        <meta
          name="description"
          content="Hyr glampingtält till bröllop i Skåne. Komplett glampingby med bäddade sängar, leverans, uppsättning och nedmontering – så kan gästerna stanna hela helgen."
        />
        <link rel="canonical" href="https://tentify.se/talt-brollop" />
        <meta property="og:title" content="Glampingtält till bröllop i Skåne | Boende för bröllopsgäster" />
        <meta
          property="og:description"
          content="Hyr glampingtält till bröllop i Skåne. Komplett glampingby med bäddade sängar, leverans, uppsättning och nedmontering."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tentify.se/talt-brollop" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <main>
          {/* Hero med video */}
          <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={brollopCamp.url}
                aria-hidden="true"
                tabIndex={-1}
                className="w-full h-full object-cover object-[60%_center] md:object-center motion-reduce:hidden"
              >
                <source src={brollopVideo.url} type="video/mp4" />
              </video>
              <img
                src={brollopCamp.url}
                alt="Glampingtält uppställda för bröllopsgäster på en gård i Skåne"
                className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
              <h1
                className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
              >
                Förläng bröllopet – låt gästerna stanna hela helgen
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl text-white/95 mb-8 leading-relaxed"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
              >
                Tentify skapar en färdig glampingby där era gäster kan sova bekvämt nära festen.
                Vi levererar, inreder, bäddar och tar hand om allt – så att ni kan fokusera på bröllopet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                <Button
                  size="lg"
                  className="btn-hero text-base sm:text-lg px-8 py-6"
                  onClick={() => scrollTo("offert")}
                >
                  Få prisförslag
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base sm:text-lg px-8 py-6 bg-white/10 backdrop-blur border-white/70 text-white hover:bg-white hover:text-foreground"
                  onClick={() => scrollTo("sa-fungerar-det")}
                >
                  Se hur det fungerar
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/85">
                Komplett leverans • Bekväma sängar • Professionell uppsättning • Personlig kontakt
              </p>
            </div>
          </section>

          {/* Personlig sektion */}
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <img
                src={brollopPerson.url}
                alt="Person från Tentify framför färdigställda glampingtält inför ett bröllop"
                loading="lazy"
                decoding="async"
                width={1200}
                height={1600}
                className="w-full aspect-[4/5] object-cover rounded-3xl shadow-card"
              />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Personlig hjälp hela vägen
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Hej, det är jag som hjälper er med bokningen och ser till att allt fungerar inför den
                  stora dagen. Från den första planeringen till uppsättningen av tälten finns jag här för
                  att hjälpa er att hitta rätt lösning för platsen, antalet gäster och den känsla ni vill
                  skapa.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Vi levererar tälten, ställer upp dem och gör dem redo för era gäster. Ni ska inte behöva
                  fundera på logistiken – vi tar hand om detaljerna.
                </p>
                <p className="text-foreground font-medium">Din kontaktperson på Tentify</p>
                <Button className="btn-hero mt-6" onClick={() => scrollTo("offert")}>
                  Få prisförslag
                </Button>
              </div>
            </div>
          </section>

          {/* Case study */}
          <section className="py-16 md:py-24 bg-gradient-subtle">
            <div className="container mx-auto px-4 max-w-6xl">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-3">
                Ett riktigt Tentify-bröllop
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Majas bröllopshelg utanför Helsingborg
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-10">
                När Maja planerade sitt bröllop ville hon ge gästerna mer än bara en fantastisk fest. Hon
                ville att de skulle kunna stanna kvar, sova bekvämt och fortsätta umgås tillsammans under
                hela helgen.
              </p>

              <img
                src={caseImages[0].src}
                alt={caseImages[0].alt}
                loading="lazy"
                decoding="async"
                width={1920}
                height={1080}
                className="w-full aspect-[16/9] object-cover rounded-3xl shadow-card mb-4"
              />

              {/* Swipebart galleri */}
              <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                <div className="flex gap-4 pb-2">
                  {caseImages.slice(1).map((img) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={900}
                      className="snap-center shrink-0 w-[80%] sm:w-[48%] md:w-[32%] aspect-[4/3] object-cover rounded-2xl shadow-card"
                    />
                  ))}
                </div>
              </div>

              {/* Faktaruta */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
                {[
                  { icon: MapPin, label: "Plats", value: "Utanför Helsingborg" },
                  { icon: Tent, label: "Antal tält", value: "10 kompletta glampingtält" },
                  { icon: CalendarDays, label: "Övernattning", value: "Två nätter" },
                  { icon: Truck, label: "Leverans", value: "Uppsättning, inredning och nedmontering" },
                  { icon: Sparkles, label: "Resultat", value: "Gästerna kunde stanna hela bröllopshelgen" },
                ].map((f) => (
                  <Card key={f.label} className="p-5 shadow-card">
                    <f.icon className="w-6 h-6 text-primary mb-3" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground mb-1">{f.label}</p>
                    <p className="text-foreground font-medium leading-snug">{f.value}</p>
                  </Card>
                ))}
              </div>

              <div className="max-w-3xl mt-10 space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Tentify skapade en komplett glampingby med tio fullt inredda tält för bröllopsgästerna.
                  Genom att erbjuda boende på plats kunde Maja och hennes gäster förlänga upplevelsen från
                  en enskild bröllopsdag till en hel helg tillsammans.
                </p>
                <p>
                  Responsen från både Maja och gästerna var mycket positiv. Gästerna slapp ordna transport
                  hem sent på kvällen och kunde i stället fortsätta umgås, vakna upp tillsammans och dela
                  ännu fler minnen dagen efter.
                </p>
              </div>

              <Card className="mt-8 p-5 flex gap-3 items-start bg-primary/5 border-primary/20 max-w-3xl">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                <p className="text-muted-foreground leading-relaxed">
                  På vissa bilder syns sängarna innan de sista sängkläderna har lagts på. Av hygieniska
                  skäl levereras våra sängkläder rena och vakuumförpackade och öppnas först i samband med
                  att boendet färdigställs inför gästernas ankomst.
                </p>
              </Card>

              <Card className="mt-6 p-8 max-w-3xl shadow-card">
                <Quote className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed">
                  ”Det betydde mycket att gästerna kunde stanna i två nätter och att vi fick uppleva en hel
                  bröllopshelg tillsammans, i stället för att alla behövde åka hem efter festen.”
                </blockquote>
                <p className="mt-4 text-sm text-muted-foreground">
                  Sammanfattning av kundens upplevelse
                </p>
              </Card>
            </div>
          </section>

          {/* Värde */}
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Gör bröllopet till en hel helg
              </h2>
              <div className="max-w-3xl space-y-4 text-lg text-muted-foreground leading-relaxed mb-12">
                <p>
                  När gästerna kan sova på plats förändras hela upplevelsen. Ingen behöver lämna festen
                  tidigt, ordna taxi eller fundera på vem som ska köra. Vänner och familj kan fortsätta
                  umgås efter festen och vakna upp tillsammans morgonen därpå.
                </p>
                <p>
                  Det skapar mer tid tillsammans, mindre stress och ett bröllop som gästerna kommer att
                  minnas långt efteråt.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Users, title: "Fler gäster kan stanna", text: "Boende direkt vid bröllopsplatsen." },
                  { icon: Car, title: "Ingen behöver köra hem", text: "Tryggare och enklare efter festen." },
                  { icon: Clock, title: "Mer tid tillsammans", text: "Förläng firandet från en kväll till en hel helg." },
                  { icon: Truck, title: "Vi sköter logistiken", text: "Leverans, uppsättning, inredning och nedmontering." },
                ].map((c) => (
                  <Card key={c.title} className="p-6 shadow-card">
                    <c.icon className="w-7 h-7 text-primary mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                    <p className="text-muted-foreground">{c.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* B2B – slott, gårdar och bröllopsanläggningar */}
          <section className="py-16 md:py-24 bg-gradient-subtle">
            <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Fler övernattande gäster – utan att bygga fler hotellrum
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Har ni en fantastisk bröllopslokal men för få övernattningsmöjligheter? Tentify hjälper
                  slott, gårdar och andra bröllopsanläggningar att tillfälligt utöka sin boendekapacitet
                  med kompletta glampingtält.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Tälten kan placeras i anslutning till lokalen och anpassas efter varje bröllop, event
                  eller helg. På så sätt kan ni ta emot fler övernattande gäster, erbjuda ett mer komplett
                  bröllopspaket och skapa en unik upplevelse – utan permanenta byggprojekt eller stora
                  investeringar.
                </p>
                <ul className="space-y-3 text-muted-foreground text-lg mb-8">
                  {[
                    "Tillfällig utökning av boendekapaciteten",
                    "Kompletta boendepaket för bröllopshelger",
                    "Återkommande samarbete under bröllopssäsongen",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className="btn-hero text-lg px-8"
                  onClick={() => {
                    update("type", "foretag");
                    scrollTo("offert");
                  }}
                >
                  Diskutera ett samarbete
                </Button>
              </div>
              <img
                src={brollopCamp.url}
                alt="Glampingtält uppställda vid en bröllopsgård som utökat sin boendekapacitet"
                loading="lazy"
                decoding="async"
                width={1600}
                height={1200}
                className="w-full aspect-[4/3] object-cover rounded-3xl shadow-card"
              />
            </div>
          </section>

          {/* Så fungerar det */}
          <section id="sa-fungerar-det" className="py-16 md:py-24 bg-background scroll-mt-24">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
                Så fungerar det
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    n: "1",
                    title: "Berätta om bröllopet",
                    text: "Skicka datum, plats och ungefärligt antal gäster.",
                  },
                  {
                    n: "2",
                    title: "Vi tar fram en lösning",
                    text: "Vi rekommenderar antal tält, upplägg och vad som ska ingå.",
                  },
                  {
                    n: "3",
                    title: "Vi bygger glampingbyn",
                    text: "Vi levererar, ställer upp och inreder tälten inför gästernas ankomst.",
                  },
                  {
                    n: "4",
                    title: "Vi tar hand om nedmonteringen",
                    text: "Efter bröllopet hämtar vi allt igen.",
                  },
                ].map((s) => (
                  <Card key={s.n} className="p-6 shadow-card">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold mb-4">
                      {s.n}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground">{s.text}</p>
                  </Card>
                ))}
              </div>
              <p className="text-lg text-muted-foreground mt-8 max-w-3xl">
                Ni behöver inte hämta, bygga eller transportera tälten själva – vi sköter hela logistiken
                från leverans till nedmontering.
              </p>
            </div>
          </section>

          {/* Vad som ingår */}
          <section className="py-16 md:py-24 bg-gradient-subtle">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Vad kan ingå i en komplett lösning?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                Exakt innehåll och antal bäddar anpassas efter ert bröllop. Beroende på valt paket kan
                följande ingå:
              </p>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-muted-foreground text-lg">
                {[
                  "Glampingtält",
                  "Bekväma uppblåsbara Deluxe-sängar",
                  "Lakan",
                  "Täcke och kudde",
                  "Matta",
                  "Belysning",
                  "Nattduksbord",
                  "Stol och bord",
                  "Dörrmatta",
                  "Personlig goodiebag",
                  "Leverans",
                  "Uppsättning",
                  "Nedmontering",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {galleriBilder.map((b) => (
                  <img
                    key={b.src}
                    src={b.src}
                    alt={b.alt}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                    className="w-full aspect-[4/3] object-cover rounded-2xl shadow-card"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Offert */}
          <section id="offert" className="py-16 md:py-24 bg-background scroll-mt-24">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Berätta om ert bröllop
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Skicka datum, plats och ungefärligt antal gäster så återkommer vi med ett förslag på hur vi
                kan skapa en komplett glampingby för er bröllopshelg.
              </p>

              <Card className="p-6 md:p-8 shadow-card">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">Tack för er förfrågan!</h3>
                    <p className="text-muted-foreground">
                      Vi har tagit emot informationen om ert bröllop och återkommer med ett personligt
                      förslag så snart vi kan.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="w-name">Namn *</Label>
                        <Input id="w-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ert namn" required />
                      </div>
                      <div>
                        <Label htmlFor="w-email">E-post *</Label>
                        <Input id="w-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="din@email.se" required />
                      </div>
                      <div>
                        <Label htmlFor="w-phone">Telefonnummer *</Label>
                        <Input id="w-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="070-123 45 67" required />
                      </div>
                      <div>
                        <Label htmlFor="w-date">Datum för bröllopet</Label>
                        <Input id="w-date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="w-location">Bröllopsplats</Label>
                        <Input id="w-location" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Ort eller plats" />
                      </div>
                      <div>
                        <Label htmlFor="w-guests">Antal övernattande gäster</Label>
                        <Input id="w-guests" inputMode="numeric" value={form.guests} onChange={(e) => update("guests", e.target.value)} placeholder="t.ex. 20" />
                      </div>
                      <div>
                        <Label htmlFor="w-nights">Antal nätter</Label>
                        <Input id="w-nights" inputMode="numeric" value={form.nights} onChange={(e) => update("nights", e.target.value)} placeholder="t.ex. 2" />
                      </div>
                      <div>
                        <Label htmlFor="w-type">Typ av förfrågan</Label>
                        <select
                          id="w-type"
                          value={form.type}
                          onChange={(e) => update("type", e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="privat">Privat bröllop</option>
                          <option value="foretag">Bröllopsanläggning / företag</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="w-message">Meddelande</Label>
                      <Textarea id="w-message" rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Berätta gärna mer om er plats, era gäster och den känsla ni vill skapa..." />
                    </div>
                    <Button type="submit" size="lg" className="btn-hero w-full text-lg" disabled={isSubmitting}>
                      {isSubmitting ? "Skickar..." : "Få ett kostnadsfritt prisförslag"}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      Ingen bindning – vi återkommer med ett personligt förslag.
                    </p>
                  </form>
                )}
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Vanliga frågor om glamping till bröllop
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <p className="text-muted-foreground mt-10 text-center">
                Läs mer om att{" "}
                <Link to="/hyra-glampingtalt" className="text-primary underline">
                  hyra glampingtält
                </Link>
                ,{" "}
                <Link to="/hyra-talt-skane" className="text-primary underline">
                  hyra tält i Skåne
                </Link>
                ,{" "}
                <Link to="/festival-glamping" className="text-primary underline">
                  festival glamping
                </Link>{" "}
                och{" "}
                <Link to="/glamping-sweden-rock" className="text-primary underline">
                  Sweden Rock glamping
                </Link>
                .
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default TaltBrollop;
