import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import mainImg from "@/assets/sweden-rock-glamping-talt.webp.asset.json";
import interiorImg from "@/assets/glampingtalt-sweden-rock-interior.webp.asset.json";
import nightImg from "@/assets/sweden-rock-glamping-7.webp.asset.json";

const SwedenRockSpotlight = () => (
  <section className="bg-secondary/40 py-12 md:py-20" aria-labelledby="sr-spotlight-title">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-2">
        <Link to="/booking/sweden-rock-2027" className="grid grid-cols-3 grid-rows-2 gap-1 h-72 sm:h-96 lg:h-full lg:min-h-[520px]" aria-label="Boka Sweden Rock">
          <img src={mainImg.url} alt="Glampingtält vid Sweden Rock" className="col-span-2 row-span-2 h-full w-full object-cover" loading="lazy" />
          <img src={interiorImg.url} alt="Bäddat glampingtält inifrån" className="h-full w-full object-cover" loading="lazy" />
          <img src={nightImg.url} alt="Glampingområdet vid Sweden Rock" className="h-full w-full object-cover" loading="lazy" />
        </Link>
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:p-14">
          <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
            Bokningen är öppen
          </span>
          <h2 id="sr-spotlight-title" className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Boka Sweden Rock 2027
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Färdigt glampingtält med riktig säng, bäddat och klart när du kommer – bara cirka 800 meter från festivalentrén.
          </p>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /> 8–13 juni 2027 · 5 nätter</li>
            <li className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Ingemans Camping, Sölvesborg</li>
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="text-base">
              <Link to="/booking/sweden-rock-2027">Boka Sweden Rock <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link to="/glamping-sweden-rock">Läs mer</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SwedenRockSpotlight;
