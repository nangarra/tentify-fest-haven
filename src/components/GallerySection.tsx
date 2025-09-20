import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Import gallery images
import image1 from "@/assets/lyxigt-glampingtalt-festival-tentify.webp";
import image2 from "@/assets/festival-talt-inredning-lyxig-camping.webp";
import image3 from "@/assets/glamping-talt-utomhusmobler-festival.webp";
import image4 from "@/assets/festival-glamping-talt-inuti-komfort.webp";
import image5 from "@/assets/tentify-glampingtalt-bekvamlighet-festival.webp";
import image6 from "@/assets/tentify-festivaltalt-utomhus-setup.webp";
import image7 from "@/assets/glampingtalt-familj-festival-upplevelse.webp";
import image8 from "@/assets/camping-sang-lyxig-festival-boende.webp";

const galleryImages = [
  {
    src: image1,
    alt: "Lyxigt glampingtält för festival med Tentify - komplett setup",
    title: "Färdigt glampingtält"
  },
  {
    src: image2,
    alt: "Festival tält inredning med bekväm säng och lyxig camping känsla",
    title: "Bekväm inredning"
  },
  {
    src: image3,
    alt: "Glamping tält med utomhusmöbler - stolar och bord ingår",
    title: "Utomhusmöbler"
  },
  {
    src: image4,
    alt: "Festival glamping tält inuti - komfort och lyx för bästa upplevelse",
    title: "Mysig atmosfär"
  },
  {
    src: image5,
    alt: "Tentify glampingtält bekvämlighet - allt för en perfekt festival",
    title: "Alla detaljer"
  },
  {
    src: image6,
    alt: "Tentify festivaltält utomhus setup - professionell montering",
    title: "Professionell setup"
  },
  {
    src: image7,
    alt: "Glampingtält för familj på festival - trygg och bekväm upplevelse",
    title: "Familjevänligt"
  },
  {
    src: image8,
    alt: "Camping säng i lyxigt festival boende - komfort som hemma",
    title: "Bekväm vila"
  }
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="galleri" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Se våra glampingtält i aktion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kolla in bilderna från våra tidigare events och festivaler. 
              Se hur bekvämt och lyxigt det kan vara att bo i ett Tentify-tält.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <Card 
                key={index} 
                className="overflow-hidden shadow-card hover:shadow-elegant transition-smooth cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-square">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-sm font-medium">
                      {image.title}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            onClick={prevImage}
            className="absolute left-4 text-white hover:bg-white/20 p-2"
          >
            ‹
          </Button>

          <Button
            variant="ghost"
            onClick={nextImage}
            className="absolute right-4 text-white hover:bg-white/20 p-2"
          >
            ›
          </Button>

          <div className="max-w-4xl max-h-full">
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain"
            />
            <div className="text-center mt-4">
              <p className="text-white text-lg font-medium">
                {galleryImages[selectedImage].title}
              </p>
              <p className="text-white/80 text-sm mt-2">
                {selectedImage + 1} av {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;