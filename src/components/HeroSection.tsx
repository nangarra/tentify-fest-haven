import { ArrowRight, BedDouble, Truck, PartyPopper, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage1 from "@/assets/lyxigt-glampingtalt-festival-tentify.webp";

const proofPoints = [
  { icon: BedDouble, label: "Färdigbäddade tält" },
  { icon: Truck, label: "Vi levererar & bygger" },
  { icon: PartyPopper, label: "Bröllop • Festival • Event" },
  { icon: MapPin, label: "Bas i Skåne" },
];

const HeroSection = () => {
  return (
    <section id="hem" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video (unchanged) */}
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
          <img
            src={heroImage1}
            alt="Inrett glampingtält uppsatt av Tentify i Skåne"
            className="w-full h-full object-cover"
          />
        </video>
        {/* Readability overlays (CSS only) */}
        <div className="home-hero-overlay" aria-hidden="true" />
      </div>

      {/* Hero Content — left aligned */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-24 md:py-32">
          <div className="max-w-[680px]">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="home-hero-eyebrow-line" aria-hidden="true" />
              <span className="home-hero-eyebrow">Glamping i Skåne &amp; södra Sverige</span>
            </div>

            {/* Headline */}
            <h1 className="home-hero-title">
              Glamping som står klart
              <br />
              när gästerna kommer.
            </h1>
            <p className="home-hero-highlight">
              För bröllop, festivaler och event.
            </p>

            {/* Supporting copy */}
            <p className="home-hero-copy mt-6">
              Vi levererar, bygger, möblerar och bäddar färdiga glampingtält i Skåne
              och södra Sverige – så att ni kan fokusera på upplevelsen, inte logistiken.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-9">
              <Link to="/hyr-glamping" className="home-hero-cta-primary">
                Se våra glampingtält
                <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              </Link>
              <Link to="/glamping-sweden-rock" className="home-hero-cta-secondary">
                Glamping @ Sweden Rock
              </Link>
            </div>

            {/* Proof bar */}
            <div className="home-hero-proof mt-12 md:mt-16">
              <dl className="grid grid-cols-2 md:grid-cols-4">
                {proofPoints.map(({ icon: Icon, label }) => (
                  <div key={label} className="home-hero-proof-item">
                    <Icon className="home-hero-proof-icon" aria-hidden="true" />
                    <dt className="home-hero-proof-label">{label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
    </section>
  );
};

export default HeroSection;
