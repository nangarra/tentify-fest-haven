import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import TermsModal from "./TermsModal";
import WaitlistForm from "./WaitlistForm";

// Import carousel images
import heroImage1 from "@/assets/lyxigt-glampingtalt-festival-tentify.webp";
import heroImage2 from "@/assets/festival-talt-inredning-lyxig-camping.webp";
import heroImage3 from "@/assets/glamping-talt-utomhusmobler-festival.webp";
import heroImage4 from "@/assets/festival-glamping-talt-inuti-komfort.webp";
import heroImage5 from "@/assets/tentify-glampingtalt-bekvamlighet-festival.webp";

// Import tent size images
import dubbelsangImage from "@/assets/glampingtalt-dubbelsang.webp";
import enkelsangImage from "@/assets/glampingtalt-enkelsang.webp";

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
  type: 'once' | 'daily' | 'counter';
}

const extraItems: ExtraItem[] = [
  { id: "baddset", name: "Bäddset", price: 250, type: "once" },
  { id: "upgrade-dubbel", name: "Uppgradera till dubbelsäng", price: 500, type: "once" },
  { id: "extra-stol", name: "Extra stol", price: 150, type: "once" },
  { id: "handduk", name: "Handduk", price: 80, type: "once" },
  { id: "frukost", name: "Frukost", price: 79, type: "daily" },
  { id: "extra-person", name: "Extra person i tältet", price: 500, type: "counter" },
  { id: "fylleforsakring", name: "Fylleförsäkring", price: 1000, type: "once" }
];

// Scheduled release for 5 extra Medium tents:
// Friday 1 May 2026 at 08:00 Europe/Stockholm = 06:00 UTC (CEST = UTC+2)
const EXTRA_MEDIUM_RELEASE_AT = new Date('2026-05-01T06:00:00Z');

const NewBookingSection = () => {
  const [bookingType, setBookingType] = useState<'festival' | 'halvpall'>('festival');
  const [currentImage, setCurrentImage] = useState(0);
  const [festival, setFestival] = useState("sweden-rock");
  const [tentSize, setTentSize] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [extraPersons, setExtraPersons] = useState(0);
  const [bookingDays] = useState(4); // Sweden Rock is 4 days
  const [inventory, setInventory] = useState({ 'medium-tent': 0, 'medium-plus': 0, 'medium-extra': 0 });
  const [extraReleaseAt, setExtraReleaseAt] = useState<Date>(EXTRA_MEDIUM_RELEASE_AT);
  const [now, setNow] = useState<Date>(new Date());
  
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch inventory on mount
  useEffect(() => {
    fetchInventory();
  }, []);

  // Tick clock every second so countdown updates and extras unlock automatically
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fetchInventory = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase.rpc('get_tent_availability', { p_festival: 'sweden-rock' });

    if (error) {
      console.error('Error fetching inventory:', error);
      return;
    }

    const inventoryMap = (data as any[]).reduce((acc: any, item: any) => {
      const displayType = item.tent_type === 'singel' ? 'medium-tent' :
                          item.tent_type === 'dubbel' ? 'medium-plus' :
                          item.tent_type;
      acc[displayType] = item.available_count;
      if (item.tent_type === 'medium-extra' && item.release_at) {
        setExtraReleaseAt(new Date(item.release_at));
      }
      return acc;
    }, { 'medium-tent': 0, 'medium-plus': 0, 'medium-extra': 0 });

    setInventory(inventoryMap);
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const getMaxExtraPersons = () => {
    if (tentSize === "singel") return 3;
    if (tentSize === "dubbel") return 2;
    return 0;
  };

  // Validate extra persons when tent size changes
  useEffect(() => {
    const maxPersons = getMaxExtraPersons();
    if (extraPersons > maxPersons) {
      setExtraPersons(maxPersons);
    }
  }, [tentSize, extraPersons]);

  const calculateDays = () => {
    if (bookingType === 'festival') {
      return bookingDays;
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

  const getHalvpallDayPrice = (days: number) => {
    if (days >= 7) return 1000;
    if (days >= 5) return 1500;
    if (days >= 3) return 1800;
    return 2000;
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
      const dayPrice = getHalvpallDayPrice(days);
      const rentalCost = days * dayPrice;
      basePrice = 1200 + rentalCost; // Frakt + rental
    }

    // Filter extras based on booking type
    const availableExtras = bookingType === 'halvpall' 
      ? extraItems.filter(item => item.id === 'fylleforsakring')
      : extraItems;

    const extrasTotal = selectedExtras.reduce((sum, extraId) => {
      const extra = availableExtras.find(item => item.id === extraId);
      if (!extra) return sum;
      
      if (extra.type === 'daily') {
        return sum + (extra.price * calculateDays());
      }
      return sum + extra.price;
    }, 0);

    // Add extra persons cost (only for festival bookings)
    const extraPersonsCost = bookingType === 'festival' ? extraPersons * 500 : 0;

    return basePrice + extrasTotal + extraPersonsCost;
  };

  const calculateDeposit = () => Math.round(calculateTotal() * 0.2);

  // Combined Medium availability: original batch + extra batch (if released)
  const isExtraReleased = now >= extraReleaseAt;
  const mediumAvailable = inventory['medium-tent'] + (isExtraReleased ? inventory['medium-extra'] : 0);
  const mediumPlusAvailable = inventory['medium-plus'];

  // Countdown formatter
  const formatCountdown = () => {
    const diff = extraReleaseAt.getTime() - now.getTime();
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  };


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

  const handleFinalBooking = async () => {
    if (!name || !email || !phone || !acceptedTerms) {
      toast.error("Fyll i alla obligatoriska fält och acceptera villkoren");
      return;
    }

    setIsSubmitting(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      // Determine which inventory batch to draw from for festival Medium bookings
      let tentBatch: string | null = null;

      // Check inventory before booking (for festival bookings)
      if (bookingType === 'festival') {
        const { data: inventoryData, error: inventoryError } = await supabase.rpc('get_tent_availability', {
          p_festival: festival
        });

        if (inventoryError) throw inventoryError;

        const rows = (inventoryData ?? []) as any[];
        const findAvail = (t: string) => rows.find((i: any) => i.tent_type === t)?.available_count ?? 0;

        if (tentSize === 'singel') {
          // Prefer the original Medium batch first; fall back to extra batch if released
          if (findAvail('singel') > 0) {
            tentBatch = null;
          } else if (isExtraReleased && findAvail('medium-extra') > 0) {
            tentBatch = 'medium-extra';
          } else {
            toast.error("Tyvärr är detta tält utsålt. Vänligen välj ett annat alternativ.");
            setIsSubmitting(false);
            return;
          }
        } else if (tentSize === 'dubbel') {
          if (findAvail('dubbel') <= 0) {
            toast.error("Tyvärr är detta tält utsålt. Vänligen välj ett annat alternativ.");
            setIsSubmitting(false);
            return;
          }
        }
      }

      // Create booking record with all details
      const bookingData = {
        name,
        email,
        phone,
        message,
        meta: {
          bookingType,
          festival: bookingType === 'festival' ? festival : null,
          address: bookingType === 'halvpall' ? { address, postalCode, city, country } : null,
          tentSize,
          tentBatch,
          selectedExtras,
          extraPersons: bookingType === 'festival' ? extraPersons : 0,
          days: calculateDays(),
          total: calculateTotal(),
          prepayment: calculateDeposit()
        }
      };

      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) throw error;

      // Refresh inventory display (only for festival bookings)
      if (bookingType === 'festival') {
        await fetchInventory();
      }

      // Lock form and show confirmation
      setIsSubmitted(true);

    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error("Ett fel uppstod. Kunde inte skicka din bokning. Vänligen försök igen.");
    } finally {
      setIsSubmitting(false);
    }
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

            {/* Check-in and check-out information */}
            <div className="mt-8 text-muted-foreground space-y-4 max-w-2xl mx-auto">
              <p>
                Vid incheckning krävs bekräftelsemail med ert kundnummer som mottogs i samband med godkänd bokning.
              </p>
              
              <p>
                Öppen incheckning<br />
                Tisdag 2/6 till Lördag 6/6 kl. 09.00–20.00
              </p>
              
              <p>
                Utcheckning<br />
                Utcheckning sker senast Söndag 7/6 kl. 12.00. Gästen ska lämna platsen i samma skick som vid tillträde – rent och fint!
              </p>
            </div>
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
                  🎪 Festival
                </button>
                <button
                  onClick={() => setBookingType('halvpall')}
                  className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                    bookingType === 'halvpall'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  📦 Halvpall till min adress
                </button>
              </div>
            </div>

            {bookingType === 'festival' ? (
              /* Festival booking form */
              <div className="space-y-6">
                {/* Festival kit info box */}
                <Card className="p-6 bg-secondary/30 border-primary/20">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <img
                        src={heroImage3}
                        alt="Festivalpaket – förmonterat glampingtält"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-4">Ingående delar i festivalpaketet</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Glampingtält (uppblåsbart) förmonterat på plats</li>
                        <li>• Tarp med UV-, regn- och skuggsskydd</li>
                        <li>• 2 st stolar + bord (inne/ute)</li>
                        <li>• Matta & filt</li>
                        <li>• Lykta med högtalare och naturljud</li>
                        <li>• Deluxe uppblåsbar säng</li>
                        <li>• Goodiebag & picknickkorg (toalettpapper, våtservetter, mobilladdare, 2 muggar, bestick, 2 glas)</li>
                      </ul>
                    </div>
                  </div>
                </Card>

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

                  {/* Countdown for the 5 extra Medium tents */}
                  {!isExtraReleased && inventory['medium-extra'] > 0 && (() => {
                    const c = formatCountdown();
                    if (!c) return null;
                    return (
                      <Card className="p-4 mb-4 bg-primary/5 border-primary/30">
                        <p className="text-sm font-semibold text-foreground mb-2">
                          5 extra Medium-tält släpps om:
                        </p>
                        <div className="flex gap-3 text-center">
                          {[
                            { label: 'dagar', val: c.days },
                            { label: 'tim', val: c.hours },
                            { label: 'min', val: c.minutes },
                            { label: 'sek', val: c.seconds },
                          ].map((u) => (
                            <div key={u.label} className="flex-1 bg-background/70 rounded-lg py-2">
                              <div className="text-2xl font-bold text-primary tabular-nums">
                                {u.val.toString().padStart(2, '0')}
                              </div>
                              <div className="text-xs text-muted-foreground">{u.label}</div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Släpps fredag 1 maj 2026 kl. 08:00 (svensk tid).
                        </p>
                      </Card>
                    );
                  })()}

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { 
                        value: "singel", 
                        label: "Medium tent", 
                        price: "7 800 kr", 
                        available: mediumAvailable,
                        image: dubbelsangImage,
                        alt: "Glampingtält – medium tent"
                      },
                      { 
                        value: "dubbel", 
                        label: "Medium +", 
                        price: "9 200 kr", 
                        available: mediumPlusAvailable,
                        image: enkelsangImage,
                        alt: "Glampingtält – medium +"
                      }
                    ].map((option) => (
                      <label key={option.value} className={`relative ${option.available > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                        <input
                          type="radio"
                          name="tentSize"
                          value={option.value}
                          checked={tentSize === option.value}
                          onChange={(e) => setTentSize(e.target.value)}
                          disabled={option.available === 0}
                          className="sr-only"
                        />
                        <Card className={`overflow-hidden transition-smooth ${
                          option.available === 0 
                            ? "border-muted bg-muted/50"
                            : tentSize === option.value
                              ? "border-primary ring-2 ring-primary/20 shadow-lg"
                              : "border-border hover:border-primary/50 hover:shadow-md"
                        }`}>
                          <div className="aspect-[4/3] relative">
                            <img
                              src={option.image}
                              alt={option.alt}
                              className={`w-full h-full object-cover ${option.available === 0 ? 'grayscale' : ''}`}
                              loading="lazy"
                            />
                            <Badge className={`absolute top-2 right-2 ${
                              option.available === 0 
                                ? 'bg-destructive text-destructive-foreground' 
                                : 'bg-white/90 text-foreground'
                            }`}>
                              {option.available === 0 ? 'Utsålt' : `${option.available} kvar`}
                            </Badge>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-foreground">{option.label}</h4>
                            <p className="text-lg font-bold text-primary mt-1">{option.price}</p>
                          </div>
                        </Card>
                      </label>
                    ))}
                  </div>
                  
                  {/* Sold out badge or availability warning */}
                  <div className="mt-3">
                    {mediumAvailable === 0 && mediumPlusAvailable === 0 ? (
                      <Badge variant="destructive" className="text-base px-4 py-1">
                        Slutsålt
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                        Boka snabbt – tälten är nästan slut!
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Waitlist form when both tent types are sold out */}
                {mediumAvailable === 0 && mediumPlusAvailable === 0 ? (
                  <WaitlistForm />
                ) : (
                  /* Extra items for festival */
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Extraval</Label>
                    <div className="space-y-4">
                      {extraItems.map((item) => {
                        if (item.type === 'counter') {
                          return (
                            <div key={item.id} className="space-y-2">
                              <Label className="text-sm font-medium">
                                {item.name} - {item.price} kr per extra person
                              </Label>
                              <div className="flex items-center space-x-3">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setExtraPersons(Math.max(0, extraPersons - 1))}
                                  disabled={extraPersons === 0}
                                  className="h-8 w-8"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">{extraPersons}</span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setExtraPersons(Math.min(getMaxExtraPersons(), extraPersons + 1))}
                                  disabled={extraPersons >= getMaxExtraPersons() || !tentSize}
                                  className="h-8 w-8"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground">Max 4 personer per tält</p>
                            </div>
                          );
                        }
                        
                        return (
                          <div key={item.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={item.id}
                              checked={selectedExtras.includes(item.id)}
                              onCheckedChange={() => handleExtraToggle(item.id)}
                            />
                            <Label htmlFor={item.id} className="text-sm cursor-pointer flex-1">
                              {item.name} - {item.price} kr{item.type === 'daily' ? '/dag' : ''}
                              {item.id === 'frukost' && <span className="text-muted-foreground ml-1">(kaffe/te, 1 ägg, 2 mackor, gröt)</span>}
                              {item.id === 'fylleforsakring' && <span className="text-muted-foreground ml-1">(sanering vid kräkning/större spill; täcker inte hål/brännhål/skador)</span>}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
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
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-4">Ingående delar i halvpalls-kitet:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Tält (uppblåsbart) med tarp/UV-skydd</li>
                        <li>• Manuell pump, pinnar/linor</li>
                        <li>• 2 stolar, bord, matta, filt</li>
                        <li>• Lykta med högtalare/naturljud</li>
                        <li>• Deluxe uppblåsbar säng</li>
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
                    {/* Pricing tiers info */}
                    <Card className="p-4 bg-secondary/20">
                      <h5 className="font-semibold text-sm mb-2">Pristrappa per dag (blir billigare ju längre du hyr):</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <div className="text-center p-2 rounded bg-background/50">
                          <div className="font-medium">1-2 dagar</div>
                          <div className="text-primary">2 000 kr/dag</div>
                        </div>
                        <div className="text-center p-2 rounded bg-background/50">
                          <div className="font-medium">3-5 dagar</div>
                          <div className="text-primary">1 800 kr/dag</div>
                        </div>
                        <div className="text-center p-2 rounded bg-background/50">
                          <div className="font-medium">5-7 dagar</div>
                          <div className="text-primary">1 500 kr/dag</div>
                        </div>
                        <div className="text-center p-2 rounded bg-primary/10 border border-primary/30">
                          <div className="font-medium">7+ dagar</div>
                          <div className="text-primary font-bold">1 000 kr/dag</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">+ Frakt tur/retur: 1 200 kr (fast)</p>
                    </Card>
                    
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
                    
                    {startDate && endDate && (
                      <div className="text-sm text-muted-foreground">
                        {calculateDays()} dagar × {getHalvpallDayPrice(calculateDays())} kr/dag = {calculateDays() * getHalvpallDayPrice(calculateDays())} kr
                      </div>
                    )}
                  </div>
                </div>

                {/* Tent size for halvpall */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Tältstorlek</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { value: "singel", label: "Medium tent" },
                      { value: "dubbel", label: "Medium +" }
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

                {/* Extra items for halvpall (only Fylleförsäkring) */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Extraval</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fylleforsakring"
                        checked={selectedExtras.includes("fylleforsakring")}
                        onCheckedChange={() => handleExtraToggle("fylleforsakring")}
                      />
                      <Label htmlFor="fylleforsakring" className="text-sm cursor-pointer flex-1">
                        Fylleförsäkring - 1000 kr
                        <span className="text-muted-foreground ml-1">(sanering vid kräkning/större spill; täcker inte hål/brännhål/skador)</span>
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                      <span>{(calculateDays() * getHalvpallDayPrice(calculateDays())).toLocaleString()} kr</span>
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
                  <span>Att betala nu (20% av totalt, ej återbetalningsbart):</span>
                  <span>{calculateDeposit().toLocaleString()} kr</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Betala 20 % av totala bokningsvärdet nu.
                </p>
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
                      disabled={isSubmitted}
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
                      disabled={isSubmitted}
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
                    disabled={isSubmitted}
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
                    disabled={isSubmitted}
                  />
                </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                      disabled={isSubmitted}
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
                    disabled={!acceptedTerms || isSubmitting || isSubmitted}
                    aria-disabled={isSubmitting || isSubmitted}
                    style={isSubmitted ? { opacity: 0.6, pointerEvents: 'none' } : {}}
                  >
                    {isSubmitting ? "Skickar..." : isSubmitted ? "Bokning skickad" : "Slutför bokning"}
                  </Button>

                  {/* Confirmation block */}
                  {isSubmitted && (
                    <Card className="p-6 bg-primary/5 border-primary/20 mt-4">
                      <div className="space-y-4">
                        <p className="text-foreground leading-relaxed">
                          Vi har tagit emot din bokning, ditt tält är nu reserverat. För att din bokning ska bli godkänd behöver vi ta del av förskottsbetalningen. Det går bra att betala direkt via Swish eller Bankgiro.
                        </p>
                        
                        <div className="space-y-2 bg-background/50 p-4 rounded-lg">
                          <p className="font-semibold text-foreground">Nangarra Invest AB</p>
                          <p className="text-muted-foreground">Swishnummer: <span className="font-medium text-foreground">123 155 02 27</span></p>
                          <p className="text-muted-foreground">Bankgiro: <span className="font-medium text-foreground">5226-2243</span></p>
                        </div>

                        <p className="text-sm text-muted-foreground italic">
                          Vi bekräftar även din bokning via e-post inom 24 timmar.
                        </p>
                        
                        <p className="text-sm text-muted-foreground italic">
                          Vi har mottagit din bokning och kommer att konfirmera när förskottsbetalningen är gjord.
                        </p>
                      </div>
                    </Card>
                  )}
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