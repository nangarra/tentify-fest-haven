import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
        isScrolled ? "navbar-blur shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Tentify</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("hem")}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                Hem
              </button>
              <button
                onClick={() => scrollToSection("boka-talt")}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                Boka tält
              </button>
              <button
                onClick={() => scrollToSection("galleri")}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                Galleri
              </button>
              <button
                onClick={() => scrollToSection("kontakt")}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                Kontakt
              </button>
              <Button
                onClick={() => scrollToSection("boka-talt")}
                className="btn-hero"
              >
                Boka nu
              </Button>
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
              <button
                onClick={() => scrollToSection("hem")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
              >
                Hem
              </button>
              <button
                onClick={() => scrollToSection("boka-talt")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
              >
                Boka tält
              </button>
              <button
                onClick={() => scrollToSection("galleri")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
              >
                Galleri
              </button>
              <button
                onClick={() => scrollToSection("kontakt")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-smooth font-medium w-full text-left"
              >
                Kontakt
              </button>
              <div className="px-3 py-2">
                <Button
                  onClick={() => scrollToSection("boka-talt")}
                  className="btn-hero w-full"
                >
                  Boka nu
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;