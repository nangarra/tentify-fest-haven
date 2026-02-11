import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Phone, 
  MapPin, 
  Heart, 
  Users, 
  Bed, 
  Building, 
  ShoppingCart,
  CheckCircle,
  Star,
  Clock,
  Shield,
  Truck
} from "lucide-react";
import glampingNatur from "@/assets/glamping-talt-naturmiljo-skane.webp";
import glampingUtemoebler from "@/assets/glamping-talt-utemoebler-komfort.webp";
import glampingInuti from "@/assets/glamping-talt-inuti-sovplats.webp";

const HyrGlamping = () => {
  const services = [
    {
      icon: Heart,
      title: "Bröllop & fest",
      description: "Skapa en romantisk plats för brudpar och gäster. Våra tält ger en exklusiv känsla för vigsel, middag eller övernattning."
    },
    {
      icon: Users,
      title: "Festival & event", 
      description: "Passar perfekt för eventfixare som vill erbjuda något extra till besökare, artister eller personal."
    },
    {
      icon: Bed,
      title: "Extra sovplatser",
      description: "Har du familj och vänner som kommer på besök? Våra tält är en praktisk och bekväm lösning."
    },
    {
      icon: Building,
      title: "Företagsevent & kickoff",
      description: "Ge dina kollegor en unik upplevelse i naturen med bekväma tält som kombinerar äventyr och komfort."
    },
    {
      icon: ShoppingCart,
      title: "Köp av tält",
      description: "Vill du ha ditt eget tält? Vi säljer även våra modeller, med eller utan inredning."
    }
  ];

  const benefits = [
    {
      icon: Star,
      title: "Exklusiv känsla",
      description: "lyxigare än vanliga tält"
    },
    {
      icon: CheckCircle,
      title: "Flexibelt användande",
      description: "passar bröllop, festivaler, företagsevent och privata fester"
    },
    {
      icon: Bed,
      title: "Extra sovplatser",
      description: "perfekt när gäster behöver stanna över"
    },
    {
      icon: Truck,
      title: "Komplett service",
      description: "vi kan leverera, sätta upp och hämta"
    },
    {
      icon: ShoppingCart,
      title: "Köp eller hyr",
      description: "välj om du vill hyra tillfälligt eller investera i ett eget tält"
    }
  ];

  const locations = [
    "Malmö", "Lund", "Eslöv", "Helsingborg", "Kristianstad", "Ystad", "Hela Skåne med omnejd"
  ];

  const faqItems = [
    {
      question: "Hur stora är tälten?",
      answer: "De flesta av våra tält rymmer mellan 2–6 personer, beroende på modell och inredning."
    },
    {
      question: "Hur många personer kan sova i ett tält?",
      answer: "Utan möbler får det plats fler, men med inredning och komfort rekommenderar vi 2–4 personer."
    },
    {
      question: "Är tälten vattentäta?",
      answer: "Ja, alla våra tält är tillverkade i slitstarkt, vattenavvisande material."
    },
    {
      question: "Kan man använda tälten året runt?",
      answer: "Ja, de kan användas även på vintern med rätt uppvärmning."
    },
    {
      question: "Hur lång tid tar det att montera?",
      answer: "Monteringstid varierar, men ofta tar det 30–60 minuter per tält."
    },
    {
      question: "Ingår möbler i hyran?",
      answer: "Vi erbjuder både med och utan möbelpaket."
    },
    {
      question: "Kan man hyra bara tältet utan inredning?",
      answer: "Ja, du kan välja ett tomt tält om du vill inreda själv."
    },
    {
      question: "Hur fungerar leverans och upphämtning?",
      answer: "Vi levererar till platsen, sätter upp tältet och hämtar när evenemanget är slut."
    },
    {
      question: "Levererar ni till hela Skåne?",
      answer: "Ja, vi täcker hela Skåne inklusive Malmö, Lund, Eslöv, Helsingborg och Ystad."
    },
    {
      question: "Är tälten bra för bröllop?",
      answer: "Ja, de är perfekta som bröllopstält eller som extra sovplatser för gäster."
    },
    {
      question: "Passar de för festivaler och event?",
      answer: "Absolut – våra tält används ofta på festivaler, kickoffs och företagsevent."
    },
    {
      question: "Kan man använda dem som extra sovplatser hemma?",
      answer: "Ja, de är utmärkta när du får många gäster."
    },
    {
      question: "Behöver man bygglov för att ställa upp ett tält?",
      answer: "Normalt inte, men vid långvarig uppställning kan regler skilja sig – kolla med kommunen."
    },
    {
      question: "Hur bokar man ett tält?",
      answer: "Du kontaktar oss via telefon, så går vi igenom behov, datum och plats."
    },
    {
      question: "Vilken avbokningspolicy gäller?",
      answer: "Villkor beror på bokningstid och evenemang, kontakta oss för detaljer."
    },
    {
      question: "Är tälten säkra i hård vind?",
      answer: "Ja, de är designade för att stå emot vind, men vi rekommenderar alltid att kolla väderprognosen."
    },
    {
      question: "Kan man värma upp tältet på vintern?",
      answer: "Ja, med kamin eller värmefläkt kan man använda dem även under kallare månader."
    },
    {
      question: "Får man köpa tälten istället för att hyra?",
      answer: "Ja, vi säljer våra modeller – både nya och begagnade."
    },
    {
      question: "Kan företag hyra till events eller kickoffs?",
      answer: "Ja, vi hyr ut till både privatpersoner och företag."
    },
    {
      question: "Vad kostar det att hyra ett glamping-tält i Skåne?",
      answer: "Priset beror på storlek, utrustning och antal dagar – kontakta oss för offert."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Hyr Glamping Tält i Skåne | Tentify - Bröllopstält & Eventtält Malmö, Lund, Eslöv</title>
        <meta name="description" content="Hyr lyxiga glamping-tält i Skåne för bröllop, festivaler och event. Vi levererar till Malmö, Lund, Eslöv och hela Skåne. Perfekt för extra sovplatser och exklusiva evenemang." />
        <meta name="keywords" content="hyra glamping tält Skåne, glamping tält Malmö, tält till bröllop Malmö, hyra tält till fest Skåne, glamping för event Skåne, exklusivt tält bröllop, sovplatser tält uthyrning, bröllopstält med inredning, hyra lyxtält Skåne, eventtält Malmö hyra" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hyr Glamping Tält i Skåne | Tentify - Bröllopstält & Eventtält" />
        <meta property="og:description" content="Hyr lyxiga glamping-tält i Skåne för bröllop, festivaler och event. Vi levererar till Malmö, Lund, Eslöv och hela Skåne." />
        <meta property="og:image" content={glampingNatur} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Hyr Glamping Tält i Skåne | Tentify" />
        <meta property="twitter:description" content="Hyr lyxiga glamping-tält i Skåne för bröllop, festivaler och event." />
        <meta property="twitter:image" content={glampingNatur} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Tentify",
            "description": "Glamping-tält uthyrning i Skåne för bröllop, festivaler och event",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Eslöv",
              "addressRegion": "Skåne",
              "addressCountry": "SE"
            },
            "telephone": "073-513 37 09",
            "url": "https://tentify.se/hyr-glamping",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 55.8,
                "longitude": 13.3
              },
              "geoRadius": "100000"
            },
            "services": ["Glamping tält uthyrning", "Bröllopstält", "Eventtält", "Festival tält"]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-primary text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Hyr glamping set & tält i Skåne
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  Planerar du bröllop, fest eller event och vill skapa en unik och minnesvärd atmosfär? 
                  Våra glamping-tält är den perfekta lösningen när du behöver exklusiva sovplatser, 
                  en vacker lounge eller ett unikt bröllopstält.
                </p>
                <p className="text-lg mb-8 text-white/80">
                  Vi erbjuder uthyrning i hela Skåne – från Malmö och Lund till Eslöv och omnejd. 
                  Vi levererar, monterar och hämtar efteråt – så att du kan fokusera helt på ditt evenemang.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:073-513 37 09" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-smooth">
                    <Phone className="w-5 h-5 mr-2" />
                    Ring för offert: 073-513 37 09
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
                  ✨ Varför hyra glamping-tält hos oss?
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-smooth">
                      <div className="flex items-start space-x-4">
                        <div className="bg-accent/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Images Gallery */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <img 
                      src={glampingNatur} 
                      alt="Glamping-tält i naturmiljö Skåne - perfekt för bröllop och events"
                      className="w-full h-64 object-cover rounded-lg shadow-card"
                      loading="lazy"
                    />
                    <h3 className="text-lg font-semibold text-center">Perfekt för naturmiljöer</h3>
                  </div>
                  <div className="space-y-4">
                    <img 
                      src={glampingUtemoebler} 
                      alt="Glamping-tält med utemöbler - hyra glamping set Malmö"
                      className="w-full h-64 object-cover rounded-lg shadow-card"
                      loading="lazy"
                    />
                    <h3 className="text-lg font-semibold text-center">Komplett med möbler</h3>
                  </div>
                  <div className="space-y-4">
                    <img 
                      src={glampingInuti} 
                      alt="Glamping-tält interiör sovplats - lyxtält uthyrning Skåne"
                      className="w-full h-64 object-cover rounded-lg shadow-card"
                      loading="lazy"
                    />
                    <h3 className="text-lg font-semibold text-center">Bekväm sovplats</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
                  🎪 Våra tjänster
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-smooth">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Locations Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                  📍 Hyr glamping i Skåne – vi levererar till:
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {locations.map((location, index) => (
                    <Badge key={index} variant="secondary" className="p-3 text-center justify-center">
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 bg-primary text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  📞 Kontakta oss
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <MapPin className="w-8 h-8" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Plats</h3>
                      <p className="text-white/90">Skåne, Eslöv</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Phone className="w-8 h-8" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Telefon</h3>
                      <a href="tel:073-513 37 09" className="text-white/90 hover:text-white transition-smooth">
                        073-513 37 09
                      </a>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-white/80 text-lg">
                  Ring oss för offert eller för att boka ditt tält idag.
                </p>
                <p className="mt-4 text-white/80">
                  <Link to="/talt-brollop" className="underline hover:text-white font-medium">
                    Hyra tält bröllop Skåne
                  </Link>{" "}
                  – läs mer om våra bröllopstjänster.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
                  ❓ Vanliga frågor & svar (FAQ)
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {faqItems.map((faq, index) => (
                    <Card key={index} className="p-6 shadow-card">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {index + 1}. {faq.question}
                      </h3>
                      <p className="text-muted-foreground">
                        {faq.answer}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HyrGlamping;