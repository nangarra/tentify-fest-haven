import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WaitlistForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Vänligen fyll i alla fält");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Vänligen ange en giltig e-postadress");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{
          festival: 'sweden-rock',
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim()
        }]);

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting waitlist:', error);
      toast.error("Ett fel uppstod. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 bg-primary/5 border-primary/20 text-center">
        <div className="text-4xl mb-4">✅</div>
        <p className="text-lg font-semibold text-foreground">
          Tack, vi kontaktar dig om platser öppnar upp.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-muted/50 border-border">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-3">
          Alla tält till Sweden Rock är nu fullbokade.
        </h3>
        <p className="text-muted-foreground">
          Men du kan ställa dig på vår väntelista. Om någon avbokar eller om fler platser öppnas kontaktar vi dig direkt.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <Label htmlFor="waitlist-name">Namn</Label>
          <Input
            id="waitlist-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ditt namn"
            required
            maxLength={100}
          />
        </div>

        <div>
          <Label htmlFor="waitlist-email">E-post</Label>
          <Input
            id="waitlist-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="din@email.se"
            required
            maxLength={255}
          />
        </div>

        <div>
          <Label htmlFor="waitlist-phone">Telefonnummer</Label>
          <Input
            id="waitlist-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07X-XXX XX XX"
            required
            maxLength={20}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Skickar..." : "Ställ mig på väntelistan"}
        </Button>
      </form>
    </Card>
  );
};

export default WaitlistForm;
