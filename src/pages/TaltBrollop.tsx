import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowDown,
  ArrowRight,
  BedDouble,
  Check,
  Clock3,
  Coffee,
  Gift,
  Heart,
  Lamp,
  MapPin,
  Moon,
  PackageOpen,
  Sparkles,
  Tent,
  Truck,
  Users,
} from "lucide-react";

import weddingVideo from "@/assets/tentify_brolopp-2.mp4.asset.json";
import portraitAsset from "@/assets/tentify_brollop_talt-2.webp.asset.json";
import villageAsset from "@/assets/tentify_brollopstalt_hyra_talt.webp.asset.json";
import rowAsset from "@/assets/tentify_brollopstalt.webp.asset.json";
import interiorAsset from "@/assets/tentify_brollopstalt_hyra.webp.asset.json";
import campAsset from "@/assets/brollop-camp-3-2.webp.asset.json";
import heroFallback from "@/assets/glamping-talt-naturmiljo-skane.webp";
import bedImage from "@/assets/glampingtalt-dubbelsang.webp";
import bohoImage from "@/assets/gallery/tentify-glamping-boho.webp";

const assetUrl = (path: string) =>
  `https://id-preview--28d4af79-d39e-43d1-91d7-9c68d8d777fc.lovable.app${path}`;

const proofItems = [
  "Färdigbäddade tält",
  "Vi bygger allt",
  "Sov nära festen",
  "Från 1 200 kr / tält & natt",
];

const beforeTags = ["Taxi", "Hotell", "Chaufförer", "Gäster lämnar tidigt", "Planering", "Transport", "Splittrat sällskap"];
const afterTags = ["Festen fortsätter", "Ingen behöver köra", "Alla bor nära", "Mer tid tillsammans", "Morgon tillsammans", "Frukost dagen efter", "En hel bröllopshelg"];

const inclusionGroups = [
  { icon: BedDouble, title: "Sova", items: ["Glampingtält", "Bekväma sängar", "Madrasser", "Täcke & kudde", "Sängkläder", "Färdigbäddning"] },
  { icon: Lamp, title: "Komfort", items: ["Matta", "Belysning", "Sängbord", "Stol & bord"] },
  { icon: Gift, title: "Detaljer", items: ["Dörrmatta", "Goodiebag", "Omsorgsfull inredning"] },
  { icon: Truck, title: "Vi sköter", items: ["Leverans", "Montering", "Nedmontering"] },
];

const steps = [
  { number: "01", title: "Berätta om bröllopet", text: "Datum, plats och ungefär hur många som ska sova över." },
  { number: "02", title: "Vi planerar glampingbyn", text: "Vi rekommenderar antal tält, bäddar och placering." },
  { number: "03", title: "Vi bygger allt", text: "Vi levererar, monterar, inreder och bäddar." },
  { number: "04", title: "Ni firar", text: "Efter helgen monterar vi ner och hämtar allt igen." },
];

const venueBenefits = [
  "Ta emot större bröllop",
  "Fler övernattande gäster",
  "Flexibel kapacitet",
  "Ingen investering",
  "Ingen lagring",
  "Ingen montering för personalen",
];

const priceFactors = ["Antal tält", "Antal nätter", "Plats", "Bäddar per tält", "Inredningsnivå", "Transport", "Tillval"];

