import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, MapPin, Phone } from "lucide-react";
import glampingNatur from "@/assets/glamping-talt-naturmiljo-skane.webp";
import glampingUtemoebler from "@/assets/glamping-talt-utemoebler-komfort.webp";
import festivalTalt from "@/assets/festival-glamping-talt-inuti-komfort.webp";

const faq = [
  {
    q: "Levererar Tentify tält i hela Skåne?",
    a: "Ja. Vi utgår från Eslöv och levererar glampingtält till event, bröllop och festival i hela Skåne – inklusive Malmö, Lund, Helsingborg, Kristianstad och Ystad.",
  },
  {
    q: "Vad ingår när man hyr tält i Skåne av Tentify?",
    a: "Våra tält levereras färdigt monterade och inredda med säng, bäddmadrass, täcke, kudde, matta, belysning och mysiga detaljer. Du behöver inte ta med någon utrustning.",
  },
  {
    q: "Hyr ni ut vanliga partytält eller glastält?",
    a: "Nej. Tentify är specialiserade på möblerade glampingtält som boende och sovplats för gäster – inte på stora partytält eller glastält.",
  },
  {
    q: "Kan man hyra tält till bröllop i Skåne?",
    a: "Ja. Många av våra kunder hyr glampingtält som boende åt bröllopsgäster vid lantliga och utomhusbröllop i Skåne.",
  },
  {
    q: "Hur bokar man och får offert?",
    a: "Kontakta oss med datum, plats och antal gäster så återkommer vi med en offert anpassad för ert event.",
  },
];

const HyraTaltSkane = () => {
  return (
    <>
      <Helmet>
        <title>Hyra tält Skåne | Glampingtält till event & bröllop</title>
        <meta
          name="description"
          content="Hyr tält i Skåne till event, bröllop och festival. Tentify erbjuder möblerade glampingtält med sovplats, inredning och enkel leverans."
        />
        <link rel="canonical" href="https://tentify.se/hyra-talt-skane" />
        <meta property="og:title" content="Hyra tält Skåne | Glampingtält till event & bröllop" />
        <meta
          property="og:description"
          content="Hyr möblerade glampingtält i Skåne till event, bröllop och festival – med säng, inredning och leverans."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tentify.se/hyra-talt-skane" />
        <meta property="og:image" content={glampingNatur} />
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
          <div className="absolute inset-0 bg-black/25" />
          <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Hyra tält i Skåne till event, bröllop och festival
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Tentify hyr ut möblerade glampingtält i hela Skåne. Färdiga sovplatser med
              säng, inredning och mysig känsla – perfekt som boende för gäster på event,
              bröllop, företagsträffar och festivaler.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/#kontakt">Begär offert</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Glampingtält i Skåne – färdigt boende för dina gäster
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Att hyra tält i Skåne behöver inte betyda stora partytält. Tentify
              levererar möblerade glampingtält med riktig säng, bäddset, täcke, kudde
              och varm belysning. Vi sätter upp tälten, inreder dem och hämtar
              efteråt – ni fokuserar på eventet.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground text-lg">
              {[
                "Färdigt monterade tält",
                "Säng, bäddset och kudde",
                "Mysig inredning och belysning",
                "Leverans i hela Skåne",
                "Bröllop, event och festival",
                "Företagsevent och kickoff",
              ].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-3 gap-8">
            <img src={glampingNatur} alt="Hyra glampingtält i naturmiljö i Skåne" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-card" />
            <img src={glampingUtemoebler} alt="Möblerat glampingtält till bröllop i Skåne" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-card" />
            <img src={festivalTalt} alt="Inrett glampingtält som boende till event i Skåne" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-card" />
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vi levererar tält till hela Skåne
            </h2>
            <p className="text-lg text-muted-foreground mb-4 flex items-start gap-2">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              Tentify har bas i Eslöv och levererar tält till Malmö, Lund, Helsingborg,
              Kristianstad, Ystad och övriga Skåne.
            </p>
            <p className="text-lg text-muted-foreground">
              Letar du efter tält i Malmö specifikt? Se vår sida för{" "}
              <Link to="/hyra-talt-malmo" className="text-primary underline">
                hyra tält i Malmö
              </Link>
              . Planerar du bröllop? Läs mer om{" "}
              <Link to="/talt-brollop" className="text-primary underline">
                glamping bröllop i Skåne
              </Link>
              . Vill du läsa allmänt om vårt utbud, gå till{" "}
              <Link to="/hyr-glamping" className="text-primary underline">
                hyr glampingtält
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Vanliga frågor om att hyra tält i Skåne
            </h2>
            <Accordion type="single" collapsible>
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-16 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Begär offert på tält i Skåne</h2>
            <p className="mb-8 text-white/90">
              Berätta datum, plats och antal gäster så återkommer vi snabbt med pris.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/#kontakt"><Phone className="w-5 h-5 mr-2" />Kontakta Tentify</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default HyraTaltSkane;
