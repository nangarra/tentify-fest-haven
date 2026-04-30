import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bed, 
  Armchair, 
  Bath, 
  Utensils,
  Package
} from "lucide-react";
import glampingUtemoebler from "@/assets/glamping-talt-utemoebler-komfort.webp";

const extraItems = [
  {
    icon: Package,
    title: "Bäddset",
    price: "250 kr",
    description: "Sköna lakan och kudde för extra komfort"
  },
  {
    icon: Bed,
    title: "Uppgradering till dubbelsäng",
    price: "500 kr",
    description: "Mer utrymme och komfort"
  },
  {
    icon: Armchair,
    title: "Extra stol",
    price: "150 kr",
    description: "Plats för fler vänner att hänga med"
  },
  {
    icon: Bath,
    title: "Handduk",
    price: "80 kr",
    description: "Mjuk och bekväm handduk för duschar"
  },
  {
    icon: Utensils,
    title: "Frukost",
    price: "79 kr/dag",
    description: "Kaffe/te, 1 ägg, 2 mackor, gröt varje morgon"
  }
];

// Check if prices should be hidden until October 1st
const isPricesHidden = () => {
  const today = new Date();
  const openingDate = new Date(2025, 9, 1); // October 1st, 2025 (month is 0-indexed)
  return today < openingDate;
};

const ExtrasSection = () => {
  return (
    <section id="extra-tillbehor" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Uppgradera din upplevelse
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Gör din festivalvistelse ännu mer bekväm med våra extra tillbehör. 
              Lägg till det du vill ha för en personlig touch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extraItems.map((item, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-smooth">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-accent/20 w-12 h-12 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <Badge variant="secondary" className="text-sm font-semibold">
                    {isPricesHidden() ? "Pris publiceras 1 oktober" : item.price}
                  </Badge>
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

          {/* Image showcase */}
          <div className="mt-12 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <img 
                src={glampingUtemoebler} 
                alt="Glamping-tält med utemöbler - extrakomfort för din upplevelse"
                className="w-full h-64 object-cover rounded-lg shadow-card hover:shadow-elegant transition-smooth"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-foreground">
                Bekväma utemöbler för maximal komfort
              </h3>
            </div>
          </div>

          <div className="text-center mt-12">
            <Card className="p-6 bg-card shadow-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                💡 Tips för bästa upplevelsen
              </h3>
              <p className="text-muted-foreground">
                Bäddset och frukost är våra mest populära tillval. 
                Perfekt för en bekväm start på dagen och mysiga nätter!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtrasSection;