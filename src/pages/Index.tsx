import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import IncludedSection from "@/components/IncludedSection";
import ExtrasSection from "@/components/ExtrasSection";
import NewBookingSection from "@/components/NewBookingSection";
import EventRentalSection from "@/components/EventRentalSection";
import TentSpecsSection from "@/components/TentSpecsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <BookingSection />
      <NewBookingSection />
      <IncludedSection />
      <ExtrasSection />
      <EventRentalSection />
      <TentSpecsSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
};

export default Index;