import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Lang } from "@/config/festivals";

type SwedenRockBookingTermsProps = {
  trigger: React.ReactNode;
  lang?: Lang;
};

type Section = {
  title: string;
  paragraphs: string[];
};

const intro: Record<Lang, string[]> = {
  sv: [
    "Dessa villkor gäller bokning av glamping- och tältboende som tillhandahålls av Tentify / Nangarra Invest AB i samband med Sweden Rock Festival.",
    "Genom att genomföra bokningen bekräftar kunden att dessa villkor har lästs och accepterats.",
  ],
  en: [
    "These terms apply to bookings of glamping accommodation and tent accommodation provided by Tentify / Nangarra Invest AB in connection with Sweden Rock Festival.",
    "By completing a booking, the customer confirms that these terms have been read and accepted.",
  ],
};

const sections: Record<Lang, Section[]> = {
  sv: [
    {
      title: "1. Bokning och betalning",
      paragraphs: [
        "En förskottsbetalning motsvarande 20 % av det totala bokningsbeloppet betalas i samband med bokningen.",
        "Bokningen är bekräftad när förskottsbetalningen är registrerad och kunden har fått en bokningsbekräftelse från Tentify.",
        "Resterande belopp betalas enligt bokningsbekräftelsen, normalt vid ankomst om inget annat är överenskommet.",
      ],
    },
    {
      title: "2. Avbokning av kunden",
      paragraphs: [
        "Kunden kan avboka bokningen före ankomst.",
        "Förskottsbetalningen på 20 % återbetalas dock inte när kunden avbokar bokningen, oavsett anledning till avbokningen.",
        "Om kunden avbokar innan resterande belopp har betalats debiteras normalt ingen ytterligare betalning om inget annat särskilt har avtalats.",
        "Utebliven ankomst betraktas som en avbokning och förskottsbetalningen återbetalas inte.",
      ],
    },
    {
      title: "3. Ångerrätt",
      paragraphs: [
        "Bokningen avser boende som tillhandahålls på särskilda datum. Den lagstadgade 14-dagars ångerrätten gäller därför normalt inte bokningen.",
      ],
    },
    {
      title: "4. Sweden Rock Festival",
      paragraphs: [
        "Tentify / Nangarra Invest AB är en separat boendeanordnare och ansvarar inte för Sweden Rock Festivals organisation, program, artister, öppettider, festivalbiljetter eller ändringar som görs av festivalarrangören.",
        "Ändringar i festivalens program, artister, scheman eller andra delar av evenemanget ger inte i sig kunden rätt till återbetalning av boendet.",
        "Om festivalen ställs in eller flyttas bedöms bokningen utifrån om Tentify fortfarande kan tillhandahålla det bokade boendet.",
      ],
    },
    {
      title: "5. Väder och utomhusförhållanden",
      paragraphs: [
        "Boendet tillhandahålls i tält och i en utomhusmiljö.",
        "Kunden förstår att väder- och markförhållanden kan variera.",
        "Regn, vind, kyla, värme, lera, fukt, ljud eller andra normala förhållanden i samband med en utomhusfestival ger inte kunden rätt till återbetalning eller prisavdrag så länge boendet fortfarande kan användas säkert och rimligt.",
        "Tentify kan vidta nödvändiga säkerhetsåtgärder, bland annat förstärka tält, flytta utrustning, begränsa tillgången till vissa områden eller tillfälligt utrymma boendeområdet.",
        "Kunderna ska följa säkerhetsinstruktioner från Tentify, markägaren, festivalarrangören, räddningstjänsten eller andra relevanta myndigheter.",
      ],
    },
    {
      title: "6. Extraordinära händelser och force majeure",
      paragraphs: [
        "Tentify ansvarar inte för indirekta förluster eller extra kostnader som orsakas av händelser utanför företagets rimliga kontroll.",
        "Detta kan innefatta extremt väder, stormar, översvämningar, brand, myndighetsbeslut, krig, större infrastrukturavbrott eller jämförbara extraordinära omständigheter.",
        "Om en sådan händelse påverkar boendet kan Tentify göra rimliga och nödvändiga ändringar för att upprätthålla säkerheten och, om möjligt, fortsätta tillhandahålla boendet.",
        "Om Tentify helt inte kan tillhandahålla det bokade boendet hanteras eventuell återbetalning eller ersättning i enlighet med tillämplig lag och händelsens särskilda omständigheter.",
      ],
    },
    {
      title: "7. Säkerhet och ordningsregler",
      paragraphs: [
        "Kunden ansvarar för sig själv och för de andra gästerna som ingår i bokningen.",
        "Öppna lågor, grillar, stearinljus eller andra brandrisker får inte användas i eller direkt intill tälten om det inte särskilt har godkänts av Tentify.",
        "Rökning är inte tillåten inne i tälten.",
        "Tågvirke, förankringar, säkerhetsutrustning och andra installationer får inte flyttas, lossas eller ändras av gästerna.",
        "Nödutgångar, passagevägar och räddningsvägar måste alltid hållas fria.",
        "Instruktioner från Tentifys personal ska följas.",
      ],
    },
    {
      title: "8. Skador på tält och utrustning",
      paragraphs: [
        "Kunden ansvarar för skador på tält, möbler, sängar, elektronik eller annan utrustning som orsakas av kunden eller personer i dennes bokning genom vårdslöshet, slarv eller uppsåt.",
        "Normalt slitage omfattas inte.",
        "Tentify kan debitera kunden en rimlig reparations- eller ersättningskostnad för skadad eller saknad utrustning.",
      ],
    },
    {
      title: "9. Personliga tillhörigheter",
      paragraphs: [
        "Kunderna ansvarar själva för sina pengar, elektronik, värdeföremål och personliga tillhörigheter som förvaras i eller runt tältet.",
        "Tentify ansvarar inte för förlorad eller stulen egendom, förutom där ansvar krävs enligt tillämplig lag.",
      ],
    },
    {
      title: "10. Störningar och beteende",
      paragraphs: [
        "Boendet ligger i anslutning till en stor musikfestival.",
        "Kunderna bör därför räkna med musik, folkmassa, trafik och andra störningar som normalt är förknippade med en festivalmiljö.",
        "Gästerna ska ändå visa rimlig hänsyn mot andra gäster.",
        "Tentify kan avlägsna en gäst från boendeområdet vid allvarliga störningar, hot, våld, skadegörelse, farligt beteende eller upprepade regelbrott.",
      ],
    },
    {
      title: "11. Incheckning och utcheckning",
      paragraphs: [
        "Aktuella tider för in- och utcheckning anges i bokningsbekräftelsen och i information som ges före evenemanget.",
        "Kunden ansvarar för att lämna tältet och hyrd utrustning i skick vid utcheckningen.",
      ],
    },
    {
      title: "12. Reklamationer",
      paragraphs: [
        "Eventuella problem med boendet ska rapporteras till Tentify så snart som möjligt under vistelsen så att Tentify har rimlig möjlighet att undersöka och, om möjligt, åtgärda problemet.",
      ],
    },
    {
      title: "13. Avtalspart",
      paragraphs: [
        "Avtalsparten är:\nNangarra Invest AB\nVarumärke: Tentify",
        "Aktuell kontaktinformation finns på Tentifys webbplats.",
      ],
    },
  ],
  en: [
    {
      title: "1. Booking and payment",
      paragraphs: [
        "A deposit corresponding to 20% of the total booking amount is paid at the time of booking.",
        "The booking is confirmed once the deposit has been registered and the customer has received a booking confirmation from Tentify.",
        "The remaining balance is paid according to the booking confirmation, normally upon arrival unless otherwise agreed.",
      ],
    },
    {
      title: "2. Cancellation by the customer",
      paragraphs: [
        "The customer may cancel the booking before arrival.",
        "However, the 20% deposit is non-refundable when the customer cancels the booking, regardless of the reason for cancellation.",
        "If the customer cancels before the remaining balance has been paid, no additional payment will normally be charged unless otherwise specifically agreed.",
        "Failure to arrive is considered a cancellation and the deposit will not be refunded.",
      ],
    },
    {
      title: "3. Right of withdrawal",
      paragraphs: [
        "The booking relates to accommodation provided on specific dates. The statutory 14-day right of withdrawal therefore normally does not apply to the booking.",
      ],
    },
    {
      title: "4. Sweden Rock Festival",
      paragraphs: [
        "Tentify / Nangarra Invest AB is a separate accommodation provider and is not responsible for Sweden Rock Festival's organization, program, artists, opening hours, festival tickets, or changes made by the festival organizer.",
        "Changes to the festival program, artists, schedules, or other aspects of the event do not in themselves entitle the customer to a refund of the accommodation.",
        "If the festival is cancelled or moved, the accommodation booking will be assessed based on whether Tentify is still able to provide the booked accommodation.",
      ],
    },
    {
      title: "5. Weather and outdoor conditions",
      paragraphs: [
        "The accommodation is provided in tents and in an outdoor environment.",
        "The customer understands that weather and ground conditions may vary.",
        "Rain, wind, cold, heat, mud, moisture, noise, or other normal conditions associated with an outdoor festival do not entitle the customer to a refund or price reduction as long as the accommodation can still be used safely and reasonably.",
        "Tentify may take necessary safety measures, including reinforcing tents, moving equipment, restricting access to certain areas, or temporarily evacuating the accommodation area.",
        "Customers must follow safety instructions issued by Tentify, the landowner, festival organizer, emergency services, or other relevant authorities.",
      ],
    },
    {
      title: "6. Extraordinary events and force majeure",
      paragraphs: [
        "Tentify is not responsible for indirect losses or additional costs caused by events outside the company's reasonable control.",
        "This may include extreme weather, storms, flooding, fire, government decisions, war, major infrastructure disruption, or comparable extraordinary circumstances.",
        "If such an event affects the accommodation, Tentify may make reasonable and necessary changes in order to maintain safety and, where possible, continue providing the accommodation.",
        "If Tentify is completely unable to provide the booked accommodation, any refund or compensation will be handled in accordance with applicable law and the specific circumstances of the event.",
      ],
    },
    {
      title: "7. Safety and house rules",
      paragraphs: [
        "The customer is responsible for themselves and for the other guests included in their booking.",
        "Open flames, barbecues, candles, or other fire hazards may not be used inside or directly next to the tents unless specifically approved by Tentify.",
        "Smoking is not permitted inside the tents.",
        "Tent ropes, anchors, safety equipment, and other installations may not be moved, loosened, or modified by guests.",
        "Emergency exits, access routes, and rescue routes must always remain clear.",
        "Instructions from Tentify staff must be followed.",
      ],
    },
    {
      title: "8. Damage to tents and equipment",
      paragraphs: [
        "The customer is responsible for damage to tents, furniture, beds, electronics, or other equipment caused by the customer or members of their booking through negligence, carelessness, or intentional actions.",
        "Normal wear and tear is excluded.",
        "Tentify may charge the customer a reasonable repair or replacement cost for damaged or missing equipment.",
      ],
    },
    {
      title: "9. Personal belongings",
      paragraphs: [
        "Customers are responsible for their own money, electronics, valuables, and personal belongings stored in or around the tent.",
        "Tentify is not responsible for lost or stolen property except where responsibility is required by applicable law.",
      ],
    },
    {
      title: "10. Disturbances and behaviour",
      paragraphs: [
        "The accommodation is located in connection with a large music festival.",
        "Customers should therefore expect music, crowds, traffic, and other disturbances normally associated with a festival environment.",
        "Guests must still show reasonable consideration towards other guests.",
        "Tentify may remove a guest from the accommodation area in cases of serious disturbance, threats, violence, damage, dangerous behaviour, or repeated violations of the rules.",
      ],
    },
    {
      title: "11. Check-in and check-out",
      paragraphs: [
        "Current check-in and check-out times are stated in the booking confirmation and in information provided before the event.",
        "The customer is responsible for leaving the tent and rented equipment in a reasonable condition when checking out.",
      ],
    },
    {
      title: "12. Complaints",
      paragraphs: [
        "Any problem with the accommodation should be reported to Tentify as soon as possible during the stay so Tentify has a reasonable opportunity to investigate and, where possible, resolve the issue.",
      ],
    },
    {
      title: "13. Contracting party",
      paragraphs: [
        "The contracting party is:\nNangarra Invest AB\nBrand: Tentify",
        "Current contact information is available on the Tentify website.",
      ],
    },
  ],
};

