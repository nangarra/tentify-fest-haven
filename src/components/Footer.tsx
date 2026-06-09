import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">Tentify</h3>
              <p className="text-primary-foreground/80 text-sm">
                Lyxiga glampingtält för festivaler, bröllop och event. 
                Vi gör din upplevelse enklare och bekvämare.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Snabblänkar</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <button 
                    onClick={() => document.getElementById('hem')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-primary-foreground transition-smooth"
                  >
                    Hem
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('boka-talt')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-primary-foreground transition-smooth"
                  >
                    Boka tält
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('galleri')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-primary-foreground transition-smooth"
                  >
                    Galleri
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-primary-foreground transition-smooth"
                  >
                    Kontakt
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Våra tjänster</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <Link to="/glamping-sweden-rock" className="hover:text-primary-foreground transition-smooth">
                    Glamping Sweden Rock
                  </Link>
                </li>
                <li>Festival glampingtält</li>
                <li>Bröllop & event</li>
                <li>Företagsevent</li>
                <li>Privata fester</li>
                <li>Leverans & montage</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <p>Nangarra Invest AB</p>
                <p>📧 info@tentify.se</p>
                <p>📍 Bas: Eslöv</p>
                <p className="mt-3 text-xs">Vi svarar på e-post vanligtvis inom 24 timmar.</p>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="hover:text-primary-foreground transition-smooth">📸</a>
                  <a href="#" className="hover:text-primary-foreground transition-smooth">📘</a>
                  <a href="#" className="hover:text-primary-foreground transition-smooth">💬</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-primary-foreground/80">
                © 2024 Tentify. Alla rättigheter förbehållna.
              </p>
              
              <div className="flex items-center space-x-1 text-sm text-primary-foreground/80">
                <span>Gjord med</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>för svenska festivalälskare</span>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-primary-foreground/60">
              <p>
                © 2024 Nangarra Invest AB. Alla rättigheter förbehållna. Drömmer du om att bo bekvämt på nästa festival? Med Tentify hyr du färdiga glampingtält med allt inkluderat. Våra tält är utrustade med uppblåsbara sängar, stolar, bord, el, mattor, filtar och smarta detaljer som gör upplevelsen bekväm. Du slipper tänka på logistik och montering – allt står klart när du anländer. Tentify erbjuder tält på festivaler som Sweden Rock, men även för bröllop och privata event. Välj mellan olika tältstorlekar, lägg till extra tillbehör och upplev en lyxig campingkänsla. Boka enkelt online redan idag.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;