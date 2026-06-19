import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Sparkles, CheckCircle2, Star } from "lucide-react";
import heroImage from "@/assets/sweden-rock-glamping-talt.webp.asset.json";
import interiorImage from "@/assets/glampingtalt-sweden-rock-interior.webp.asset.json";

const SwedenRock2027Section = () => {
  return (
    <section id="sweden-rock-2027" className="relative py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-elegant aspect-[4/5] md:aspect-[4/5]">
            <img
              src={heroImage.url}
              alt="Tentify glampingtält nära Sweden Rock Festival"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-background/90 text-foreground border-0">
                Sweden Rock 2027
              </Badge>
            </div>
            <div className="absolute bottom-4 right-4 w-1/2 aspect-video rounded-lg overflow-hidden border-2 border-background shadow-lg hidden md:block">
              <img
                src={interiorImage.url}
                alt="Färdigbäddat glampingtält interiör"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <Badge variant="secondary" className="mb-4">
              Förhandsbokning öppen
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              Sweden Rock 2027 – Förhandsbokning öppen
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Vill du bo bekvämt nära Sweden Rock nästa år? Skriv upp dig på vår
              förhandsbokning för Tentify Glamping 2027 och få chansen att boka
              innan platserna släpps offentligt.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                { icon: Sparkles, text: "Färdigbäddade glampingtält – bara checka in" },
                { icon: MapPin, text: "Endast 10 minuter från festivalen" },
                { icon: Calendar, text: "Sweden Rock Festival 2027" },
                { icon: CheckCircle2, text: "Begränsat antal tält – först till kvarn" },
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <b.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{b.text}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="btn-hero w-full sm:w-auto">
              <Link to="/glamping-sweden-rock#vantelista">
                Förhandsboka Sweden Rock 2027
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Ingen betalning krävs för förhandsbokning. Du får besked innan
              platserna släpps offentligt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwedenRock2027Section;
