import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SeoIntroSection = () => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
        Hyr glampingtält i Skåne och södra Sverige
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed text-center">
        Tentify gör det enkelt att{" "}
        <Link to="/hyr-glamping" className="text-primary underline hover:opacity-80">
          hyra glampingtält
        </Link>{" "}
        till festivaler, bröllop, företagsevent och privata evenemang. Vi levererar,
        sätter upp och inreder färdiga tält med sovplatser, madrasser, täcken, kuddar,
        mattor, belysning och detaljer som skapar en mysig glampingkänsla. Vi erbjuder
        även{" "}
        <Link to="/talt-brollop" className="text-primary underline hover:opacity-80">
          glamping till bröllop
        </Link>{" "}
        och{" "}
        <Link to="/glamping-sweden-rock" className="text-primary underline hover:opacity-80">
          Glamping Sweden Rock
        </Link>
        .
      </p>
    </div>
  </section>
);

import imgHyr from "@/assets/4-3.webp.asset.json";
import imgBrollop from "@/assets/natt_tentify.webp.asset.json";
import imgFestival from "@/assets/1-2.webp.asset.json";

const popularSolutions = [
  {
    title: "Hyr glampingtält",
    text: "Färdiga glampingtält med inredning, sovplatser och mysig känsla för event och privata arrangemang.",
    cta: "Läs mer om att hyra glampingtält",
    href: "/hyr-glamping",
    img: imgHyr.url,
    alt: "Glampingtält med solnedgång och ljusslingor på grön äng",
  },
  {
    title: "Glamping till bröllop",
    text: "Skapa ett unikt boende för bröllopsgästerna med vackra inredda tält nära bröllopsplatsen.",
    cta: "Glamping för bröllop",
    href: "/talt-brollop",
    img: imgBrollop.url,
    alt: "Rad av upplysta glampingtält vid gods under kvällshimmel",
  },
  {
    title: "Glamping Sweden Rock",
    text: "Bekvämt festivalboende med färdiga tält, sovplats, täcke, kudde och inredning under Sweden Rock.",
    cta: "Sweden Rock 2027 väntelista",
    href: "/glamping-sweden-rock",
    img: imgFestival.url,
    alt: "Glampingtält i rad med ljusslingor i skymningen på festivalområde",
  },
];

export const PopularSolutionsSection = () => (
  <section className="py-16 bg-accent/10">
    <div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
        Våra mest populära glampinglösningar
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {popularSolutions.map((s) => (
          <Card
            key={s.href}
            className="group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={s.img}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 justify-between gap-6">
              <p className="text-muted-foreground">{s.text}</p>
              <Button asChild className="btn-hero w-full">
                <Link to={s.href}>{s.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);


const internalLinks = [
  { label: "hyra glampingtält", href: "/hyra-glampingtalt" },
  { label: "Hyra tält i Skåne", href: "/hyra-talt-skane" },
  { label: "Hyra tält i Malmö", href: "/hyra-talt-malmo" },
  { label: "Festival glamping", href: "/festival-glamping" },
  { label: "Glamping bröllop i Skåne", href: "/talt-brollop" },
  { label: "Glamping till företagsevent", href: "/hyr-glamping" },
  { label: "Glamping Sweden Rock 2027", href: "/glamping-sweden-rock" },
];

export const InternalLinksSection = () => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
        Vad vill du hyra glamping till?
      </h2>
      <ul className="flex flex-wrap justify-center gap-3">
        {internalLinks.map((l) => (
          <li key={l.label}>
            <Link
              to={l.href}
              className="inline-block px-5 py-2 rounded-full border border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const faqs = [
  {
    q: "Kan man hyra glampingtält till event?",
    a: (
      <>
        Ja, Tentify hyr ut färdiga glampingtält till festivaler, bröllop,
        företagsevent och privata arrangemang.
      </>
    ),
  },
  {
    q: "Var kan man hyra glampingtält i Skåne?",
    a: (
      <>
        Tentify utgår från Skåne och hjälper kunder med glampinglösningar för
        event, bröllop och festivaler i Skåne och södra Sverige.
      </>
    ),
  },
  {
    q: "Erbjuder ni glamping till Sweden Rock?",
    a: (
      <>
        Ja, vi har en separat sida för{" "}
        <Link to="/glamping-sweden-rock" className="text-primary underline hover:opacity-80">
          Glamping Sweden Rock 2027
        </Link>{" "}
        där besökare kan skriva upp sig på väntelistan.
      </>
    ),
  },
  {
    q: "Ingår uppsättning av tälten?",
    a: (
      <>
        Ja, Tentify levererar, sätter upp och förbereder tälten så att allt är
        klart när gästerna kommer.
      </>
    ),
  },
];

export const HomeFaqSection = () => (
  <section className="py-16 bg-accent/10">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
        Vanliga frågor om att hyra glamping
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-lg">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Kan man hyra glampingtält till event?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, Tentify hyr ut färdiga glampingtält till festivaler, bröllop, företagsevent och privata arrangemang.",
                },
              },
              {
                "@type": "Question",
                name: "Var kan man hyra glampingtält i Skåne?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tentify utgår från Skåne och hjälper kunder med glampinglösningar för event, bröllop och festivaler i Skåne och södra Sverige.",
                },
              },
              {
                "@type": "Question",
                name: "Erbjuder ni glamping till Sweden Rock?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, vi har en separat sida för Glamping Sweden Rock 2027 där besökare kan skriva upp sig på väntelistan.",
                },
              },
              {
                "@type": "Question",
                name: "Ingår uppsättning av tälten?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ja, Tentify levererar, sätter upp och förbereder tälten så att allt är klart när gästerna kommer.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  </section>
);
