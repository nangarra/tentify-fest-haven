import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      toast({
        title: "Alla fält måste fyllas i",
        description: "Vänligen fyll i namn, telefon, e-post och meddelande.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (error) throw error;

      // Reset form and show confirmation
      setFormData({ name: '', phone: '', email: '', message: '' });
      setShowConfirmation(true);
      
      toast({
        title: "Tack för din bokning!",
        description: "Vi har tagit emot din bokning."
      });

      // Hide confirmation after 10 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 10000);

    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte skicka din bokning. Vänligen försök igen.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Kontakta oss
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Har du frågor om våra glampingtält eller vill göra en bokning? 
              Vi hjälper dig gärna! Kontakta oss så återkommer vi snabbt.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 shadow-card">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Skicka oss ett meddelande
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Namn *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ditt namn"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="070-123 45 67"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-post *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="din@email.se"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Meddelande *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Berätta vad vi kan hjälpa dig med..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full btn-hero" disabled={isSubmitting}>
                  {isSubmitting ? "Skickar..." : "Skicka meddelande"}
                </Button>
              </form>

              {/* Confirmation Panel */}
              {showConfirmation && (
                <Card className="mt-6 p-6 bg-primary/5 border-primary/20">
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
                  </div>
                </Card>
              )}
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Kontaktuppgifter
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Telefon</p>
                      <p className="text-muted-foreground">0701-234567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">E-post</p>
                      <p className="text-muted-foreground">info@tentify.se</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Plats</p>
                      <p className="text-muted-foreground">Stockholm & omnejd</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Öppettider</p>
                      <p className="text-muted-foreground">Mån-Fre: 09:00-18:00</p>
                      <p className="text-muted-foreground text-sm">Helger: Endast akuta ärenden</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-elegant">
                <h3 className="text-lg font-semibold mb-4">
                  Snabb service garanterat!
                </h3>
                <div className="space-y-3 text-sm opacity-90">
                  <p>📞 <strong>Ring direkt</strong> för akuta frågor</p>
                  <p>📧 <strong>E-post</strong> besvaras inom 24h</p>
                  <p>💬 <strong>Sociala medier</strong> för snabba svar</p>
                  <p>🚚 <strong>Leverans</strong> överallt i Sverige</p>
                </div>
              </Card>

              <Card className="p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Vanliga frågor
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground">Hur lång tid innan kan jag boka?</p>
                    <p className="text-muted-foreground">Vi rekommenderar 2-4 veckor i förväg för bästa tillgänglighet.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Ingår montering?</p>
                    <p className="text-muted-foreground">Ja, vi monterar alltid tälten åt dig så de är klara när du anländer.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Vad händer vid dåligt väder?</p>
                    <p className="text-muted-foreground">Våra tält tål alla väder - regn, vind och sol är inga problem!</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;