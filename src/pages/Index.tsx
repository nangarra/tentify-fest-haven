import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import IncludedSection from "@/components/IncludedSection";
import ExtrasSection from "@/components/ExtrasSection";
import SwedenRock2027Section from "@/components/SwedenRock2027Section";
import EventRentalSection from "@/components/EventRentalSection";
import WeddingSection from "@/components/WeddingSection";
import TentSpecsSection from "@/components/TentSpecsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import {
  SeoIntroSection,
  PopularSolutionsSection,
  InternalLinksSection,
  HomeFaqSection,
} from "@/components/SeoHubSections";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SeoIntroSection />
      <PopularSolutionsSection />
      <div className="bg-accent/20 border-y border-accent/40">
        <div className="container mx-auto px-4 py-4 text-center text-sm md:text-base">
          <Link to="/glamping-sweden-rock" className="font-medium text-primary hover:underline">
            Glamping Sweden Rock 2027 – skriv upp dig på väntelistan →
          </Link>
        </div>
      </div>
      <SwedenRock2027Section />
      <AboutSection />
      <IncludedSection />
      <ExtrasSection />
      <EventRentalSection />
      <WeddingSection />
      <TentSpecsSection />
      <GallerySection />
      <InternalLinksSection />
      <HomeFaqSection />
      <ContactSection />
    </main>
  );
};

export default Index;
