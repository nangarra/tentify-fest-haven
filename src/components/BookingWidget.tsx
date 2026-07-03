import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin, ArrowRight, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getFestival, type Lang } from "@/config/festivals";

type Props = {
  slug: string;
  lang?: Lang;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
};

const BookingWidget = ({
  slug,
  lang = "sv",
  title,
  subtitle,
  ctaLabel,
}: Props) => {
  const festival = getFestival(slug);
  const [available, setAvailable] = useState<number>(festival?.totalTents ?? 0);

  useEffect(() => {
    if (!festival) return;
    (async () => {
      const { data } = await supabase.rpc("get_tent_availability", {
        p_festival: festival.id,
      });
      const total = (data as any[])?.reduce(
        (sum, r) => sum + (r.available_count ?? 0),
        0,
      );
      if (typeof total === "number" && total > 0) {
        setAvailable(Math.min(total, festival.totalTents));
      }
    })();
  }, [festival]);

  if (!festival) return null;

  const startingPrice = Math.min(...festival.tents.map((t) => t.price));
  const heading =
    title ??
    (lang === "sv"
      ? `Boka glamping till ${festival.name}`
      : `Book glamping for ${festival.name}`);
  const sub =
    subtitle ??
    (lang === "sv"
      ? "Färdigt boende nära festivalen. Välj tält, lägg till bekvämligheter och säkra din plats."
      : "Ready-made accommodation near the festival. Choose your tent, add extras and secure your spot.");
  const cta =
    ctaLabel ?? (lang === "sv" ? "Se tält och boka" : "View tents & book");

  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            {lang === "sv" ? "Bokning öppen" : "Booking open"}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{heading}</h2>
          <p className="text-muted-foreground">{sub}</p>
        </div>

        <Card className="overflow-hidden shadow-elegant">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px]">
              <img
                src={festival.heroImage}
                alt={festival.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
            </div>

            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {festival.checkIn[lang]} – {festival.checkOut[lang]}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {festival.location[lang]}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {festival.tents.map((tent) => (
                  <div key={tent.id} className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">{tent.size}</div>
                    <div className="font-semibold text-sm">{tent.name[lang]}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {tent.bestFor[lang]}
                    </div>
                    <div className="text-sm font-bold text-primary mt-2">
                      {tent.price.toLocaleString("sv-SE")} {festival.currency}
                    </div>
                  </div>
                ))}
              </div>

              <ul className="space-y-1.5 text-sm text-muted-foreground mb-5">
                {(lang === "sv"
                  ? ["Färdigbäddade tält", "10 min från festivalen", "Tillval för mat & komfort"]
                  : ["Ready-made tents", "10 min from the festival", "Add-ons for food & comfort"]
                ).map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium">
                      {lang === "sv"
                        ? `Endast ${available} av ${festival.totalTents} tält kvar`
                        : `${available} of ${festival.totalTents} tents left`}
                    </span>
                    <span className="text-muted-foreground">
                      {lang === "sv" ? "Från" : "From"} {startingPrice.toLocaleString("sv-SE")} {festival.currency}
                    </span>
                  </div>
                  <Progress
                    value={
                      ((festival.totalTents - available) / festival.totalTents) *
                      100
                    }
                  />
                </div>
                <Button asChild size="lg" className="w-full btn-hero">
                  <Link to={`/booking/${festival.slug}`}>
                    {cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BookingWidget;
