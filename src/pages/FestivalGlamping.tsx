import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bed, Sparkles, Tent, Music, CheckCircle } from "lucide-react";
import festivalTalt from "@/assets/festival-glamping-talt-inuti-komfort.webp";
import glampingNatur from "@/assets/glamping-talt-naturmiljo-skane.webp";

const faq = [
  {
    q: "Vad är festival glamping?",
    a: "Festival glamping innebär att du bor i ett färdigt, inrett tält istället för att släpa med eget. Hos Tentify ingår säng, bäddset, kudde och inredning.",
  },
  {
    q: "Vilka festivaler erbjuder Tentify glamping till?",
    a: "Vi förbereder bland annat glamping till Sweden Rock 2027. Skriv upp dig på väntelistan så får du information först när platserna släpps.",
  },
  {
    q: "Vad ingår i ett festivaltält från Tentify?",
    a: "Tält, sovplats med säng/bäddmadrass, täcke och kudde för två personer, matta, belysning och mysig inredning. Tältet är uppsatt när du kommer.",
  },
  {
    q: "Kan vi hyra festivaltält till privat event?",
    a: "Ja, vi hyr ut till både publika festivaler och privata event där gäster ska bo bekvämt nära platsen.",
  },
  {
    q: "Hur många får plats i ett tält?",
    a: "Två sovplatser ingår. Upp till fyra personer per tält är möjligt med tillval av extra madrasser och täcken.",
  },
];

const FestivalGlamping = () => {
  return (
    <>
      <Helmet>
        <title>Festival glamping | Hyr tält med säng</title>
        <meta
          name="description"
          content="Hyr glampingtält till festival och event. Tentify erbjuder färdiga tält med säng, inredning och bekväm sovplats för gäster och besökare."
        />
        <link rel="canonical" href="https://tentify.se/festival-glamping" />
        <meta property="og:title" content="Festival glamping | Hyr tält med säng" />
        <meta
          property="og:description"
          content="Hyr färdiga glampingtält till festival – säng, inredning och bekväm sovplats ingår."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tentify.se/festival-glamping" />
        <meta property="og:image" content={festivalTalt} />
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
        <section className="relative py-20 md:py-28 bg-gradient-primary text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/30" />
          <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Festival glamping – hyr färdiga tält med säng
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Slipp släpa tält, madrass och utrustning. Tentify förbereder färdiga
              glampingtält med säng, inredning och belysning – så att du kan fokusera
              på musiken och upplevelsen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/glamping-sweden-rock">Glamping Sweden Rock 2027</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white">
                <Link to="/hyr-glamping">Hyra glampingtält</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Vad ingår i ett festivaltält?
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: Bed, text: "Säng eller bäddmadrass, täcke och kudde för två personer" },
                { icon: Tent, text: "Tältet står färdigt monterat när du kommer fram" },
                { icon: Sparkles, text: "Matta, belysning och mysig inredning" },
                { icon: Music, text: "Bekväm bas att komma hem till efter konserten" },
              ].map((b) => (
                <Card key={b.text} className="p-5 flex items-start gap-4 shadow-card">
                  <div className="bg-primary/10 w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground">{b.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Festival glamping till Sweden Rock och event</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Tentify förbereder festivaltält för bland annat{" "}
              <Link to="/glamping-sweden-rock" className="text-primary underline">
                Glamping Sweden Rock 2027
              </Link>
              . Vi tar även emot förfrågningar från arrangörer och privatpersoner som
              behöver färdiga sovplatser till event och festivaler.
            </p>
            <p className="text-lg text-muted-foreground">
              Vill du läsa mer om hela vårt utbud? Gå till{" "}
              <Link to="/hyr-glamping" className="text-primary underline">
                hyr glampingtält
              </Link>{" "}
              eller{" "}
              <Link to="/hyra-talt-skane" className="text-primary underline">
                hyra tält i Skåne
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-8">
            <img src={festivalTalt} alt="Festivaltält med säng och inredning från Tentify" loading="lazy" className="w-full h-72 object-cover rounded-lg shadow-card" />
            <img src={glampingNatur} alt="Färdigt festivalboende med glamping" loading="lazy" className="w-full h-72 object-cover rounded-lg shadow-card" />
          </div>
        </section>

        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Vanliga frågor om festival glamping
            </h2>
            <Accordion type="single" collapsible>
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`fg-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </>
  );
};

export default FestivalGlamping;
