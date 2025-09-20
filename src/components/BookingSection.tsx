import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calculator, MapPin, Calendar } from "lucide-react";

interface ExtraItem {
  id: string;
  name: string;
  price: number;
  type: 'once' | 'daily';
}

const extraItems: ExtraItem[] = [
  { id: 'baddset', name: 'Bäddset', price: 250, type: 'once' },
  { id: 'dubbelsang', name: 'Uppgradering till dubbelsäng', price: 500, type: 'once' },
  { id: 'extra-stol', name: 'Extra stol', price: 150, type: 'once' },
  { id: 'handduk', name: 'Handduk', price: 80, type: 'once' },
  { id: 'vattenkokare', name: 'Vattenkokare', price: 80, type: 'once' },
  { id: 'frukost', name: 'Frukost', price: 79, type: 'daily' }
];

const BookingSection = () => {
  const [tentSize, setTentSize] = useState<string>('');
  const [festival, setFestival] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [days, setDays] = useState<number>(3); // Default festival days

  const basePrices = {
    singel: 2500,
    dubbel: 3200
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateTotal = () => {
    if (!tentSize) return 0;
    
    const basePrice = basePrices[tentSize as keyof typeof basePrices] || 0;
    const extrasTotal = selectedExtras.reduce((total, extraId) => {
      const extra = extraItems.find(item => item.id === extraId);
      if (!extra) return total;
      return total + (extra.type === 'daily' ? extra.price * days : extra.price);
    }, 0);
    
    return basePrice + extrasTotal;
  };

  const handleBooking = () => {
    if (!tentSize || !festival) {
      alert('Vänligen välj tältstorlek och festival');
      return;
    }
    
    const bookingDetails = {
      tentSize,
      festival,
      extras: selectedExtras,
      total: calculateTotal(),
      days
    };
    
    console.log('Bokning:', bookingDetails);
    alert(`Tack för din bokning! Total kostnad: ${calculateTotal()} kr. Vi kommer kontakta dig för bekräftelse.`);
  };

  return (
    <section id="boka-talt" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Boka ditt tält nu
            </h2>
            <p className="text-lg text-muted-foreground">
              Gör din bokning snabbt och enkelt. Välj tältstorlek, lägg till extra tillbehör och se din totalkostnad direkt.
            </p>
          </div>

          <Card className="p-8 shadow-elegant">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Booking Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    <MapPin className="inline w-4 h-4 mr-2" />
                    Välj tältstorlek
                  </label>
                  <Select value={tentSize} onValueChange={setTentSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Välj storlek" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="singel">Singeltält - 2 500 kr</SelectItem>
                      <SelectItem value="dubbel">Dubbeltält - 3 200 kr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Välj festival
                  </label>
                  <Select value={festival} onValueChange={setFestival}>
                    <SelectTrigger>
                      <SelectValue placeholder="Välj festival" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sweden-rock">Sweden Rock Festival</SelectItem>
                      <SelectItem value="other">Annat event (kontakta oss)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Extra tillbehör
                  </label>
                  <div className="space-y-3">
                    {extraItems.map((extra) => (
                      <div key={extra.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={extra.id}
                          checked={selectedExtras.includes(extra.id)}
                          onCheckedChange={() => handleExtraToggle(extra.id)}
                        />
                        <label 
                          htmlFor={extra.id}
                          className="flex-1 text-sm cursor-pointer flex justify-between items-center"
                        >
                          <span>{extra.name}</span>
                          <Badge variant="outline">
                            {extra.price} kr{extra.type === 'daily' ? '/dag' : ''}
                          </Badge>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Calculator */}
              <div>
                <Card className="p-6 bg-gradient-subtle">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Prissammanställning
                  </h3>
                  
                  <div className="space-y-3">
                    {tentSize && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          {tentSize === 'singel' ? 'Singeltält' : 'Dubbeltält'}
                        </span>
                        <span className="font-semibold">
                          {basePrices[tentSize as keyof typeof basePrices]} kr
                        </span>
                      </div>
                    )}
                    
                    {selectedExtras.map(extraId => {
                      const extra = extraItems.find(item => item.id === extraId);
                      if (!extra) return null;
                      const price = extra.type === 'daily' ? extra.price * days : extra.price;
                      return (
                        <div key={extraId} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            {extra.name} {extra.type === 'daily' && `(${days} dagar)`}
                          </span>
                          <span>{price} kr</span>
                        </div>
                      );
                    })}
                    
                    {calculateTotal() > 0 && (
                      <>
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Totalt</span>
                            <span className="text-primary">{calculateTotal()} kr</span>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleBooking}
                          className="w-full btn-hero mt-6"
                        >
                          Boka nu - {calculateTotal()} kr
                        </Button>
                      </>
                    )}
                  </div>
                  
                  {!tentSize && (
                    <p className="text-muted-foreground italic text-sm mt-4">
                      Välj tältstorlek för att se priset
                    </p>
                  )}
                </Card>

                <div className="mt-6 text-sm text-muted-foreground">
                  <p>📧 Du kommer få en bekräftelse via e-post</p>
                  <p>💳 Betalning sker vid ankomst</p>
                  <p>🔄 Gratis avbokning upp till 7 dagar före</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Boka ditt glampingtält snabbt och smidigt. Välj tältstorlek, lägg till extra tillbehör och välj vilken festival eller event du vill boka till. Just nu erbjuder Tentify uthyrning på Sweden Rock – men vi hyr även ut till bröllop, event och privata fester. Allt ingår, från möbler och belysning till goodiebags och smarta detaljer. Gör din bokning idag och säkra din plats.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;