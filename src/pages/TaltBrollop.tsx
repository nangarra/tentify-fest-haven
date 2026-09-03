import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Tent,
  BedDouble,
  BedSingle,
  Layers,
  Sparkles,
  Lamp,
  Rug,
  Table2,
  Armchair,
  Gift,
  Droplets,
  PlusCircle,
  Wrench,
  Truck,
  Map,
  CheckCircle,
  MessageSquare,
  ClipboardList,
  PackageOpen,
  Handshake,
} from "lucide-react";

import heroImage from "@/assets/tentify_brollopstalt_hyra_talt.webp.asset.json";
import campImage from "@/assets/tentify_brollopstalt.webp.asset.json";
import interiorImage from "@/assets/tentify_brollopstalt_hyra.webp.asset.json";
import personImage from "@/assets/tentify_brollop_talt-2.webp.asset.json";
import lagerVy from "@/assets/brollop-camp-3-2.webp.asset.json";

import glampingNatur from "@/assets/glamping-talt-naturmiljo-skane.webp";
import glampingUtemoebler from "@/assets/glamping-talt-utemoebler-komfort.webp";
import inutiSovplats from "@/assets/glamping-talt-inuti-sovplats.webp";
import dubbelsang from "@/assets/glampingtalt-dubbelsang.webp";
import enkelsang from "@/assets/glampingtalt-enkelsang.webp";
import bohoStyling from "@/assets/gallery/tentify-glamping-boho.webp";
import slottMiljo from "@/assets/gallery/tentify-glamping-slott.webp";
import dettaIngar from "@/assets/gallery/tentify-detta-ingar.webp";

const erbjudande = [
  { icon: Tent, title: "Glampingtält i olika storlekar" },
  { icon: BedDouble, title: "Dubbelsängar eller enkelsängar" },
  { icon: Layers, title: "Madrasser" },
  { icon: BedSingle, title: "Täcken och kuddar" },
  { icon: Sparkles, title: "Sängkläder – färdigbäddat" },
  { icon: Rug, title: "Mattor" },
  { icon: Table2, title: "Sängbord" },
  { icon: Armchair, title: "Bord och stolar" },
  { icon: Layers, title: "Filtar" },
  { icon: Lamp, title: "Mysig belysning" },
  { icon: Rug, title: "Entrémattor" },
  { icon: Sparkles, title: "Styling och dekoration" },
  { icon: Gift, title: "Goodiebags till gästerna" },
  { icon: Droplets, title: "Handdukar som tillval" },
  { icon: PlusCircle, title: "Extra sängar vid behov" },
  { icon: Wrench, title: "Montering och nedmontering" },
  { icon: Truck, title: "Transport" },
  { icon: Map, title: "Ett helt samlat glampingområde" },
];

const galleri = [
  { src: heroImage.url, alt: "Flera glampingtält uppställda som glampingområde vid bröllopsgård" },
  { src: dubbelsang, alt: "Färdigbäddad dubbelsäng i glampingtält för bröllopsgäster" },
  { src: interiorImage.url, alt: "Inredning i glampingtält med säng, matta och sängbord" },
  { src: campImage.url, alt: "Glampingtält med bord, stolar och mysig belysning i kvällsljus" },
  { src: glampingUtemoebler, alt: "Utemöbler framför glampingtält på bröllopsgård" },
  { src: inutiSovplats, alt: "Mysig sovplats inuti ett glampingtält" },
  { src: bohoStyling, alt: "Bohemisk styling och dekoration i Tentifys glampingtält" },
  { src: slottMiljo, alt: "Glampingtält i herrgårdsmiljö inför bröllopshelg" },
  { src: glampingNatur, alt: "Glampingtält i naturnära miljö i Skåne" },
  { src: enkelsang, alt: "Enkelsäng med sängkläder i glampingtält" },
  { src: lagerVy.url, alt: "Samlat glampingområde med flera tält vid vattnet" },
  { src: dettaIngar, alt: "Detaljbild på inredning och utrustning i Tentifys glampingtält" },
];

const steg = [
  {
    icon: MessageSquare,
    title: "Ni kontaktar oss",
    text: "Berätta om er gård, antal bröllop och ungefär hur många extra sovplatser ni skulle vilja kunna erbjuda.",
  },
  {
    icon: ClipboardList,
    title: "Vi skapar ett upplägg",
    text: "Vi tar fram ett förslag baserat på platsen, antal tält, antal gäster och vilken nivå på inredning ni önskar.",
  },
  {
    icon: PackageOpen,
    title: "Vi bygger upp allt",
    text: "Tentify transporterar, monterar och inreder glampingområdet inför bröllopet.",
  },
  {
    icon: Truck,
    title: "Vi tar ner allt igen",
    text: "Efter bröllopet monterar vi ner och transporterar bort allt.",
  },
];

