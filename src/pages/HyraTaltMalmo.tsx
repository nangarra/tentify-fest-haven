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
import glampingUtemoebler from "@/assets/glamping-talt-utemoebler-komfort.webp";
import festivalTalt from "@/assets/festival-glamping-talt-inuti-komfort.webp";

const faq = [
  {
    q: "Levererar Tentify tält till Malmö?",
    a: "Ja. Vi levererar glampingtält till Malmö och Malmö med omnejd – samt övriga Skåne.",
  },
  {
    q: "Vilken typ av tält hyr ni ut i Malmö?",
    a: "Vi hyr ut möblerade glampingtält avsedda som boende – med säng, inredning, belysning och mysig känsla. Vi har inte stora partytält eller glastält.",
  },
  {
    q: "Passar tälten till event i Malmö?",
    a: "Ja. Många kunder hyr våra tält som boende eller VIP-yta på event, festivaler, företagsträffar och privata fester i Malmöområdet.",
  },
  {
    q: "Kan man hyra tält till bröllop i Malmö?",
    a: "Ja. Glampingtälten fungerar utmärkt som sovplats för bröllopsgäster vid bröllop i Malmö och Skåne.",
  },
  {
    q: "Hur bokar man tält i Malmö?",
    a: "Kontakta oss med datum, plats och antal gäster så återkommer vi snabbt med offert och bekräftelse.",
  },
];

const HyraTaltMalmo = () => {
  return (
    <>
      <Helmet>
        <title>Hyra tält Malmö | Glampingtält till event</title>
        <meta
          name="description"
          content="Hyr glampingtält och möblerade tält till event, bröllop och festival i Malmö med omnejd. Bekväm sovplats och färdig inredning."
        />
        <link rel="canonical" href="https://tentify.se/hyra-talt-malmo" />
        <meta property="og:title" content="Hyra tält Malmö | Glampingtält till event" />
        <meta
          property="og:description"
          content="Hyr möblerade glampingtält i Malmö – färdig sovplats, inredning och leverans till ditt event."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tentify.se/hyra-talt-malmo" />
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
              Hyra tält i Malmö till event och bröllop
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Möblerade glampingtält som boende åt gäster på event, bröllop och
              festival i Malmö med omnejd. Färdig säng, inredning och belysning – vi
              sätter upp och hämtar.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/#kontakt">Begär offert</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Glampingtält nära Malmö</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Tentify hyr ut färdiga glampingtält i Malmöområdet. Vi sätter upp tälten,
              inreder dem med säng, bäddmadrass, täcke, kudde, matta och belysning – och
              hämtar när eventet är slut.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground text-lg">
              {[
                "Eventtält i Malmö",
                "Tält till bröllop i Malmö",
                "Glamping till festival",
                "Företagsevent och kickoff",
                "Leverans i Malmö med omnejd",
                "Sovplats med färdig inredning",
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
            <img src={glampingNatur} alt="Hyra glampingtält i Malmö – möblerat boende" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-card" />
            <img src={glampingUtemoebler} alt="Eventtält till bröllop i Malmö" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-card" />
            <img src={festivalTalt} alt="Inrett glampingtält som boende i Malmö" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-card" />
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tält till olika tillfällen i Malmö</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Våra tält används som sovplats för gäster, som mysig VIP-yta eller som
              komplement till bröllopslokalen. Vi är inte ett partytält- eller
              glastältsföretag – vi hyr ut möblerade glampingtält.
            </p>
            <p className="text-lg text-muted-foreground">
              Se även{" "}
              <Link to="/hyra-talt-skane" className="text-primary underline">
                hyra tält i Skåne
              </Link>{" "}
              och vår allmänna sida för{" "}
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
              Vanliga frågor om att hyra tält i Malmö
            </h2>
            <Accordion type="single" collapsible>
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`m-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-16 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Offert och bokning</h2>
            <p className="mb-8 text-white/90">
              Skicka datum, plats och antal gäster så återkommer vi med pris.
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

export default HyraTaltMalmo;
