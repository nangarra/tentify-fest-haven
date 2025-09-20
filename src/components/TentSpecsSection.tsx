import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Shield, 
  Users, 
  Calendar,
  Wind,
  Flame,
  CheckCircle
} from "lucide-react";

const specifications = [
  {
    icon: Clock,
    title: "Enkel installation",
    description: "5 minuter med pump",
    highlight: "Supersnabbt"
  },
  {
    icon: Shield,
    title: "Vattentät & UV-skyddad",
    description: "420D Oxford-duk",
    highlight: "Kvalitet"
  },
  {
    icon: Users,
    title: "Kapacitet",
    description: "2 personer bekvämt",
    highlight: "Rymligt"
  },
  {
    icon: Calendar,
    title: "Fyra säsonger",
    description: "Året runt användning",
    highlight: "Allväder"
  },
  {
    icon: Wind,
    title: "Bra ventilation",
    description: "2 dörrar och 6 fönster",
    highlight: "Fräscht"
  },
  {
    icon: Flame,
    title: "Kaminförberett",
    description: "Chimney window inkluderat",
    highlight: "Mysigt"
  }
];

const TentSpecsSection = () => {
  return (
    <section id="om-vara-talt" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Kvalitet & komfort året runt
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Våra glampingtält är designade för maximal komfort och hållbarhet. 
              Här är specifikationerna som gör skillnaden.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {specifications.map((spec, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-smooth">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <spec.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {spec.highlight}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {spec.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {spec.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-card">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                Kvalitetsgaranti
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                  Stabilt och vindtåligt med stålpinnar & linor
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                  Professionellt testad för svenska väderförhållanden
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                  Miljövänliga material och återvinningsbar
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                  Regelbundet underhållna och inspekterade
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-primary text-primary-foreground shadow-elegant">
              <h3 className="text-xl font-semibold mb-6">
                Därför väljer du Tentify-tält
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🏆 Premiumkvalitet</h4>
                  <p className="text-sm opacity-90">
                    Vi använder bara högkvalitativa material för bästa upplevelse
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🔧 Professionell service</h4>
                  <p className="text-sm opacity-90">
                    Expertmontage och 24/7 support under eventet
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">💰 Bästa värdet</h4>
                  <p className="text-sm opacity-90">
                    Allt inkluderat till konkurrenskraftigt pris
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentSpecsSection;