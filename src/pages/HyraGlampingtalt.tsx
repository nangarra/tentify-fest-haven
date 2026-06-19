import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Phone } from "lucide-react";
import glampingNatur from "@/assets/glamping-talt-naturmiljo-skane.webp";
import glampingSovplats from "@/assets/glamping-talt-inuti-sovplats.webp";
import glampingUtemoebler from "@/assets/glamping-talt-utemoebler-komfort.webp";

const faq = [
  {
    q: "Vad är ett glampingtält?",
    a: "Ett glampingtält är ett mer bekvämt och inrett tält där känslan är närmare ett mysigt boende än vanlig camping. Det kan till exempel innehålla säng, madrass, belysning och inredning.",
  },
  {
    q: "Kan man hyra glampingtält till bröllop?",
    a: "Ja, glampingtält passar mycket bra till bröllop där gästerna behöver övernatta nära festen. Det ger en mer personlig och minnesvärd känsla än vanlig camping.",
  },
  {
    q: "Kan man hyra glampingtält till festival?",
    a: "Ja, Tentify erbjuder glampingtält till festivaler och event där gäster eller besökare vill bo bekvämare.",
  },
  {
    q: "Vad kostar det att hyra glampingtält?",
    a: "Priset beror på antal tält, plats, datum och vilken inredning som ska ingå. Kontakta oss så tar vi fram en offert.",
  },
  {
    q: "Levererar ni glampingtält i Skåne?",
    a: "Ja, Tentify utgår från Skåne och kan hjälpa till med glampingtält till event, bröllop och festivaler i området.",
  },
];

const HyraGlampingtalt = () => {
  return (
    <>
      <Helmet>
        <title>Hyr glampingtält i Skåne | Tentify</title>
        <meta
          name="description"
          content="Hyr glampingtält till festival, bröllop och event. Tentify levererar färdiga tält med säng, inredning och bekväm sovplats i Skåne."
        />
        <link rel="canonical" href="https://tentify.se/hyra-glampingtalt" />
        <meta property="og:title" content="Hyr glampingtält i Skåne | Tentify" />
        <meta
          property="og:description"
          content="Hyr glampingtält till festival, bröllop och event. Tentify levererar färdiga tält med säng, inredning och bekväm sovplats i Skåne."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tentify.se/hyra-glampingtalt" />
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
        {/* Hero */}
        <section className="relative py-20 md:py-28 bg-gradient-primary text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/25" />
          <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Hyr glampingtält till festival, bröllop och event
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Vill du skapa en bekväm och minnesvärd övernattning för gäster,
              festivalbesökare eller bröllopssällskap? Tentify hyr ut färdiga
              glampingtält med säng, inredning och mysig känsla – levererat och
              uppsatt åt dig.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/#kontakt">Be om offert</Link>
            </Button>
          </div>
        </section>

        {/* Section 1 – What's included */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vad ingår när du hyr glampingtält?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              När du hyr glampingtält från Tentify får du ett färdigt boende som
              är betydligt bekvämare än vanlig camping. Våra tält kan inredas
              med säng, madrass, täcke, kudde, matta, belysning och detaljer som
              skapar en varm och lyxig känsla.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground text-lg">
              {[
                "Färdigt glampingtält",
                "Bekväm sovplats",
                "Mysig inredning",
                "Leverans och uppsättning enligt överenskommelse",
                "Passar festival, bröllop, retreat och event",
              ].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Image strip */}
        <section className="py-12 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-3 gap-8">
            <img
              src={glampingNatur}
              alt="Glampingtält med säng och inredning i naturmiljö"
              loading="lazy"
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
            <img
              src={glampingSovplats}
              alt="Bekväm sovplats inuti möblerat glampingtält"
              loading="lazy"
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
            <img
              src={glampingUtemoebler}
              alt="Lyxigt glampingtält med utemöbler för event"
              loading="lazy"
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
          </div>
        </section>

        {/* Section 2 – Use cases */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Glampingtält till bröllop, festival och event
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tentify passar för dig som vill erbjuda gästerna något mer än ett
              vanligt tält. Våra glampingtält används till{" "}
              <Link to="/talt-brollop" className="text-primary underline">
                glamping till bröllop
              </Link>
              ,{" "}
              <Link to="/festival-glamping" className="text-primary underline">
                festival glamping
              </Link>
              ,{" "}
              <Link to="/glamping-sweden-rock" className="text-primary underline">
                Sweden Rock glamping
              </Link>
              , företagsevent, privata fester och retreats där boendet ska
              kännas genomtänkt, bekvämt och enkelt.
            </p>
          </div>
        </section>

        {/* Section 3 – Skåne */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hyr glampingtält i Skåne
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tentify utgår från Skåne och hjälper kunder med glampingtält till
              event, bröllop och festivaler i södra Sverige. Oavsett om du
              planerar ett lantligt bröllop, ett mindre retreat eller ett
              festivalboende kan vi hjälpa till med en smidig lösning. Läs även
              om{" "}
              <Link to="/hyra-talt-skane" className="text-primary underline">
                hyra tält i Skåne
              </Link>{" "}
              och{" "}
              <Link to="/hyra-talt-malmo" className="text-primary underline">
                hyra tält i Malmö
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Section 4 – Pricing */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pris för att hyra glampingtält
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Priset beror på antal tält, datum, plats, hur länge tälten ska stå
              och vilken nivå av inredning som önskas. Kontakta oss med
              information om ditt event så tar vi fram ett förslag.
            </p>
            <Button asChild size="lg" className="btn-hero">
              <Link to="/#kontakt">Be om offert för glampingtält</Link>
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Vanliga frågor om att hyra glampingtält
            </h2>
            <Accordion type="single" collapsible>
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Be om offert för glampingtält
            </h2>
            <p className="mb-8 text-white/90">
              Berätta datum, plats och antal gäster så återkommer vi snabbt med
              ett förslag.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/#kontakt">
                <Phone className="w-5 h-5 mr-2" />
                Kontakta Tentify
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default HyraGlampingtalt;
