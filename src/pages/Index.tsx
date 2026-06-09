import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
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
      <div className="bg-accent/20 border-y border-accent/40">
        <div className="container mx-auto px-4 py-4 text-center text-sm md:text-base">
          <Link to="/glamping-sweden-rock" className="font-medium text-primary hover:underline">
            Glamping Sweden Rock 2026 – boka färdigt festivaltält →
          </Link>
        </div>
      </div>
      <ClsrBookingSection />
      <AboutSection />
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