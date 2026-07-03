import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import IncludedSection from "@/components/IncludedSection";
import ExtrasSection from "@/components/ExtrasSection";
import BookingWidget from "@/components/BookingWidget";
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
      <BookingWidget slug="sweden-rock-2027" />
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