const fordelar = [
  "Ta emot större bröllop",
  "Erbjud fler gäster övernattning",
  "Skapa en komplett weekendupplevelse",
  "Ingen investering i egna tält",
  "Ingen förvaring av utrustning",
  "Ingen montering för er personal",
  "Flexibel kapacitet beroende på bröllop",
  "Kan användas bara de helger det behövs",
  "Ger gården ett mer unikt erbjudande",
  "Möjlighet till långsiktigt samarbete med Tentify",
];

const samarbetsformer = [
  "Bröllopsparet bokar direkt genom Tentify",
  "Gården bokar hela glampingområdet",
  "Boendet säljs som ett tillval till bröllopspaketet",
  "Vi tar fram ett fast samarbetsupplägg för återkommande bröllop",
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
    company: "",
    email: "",
    phone: "",
    city: "",
    website: "",
    beds: "",
    message: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast({
        title: "Fyll i era kontaktuppgifter",
        description: "Namn, e-post och telefonnummer behövs för att vi ska kunna återkomma.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const message = [
        `Företag / bröllopsgård: ${form.company || "-"}`,
        `Ort: ${form.city || "-"}`,
        `Webbplats: ${form.website || "-"}`,
        `Önskat antal extra sovplatser: ${form.beds || "-"}`,
        "",
        form.message || "(inget meddelande)",
      ].join("\n");

      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message,
        source_page: "/talt-brollop",
      };

      const { error } = await supabase.from("contact_requests").insert([payload]);
      if (error) throw error;

      try {
        await supabase.functions.invoke("notify-contact-request", { body: payload });
      } catch (notifyErr) {
        console.warn("Contact notification not sent:", notifyErr);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting venue partnership request:", err);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte skicka er förfrågan. Försök gärna igen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Glamping & extra boende för bröllopsgårdar | Tentify</title>
        <meta
          name="description"
          content="Utöka antalet sovplatser på er bröllopsgård med Tentify. Vi bygger kompletta glampingområden med tält, sängar, inredning, montering och nedmontering."
        />
        <link rel="canonical" href="https://tentify.se/talt-brollop" />
        <meta property="og:title" content="Glamping & extra boende för bröllopsgårdar | Tentify" />
        <meta
          property="og:description"
          content="Tentify skapar kompletta glampingområden med tält, sängar och inredning på er bröllopsgård – vi monterar, inreder och tar ner allt."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Glamping och extra boende för bröllopsgårdar",
            serviceType: "Glampingtält och tältboende till bröllop",
            provider: {
              "@type": "Organization",
              name: "Tentify",
              url: "https://tentify.se",
            },
            areaServed: "Skåne och södra Sverige",
            description:
              "Tentify bygger tillfälliga glampingområden på bröllopsgårdar, herrgårdar, vingårdar och festlokaler med möblerade och färdigbäddade glampingtält.",
          })}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center">
        <img
          src={heroImage.url}
          alt="Glampingtält uppställda i naturnära bröllopsmiljö på en bröllopsgård i Skåne"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/55 to-foreground/75" />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-primary-foreground/80 mb-6">
              <Sparkles className="w-4 h-4" /> För bröllopsgårdar & venues
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 text-balance">
              Fler sovplatser till er bröllopsgård
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-10">
              Låt era bröllopspar och gäster stanna hela helgen. Tentify skapar ett
              komplett glampingboende direkt på er gård.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero" onClick={() => scrollTo("samarbetsformular")}>
                Kontakta oss om samarbete
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 rounded-lg font-semibold bg-transparent border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
                onClick={() => scrollTo("galleri")}
              >
                Se våra tält
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEKTION 2 */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                Utöka ert boende – utan att bygga ut
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Många bröllopsgårdar har fantastiska lokaler men begränsat antal
                  sovplatser. Med Tentify kan ni enkelt utöka boendekapaciteten under
                  bröllopshelger och större event.
                </p>
                <p>
                  Vi bygger upp ett komplett glampingområde på er mark och tar hand om hela
                  processen – från transport och montering till inredning och nedmontering.
                </p>
                <p>
                  På så sätt kan ni erbjuda fler gäster möjligheten att stanna kvar och
                  skapa en ännu bättre helhetsupplevelse.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={campImage.url}
                alt="Glampingområde med möblerade tält uppbyggt vid en bröllopsgård"
                loading="lazy"
                className="w-full h-[420px] object-cover rounded-lg shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEKTION 3 */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Detta kan vi erbjuda
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                En komplett och färdig lösning. Tälten kommer fullt möblerade och
                färdigbäddade – ni behöver inte ordna någonting själva.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {erbjudande.map((item) => (
                <Card
                  key={item.title}
                  className="p-5 flex items-center gap-4 shadow-card hover:shadow-elegant transition-smooth"
                >
                  <span className="bg-primary/10 text-primary rounded-lg w-11 h-11 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </span>
                  <span className="font-medium text-foreground">{item.title}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEKTION 4 – GALLERI */}
      <section id="galleri" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Så ser våra glampingtält ut
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Möblerat, färdigbäddat och stylat – från exteriör och belysning till
                sängar, mattor och detaljer.
              </p>
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {galleri.map((img, i) => (
                <div
                  key={img.src + i}
                  className="mb-5 overflow-hidden rounded-lg shadow-card group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full object-cover transition-smooth group-hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEKTION 5 – SÅ FUNGERAR DET */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Så fungerar det
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steg.map((s, i) => (
                <Card key={s.title} className="p-6 shadow-card h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary/10 text-primary rounded-lg w-11 h-11 flex items-center justify-center">
                      <s.icon className="w-5 h-5" />
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      Steg {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEKTION 6 – FÖRDELAR */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={personImage.url}
                alt="Bröllopsgäst utanför ett möblerat glampingtält på bröllopsgård"
                loading="lazy"
                className="w-full h-[440px] object-cover rounded-lg shadow-elegant"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance">
                Ett bättre erbjudande till era bröllopspar
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {fordelar.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEKTION 7 – SAMARBETE */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-primary mb-6">
              <Handshake className="w-4 h-4" /> Samarbete
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Vill ni erbjuda Tentify på er bröllopsgård?
            </h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed mb-10">
              <p>
                Vi söker gärna långsiktiga samarbeten med bröllopsgårdar och venues i södra
                Sverige.
              </p>
              <p>
                Vi kan tillsammans skapa ett upplägg där ni erbjuder Tentifys
                glampingboende som ett tillval eller en del av ert bröllopspaket. Upplägget
                kan anpassas efter hur just er verksamhet fungerar.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-left mb-10">
              {samarbetsformer.map((s) => (
                <Card key={s} className="p-5 shadow-card flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{s}</span>
                </Card>
              ))}
            </div>
            <Button className="btn-hero" onClick={() => scrollTo("samarbetsformular")}>
              Prata med oss om samarbete
            </Button>
          </div>
        </div>
      </section>

      {/* SEKTION 8 – FORMULÄR */}
      <section id="samarbetsformular" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Skicka en samarbetsförfrågan
              </h2>
              <p className="text-lg text-muted-foreground">
                Berätta kort om er gård och hur många extra sovplatser ni skulle vilja
                kunna erbjuda – vi återkommer med ett förslag.
              </p>
            </div>

            <Card className="p-6 md:p-8 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Namn *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Ditt namn"
                      disabled={isSubmitted}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Företag / bröllopsgård</Label>
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Namn på gården"
                      disabled={isSubmitted}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-post *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="namn@gard.se"
                      disabled={isSubmitted}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefonnummer *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="070-123 45 67"
                      disabled={isSubmitted}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ort</Label>
                    <Input
                      id="city"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="Ex. Helsingborg"
                      disabled={isSubmitted}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Webbplats</Label>
                    <Input
                      id="website"
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                      placeholder="www.ergard.se"
                      disabled={isSubmitted}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="beds">
                    Hur många extra sovplatser skulle ni vilja kunna erbjuda?
                  </Label>
                  <Input
                    id="beds"
                    value={form.beds}
                    onChange={(e) => update("beds", e.target.value)}
                    placeholder="Ex. 20–40 sovplatser"
                    disabled={isSubmitted}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Meddelande</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Berätta om er gård, antal bröllop per år och hur ni tänker kring boende."
                    disabled={isSubmitted}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full btn-hero"
                  disabled={isSubmitting || isSubmitted}
                  aria-disabled={isSubmitting || isSubmitted}
                  style={isSubmitted ? { opacity: 0.6, pointerEvents: "none" } : {}}
                >
                  {isSubmitting
                    ? "Skickar..."
                    : isSubmitted
                      ? "Förfrågan skickad"
                      : "Skicka samarbetsförfrågan"}
                </Button>
              </form>

              {isSubmitted && (
                <Card className="mt-6 p-6 bg-primary/5 border-primary/20">
                  <p className="text-foreground leading-relaxed">
                    Tack för er förfrågan! Vi har tagit emot uppgifterna och återkommer med
                    ett förslag på hur ett glampingområde kan fungera hos er.
                  </p>
                </Card>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaltBrollop;
