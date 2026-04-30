import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tent, Heart, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";

import imgDettaIngar from "@/assets/gallery/tentify-detta-ingar.webp";
import imgGlampingSlott from "@/assets/gallery/tentify-glamping-slott.webp";
import imgBoho from "@/assets/gallery/tentify-glamping-boho.webp";
import imgBoho2 from "@/assets/gallery/tentify-glamping-boho-2.webp";

const galleryImages = [
  { src: imgDettaIngar, alt: "Detta ingår i ditt Tentify-tält – komplett glampingupplevelse", title: "Detta ingår i ditt tält" },
  { src: imgGlampingSlott, alt: "Tentify glampingtält vid slott i solnedgång", title: "Glamping i magisk miljö" },
  { src: imgBoho, alt: "Boho-inredning i Tentify glampingtält med säng och mysbelysning", title: "Boho-inredning" },
  { src: imgBoho2, alt: "Tentify glampingtält interiör med dubbelsäng och mattor", title: "Bekväm interiör" },
];

const Gallery = () => {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = () => setActive((p) => (p + 1) % galleryImages.length);
  const prev = () => setActive((p) => (p - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div className="w-full mx-auto">
      {/* Main image */}
      <div
        className="relative w-full aspect-[3/2] overflow-hidden rounded-xl shadow-elegant cursor-zoom-in group bg-muted/40"
        onClick={() => setLightbox(true)}
      >
        {galleryImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-smooth"
          aria-label="Föregående bild"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-smooth"
          aria-label="Nästa bild"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible">
        {galleryImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Visa ${img.title}`}
            className={`relative shrink-0 snap-start w-28 h-20 md:w-full md:h-24 rounded-lg overflow-hidden transition-all duration-300 ${
              i === active
                ? "ring-2 ring-primary shadow-elegant scale-[1.02]"
                : "ring-1 ring-border opacity-80 hover:opacity-100"
            }`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(false)}>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full"
            aria-label="Stäng"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 p-3 text-white hover:bg-white/20 rounded-full"
            aria-label="Föregående"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <img
            src={galleryImages[active].src}
            alt={galleryImages[active].alt}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 p-3 text-white hover:bg-white/20 rounded-full"
            aria-label="Nästa"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </div>
  );
};

const AboutSection = () => {
  return (
    <section
      id="om-oss"
      className="relative py-20 overflow-hidden bg-gradient-subtle"
    >
      {/* Soft warm earthy background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Vi fixar allt – du bara njuter
          </h2>

          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            På Tentify vill vi göra festivalen till något du minns med glädje – inte stress.
            Därför erbjuder vi färdiga glampingtält med alla bekvämligheter. Du slipper packa,
            bära och montera. När du kommer fram står tältet klart – med säng, möbler och
            detaljer för en härlig upplevelse.
          </p>

          {/* Gallery */}
          <div className="mb-16">
            <Gallery />
          </div>

          {/* Glassmorphism feature boxes */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { Icon: Tent, title: "Färdiga tält", text: "Allt är uppsatt och klart när du anländer. Ingen stress med montering eller packning." },
              { Icon: Heart, title: "Allt inkluderat", text: "Säng, möbler, el, belysning och smarta detaljer. Du behöver bara ta med mat och dryck." },
              { Icon: Sparkles, title: "Lyxig upplevelse", text: "Upplev festivalen med komfort och stil. Glamping som det ska vara." },
            ].map(({ Icon, title, text }) => (
              <Card
                key={title}
                className="p-8 text-center bg-card/50 backdrop-blur-md border border-border/50 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{title}</h3>
                <p className="text-muted-foreground">{text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