const closing: Record<Lang, string> = {
  sv: "Genom att genomföra bokningen bekräftar kunden att dessa boknings- och boendevillkor har lästs och accepterats.",
  en: "By completing the booking, the customer confirms that these Booking & Accommodation Terms have been read and accepted.",
};

const titles: Record<Lang, string> = {
  sv: "Boknings- & boendevillkor – Sweden Rock",
  en: "Booking & Accommodation Terms – Sweden Rock",
};

const SwedenRockBookingTerms = ({ trigger, lang = "sv" }: SwedenRockBookingTermsProps) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className="max-h-[85vh] max-w-3xl">
      <DialogHeader>
        <DialogTitle>{titles[lang]}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[65vh] pr-4">
        <div className="space-y-6 text-sm leading-6 text-muted-foreground">
          <div className="space-y-3">
            {intro[lang].map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {sections[lang].map((section) => (
            <section key={section.title} className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">{section.title}</h3>
              {section.paragraphs.map((paragraph, i) => {
                const [first, ...rest] = paragraph.split("\n");
                return (
                  <p key={i}>
                    {first}
                    {rest.map((line, j) => (
                      <span key={j}>
                        <br />
                        {j === 0 ? <span className="font-medium text-foreground">{line}</span> : line}
                      </span>
                    ))}
                  </p>
                );
              })}
            </section>
          ))}

          <p className="font-medium text-foreground">{closing[lang]}</p>
        </div>
      </ScrollArea>
    </DialogContent>
  </Dialog>
);

export default SwedenRockBookingTerms;
