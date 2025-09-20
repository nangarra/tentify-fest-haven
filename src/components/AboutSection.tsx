import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tent, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

// Import carousel images
import carouselImage1 from "@/assets/lyxigt-glampingtalt-festival-tentify.webp";
import carouselImage2 from "@/assets/festival-talt-inredning-lyxig-camping.webp";
import carouselImage3 from "@/assets/glamping-talt-utomhusmobler-festival.webp";
import carouselImage4 from "@/assets/festival-glamping-talt-inuti-komfort.webp";
import carouselImage5 from "@/assets/tentify-glampingtalt-bekvamlighet-festival.webp";
import carouselImage6 from "@/assets/tentify-festivaltalt-utomhus-setup.webp";

const carouselImages = [
  { src: carouselImage1, alt: "Glampingtält – lyxig interiör med bekvämligheter" },
  { src: carouselImage2, alt: "Glampingtält – inredning och komfort" },
  { src: carouselImage3, alt: "Glampingtält – exteriör med tarp och utomhusmöbler" },
  { src: carouselImage4, alt: "Glampingtält – möblerat med säng och komfort" },
  { src: carouselImage5, alt: "Glampingtält – bekvämlighet för festival" },
  { src: carouselImage6, alt: "Glampingtält – utomhus setup komplett" }
];

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-elegant">
        {carouselImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-smooth"
          aria-label="Föregående bild"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-smooth"
          aria-label="Nästa bild"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-smooth ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Gå till bild ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="om-oss" className="py-20 bg-gradient-subtle">
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

          {/* Image Carousel */}
          <div className="mb-16">
            <ImageCarousel />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card className="p-8 shadow-card hover:shadow-elegant transition-smooth text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Tent className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Färdiga tält
              </h3>
              <p className="text-muted-foreground">
                Allt är uppsatt och klart när du anländer. Ingen stress med montering eller packning.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-smooth text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Allt inkluderat
              </h3>
              <p className="text-muted-foreground">
                Säng, möbler, el, belysning och smarta detaljer. Du behöver bara ta med mat och dryck.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-smooth text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Lyxig upplevelse
              </h3>
              <p className="text-muted-foreground">
                Upplev festivalen med komfort och stil. Glamping som det ska vara.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;