import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import TermsModal from "./TermsModal";

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

const NewBookingSection = () => {
  const [festival, setFestival] = useState<string>('');
  const [tentSize, setTentSize] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [days, setDays] = useState<number>(4); // Default festival days
  const [showContactForm, setShowContactForm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // Contact form fields
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const basePrices = {
    singel: 7800,
    dubbel: 9200
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

  const calculateDeposit = () => {
    const total = calculateTotal();
    return Math.round(total * 0.2); // 20% deposit
  };

  const handleProceedToDetails = () => {
    if (!festival || !tentSize) {
      alert('Vänligen välj festival och tältstorlek');
      return;
    }
    setShowContactForm(true);
  };

  const handleFinalBooking = () => {
    if (!contactData.name || !contactData.email || !contactData.phone || !acceptedTerms) {
      alert('Vänligen fyll i alla obligatoriska fält och godkänn villkoren');
      return;
    }
    
    const bookingDetails = {
      festival,
      tentSize,
      extras: selectedExtras,
      total: calculateTotal(),
      deposit: calculateDeposit(),
      days,
      contact: contactData
    };
    
    console.log('Bokning:', bookingDetails);
    alert(`Tack! Vi behandlar din order och mejlar dig inom de kommande dagarna med detaljerna.`);
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
              Gör din bokning snabbt och enkelt. Välj festival, tältstorlek och lägg till extra tillbehör.
            </p>
          </div>

          <Card className="p-8 shadow-elegant">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Booking Form */}
              <div className="space-y-6">
                {/* Festival Selection */}
                <div>
                  <Label className="block text-sm font-medium text-foreground mb-3">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Välj festival <span className="text-destructive">*</span>
                  </Label>
                  <Select value={festival} onValueChange={setFestival}>
                    <SelectTrigger>
                      <SelectValue placeholder="Välj festival" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sweden-rock">Sweden Rock Festival</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tent Size Selection */}
                <div>
                  <Label className="block text-sm font-medium text-foreground mb-3">
                    <MapPin className="inline w-4 h-4 mr-2" />
                    Tältstorlek <span className="text-destructive">*</span>
                  </Label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="tentSize"
                        value="singel"
                        checked={tentSize === 'singel'}
                        onChange={(e) => setTentSize(e.target.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="flex-1 flex justify-between">
                        <span>Singel</span>
                        <Badge variant="outline">7 800 kr</Badge>
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="tentSize"
                        value="dubbel"
                        checked={tentSize === 'dubbel'}
                        onChange={(e) => setTentSize(e.target.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="flex-1 flex justify-between">
                        <span>Dubbel</span>
                        <Badge variant="outline">9 200 kr</Badge>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Extra Options */}
                <div>
                  <Label className="block text-sm font-medium text-foreground mb-3">
                    Extra tillbehör
                  </Label>
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
                        <div className="border-t pt-3 mt-3 space-y-2">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Totalt</span>
                            <span className="text-primary">{calculateTotal()} kr</span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>Att betala nu (20% förskott, ej återbetalningsbart)</span>
                            <span className="font-semibold">{calculateDeposit()} kr</span>
                          </div>
                        </div>
                        
                        {!showContactForm ? (
                          <Button 
                            onClick={handleProceedToDetails}
                            className="w-full btn-hero mt-6"
                          >
                            Gå vidare till uppgifter
                          </Button>
                        ) : null}
                      </>
                    )}
                  </div>
                  
                  {!tentSize && (
                    <p className="text-muted-foreground italic text-sm mt-4">
                      Välj festival och tältstorlek för att se priset
                    </p>
                  )}
                </Card>

                <div className="mt-6 text-sm text-muted-foreground">
                  <p>📧 Du kommer få en bekräftelse via e-post</p>
                  <p>💳 20% förskott betalas vid bokning</p>
                  <p>🔄 Förskottet är ej återbetalningsbart</p>
                </div>
              </div>
            </div>

            {/* Contact Form (Expandable) */}
            {showContactForm && (
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    Dina uppgifter
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowContactForm(false)}
                  >
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Dölj
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Namn <span className="text-destructive">*</span></Label>
                      <Input
                        id="name"
                        value={contactData.name}
                        onChange={(e) => setContactData(prev => ({...prev, name: e.target.value}))}
                        placeholder="Ditt fullständiga namn"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-post <span className="text-destructive">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactData.email}
                        onChange={(e) => setContactData(prev => ({...prev, email: e.target.value}))}
                        placeholder="din.epost@exempel.se"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon <span className="text-destructive">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactData.phone}
                        onChange={(e) => setContactData(prev => ({...prev, phone: e.target.value}))}
                        placeholder="070-123 45 67"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Meddelande (frivilligt)</Label>
                    <Textarea
                      id="message"
                      value={contactData.message}
                      onChange={(e) => setContactData(prev => ({...prev, message: e.target.value}))}
                      placeholder="Eventuella önskemål eller frågor..."
                      rows={6}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <label htmlFor="terms" className="cursor-pointer">
                        Jag godkänner{" "}
                        <TermsModal
                          trigger={
                            <Button variant="link" className="p-0 h-auto text-primary underline">
                              Tentifys villkor
                            </Button>
                          }
                        />
                        <span className="text-destructive"> *</span>
                      </label>
                    </div>
                  </div>

                  <Button 
                    onClick={handleFinalBooking}
                    className="w-full btn-hero text-lg py-6"
                    disabled={!acceptedTerms || !contactData.name || !contactData.email || !contactData.phone}
                  >
                    Slutför bokning & betala förskott ({calculateDeposit()} kr)
                  </Button>
                </div>
              </div>
            )}
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

export default NewBookingSection;