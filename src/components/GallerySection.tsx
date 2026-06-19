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

// Sweden Rock – tidigare event
import srImg1 from "@/assets/sweden-rock-glamping-4-2.webp.asset.json";
import srImg2 from "@/assets/sweden-rock-glamping-5-2.webp.asset.json";
import srImg3 from "@/assets/sweden-rock-glamping-6-2.webp.asset.json";
import srImg4 from "@/assets/sweden-rock-glamping-7.webp.asset.json";
import srImg5 from "@/assets/sweden-rock-glamping-8-2.webp.asset.json";
import srImg6 from "@/assets/sweden-rock-glamping-9-3.webp.asset.json";

const swedenRockImages = [
  { src: srImg1.url, alt: "Glampingtält på Sweden Rock i kvällsljus" },
  { src: srImg2.url, alt: "Festivalboende med glampingtält i rad under Sweden Rock" },
  { src: srImg3.url, alt: "Färdigt uppsatt glampingtält till Sweden Rock" },
  { src: srImg4.url, alt: "Bekväm sovplats med dubbelsäng i glampingtält på Sweden Rock" },
  { src: srImg5.url, alt: "Inrett glampingtält med säng och mysig inredning på Sweden Rock" },
  { src: srImg6.url, alt: "Bekvämt festivalboende med två sovplatser i Tentifys glampingtält" },
];

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

const galleriThumbnails = [
  { src: "", alt: "Glampingtält med inredning från Tentify" },
  { src: "", alt: "Mysigt glampingtält med säng" },
  { src: "", alt: "Tentify glamping på event" },
  { src: "", alt: "Inrett tält för festivalboende" },
  { src: "", alt: "Lyxigt glampingtält utomhus" },
  { src: "", alt: "Glampingtält med bekväm säng och inredning" },
];

const swedenRockThumbnails = [
  { src: "", alt: "Tentify glamping på Sweden Rock 2026" },
  { src: "", alt: "Glampingtält på Sweden Rock" },
  { src: "", alt: "Festivalboende med glampingtält" },
  { src: "", alt: "Sweden Rock 2026 glampingområde" },
  { src: "", alt: "Bekvämt tältboende på Sweden Rock" },
  { src: "", alt: "Glampingtält i rad på festival" },
];

const ThumbnailSlider = ({ images }: { images: { src: string; alt: string }[] }) => (
  <div
    className="overflow-x-auto pb-4 sr-scrollbar"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    <style>{`
      .sr-scrollbar::-webkit-scrollbar { display: none; }
    `}</style>
    <div className="flex gap-3" style={{ width: "max-content" }}>
      {images.map((img, i) =>
        img.src ? (
          <div
            key={i}
            className="relative flex-shrink-0 w-36 h-24 sm:w-44 sm:h-30 md:w-52 md:h-36 rounded-lg overflow-hidden shadow-card bg-muted"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ cursor: "default" }}
            />
          </div>
        ) : null
      )}
    </div>
  </div>
);

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

          {/* Previous Events */}
          <div className="mt-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Tidigare event
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                En tillbakablick på festivaler vi varit en del av.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {swedenRockImages.map((img, i) => (
                <Card key={i} className="overflow-hidden shadow-card hover:shadow-elegant transition-smooth">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-smooth"
                    />
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Bilder från Sweden Rock 2026.
            </p>
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