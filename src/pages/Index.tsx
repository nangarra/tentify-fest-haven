import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import IncludedSection from "@/components/IncludedSection";
import ExtrasSection from "@/components/ExtrasSection";
import ClsrBookingSection from "@/components/ClsrBookingSection";
import EventRentalSection from "@/components/EventRentalSection";
import WeddingSection from "@/components/WeddingSection";
import TentSpecsSection from "@/components/TentSpecsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <BookingSection />
      <ClsrBookingSection />
      <IncludedSection />
      <ExtrasSection />
      <EventRentalSection />
      <WeddingSection />
      <TentSpecsSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
};

export default Index;