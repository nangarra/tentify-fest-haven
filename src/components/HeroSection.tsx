import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import hero images
import heroImage1 from "@/assets/lyxigt-glampingtalt-festival-tentify.webp";
import heroImage2 from "@/assets/festival-talt-inredning-lyxig-camping.webp";
import heroImage3 from "@/assets/glamping-talt-utomhusmobler-festival.webp";
import heroImage4 from "@/assets/festival-glamping-talt-inuti-komfort.webp";

const heroImages = [
  {
    src: heroImage1,
    alt: "Lyxigt glampingtält för festival med Tentify - komplett setup med möbler och komfort"
  },
  {
    src: heroImage2,
    alt: "Inredning i festival glampingtält - bekväm säng och inredning för lyxig camping"
  },
  {
    src: heroImage3,
    alt: "Glamping tält med utomhusmöbler för festival - komplett med stolar och bord"
  },
  {
    src: heroImage4,
    alt: "Festival glamping tält inuti - komfort och lyx för din festivalupplevelse"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const scrollToBooking = () => {
    const element = document.getElementById("boka-talt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hem" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroImage1}
          className="w-full h-full object-cover"
          title="Tentify hero video"
        >
          <source src="/tentify_.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <img
            src={heroImage1}
            alt="Lyxigt glampingtält för festival med Tentify - komplett setup med möbler och komfort"
            className="w-full h-full object-cover"
          />
        </video>
        {/* Video overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          style={{ 
            textShadow: '0 2px 8px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.6)' 
          }}
        >
          Lyxiga glampingtält för festivaler
        </h1>

        <div className="space-y-4">
          <Button
            onClick={scrollToBooking}
            size="lg"
            className="btn-hero text-lg px-12 py-6 hover:scale-105 transition-bounce"
            style={{ 
              textShadow: '0 1px 3px rgba(0,0,0,0.4)' 
            }}
          >
            Boka ditt tält
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;