import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import IncludedSection from "@/components/IncludedSection";
import ExtrasSection from "@/components/ExtrasSection";
import BookingSection from "@/components/BookingSection";
import EventRentalSection from "@/components/EventRentalSection";
import TentSpecsSection from "@/components/TentSpecsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <IncludedSection />
      <ExtrasSection />
      <BookingSection />
      <EventRentalSection />
      <TentSpecsSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
};

export default Index;
