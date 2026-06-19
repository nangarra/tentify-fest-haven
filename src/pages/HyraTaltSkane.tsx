import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
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
    q: "Kan man hyra glampingtält i Skåne?",
    a: "Ja, Tentify utgår från Skåne och erbjuder möblerade glampingtält till bröllop, festivaler, retreats och event.",
  },
  {
    q: "Är era tält vanliga partytält?",
    a: "Nej, Tentify fokuserar främst på glampingtält och möblerade sovtält. Våra tält används framför allt som boende och sovplatser för gäster.",
  },
  {
    q: "Kan man hyra tält till bröllop i Skåne?",
    a: "Ja, glampingtält passar mycket bra till bröllop där gästerna behöver sova nära festen. Det skapar en mysig och minnesvärd bröllopshelg.",
  },
  {
    q: "Kan man hyra tält till festival i Skåne?",
    a: "Ja, våra glampingtält passar bra till festivaler och event där besökare vill bo bekvämare än i ett vanligt campingtält.",
  },
  {
    q: "Vad kostar det att hyra tält i Skåne?",
    a: "Priset beror på antal tält, datum, plats, antal nätter och vilken inredning som ska ingå. Kontakta oss så tar vi fram en offert.",
  },
  {
    q: "Levererar ni tält till Malmö, Lund och andra platser i Skåne?",
    a: "Ja, Tentify utgår från Skåne och kan hjälpa till med glampingtält till event och bröllop i flera delar av Skåne, beroende på datum och upplägg.",
  },
];

const includes = [
  "Möblerade glampingtält",
  "Bekväm sovplats",
  "Madrass eller säng enligt offert",
  "Täcke och kudde enligt valt paket",
  "Matta, belysning och mysig inredning",
  "Leverans och uppsättning enligt överenskommelse",
  "Passar bröllop, festival, retreat och event",
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
        {/* Hero */}
        <section className="relative py-20 md:py-28 bg-gradient-primary text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/25" />
          <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Hyra tält i Skåne till event, bröllop och festival
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Letar du efter ett bekvämare alternativ till vanlig tältuthyrning i
              Skåne? Tentify hyr ut möblerade glampingtält och sovtält till bröllop,
              festivaler, retreats och event där gästerna ska kunna bo nära
              upplevelsen men ändå sova skönt.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/#kontakt">Be om offert</Link>
            </Button>
          </div>
        </section>

        {/* Section 1 */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tältuthyrning i Skåne med färdiga glampingtält
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tentify erbjuder tältuthyrning i Skåne för dig som vill skapa ett
              färdigt och bekvämt boende på plats. Våra glampingtält passar perfekt
              när du vill erbjuda gästerna något mer än vanlig camping. Tälten kan
              användas som sovplatser vid bröllop, festivaler, privata fester,
              företagsevent och retreats. Läs mer om att{" "}
              <Link to="/hyra-glampingtalt" className="text-primary underline">
                hyra glampingtält
              </Link>{" "}
              hos oss.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vad ingår när du hyr tält från Tentify?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              När du hyr tält från Tentify får du en smidig lösning där tälten kan
              levereras, sättas upp och inredas enligt upplägg. Fokus ligger på att
              skapa en bekväm och mysig sovplats för gästerna.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground text-lg">
              {includes.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Image strip */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-3 gap-6">
            <img
              src={glampingNatur}
              alt="Glampingtält i Skåne med säng och inredning"
              loading="lazy"
              decoding="async"
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
            <img
              src={glampingUtemoebler}
              alt="Möblerat glampingtält till bröllop i Skåne"
              loading="lazy"
              decoding="async"
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
            <img
              src={festivalTalt}
              alt="Inrett glampingtält som boende till event i Skåne"
              loading="lazy"
              decoding="async"
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
          </div>
        </section>

        {/* Section 3 */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hyra tält till bröllop i Skåne
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Planerar du ett lantligt bröllop, trädgårdsbröllop eller
              utomhusbröllop i Skåne? Med glampingtält kan du skapa ett mysigt
              bröllopscamp där gästerna kan sova nära festen. Det är ett bra
              alternativ när platsen saknar boende eller när ni vill göra
              bröllopshelgen mer minnesvärd. Läs mer om{" "}
              <Link to="/talt-brollop" className="text-primary underline">
                glamping bröllop i Skåne
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hyra tält till festival och event i Skåne
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tentifys glampingtält passar även för festivaler, företagsevent och
              privata arrangemang där besökare eller deltagare behöver en bekväm
              sovplats. I stället för att gästerna själva ska ta med
              campingutrustning kan ni erbjuda färdiga tält med sovplats och
              inredning. Se vårt upplägg för{" "}
              <Link to="/festival-glamping" className="text-primary underline">
                festival glamping
              </Link>{" "}
              eller läs om{" "}
              <Link to="/glamping-sweden-rock" className="text-primary underline">
                Glamping Sweden Rock 2027
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Skillnaden mellan vanliga eventtält och glampingtält
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Många som söker efter att hyra tält i Skåne letar efter olika typer av
              tält. Tentify fokuserar främst på glampingtält och möblerade sovtält.
              Det betyder att våra tält framför allt används som boende och
              sovplatser, inte som stora middagstält, partytält eller glastält för
              själva festen.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pris för att hyra tält i Skåne
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Priset beror på antal tält, datum, plats, hur länge tälten ska stå
              och vilken nivå av inredning som önskas. Skicka information om ditt
              event, antal gäster och plats i Skåne så tar vi fram ett förslag.
            </p>
            <p className="text-lg text-muted-foreground flex items-start gap-2 mb-6">
              <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              Vi levererar till Malmö, Lund, Helsingborg, Kristianstad, Ystad och
              övriga Skåne. Söker du specifikt efter{" "}
              <Link to="/hyra-talt-malmo" className="text-primary underline">
                hyra tält i Malmö
              </Link>
              ?
            </p>
            <Button asChild size="lg">
              <Link to="/#kontakt">Be om offert för tält i Skåne</Link>
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Vanliga frågor om att hyra tält i Skåne
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
              Begär offert på tält i Skåne
            </h2>
            <p className="mb-8 text-white/90">
              Berätta datum, plats och antal gäster så återkommer vi snabbt med
              pris.
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

export default HyraTaltSkane;
