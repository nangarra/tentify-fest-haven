import { Helmet } from "react-helmet";
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
import sangLyxig from "@/assets/camping-sang-lyxig-festival-boende.webp";
import inredningLyxig from "@/assets/festival-talt-inredning-lyxig-camping.webp";
import inutiSovplats from "@/assets/glamping-talt-inuti-sovplats.webp";
import utomhusmobler from "@/assets/glamping-talt-utomhusmobler-festival.webp";
import dubbelsang from "@/assets/glampingtalt-dubbelsang.webp";
import enkelsang from "@/assets/glampingtalt-enkelsang.webp";
import familjUpplevelse from "@/assets/glampingtalt-familj-festival-upplevelse.webp";
import lyxigtTentify from "@/assets/lyxigt-glampingtalt-festival-tentify.webp";
import utomhusSetup from "@/assets/tentify-festivaltalt-utomhus-setup.webp";
import bekvamlighet from "@/assets/tentify-glampingtalt-bekvamlighet-festival.webp";

const sovbilder = [
  { src: dubbelsang, alt: "Glampingtält med dubbelsäng för bröllopsgäster" },
  { src: enkelsang, alt: "Möblerat glampingtält med enkelsäng och inredning" },
  { src: inutiSovplats, alt: "Mysig sovplats inuti glampingtält för övernattande gäster" },
];

const brollopThumbs = [
  { src: utomhusmobler, alt: "Glampingtält med utomhusmöbler vid utomhusbröllop" },
  { src: lyxigtTentify, alt: "Lyxigt glampingtält till bröllop i Skåne" },
  { src: utomhusSetup, alt: "Bröllopscamp med glampingtält uppställda utomhus" },
  { src: bekvamlighet, alt: "Bekvämt glampingtält för bröllopsgäster" },
];

const galleriBilder = [
  { src: glampingNatur, alt: "Glampingtält till bröllop i Skåne i naturmiljö" },
  { src: glampingUtemoebler, alt: "Möblerat glampingtält med utemöbler" },
  { src: festivalTalt, alt: "Inrett tält för bröllop och event" },
  { src: sangLyxig, alt: "Lyxig säng i glampingtält för bröllopsgäster" },
  { src: inredningLyxig, alt: "Mysig inredning i glampingtält för bröllop" },
  { src: familjUpplevelse, alt: "Glamping bröllop med färdiga sovtält för gäster" },
  { src: lyxigtTentify, alt: "Tentify glamping till bröllop" },
  { src: utomhusSetup, alt: "Bröllopscamp med glampingtält från Tentify" },
  { src: bekvamlighet, alt: "Mysigt glampingtält för övernattande bröllopsgäster" },
];