const faq = [
  {
    q: "Kan man hyra glampingtält till bröllop?",
    a: "Ja. Tentify levererar möblerade och färdigbäddade glampingtält direkt till bröllopsplatsen. Det passar särskilt bra på gårdar, slott, vingårdar och lantliga festplatser där boendet är begränsat eller där ni vill samla gästerna på samma plats.",
  },
  {
    q: "Vad kostar glampingtält till bröllop?",
    a: "Priset börjar från 1 200 kr per tält och natt. Den slutliga offerten påverkas av antal tält, antal nätter, plats, antal bäddar, inredningsnivå, transport och tillval. Skicka datum, plats och ungefärligt gästantal så får ni ett personligt prisförslag utan förpliktelse.",
  },
  {
    q: "Hur många personer kan sova i ett glampingtält?",
    a: "Antalet beror på vald tältmodell och bäddning. Vi planerar en kombination av dubbel- och enkelsängar efter ert sällskap och rekommenderar ett upplägg som känns bekvämt för gästerna.",
  },
  {
    q: "Hur många tält behöver vi till våra bröllopsgäster?",
    a: "Det avgörs av hur många som vill stanna, hur gästerna delar rum och vilken komfortnivå ni önskar. När vi fått er preliminära gästlista hjälper vi er att räkna fram ett lämpligt antal tält och bäddar.",
  },
  {
    q: "Hur mycket mark behövs för glampingbyn?",
    a: "Markbehovet varierar med tältantal, terräng och hur samlat området ska vara. Ytan behöver vara relativt plan, tillgänglig för leverans och ha säkra avstånd mellan tält och andra byggnader. Vi går igenom platsens förutsättningar innan upplägget bekräftas.",
  },
  {
    q: "Kan gästerna bo två nätter?",
    a: "Absolut. Två nätter är ett uppskattat upplägg eftersom gästerna kan komma på fredagen, fira utan transportstress och vakna tillsammans även efter bröllopsdagen. Fler nätter kan planeras efter plats och datum.",
  },
  {
    q: "Vad händer om det regnar?",
    a: "Glampingtälten är gjorda för utomhusbruk och planeras med väder, underlag och placering i åtanke. Vi bedömer förutsättningarna inför leveransen. Vid extrema väderförhållanden prioriterar vi alltid säkerheten och håller en nära dialog om eventuella anpassningar.",
  },
  {
    q: "Ingår sängkläder och färdigbäddning?",
    a: "Ja, i det kompletta upplägget kan tälten stå möblerade och färdigbäddade när gästerna anländer. Exakt innehåll framgår tydligt av offerten, inklusive sängar, madrasser, täcken, kuddar, sängkläder och valda detaljer.",
  },
  {
    q: "Kan gästerna betala för sitt eget tält?",
    a: "Det kan ofta lösas genom ett anpassat bokningsupplägg. Brudparet eller bröllopsplatsen kan också boka hela glampingbyn samlat. Vi rekommenderar den modell som blir enklast utifrån antal tält och hur ni vill hantera gästerna.",
  },
  {
    q: "Hur nära bröllopslokalen kan tälten stå?",
    a: "Målet är att gästerna ska kunna promenera mellan festen och boendet, men exakt placering styrs av marken, tillfart, säkerhet och platsens regler. Tillsammans hittar vi ett läge som känns nära utan att störa festytan.",
  },
  {
    q: "Levererar Tentify i hela Skåne?",
    a: "Tentify utgår från Skåne och levererar glamping till bröllop i stora delar av landskapet. Tillgänglighet och transportkostnad beror på datum, ort och upplägg.",
  },
  {
    q: "Kan ni leverera utanför Skåne?",
    a: "Ja, vi kan ta oss an bröllop i södra Sverige när datum, omfattning och logistik passar. Skicka plats och önskat antal tält så bedömer vi möjligheten och inkluderar transporten i offerten.",
  },
  {
    q: "Kan en bröllopsgård samarbeta med Tentify?",
    a: "Ja. Bröllopsgårdar och venues kan erbjuda Tentify som ett flexibelt komplement när ordinarie boende inte räcker. Ni behöver inte köpa, lagra eller montera utrustning, och samarbetet kan anpassas för enstaka helger eller återkommande bröllop.",
  },
];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const TaltBrollop = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", location: "", guests: "", nights: "", message: "" });

  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast({ title: "Fyll i era kontaktuppgifter", description: "Namn, e-post och telefonnummer behövs för att vi ska kunna återkomma.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const message = [
        `Bröllopsdatum: ${form.date || "-"}`,
        `Bröllopsplats: ${form.location || "-"}`,
        `Övernattande gäster: ${form.guests || "-"}`,
        `Antal nätter: ${form.nights || "-"}`,
        "",
        form.message || "(inget meddelande)",
      ].join("\n");
      const payload = { name: form.name, email: form.email, phone: form.phone, message, source_page: "/talt-brollop" };
      const { error } = await supabase.from("contact_requests").insert([payload]);
      if (error) throw error;
      try {
        await supabase.functions.invoke("notify-contact-request", { body: payload });
      } catch (notifyError) {
        console.warn("Contact notification not sent:", notifyError);
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting wedding quote request:", error);
      toast({ title: "Ett fel uppstod", description: "Kunde inte skicka er förfrågan. Försök gärna igen.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Glampingtält till bröllop i Skåne",
    serviceType: "Glampingboende för bröllopsgäster",
    provider: { "@type": "Organization", name: "Tentify", url: "https://tentify.se" },
    areaServed: ["Skåne", "Södra Sverige"],
    description: "Tentify bygger kompletta glampingbyar med färdigbäddade tält för bröllopsgäster direkt vid bröllopsplatsen.",
    offers: { "@type": "Offer", priceCurrency: "SEK", price: "1200", description: "Pris från 1 200 kr per tält och natt." },
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Hem", item: "https://tentify.se/" }, { "@type": "ListItem", position: 2, name: "Glamping till bröllop", item: "https://tentify.se/talt-brollop" }] };

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Helmet>
        <title>Glampingtält till bröllop i Skåne | Boende för bröllopsgäster | Tentify</title>
        <meta name="description" content="Låt gästerna stanna hela bröllopshelgen. Tentify bygger en komplett glampingby med färdigbäddade tält direkt vid bröllopsplatsen i Skåne och södra Sverige." />
        <link rel="canonical" href="https://tentify.se/talt-brollop" />
        <meta property="og:title" content="Glampingtält till bröllop i Skåne | Tentify" />
        <meta property="og:description" content="Låt gästerna stanna hela bröllopshelgen i en färdig glampingby direkt vid bröllopsplatsen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tentify.se/talt-brollop" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={heroFallback} aria-label="Tentifys glampingby för bröllopsgäster i Skåne">
          <source src={assetUrl(weddingVideo.url)} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/45 to-foreground/85" />
        <div className="relative container mx-auto px-4 pb-10 pt-32 md:pb-14 md:pt-40">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary-foreground/85">Glamping till bröllop</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight text-primary-foreground md:text-7xl">
              Låt inte festen ta slut.
              <span className="mt-2 block font-normal">Låt gästerna stanna kvar.</span>
            </h1>
            <div className="mt-7 max-w-2xl space-y-3 text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
              <p>Skapa en komplett glampingby direkt vid bröllopsplatsen där vänner och familj kan sova bekvämt, fortsätta umgås och vakna upp tillsammans dagen efter.</p>
              <p className="font-semibold text-primary-foreground">Bröllopet blir inte bara en kväll. Det blir en hel helg.</p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button className="btn-hero" onClick={() => scrollTo("offert")}>Få ett prisförslag</Button>
              <Button variant="outline" className="border-primary-foreground/70 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-foreground" onClick={() => scrollTo("majas-brollop")}>Se ett riktigt Tentify-bröllop</Button>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-primary-foreground/20 bg-primary-foreground/20 backdrop-blur-sm md:grid-cols-4">
            {proofItems.map((item) => <div key={item} className="bg-foreground/55 px-4 py-4 text-center text-sm font-medium text-primary-foreground">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">När gästerna kan stanna</p>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">Festen behöver inte sluta när musiken tystnar.</h2>
            <div className="mt-7 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>Ett av de vanligaste problemen med bröllop på gårdar, slott och lantliga platser är boendet. När gäster måste boka hotell, ordna taxi eller köra hem börjar festen ofta tunnas ut långt innan kvällen egentligen är över.</p>
              <p className="font-medium text-foreground">Med boende direkt vid bröllopsplatsen förändras allt.</p>
            </div>
          </div>
          <div className="mx-auto mt-14 grid max-w-6xl items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-lg border border-border bg-card p-6 md:p-8">
              <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Utan boende på plats</p>
              <div className="flex flex-wrap gap-3">{beforeTags.map((tag) => <span key={tag} className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">{tag}</span>)}</div>
            </div>
            <div className="flex items-center justify-center text-primary"><ArrowRight className="hidden h-8 w-8 lg:block" /><ArrowDown className="h-8 w-8 lg:hidden" /></div>
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3"><Tent className="h-6 w-6 text-primary" /><p className="text-sm font-semibold uppercase tracking-widest text-primary">Tentify glampingby</p></div>
              <div className="flex flex-wrap gap-3">{afterTags.map((tag) => <span key={tag} className="rounded-full border border-primary/25 bg-background px-4 py-2 text-sm font-medium text-foreground">{tag}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="majas-brollop" className="bg-gradient-subtle py-20 md:py-28 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Ett riktigt Tentify-bröllop</p>
                <h2 className="text-3xl font-bold text-foreground md:text-5xl">Från en bröllopsdag till en hel helg</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">Till Majas bröllopshelg utanför Helsingborg byggde Tentify upp en samlad glampingby på plats. Gästerna kunde stanna efter festen, ingen behövde ordna sen transport och vänner och familj vaknade tillsammans nästa morgon.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 md:gap-5">
                {[{ value: "10", label: "Glampingtält" }, { value: "2", label: "Nätter" }, { value: "0", label: "Tält för brudparet att montera" }].map((stat) => <div key={stat.label} className="border-l border-primary/30 pl-4"><p className="text-4xl font-bold text-primary md:text-5xl">{stat.value}</p><p className="mt-2 text-sm leading-snug text-muted-foreground">{stat.label}</p></div>)}
              </div>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-12">
              <img src={assetUrl(villageAsset.url)} alt="Glampingby vid bröllopsplats utanför Helsingborg" width="1920" height="1440" className="aspect-[4/3] w-full rounded-lg object-cover shadow-elegant md:col-span-7" />
              <img src={assetUrl(portraitAsset.url)} alt="Tentify på plats framför glampingtält för bröllopsgäster" width="1440" height="1920" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-lg object-cover object-top shadow-card md:col-span-5" />
              <img src={assetUrl(rowAsset.url)} alt="Glampingtält för bröllopsgäster uppställda intill bröllopsgården" width="1920" height="1440" loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-lg object-cover shadow-card md:col-span-5" />
              <blockquote className="flex items-center rounded-lg bg-primary p-8 text-primary-foreground md:col-span-7 md:p-12">
                <div><Heart className="mb-6 h-7 w-7" fill="currentColor" /><p className="text-xl leading-relaxed md:text-2xl">“Det betydde mycket att gästerna kunde stanna i två nätter och att vi fick uppleva en hel bröllopshelg tillsammans, i stället för att alla behövde åka hem efter festen.”</p><footer className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary-foreground/75">Maja, brud</footer></div>
              </blockquote>
            </div>
            <div className="mt-10 text-center"><Button className="btn-hero" onClick={() => scrollTo("offert")}>Få ett prisförslag</Button></div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Allt står klart</p>
              <h2 className="text-3xl font-bold text-foreground md:text-5xl">Ni planerar bröllopet. Vi bygger boendet.</h2>
              <p className="mt-5 text-lg text-muted-foreground">När gästerna anländer står glampingbyn redan färdig.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {inclusionGroups.map((group) => <Card key={group.title} className="p-6 shadow-card"><group.icon className="h-7 w-7 text-primary" /><h3 className="mt-5 text-sm font-semibold uppercase tracking-widest text-primary">{group.title}</h3><ul className="mt-5 space-y-3">{group.items.map((item) => <li key={item} className="flex items-start gap-3 text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>)}</ul></Card>)}
            </div>
            <div className="mt-6 rounded-lg border border-border bg-card px-6 py-5 text-center text-muted-foreground"><span className="font-semibold text-foreground">Tillval:</span> handdukar, extra säng och specialstyling.</div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <img src={assetUrl(interiorAsset.url)} alt="Färdigbäddat glampingtält till bröllop i Skåne" width="1920" height="1440" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-lg object-cover shadow-card" />
              <img src={bedImage} alt="Bekväm dubbelsäng i glampingtält till bröllopsgäster" width="1200" height="900" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-lg object-cover shadow-card" />
              <img src={bohoImage} alt="Varm och naturlig inredning i glampingtält för bröllopshelg" width="1200" height="900" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-lg object-cover shadow-card" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-subtle py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center"><h2 className="text-3xl font-bold text-foreground md:text-5xl">Från tom gräsmatta till färdig glampingby</h2></div>
            <div className="relative mt-14 grid gap-6 md:grid-cols-4">
              <div className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block" />
              {steps.map((step) => <div key={step.number} className="relative"><div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-background text-sm font-bold text-primary">{step.number}</div><h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{step.text}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <img src={assetUrl(campAsset.url)} alt="Flera glampingtält som extra boende vid bröllopsplats i Skåne" width="1676" height="939" loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-lg object-cover shadow-elegant" />
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">För bröllopsgårdar & venues</p>
              <h2 className="text-3xl font-bold text-foreground md:text-5xl">Fullbokat boende behöver inte betyda färre gäster.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Tentify gör det möjligt att tillfälligt utöka boendekapaciteten utan att bygga hotellrum, köpa tält eller förvara utrustning.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">{venueBenefits.map((item) => <div key={item} className="flex items-center gap-3"><Check className="h-5 w-5 shrink-0 text-primary" /><span className="text-foreground">{item}</span></div>)}</div>
              <Button className="btn-hero mt-9" onClick={() => scrollTo("offert")}>Få ett prisförslag</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">Prisindikation</p>
              <h2 className="text-3xl font-bold md:text-5xl">Vad kostar glamping till bröllop?</h2>
              <div className="mt-8"><span className="text-5xl font-bold md:text-6xl">Från 1 200 kr</span><span className="mt-2 block text-primary-foreground/75">per tält & natt</span></div>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80">Varje bröllop är unikt. Slutpriset baseras på antal tält, antal nätter, plats, antal bäddar och vald nivå på inredningen.</p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{priceFactors.map((factor) => <div key={factor} className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-4 text-sm font-medium">{factor}</div>)}</div>
              <Button variant="secondary" className="mt-8" onClick={() => scrollTo("offert")}>Få ett prisförslag</Button>
              <p className="mt-4 text-sm text-primary-foreground/70">Kostnadsfri offert • Ingen förpliktelse</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center"><h2 className="text-3xl font-bold text-foreground md:text-5xl">Vanliga frågor om glampingtält till bröllop</h2></div>
            <Accordion type="single" collapsible className="mt-12 border-t border-border">
              {faq.map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger className="text-left text-lg text-foreground">{item.q}</AccordionTrigger><AccordionContent className="pr-8 text-base leading-relaxed text-muted-foreground">{item.a}</AccordionContent></AccordionItem>)}
            </Accordion>
            <div className="mt-10 border-t border-border pt-8 text-center text-muted-foreground">
              Läs mer om att <Link to="/hyra-glampingtalt" className="font-medium text-primary underline underline-offset-4">hyra glampingtält</Link>, vår <Link to="/hyra-talt-skane" className="font-medium text-primary underline underline-offset-4">tältuthyrning i Skåne</Link> eller <Link to="/" className="font-medium text-primary underline underline-offset-4">glamping till event</Link>.
            </div>
          </div>
        </div>
      </section>

      <section id="offert" className="relative scroll-mt-24 bg-gradient-subtle py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Gör bröllopet till en hel helg</p>
              <h2 className="text-3xl font-bold text-foreground md:text-5xl">När den sista låten spelats behöver ingen åka hem.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Låt era närmaste stanna kvar, somna några steg från festen och vakna upp tillsammans dagen efter.</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">Skicka datum, plats och ungefärligt antal övernattande gäster så föreslår vi ett upplägg.</p>
              <div className="mt-9 space-y-4 text-foreground">
                <div className="flex items-center gap-3"><Moon className="h-5 w-5 text-primary" />Boende på bröllopsplatsen</div>
                <div className="flex items-center gap-3"><Users className="h-5 w-5 text-primary" />Mer tid tillsammans</div>
                <div className="flex items-center gap-3"><Coffee className="h-5 w-5 text-primary" />Morgonen blir en del av firandet</div>
              </div>
            </div>
            <Card className="p-6 shadow-elegant md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><Label htmlFor="name">Namn *</Label><Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} disabled={isSubmitted} required /></div>
                  <div><Label htmlFor="email">E-post *</Label><Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} disabled={isSubmitted} required /></div>
                  <div><Label htmlFor="phone">Telefon *</Label><Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} disabled={isSubmitted} required /></div>
                  <div><Label htmlFor="date">Bröllopsdatum</Label><Input id="date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} disabled={isSubmitted} /></div>
                  <div><Label htmlFor="location">Bröllopsplats</Label><Input id="location" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Ort eller namn på platsen" disabled={isSubmitted} /></div>
                  <div><Label htmlFor="guests">Antal övernattande gäster</Label><Input id="guests" type="number" min="1" value={form.guests} onChange={(e) => update("guests", e.target.value)} placeholder="Ex. 24" disabled={isSubmitted} /></div>
                  <div><Label htmlFor="nights">Antal nätter</Label><Input id="nights" type="number" min="1" value={form.nights} onChange={(e) => update("nights", e.target.value)} placeholder="Ex. 2" disabled={isSubmitted} /></div>
                </div>
                <div><Label htmlFor="message">Meddelande</Label><Textarea id="message" rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Berätta gärna om platsen och hur ni vill att bröllopshelgen ska kännas." disabled={isSubmitted} /></div>
                <Button type="submit" className="btn-hero w-full" disabled={isSubmitting || isSubmitted}>{isSubmitting ? "Skickar..." : isSubmitted ? "Förfrågan skickad" : "Få ett kostnadsfritt prisförslag"}</Button>
              </form>
              {isSubmitted && <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-6"><p className="font-semibold text-foreground">Tack för er förfrågan.</p><p className="mt-2 leading-relaxed text-muted-foreground">Vi har tagit emot uppgifterna och återkommer med ett förslag för er bröllopshelg.</p></div>}
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TaltBrollop;
