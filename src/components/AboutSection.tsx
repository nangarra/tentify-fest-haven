import { Card } from "@/components/ui/card";
import { Tent, Heart, Sparkles } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="om-oss" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Vi fixar allt – du bara njuter
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            På Tentify vill vi göra festivalen till något du minns med glädje – inte stress. 
            Därför erbjuder vi färdiga glampingtält med alla bekvämligheter. Du slipper packa, 
            bära och montera. När du kommer fram står tältet klart – med säng, möbler och 
            detaljer för en härlig upplevelse.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card className="p-8 shadow-card hover:shadow-elegant transition-smooth text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Tent className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Färdiga tält
              </h3>
              <p className="text-muted-foreground">
                Allt är uppsatt och klart när du anländer. Ingen stress med montering eller packning.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-smooth text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Allt inkluderat
              </h3>
              <p className="text-muted-foreground">
                Säng, möbler, el, belysning och smarta detaljer. Du behöver bara ta med mat och dryck.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-smooth text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Lyxig upplevelse
              </h3>
              <p className="text-muted-foreground">
                Upplev festivalen med komfort och stil. Glamping som det ska vara.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;