import { Card } from "@/components/ui/card";
import { 
  Tent, 
  Armchair, 
  Lightbulb, 
  Bed, 
  Zap, 
  Package,
  Shield,
  Music
} from "lucide-react";

const includedItems = [
  {
    icon: Shield,
    title: "Tarp ovan tältet",
    description: "UV-skydd, regnskydd, svalare på dagen"
  },
  {
    icon: Armchair,
    title: "Två stolar + bord",
    description: "Kan användas inne eller ute"
  },
  {
    icon: Package,
    title: "Matta & filt",
    description: "Bekvämt och mysigt underlag"
  },
  {
    icon: Music,
    title: "Lykta med högtalare",
    description: "Belysning och naturljud för atmosfär"
  },
  {
    icon: Bed,
    title: "Deluxe uppblåsbar säng",
    description: "Singel eller dubbel, bekväm sömn"
  },
  {
    icon: Zap,
    title: "El indragen",
    description: "Praktisk elförsörjning i tältet"
  },
  {
    icon: Lightbulb,
    title: "Nattduksbord",
    description: "Praktisk förvaring vid sängen"
  },
  {
    icon: Package,
    title: "Goodiebag & picknickkorg",
    description: "Toapapper, våtservetter, mobilladdare, 2 muggar, bestick, 2 glas"
  }
];

const IncludedSection = () => {
  return (
    <section id="vad-ingar" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Det här ingår i varje tält
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vi har tänkt på allt för att göra din festivalupplevelse så bekväm som möjligt. 
              Här är vad som väntar dig i ditt Tentify-tält.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedItems.map((item, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-smooth">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="p-8 bg-gradient-primary text-primary-foreground shadow-elegant">
              <h3 className="text-2xl font-bold mb-4">
                Allt klart när du anländer!
              </h3>
              <p className="text-lg opacity-90">
                Du behöver bara ta med dina personliga saker, mat och dryck. 
                Vi ordnar resten för din bekvämlighet.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncludedSection;