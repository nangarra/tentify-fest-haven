import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsModalProps {
  trigger: React.ReactNode;
}

const TermsModal = ({ trigger }: TermsModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Tentifys villkor</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-2">Betalning och förskott</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Förskott:</strong> 20% av totalpriset betalas vid bokning och är ej återbetalningsbart vid avbokning.</li>
                <li>• <strong>Deposition:</strong> 1 500 kr hålls som säkerhet och återbetalas efter godkänd återlämning/avsyning.</li>
                <li>• Resterande belopp betalas vid ankomst eller enligt överenskommelse.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Städning och skötsel</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Städavgift:</strong> Tältet ska återlämnas städat. Vid bristande städning tas en avgift på 800 kr ut från depositionen.</li>
                <li>• <strong>Spill och fläckar:</strong> Extra städavgift tillkommer vid spill av dryck, mat eller andra substanser som kräver specialrengöring.</li>
                <li>• Rökförbud gäller i tälten.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Skador och ansvar</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Skadeansvar:</strong> Kunden är betalningsskyldig för alla skador på tält, utrustning eller tillbehör.</li>
                <li>• <strong>Saknade delar:</strong> Avgift tas ut för förlorade eller saknade föremål enligt prislista.</li>
                <li>• <strong>Normalt slitage:</strong> Rimligt slitage accepteras, men onormalt slitage eller vårdslöshet debiteras.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Avbokning och ändringar</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Förskottet är ej återbetalningsbart vid avbokning oavsett anledning.</li>
                <li>• Ändringar av bokning kan medföra extra kostnader.</li>
                <li>• Vid force majeure (ex. inställd festival) kan särskilda villkor gälla.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Fylleförsäkring (tillägg 1 000 kr)</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Täcker kostnader för extraordinär städning/sanering p.g.a. kräkning, större spill och liknande.</li>
                <li>• Täcker inte skador på tält eller utrustning (t.ex. hål, skärskador, brännhål, trasiga ramar/dragkedjor).</li>
                <li>• Deposition och skadekostnader kan fortfarande debiteras separat vid fysisk skada.</li>
                <li>• Övriga villkor (20 % förskott ej återbetalningsbart, deposition 1 500 kr, städavgift 800 kr vid ej städat) gäller fortsatt.</li>
                <li>• Obs: Fylleförsäkringen påverkar inte depositionen och ersätter inte ansvar för materiella skador.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Övriga villkor</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Tentify förbehåller sig rätten att neka eller avbryta bokningar vid regelbrott eller säkerhetsrisk.</li>
                <li>• Kunden ansvarar för att följa festivalens/eventets regler och föreskrifter.</li>
                <li>• Tentify ansvarar inte för stöld eller skada på kundens personliga tillhörigheter.</li>
                <li>• Eventuella tvister löses enligt svensk lag.</li>
              </ul>
            </section>

            <section className="bg-secondary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Sammanfattning</h3>
              <div className="text-muted-foreground space-y-1">
                <p>• Förskott: 20% (ej återbetalningsbart)</p>
                <p>• Deposition: 1 500 kr (återbetalas vid godkänd återlämning)</p>
                <p>• Städavgift vid bristande städning: 800 kr</p>
                <p>• Fullt ansvar för skador och saknade delar</p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;