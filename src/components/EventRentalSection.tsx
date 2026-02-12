import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Truck, Users, Package } from "lucide-react";

const EventRentalSection = () => {
  const handleQuoteRequest = () => {
    const email = "info@tentify.se";
    const subject = "Offertförfrågan - Uthyrning till event";
    const body = `Hej!

Jag är intresserad av att hyra tält till mitt event. Här är information om mitt event:

Typ av event: [Bröllop/Företagsevent/Privat fest/Annat]
Datum: [Datum]
Plats: [Ort]
Antal tält: [Antal tält]
Önskemål: [Leverans/Uppmontage/Hämta själv]

Övrig information:
[Berätta mer om ditt event]

Mvh,
[Ditt namn]
[Telefonnummer]`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="hyra-till-event" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Hyra till event & bröllop
            </h2>
            <p className="text-lg text-muted-foreground">
              Vill du ha våra tält till ditt event, bröllop eller privata tillställning? 
              Tentify erbjuder uthyrning från 2 tält och uppåt. Du kan välja att hämta tält på plats, 
              få dem skickade på halvpall eller få dem monterade av vårt team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center shadow-card hover:shadow-elegant transition-smooth">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Bröllop</h3>
              <p className="text-sm text-muted-foreground">
                Romantiska glampingtält för era gäster
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card hover:shadow-elegant transition-smooth">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Företagsevent</h3>
              <p className="text-sm text-muted-foreground">
                Imponera på kollegor och kunder
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card hover:shadow-elegant transition-smooth">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Privata fester</h3>
              <p className="text-sm text-muted-foreground">
                Unik boende för dina gäster
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card hover:shadow-elegant transition-smooth">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Leverans</h3>
              <p className="text-sm text-muted-foreground">
                Flexibla leveransalternativ
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-primary text-primary-foreground shadow-elegant">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Tre enkla alternativ för ditt event
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🚚 Leverans</h4>
                  <p className="text-sm opacity-90">
                    Vi skickar tälten på halvpall direkt till dig
                  </p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📍 Hämta själv</h4>
                  <p className="text-sm opacity-90">
                    Hämta tälten på vår upphämtningsplats
                  </p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⛺ Montage</h4>
                  <p className="text-sm opacity-90">
                    Vi kommer och monterar allt på plats åt dig
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="mb-6 opacity-90">
                  Minsta beställning: 2 tält | Specialpriser för större event
                </p>
                
                <Button 
                  onClick={handleQuoteRequest}
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-4 hover:scale-105 transition-bounce"
                >
                  Skicka offertförfrågan
                </Button>
              </div>
            </div>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              📞 Ring oss på <strong>0735133709</strong> för direktkontakt
              <br />
              📧 Eller mejla till <strong>info@tentify.se</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventRentalSection;