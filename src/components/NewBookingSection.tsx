import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import TermsModal from "./TermsModal";

// Import carousel images
import heroImage1 from "@/assets/lyxigt-glampingtalt-festival-tentify.webp";
import heroImage2 from "@/assets/festival-talt-inredning-lyxig-camping.webp";
import heroImage3 from "@/assets/glamping-talt-utomhusmobler-festival.webp";
import heroImage4 from "@/assets/festival-glamping-talt-inuti-komfort.webp";
import heroImage5 from "@/assets/tentify-glampingtalt-bekvamlighet-festival.webp";

const carouselImages = [
  { src: heroImage1, alt: "Lyxigt glampingtält för festival - komplett setup" },
  { src: heroImage2, alt: "Glampingtält interiör - bekväm säng och inredning" },
  { src: heroImage3, alt: "Glampingtält exteriör med tarp och utomhusmöbler" },
  { src: heroImage4, alt: "Glampingtält möblerat - komfort och stil" },
  { src: heroImage5, alt: "Glampingtält bekvämlighet - festival glamping" }
];

interface ExtraItem {
  id: string;
  name: string;
  price: number;
  type: 'once' | 'daily';
}

const extraItems: ExtraItem[] = [
  { id: "fylleforsakring", name: "Fylleförsäkring", price: 1000, type: "once" }
];

const NewBookingSection = () => {
  const [bookingType, setBookingType] = useState<'festival' | 'halvpall'>('festival');
  const [currentImage, setCurrentImage] = useState(0);
  const [festival, setFestival] = useState("");
  const [tentSize, setTentSize] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [bookingDays] = useState(4); // Sweden Rock is 4 days
  
  // Halvpall specific states
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Sverige");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isWeekRental, setIsWeekRental] = useState(false);
  
  // Contact form states
  const [showContactForm, setShowContactForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateDays = () => {
    if (bookingType === 'festival') {
      return bookingDays;
    }
    
    if (isWeekRental) {
      return 7;
    }
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    
    return 1;
  };

  const calculateTotal = () => {
    let basePrice = 0;
    
    if (bookingType === 'festival') {
      // Festival pricing
      if (tentSize === "singel") basePrice = 7800;
      if (tentSize === "dubbel") basePrice = 9200;
    } else {
      // Halvpall pricing
      const days = calculateDays();
      const rentalCost = isWeekRental ? 10000 : days * 2500;
      basePrice = 1200 + rentalCost; // Frakt + rental
    }

    const extrasTotal = selectedExtras.reduce((sum, extraId) => {
      const extra = extraItems.find(item => item.id === extraId);
      if (!extra) return sum;
      
      if (extra.type === 'daily') {
        return sum + (extra.price * calculateDays());
      }
      return sum + extra.price;
    }, 0);

    return basePrice + extrasTotal;
  };

  const calculateDeposit = () => Math.round(calculateTotal() * 0.2);

  const handleProceedToDetails = () => {
    if (bookingType === 'festival' && (!festival || !tentSize)) {
      toast.error("Välj festival och tältstorlek för att fortsätta");
      return;
    }
    
    if (bookingType === 'halvpall' && (!address || !postalCode || !city || !tentSize)) {
      toast.error("Fyll i alla obligatoriska fält för att fortsätta");
      return;
    }
    
    setShowContactForm(true);
  };

  const handleFinalBooking = () => {
    if (!name || !email || !phone || !acceptedTerms) {
      toast.error("Fyll i alla obligatoriska fält och acceptera villkoren");
      return;
    }

    // Log booking details (in real app, this would be sent to backend)
    console.log("Booking details:", {
      bookingType,
      festival: bookingType === 'festival' ? festival : null,
      address: bookingType === 'halvpall' ? { address, postalCode, city, country } : null,
      tentSize,
      selectedExtras,
      days: calculateDays(),
      total: calculateTotal(),
      deposit: calculateDeposit(),
      contact: { name, email, phone, message }
    });

    toast.success("Bokning mottagen! Vi kontaktar dig inom 24 timmar för bekräftelse och betalning.");
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section id="boka-talt" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Boka ditt tält nu
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Välj mellan festivalbokningar eller hemkörning av vårt kompletta glampingkit.
            </p>
            
            {/* Pre-booking badge */}
            <Badge variant="secondary" className="bg-primary/10 text-primary font-medium px-4 py-2">
              Förhandsbokning för Sweden Rock är öppen
            </Badge>
          </div>

          {/* Mini image carousel */}
          <div className="relative mb-8">
            <div className="relative h-64 md:h-80 overflow-hidden rounded-lg shadow-elegant">
              <img
                src={carouselImages[currentImage].src}
                alt={carouselImages[currentImage].alt}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation buttons */}
              <Button
                variant="outline"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Thumbnail dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-smooth ${
                      index === currentImage ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Card className="p-8 shadow-elegant">
            {/* Booking type toggle */}
            <div className="mb-8">
              <Label className="text-base font-semibold mb-4 block">Välj bokningstyp</Label>
              <div className="flex rounded-lg bg-muted p-1">
                <button
                  onClick={() => setBookingType('festival')}
                  className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                    bookingType === 'festival'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Festival
                </button>
                <button
                  onClick={() => setBookingType('halvpall')}
                  className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                    bookingType === 'halvpall'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Halvpall till min adress
                </button>
              </div>
            </div>

            {bookingType === 'festival' ? (
              /* Festival booking form */
              <div className="space-y-6">
                <div>
                  <Label htmlFor="festival" className="text-base font-semibold">Festival</Label>
                  <Select value={festival} onValueChange={setFestival}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Välj festival" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sweden-rock">Sweden Rock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Tältstorlek</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { value: "singel", label: "Singel (1 person)", price: "7 800 kr" },
                      { value: "dubbel", label: "Dubbel (2 personer)", price: "9 200 kr" }
                    ].map((option) => (
                      <label key={option.value} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="tentSize"
                          value={option.value}
                          checked={tentSize === option.value}
                          onChange={(e) => setTentSize(e.target.value)}
                          className="sr-only"
                        />
                        <Card className={`p-4 transition-smooth ${
                          tentSize === option.value
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        }`}>
                          <h4 className="font-semibold text-foreground">{option.label}</h4>
                          <p className="text-lg font-bold text-primary mt-1">{option.price}</p>
                        </Card>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Halvpall booking form */
              <div className="space-y-6">
                {/* Info card with image and included items */}
                <Card className="p-6 bg-secondary/30 border-primary/20">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <img
                        src={carouselImages[0].src}
                        alt="Halvpall med komplett glampingkit"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-4">Ingående delar i halvpalls-kitet:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Tält (uppblåsbart) med tarp/UV-skydd</li>
                        <li>• Manuell pump, pinnar/linor</li>
                        <li>• 2 stolar, bord, matta, filt</li>
                        <li>• Lykta med högtalare/naturljud</li>
                        <li>• Deluxe uppblåsbar säng (singel/dubbel)</li>
                        <li>• Nattduksbord</li>
                        <li>• Indragbar el/elkabel</li>
                        <li>• Goodiebag & picknickkorg (toalettpapper, våtservetter, mobilladdare, 2 muggar, bestick, 2 glas)</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Address fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Gatuadress *</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Gatuadress"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postal-code">Postnummer *</Label>
                    <Input
                      id="postal-code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="12345"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Ort *</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ort"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Land</Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Sverige"
                    />
                  </div>
                </div>

                {/* Rental period */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Hyresperiod</Label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="week-rental"
                        checked={isWeekRental}
                        onCheckedChange={(checked) => setIsWeekRental(checked as boolean)}
                      />
                      <Label htmlFor="week-rental">1 vecka (7 dygn) - Spara pengar!</Label>
                    </div>
                    
                    {!isWeekRental && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start-date">Startdatum</Label>
                          <Input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="end-date">Slutdatum</Label>
                          <Input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tent size for halvpall */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Tältstorlek</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { value: "singel", label: "Singel (1 person)" },
                      { value: "dubbel", label: "Dubbel (2 personer)" }
                    ].map((option) => (
                      <label key={option.value} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="tentSize"
                          value={option.value}
                          checked={tentSize === option.value}
                          onChange={(e) => setTentSize(e.target.value)}
                          className="sr-only"
                        />
                        <Card className={`p-4 transition-smooth ${
                          tentSize === option.value
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        }`}>
                          <h4 className="font-semibold text-foreground">{option.label}</h4>
                        </Card>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Extra items */}
            <div className="mt-8">
              <Label className="text-base font-semibold mb-4 block">Extraval</Label>
              <div className="space-y-3">
                {extraItems.map((extra) => (
                  <div key={extra.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={extra.id}
                        checked={selectedExtras.includes(extra.id)}
                        onCheckedChange={() => handleExtraToggle(extra.id)}
                      />
                      <Label htmlFor={extra.id} className="font-medium">
                        {extra.name}
                      </Label>
                    </div>
                    <span className="font-semibold text-primary">
                      {extra.price.toLocaleString()} kr
                      {extra.type === 'daily' && bookingType === 'festival' && (
                        <span className="text-sm text-muted-foreground ml-1">
                          (× {bookingDays} dagar)
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price calculator */}
            <Card className="p-6 bg-secondary/30 border-primary/20 mt-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Prissammanfattning</h3>
              <div className="space-y-2 text-sm">
                {bookingType === 'festival' ? (
                  <>
                    <div className="flex justify-between">
                      <span>Tält ({tentSize}):</span>
                      <span>{tentSize === "singel" ? "7 800" : tentSize === "dubbel" ? "9 200" : "0"} kr</span>
                    </div>
                    {selectedExtras.length > 0 && (
                      <div className="flex justify-between">
                        <span>Extraval:</span>
                        <span>{selectedExtras.reduce((sum, extraId) => {
                          const extra = extraItems.find(item => item.id === extraId);
                          return sum + (extra?.price || 0) * (extra?.type === 'daily' ? bookingDays : 1);
                        }, 0).toLocaleString()} kr</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span>Frakt t/r:</span>
                      <span>1 200 kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hyra ({calculateDays()} {calculateDays() === 1 ? 'dag' : 'dagar'}):</span>
                      <span>{isWeekRental ? "10 000" : (calculateDays() * 2500).toLocaleString()} kr</span>
                    </div>
                    {selectedExtras.length > 0 && (
                      <div className="flex justify-between">
                        <span>Extraval:</span>
                        <span>{selectedExtras.reduce((sum, extraId) => {
                          const extra = extraItems.find(item => item.id === extraId);
                          return sum + (extra?.price || 0);
                        }, 0).toLocaleString()} kr</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="border-t border-border pt-2 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Totalt:</span>
                  <span>{calculateTotal().toLocaleString()} kr</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>Förskott (20%, ej återbetalningsbart):</span>
                  <span>{calculateDeposit().toLocaleString()} kr</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Deposition:</span>
                  <span>1 500 kr</span>
                </div>
              </div>
            </Card>

            {/* Contact form toggle */}
            {!showContactForm ? (
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleProceedToDetails}
                  size="lg" 
                  className="btn-hero text-lg px-12 py-4"
                >
                  Gå vidare till uppgifter
                </Button>
              </div>
            ) : (
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">Dina uppgifter</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Namn *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ditt namn"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-post *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="din@email.se"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="070-123 45 67"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Meddelande (valfritt)</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Eventuella önskemål eller frågor..."
                      rows={3}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      Jag accepterar{" "}
                      <TermsModal 
                        trigger={
                          <button
                            type="button"
                            className="text-primary hover:underline"
                          >
                            villkoren
                          </button>
                        }
                      />{" "}
                      och förstår att förskottet (20%) inte är återbetalningsbart. *
                    </Label>
                  </div>

                  <Button 
                    onClick={handleFinalBooking}
                    size="lg" 
                    className="btn-hero text-lg px-12 py-4 w-full"
                    disabled={!acceptedTerms}
                  >
                    Slutför bokning & betala förskott (20%)
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NewBookingSection;