const TaltBrollop = () => {
  const faqItems = [
    {
      question: "Kan man hyra glampingtält till bröllop?",
      answer:
        "Ja, glampingtält passar mycket bra till bröllop där gästerna behöver sova nära festen. Det ger en mer bekväm och minnesvärd upplevelse än vanlig camping.",
    },
    {
      question: "Är era tält festtält eller sovtält?",
      answer:
        "Tentifys tält används främst som möblerade sovtält och glampingtält för gäster. De är inte vanliga stora partytält för middag och dans.",
    },
    {
      question: "Passar glampingtält för lantligt bröllop?",
      answer:
        "Ja, glampingtält passar särskilt bra till lantliga bröllop, trädgårdsbröllop och utomhusbröllop där man vill skapa en mysig helhetsupplevelse.",
    },
    {
      question: "Vad kostar det att hyra tält till bröllop?",
      answer:
        "Priset beror på antal tält, plats, datum, antal nätter och vilken inredning som ska ingå. Kontakta oss så tar vi fram en offert.",
    },
    {
      question: "Levererar ni bröllopstält i Skåne?",
      answer:
        "Tentify utgår från Skåne och kan hjälpa till med glampingtält till bröllop och fester i Skåne med omnejd.",
    },
    {
      question: "Kan gästerna sova två personer i varje tält?",
      answer:
        "Ja, många upplägg bygger på två personer per tält, men kapaciteten kan variera beroende på tältstorlek och önskad inredning.",
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
        <meta
          property="og:description"
          content="Hyr glampingtält till bröllop i Skåne. Färdiga tält med säng, inredning och mysig känsla för gäster på bröllop och fest."
        />
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
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <main>
          {/* Hero */}
          <section className="relative py-20 md:py-28 bg-gradient-primary text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/25" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Glamping bröllop i Skåne – hyr tält till bröllop
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Skapa en minnesvärd övernattning för era bröllopsgäster med
                  färdiga glampingtält från Tentify. Våra tält passar perfekt
                  för lantliga bröllop, utomhusbröllop och festhelger där
                  gästerna vill bo nära firandet men ändå sova bekvämt.
                </p>
                <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                  <Link to="/#kontakt">Be om offert</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Sektion 1 – Hyr tält till bröllopsgäster */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Hyr tält till bröllopsgäster
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                När ni planerar ett bröllop på gård, i trädgård eller på en plats
                där boende saknas kan glampingtält vara en smidig och
                stämningsfull lösning. Tentify hjälper er skapa ett litet
                bröllopscamp där gästerna får en mysig sovplats nära festen.
              </p>
            </div>
          </section>

          {/* Sektion 2 – Vad ingår */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Vad ingår i våra glampingtält?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Våra glampingtält kan levereras färdiga med inredning som skapar
                en varm och bekväm känsla. Det gör att gästerna slipper vanlig
                camping och istället får en mer genomtänkt upplevelse.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground text-lg">
                {[
                  "Möblerade glampingtält",
                  "Bekväm sovplats",
                  "Madrass eller säng enligt upplägg",
                  "Täcke och kudde enligt offert",
                  "Matta, belysning och mysig inredning",
                  "Leverans och uppsättning enligt överenskommelse",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Images */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-3 gap-8">
              <img
                src={glampingNatur}
                alt="Glampingtält till bröllop i Skåne i naturmiljö"
                className="w-full h-64 object-cover rounded-lg shadow-card"
                loading="lazy"
              />
              <img
                src={glampingUtemoebler}
                alt="Möblerat glampingtält med utemöbler vid utomhusbröllop"
                className="w-full h-64 object-cover rounded-lg shadow-card"
                loading="lazy"
              />
              <img
                src={festivalTalt}
                alt="Inuti ett glampingtält med säng och inredning för bröllopsgäster"
                className="w-full h-64 object-cover rounded-lg shadow-card"
                loading="lazy"
              />
            </div>
          </section>

          {/* Sektion 3 – Lantligt bröllop */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Perfekt för lantligt bröllop och utomhusbröllop
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Glampingtält passar särskilt bra till lantliga bröllop,
                sommarbröllop och utomhusbröllop i Skåne. Tälten blir både
                praktiska sovplatser och en fin del av helhetskänslan kring
                bröllopet.
              </p>
            </div>
          </section>

          {/* Sektion 4 – Skillnaden */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Skillnaden mellan bröllopstält och glampingtält
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ett traditionellt bröllopstält används ofta som middags- eller
                festlokal. Tentifys glampingtält används främst som boende och
                sovplats för gäster. Det är ett bra komplement till festen när
                ni vill erbjuda övernattning på plats.
              </p>
            </div>
          </section>

          {/* Sektion 5 – Hyra bröllopstält i Skåne */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Hyra bröllopstält i Skåne
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Tentify utgår från Skåne och hjälper brudpar, eventplanerare och
                festarrangörer med glampingtält till bröllop och privata fester.
                Skicka information om plats, datum, antal gäster och önskad nivå
                på inredning så tar vi fram ett förslag. Se även{" "}
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
              <Button asChild size="lg" className="btn-hero text-lg px-8">
                <Link to="/#kontakt">Be om offert för bröllop</Link>
              </Button>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Vanliga frågor om glamping till bröllop
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
          </section>

          {/* CTA */}
          <section className="py-16 bg-primary text-white">
            <div className="container mx-auto px-4 text-center max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Redo att skapa ert bröllopscamp?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Kontakta oss för en offert anpassad för ert bröllop. Vi hjälper
                er hela vägen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                  <Link to="/#kontakt">Be om offert</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white/10"
                >
                  <Link to="/hyra-glampingtalt">Hyra glampingtält</Link>
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
