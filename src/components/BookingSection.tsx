import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Toilet, 
  Droplets, 
  Shield, 
  ParkingCircle, 
  Store, 
  Battery, 
  Lightbulb, 
  Flame, 
  Sun, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import akesCampingFacilities from "@/assets/akes-camping-facilities.jpg";
import akesCampingMap from "@/assets/akes-camping-map.png";

const campingImages = [
  { src: akesCampingFacilities, alt: "ÅKEs Camping – moderna toalettfaciliteter" },
  { src: akesCampingMap, alt: "ÅKEs Camping – karta och läge nära Sweden Rock Festival" }
];

const BookingSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % campingImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % campingImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + campingImages.length) % campingImages.length);
  };

  const scrollToBooking = () => {
    const bookingElement = document.getElementById('ny-bokning');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="boka-talt" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Boka ditt tält nu
            </h2>
          </div>

          {/* Image Carousel */}
          <div className="relative mb-12 rounded-xl overflow-hidden shadow-elegant">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              {campingImages.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full transition-all hover:scale-110"
                aria-label="Föregående bild"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full transition-all hover:scale-110"
                aria-label="Nästa bild"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {campingImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-primary w-8' 
                        : 'bg-background/60 hover:bg-background/80'
                    }`}
                    aria-label={`Gå till bild ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <Card className="p-8 md:p-12 shadow-elegant">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              🏕️ ÅKEs Camping – bara några minuter från festivalens hjärta
            </h3>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Upplev den avslappnade och välordnade atmosfären på ÅKEs Camping, strategiskt belägen endast 1 km från Sweden Rock Festival – ungefär 10–15 minuters promenad till festivalområdet. Här bor du nära allt, men ändå i lugnet bortom festivalens mest intensiva puls.
            </p>

            <h4 className="text-xl font-semibold text-foreground mb-6">
              ✨ Faciliteter och service som ingår:
            </h4>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <Toilet className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Tillgång till vattentoaletter, Baja Major och pissoarer</span> för campinggäster
                </p>
              </div>

              <div className="flex items-start gap-4">
                <Droplets className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Duschmöjligheter</span> med fräscha och välskötta faciliteter
                </p>
              </div>

              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Säkerhetspaket</span> med bevakning och trygg miljö dygnet runt
                </p>
              </div>

              <div className="flex items-start gap-4">
                <ParkingCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Parkering</span> nära campingen för enkel åtkomst
                </p>
              </div>

              <div className="flex items-start gap-4">
                <Store className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Välfylld kiosk</span> med dryck, snacks och nödvändigheter
                </p>
              </div>

              <div className="flex items-start gap-4">
                <Battery className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="text-muted-foreground">
                  <p className="mb-2">
                    <span className="font-medium text-foreground">Powerstation till varje tält</span> – vi tillhandahåller en kraftfull powerbank för elbehov (ingen fast el).
                  </p>
                  <p className="text-sm">
                    Vi erbjuder dessutom service för att ladda upp din powerstation under festivalens gång.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mb-8">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Tips!</span> Powerstationen räcker vanligtvis 1–2 dygn för mobil, belysning och mindre elektronik.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg mb-8">
              <div className="flex items-start gap-4">
                <Flame className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-foreground mb-2">🔥 Grillplats:</h5>
                  <p className="text-muted-foreground">
                    Av säkerhetsskäl är egen grillning och öppen eld inte tillåtet på området, men du är varmt välkommen att använda vår gemensamma grillplats där grill finns tillgänglig för alla campinggäster.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-10">
              <Sun className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold text-foreground mb-2">🌅 Lugn, närhet och gemenskap:</h5>
                <p className="text-muted-foreground">
                  ÅKEs Camping är den perfekta balansen mellan närhet till festivalens energi och en trygg, social plats att vila upp sig. Här möts du av en välkomnande stämning, serviceinriktad personal och gott om utrymme för både fest och återhämtning.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={scrollToBooking}
                className="btn-hero text-lg px-8 py-6"
              >
                Boka ditt tält nu
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;