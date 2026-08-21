import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(1, "Ange ditt namn").max(200),
  phone: z.string().trim().min(3, "Ange ditt telefonnummer").max(50),
  email: z.string().trim().email("Ange en giltig e-postadress").max(320),
  location: z.string().trim().min(1, "Ange plats eller adress").max(300),
  date: z.string().trim().max(100).optional(),
  nights: z.string().trim().max(50).optional(),
  tents: z.string().trim().max(50).optional(),
  guests: z.string().trim().max(50).optional(),
  level: z.string().trim().max(100).optional(),
  singleBeds: z.string().trim().max(50).optional(),
  doubleBeds: z.string().trim().max(50).optional(),
  extraTents: z.string().trim().max(500).optional(),
  notes: z.string().trim().max(3000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Du behöver godkänna att vi kontaktar dig" }),
  }),
});

type FormState = {
  name: string;
  phone: string;
  email: string;
  location: string;
  date: string;
  nights: string;
  tents: string;
  guests: string;
  level: string;
  singleBeds: string;
  doubleBeds: string;
  extraTents: string;
  notes: string;
  consent: boolean;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  location: "",
  date: "",
  nights: "",
  tents: "",
  guests: "",
  level: "",
  singleBeds: "",
  doubleBeds: "",
  extraTents: "",
  notes: "",
  consent: false,
};

const GlampingQuoteForm = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const message = [
      `Plats/adress: ${form.location}`,
      `Datum: ${form.date || "-"}`,
      `Antal nätter: ${form.nights || "-"}`,
      `Antal tält: ${form.tents || "-"}`,
      `Antal gäster: ${form.guests || "-"}`,
      `Utrustningsnivå: ${form.level || "-"}`,
      `Enkelsängar: ${form.singleBeds || "-"}`,
      `Dubbelsängar: ${form.doubleBeds || "-"}`,
      `Extra tält: ${form.extraTents || "-"}`,
      "",
      `Övriga önskemål: ${form.notes || "-"}`,
    ].join("\n");

    const { error } = await supabase.from("contact_requests").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message,
      source_page: "/hyr-glamping",
      event_type: form.level ? `Glampingförfrågan – ${form.level}` : "Glampingförfrågan",
      event_date: form.date.trim() || null,
      guest_count: form.guests.trim() || null,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Kunde inte skicka förfrågan",
        description: "Försök igen eller mejla oss direkt.",
        variant: "destructive",
      });
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <Card className="shadow-elegant">
        <CardContent className="p-8 md:p-12 text-center">
          <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-3">Tack för din förfrågan!</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Vi återkommer så snart som möjligt med mer information och ett förslag
            utifrån era behov.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-elegant">
      <CardContent className="p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="g-name">Namn *</Label>
              <Input id="g-name" value={form.name} onChange={(e) => set("name", e.target.value)} maxLength={200} />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-phone">Telefonnummer *</Label>
              <Input id="g-phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} maxLength={50} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-email">E-postadress *</Label>
              <Input id="g-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={320} />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-location">Plats eller adress för evenemanget *</Label>
              <Input id="g-location" value={form.location} onChange={(e) => set("location", e.target.value)} maxLength={300} />
              {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-date">Datum för evenemanget</Label>
              <Input id="g-date" value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="t.ex. 12–14 juni 2027" maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-nights">Antal nätter</Label>
              <Input id="g-nights" inputMode="numeric" value={form.nights} onChange={(e) => set("nights", e.target.value)} maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-tents">Ungefärligt antal tält</Label>
              <Input id="g-tents" inputMode="numeric" value={form.tents} onChange={(e) => set("tents", e.target.value)} maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-guests">Ungefärligt antal övernattande gäster</Label>
              <Input id="g-guests" inputMode="numeric" value={form.guests} onChange={(e) => set("guests", e.target.value)} maxLength={50} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Önskad utrustningsnivå</Label>
              <Select value={form.level} onValueChange={(v) => set("level", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj nivå" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Enkel utrustning">Enkel utrustning</SelectItem>
                  <SelectItem value="Premiumutrustning">Premiumutrustning</SelectItem>
                  <SelectItem value="Osäker – önskar rådgivning">Osäker – önskar rådgivning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-single">Ungefärligt antal enkelsängar</Label>
              <Input id="g-single" inputMode="numeric" value={form.singleBeds} onChange={(e) => set("singleBeds", e.target.value)} maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-double">Ungefärligt antal dubbelsängar</Label>
              <Input id="g-double" inputMode="numeric" value={form.doubleBeds} onChange={(e) => set("doubleBeds", e.target.value)} maxLength={50} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="g-extra">Behov av extra tält</Label>
              <Input
                id="g-extra"
                value={form.extraTents}
                onChange={(e) => set("extraTents", e.target.value)}
                placeholder="t.ex. samlings-/loungetält, servicetält, annat"
                maxLength={500}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="g-notes">Övriga önskemål eller information</Label>
              <Textarea id="g-notes" rows={5} value={form.notes} onChange={(e) => set("notes", e.target.value)} maxLength={3000} />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="g-consent"
              checked={form.consent}
              onCheckedChange={(c) => set("consent", c === true)}
            />
            <Label htmlFor="g-consent" className="text-sm font-normal leading-relaxed">
              Jag godkänner att Tentify kontaktar mig angående min förfrågan.
            </Label>
          </div>
          {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}

          <Button type="submit" size="lg" className="btn-hero w-full md:w-auto" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
            Skicka förfrågan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GlampingQuoteForm;
