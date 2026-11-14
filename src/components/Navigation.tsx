import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import tentifyLogo from "@/assets/logo_tentify.gif";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-smooth ${
        isScrolled ? "navbar-blur shadow-card" : "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
      }`}
    >
      {isHomePage && (
        <Link
          to="/booking/sweden-rock-2027"
          className="block bg-primary text-primary-foreground"
          aria-label="Bokningen för Sweden Rock 2027 är öppen – gå direkt till bokningen"
        >
          <div className="container mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 text-center text-sm">
            <span className="font-semibold tracking-wide">
              Bokningen för Sweden Rock 2027 är öppen
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium underline underline-offset-4 decoration-primary-foreground/50 hover:decoration-primary-foreground transition-smooth">
              Klicka här för att boka
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </Link>
      )}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src={tentifyLogo} 
                alt="Tentify - Lyxiga glampingtält för festivaler" 
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection("hem")}
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  Hem
                </button>
              ) : (
                <Link
                  to="/"
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  Hem
                </Link>
              )}
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection("boka-talt")}
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  Boka tält
                </button>
              ) : (
                <Link
                  to="/#boka-talt"
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  Boka tält
                </Link>
              )}
              <Link
                to="/hyr-glamping"
                className={`text-foreground hover:text-primary transition-smooth font-medium ${
                  location.pathname === "/hyr-glamping" ? "text-primary" : ""
                }`}
              >
                Hyr Glamping
              </Link>
              <Link
                to="/talt-brollop"
                className={`text-foreground hover:text-primary transition-smooth font-medium ${
                  location.pathname === "/talt-brollop" ? "text-primary" : ""
                }`}
              >
                Tält bröllop
              </Link>
              <Link
                to="/glamping-sweden-rock"
                className={`text-foreground hover:text-primary transition-smooth font-medium ${
                  location.pathname === "/glamping-sweden-rock" ? "text-primary" : ""
                }`}
              >
                Sweden Rock
              </Link>
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection("galleri")}
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  Galleri
                </button>
              ) : (
                <Link
                  to="/#galleri"
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  Galleri
                </Link>
              )}
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  Kontakt
                </button>
              ) : (
                <Link
                  to="/#kontakt"
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  Kontakt
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 shadow-card">
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection("hem")}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
                >
                  Hem
                </button>
              ) : (
                <Link
                  to="/"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
                  onClick={() => setIsOpen(false)}
                >
                  Hem
                </Link>
              )}
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection("boka-talt")}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
                >
                  Boka tält
                </button>
              ) : (
                <Link
                  to="/#boka-talt"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
                  onClick={() => setIsOpen(false)}
                >
                  Boka tält
                </Link>
              )}
              <Link
                to="/hyr-glamping"
                className={`block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left ${
                  location.pathname === "/hyr-glamping" ? "text-primary" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Hyr Glamping
              </Link>
              <Link
                to="/talt-brollop"
                className={`block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left ${
                  location.pathname === "/talt-brollop" ? "text-primary" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Tält bröllop
              </Link>
              <Link
                to="/glamping-sweden-rock"
                className={`block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left ${
                  location.pathname === "/glamping-sweden-rock" ? "text-primary" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Sweden Rock
              </Link>
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection("galleri")}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
                >
                  Galleri
                </button>
              ) : (
                <Link
                  to="/#galleri"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
                  onClick={() => setIsOpen(false)}
                >
                  Galleri
                </Link>
              )}
              {isHomePage ? (
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
                >
                  Kontakt
                </button>
              ) : (
                <Link
                  to="/#kontakt"
                  className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
                  onClick={() => setIsOpen(false)}
                >
                  Kontakt
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;