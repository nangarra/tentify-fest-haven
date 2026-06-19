import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import glampingNatur from "@/assets/glamping-talt-naturmiljo-skane.webp";
import glampingUtemoebler from "@/assets/glamping-talt-utemoebler-komfort.webp";
import festivalTalt from "@/assets/festival-glamping-talt-inuti-komfort.webp";

const TaltBrollop = () => {
  const faqItems = [
    {
      question: "Vad kostar det att hyra tält till bröllop?",
      answer:
        "Priset beror på antal tält, plats och hyresperiod. Kontakta oss för en offert anpassad för ert bröllop.",
    },
    {
      question: "Hur många gäster får plats?",
      answer:
        "Varje tält rymmer 2 personer bekvämt. 40 gäster = cirka 20 tält.",
    },
    {
      question: "Hur länge kan vi hyra tält?",
      answer: "Från 2–7 dagar eller längre vid behov.",
    },
    {
      question: "Levererar ni i hela Skåne?",
      answer: "Ja. Vi levererar glamping till bröllop i hela Skåne.",
    },
    {
      question: "Behöver vi ordna något själva?",
      answer: "Nej. Vi levererar, installerar och monterar ner.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Glamping bröllop Skåne | Hyr tält till bröllop</title>
        <meta
          name="description"
          content="Hyr glampingtält till bröllop i Skåne. Färdiga tält med säng, inredning och mysig känsla för gäster på bröllop och fest."
        />
        <link rel="canonical" href="https://tentify.se/talt-brollop" />
        <meta property="og:title" content="Glamping bröllop Skåne | Hyr tält till bröllop" />
        <meta property="og:description" content="Möblerade glampingtält som boende för bröllopsgäster i Skåne." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tentify.se/talt-brollop" />
        <meta property="og:image" content={glampingNatur} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <main>
          {/* Hero */}
          <section className="relative py-20 md:py-28 bg-gradient-primary text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Glamping bröllop i Skåne – hyr tält till bröllop
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed">
                  Tentify hyr ut möblerade glampingtält som boende åt era
                  bröllopsgäster. Färdiga sovplatser, vacker inredning och en
                  lantlig känsla – perfekt för utomhusbröllop och lantliga bröllop
                  i Skåne.
                </p>
                <p className="text-base text-white/80">
                  Obs: vi specialiserar oss på möblerade glampingtält som boende,
                  inte stora partytält eller glastält.
                </p>
              </div>
            </div>
          </section>

          {/* Intro – what we help with */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Vi hjälper er med:
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground text-lg">
                  {[
                    "Hyra tält bröllop",
                    "Tält bröllop Skåne",
                    "Glamping bröllop",
                    "Extra sovplatser till bröllop",
                    "Mikrobröllop och intim ceremoni",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Helhetsupplevelse */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                  Hyra tält till bröllop – skapa en helhetsupplevelse
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Istället för att gästerna sprids till hotell kan ni skapa en
                  sammanhållen bröllopshelg.
                </p>
                <p className="text-lg text-muted-foreground mb-2 font-medium">
                  Föreställ er:
                </p>
                <ul className="space-y-3 text-muted-foreground text-lg mb-8">
                  <li>🕯️ Canvastält upplysta i kvällssolen.</li>
                  <li>✨ Mjuk belysning som skapar värme.</li>
                  <li>🥂 Vänner som sitter kvar långt efter middagen.</li>
                  <li>☀️ Och att alla vaknar tillsammans dagen efter.</li>
                </ul>
                <p className="text-lg text-foreground font-semibold">
                  Det är mer än tältuthyrning. Det är en upplevelse.
                </p>
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                <img
                  src={glampingNatur}
                  alt="Glamping bröllop i naturen Skåne"
                  className="w-full h-64 object-cover rounded-lg shadow-card"
                  loading="lazy"
                />
                <img
                  src={glampingUtemoebler}
                  alt="Glamping tält med utemöbler för bröllop"
                  className="w-full h-64 object-cover rounded-lg shadow-card"
                  loading="lazy"
                />
                <img
                  src={festivalTalt}
                  alt="Inuti ett glamping tält – komfort för bröllopsgäster"
                  className="w-full h-64 object-cover rounded-lg shadow-card"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Vad ingår */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                  Vad ingår när ni hyr tält till bröllop?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Alla tält levereras fullt möblerade med:
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground text-lg mb-8">
                  {[
                    "Riktiga sängar",
                    "Bäddset",
                    "Belysning",
                    "Inredning i boho/etno stil",
                    "Installation",
                    "Nedmontering",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-muted-foreground">
                  Ni kan hyra i 2–7 dagar eller längre. Vi erbjuder flexibla
                  priser beroende på antal tält och hyresperiod.
                </p>
              </div>
            </div>
          </section>

          {/* Mikrobröllop */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                  Mikrobröllop, lantbröllop & glamping
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Ett mikrobröllop innebär ofta upp till 50 gäster. Allt fler
                  söker efter "mikrobröllop glamping" eller "intimt bröllop i
                  naturen".
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Vi bygger upp er bröllopsby på:
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground text-lg mb-6">
                  {["Gårdar", "Stränder", "Sommarhus", "Lantliga miljöer"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
                <p className="text-lg text-foreground font-semibold">
                  Perfekt för ett bröllop med övernattning.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                  Vanliga frågor om tält till bröllop
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-lg">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-primary text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Redo att skapa er drömbröllopsby?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Kontakta oss för en offert anpassad för ert bröllop. Vi hjälper
                er hela vägen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8"
                >
                  <Link to="/#kontakt">Kontakta oss</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white/10"
                >
                  <Link to="/hyr-glamping">Se alla tjänster</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default TaltBrollop;
