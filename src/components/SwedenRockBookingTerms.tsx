import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type SwedenRockBookingTermsProps = {
  trigger: React.ReactNode;
};

const SwedenRockBookingTerms = ({ trigger }: SwedenRockBookingTermsProps) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className="max-h-[85vh] max-w-3xl">
      <DialogHeader>
        <DialogTitle>Booking &amp; Accommodation Terms – Sweden Rock</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[65vh] pr-4">
        <div className="space-y-6 text-sm leading-6 text-muted-foreground">
          <div className="space-y-3">
            <p>
              These terms apply to bookings of glamping accommodation and tent accommodation provided by
              Tentify / Nangarra Invest AB in connection with Sweden Rock Festival.
            </p>
            <p>
              By completing a booking, the customer confirms that these terms have been read and accepted.
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">1. Booking and payment</h3>
            <p>A deposit corresponding to 20% of the total booking amount is paid at the time of booking.</p>
            <p>
              The booking is confirmed once the deposit has been registered and the customer has received a
              booking confirmation from Tentify.
            </p>
            <p>
              The remaining balance is paid according to the booking confirmation, normally upon arrival unless
              otherwise agreed.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">2. Cancellation by the customer</h3>
            <p>The customer may cancel the booking before arrival.</p>
            <p>
              However, the 20% deposit is non-refundable when the customer cancels the booking, regardless of the
              reason for cancellation.
            </p>
            <p>
              If the customer cancels before the remaining balance has been paid, no additional payment will
              normally be charged unless otherwise specifically agreed.
            </p>
            <p>Failure to arrive is considered a cancellation and the deposit will not be refunded.</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">3. Right of withdrawal</h3>
            <p>
              The booking relates to accommodation provided on specific dates. The statutory 14-day right of
              withdrawal therefore normally does not apply to the booking.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">4. Sweden Rock Festival</h3>
            <p>
              Tentify / Nangarra Invest AB is a separate accommodation provider and is not responsible for Sweden
              Rock Festival&apos;s organization, program, artists, opening hours, festival tickets, or changes made
              by the festival organizer.
            </p>
            <p>
              Changes to the festival program, artists, schedules, or other aspects of the event do not in
              themselves entitle the customer to a refund of the accommodation.
            </p>
            <p>
              If the festival is cancelled or moved, the accommodation booking will be assessed based on whether
              Tentify is still able to provide the booked accommodation.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">5. Weather and outdoor conditions</h3>
            <p>The accommodation is provided in tents and in an outdoor environment.</p>
            <p>The customer understands that weather and ground conditions may vary.</p>
            <p>
              Rain, wind, cold, heat, mud, moisture, noise, or other normal conditions associated with an outdoor
              festival do not entitle the customer to a refund or price reduction as long as the accommodation can
              still be used safely and reasonably.
            </p>
            <p>
              Tentify may take necessary safety measures, including reinforcing tents, moving equipment,
              restricting access to certain areas, or temporarily evacuating the accommodation area.
            </p>
            <p>
              Customers must follow safety instructions issued by Tentify, the landowner, festival organizer,
              emergency services, or other relevant authorities.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">6. Extraordinary events and force majeure</h3>
            <p>
              Tentify is not responsible for indirect losses or additional costs caused by events outside the
              company&apos;s reasonable control.
            </p>
            <p>
              This may include extreme weather, storms, flooding, fire, government decisions, war, major
              infrastructure disruption, or comparable extraordinary circumstances.
            </p>
            <p>
              If such an event affects the accommodation, Tentify may make reasonable and necessary changes in
              order to maintain safety and, where possible, continue providing the accommodation.
            </p>
            <p>
              If Tentify is completely unable to provide the booked accommodation, any refund or compensation will
              be handled in accordance with applicable law and the specific circumstances of the event.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">7. Safety and house rules</h3>
            <p>
              The customer is responsible for themselves and for the other guests included in their booking.
            </p>
            <p>
              Open flames, barbecues, candles, or other fire hazards may not be used inside or directly next to the
              tents unless specifically approved by Tentify.
            </p>
            <p>Smoking is not permitted inside the tents.</p>
            <p>
              Tent ropes, anchors, safety equipment, and other installations may not be moved, loosened, or modified
              by guests.
            </p>
            <p>Emergency exits, access routes, and rescue routes must always remain clear.</p>
            <p>Instructions from Tentify staff must be followed.</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">8. Damage to tents and equipment</h3>
            <p>
              The customer is responsible for damage to tents, furniture, beds, electronics, or other equipment
              caused by the customer or members of their booking through negligence, carelessness, or intentional
              actions.
            </p>
            <p>Normal wear and tear is excluded.</p>
            <p>
              Tentify may charge the customer a reasonable repair or replacement cost for damaged or missing
              equipment.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">9. Personal belongings</h3>
            <p>
              Customers are responsible for their own money, electronics, valuables, and personal belongings stored
              in or around the tent.
            </p>
            <p>
              Tentify is not responsible for lost or stolen property except where responsibility is required by
              applicable law.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">10. Disturbances and behaviour</h3>
            <p>
              The accommodation is located in connection with a large music festival.
            </p>
            <p>
              Customers should therefore expect music, crowds, traffic, and other disturbances normally associated
              with a festival environment.
            </p>
            <p>Guests must still show reasonable consideration towards other guests.</p>
            <p>
              Tentify may remove a guest from the accommodation area in cases of serious disturbance, threats,
              violence, damage, dangerous behaviour, or repeated violations of the rules.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">11. Check-in and check-out</h3>
            <p>
              Current check-in and check-out times are stated in the booking confirmation and in information
              provided before the event.
            </p>
            <p>
              The customer is responsible for leaving the tent and rented equipment in a reasonable condition when
              checking out.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">12. Complaints</h3>
            <p>
              Any problem with the accommodation should be reported to Tentify as soon as possible during the stay
              so Tentify has a reasonable opportunity to investigate and, where possible, resolve the issue.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">13. Contracting party</h3>
            <p>
              The contracting party is:
              <br />
              <span className="font-medium text-foreground">Nangarra Invest AB</span>
              <br />
              Brand: Tentify
            </p>
            <p>Current contact information is available on the Tentify website.</p>
          </section>

          <p className="font-medium text-foreground">
            By completing the booking, the customer confirms that these Booking &amp; Accommodation Terms have been
            read and accepted.
          </p>
        </div>
      </ScrollArea>
    </DialogContent>
  </Dialog>
);

export default SwedenRockBookingTerms;