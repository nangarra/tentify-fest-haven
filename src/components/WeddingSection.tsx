import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const WeddingSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Glamping bröllop i Skåne – hyr tält till era gäster
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Planerar ni bröllop och behöver extra sovplatser? Tentify erbjuder{" "}
              <Link
                to="/talt-brollop"
                className="text-primary hover:underline font-medium"
              >
                glamping för bröllop
              </Link>{" "}
              i Skåne med fullt möblerade tält som skapar en vacker och
              sammanhållen bröllopshelg.
            </p>
            <p className="text-muted-foreground mb-8">
              Allt fler söker efter glamping bröllop, hyra tält bröllop, hyra
              tält bröllop Skåne och tält till bröllopsgäster. Vi hjälper er
              skapa en stämningsfull bröllopsby där gästerna kan sova kvar och
              vakna tillsammans dagen efter.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              "Fullt möblerade tält",
              "Installation & nedmontering",
              "Flexibel hyra 2–7 dagar eller längre",
              "Leverans i hela Skåne",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild className="btn-hero">
              <Link to="/talt-brollop">Läs mer om tält bröllop →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingSection;
