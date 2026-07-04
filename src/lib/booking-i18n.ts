import type { Lang } from "@/config/festivals";

export const BOOKING_STRINGS = {
  includedAsStandard: { sv: "Ingår som standard", en: "Included as standard" },
  packageIncludes: { sv: "Ingår i paketet", en: "Included in the package" },
  bookingOpen: { sv: "Bokning öppen", en: "Booking open" },

  tentsLeft: { sv: "tält kvar av", en: "of" },
  tentsSuffix: { sv: "", en: "tents left" },
  limitedAvailability: { sv: "Begränsat antal", en: "Limited availability" },
  nights: { sv: "nätter", en: "nights" },
  checkinTime: { sv: "Incheckning 15:00", en: "Check-in 15:00" },

  step1: { sv: "Välj tält", en: "Choose your tent" },
  step2: { sv: "Antal gäster", en: "Guests" },
  step3: { sv: "Bädd & komfort", en: "Bedding & comfort" },
  step4: { sv: "Mat & extra", en: "Food & extras" },

  numGuests: { sv: "Antal gäster", en: "Number of guests" },
  extraGuest: { sv: "Extra gäst", en: "Extra guest" },
  perPerson: { sv: "per person", en: "per person" },
  max: { sv: "Max", en: "Max" },
  in: { sv: "i", en: "in" },
  guest: { sv: "gäst", en: "guest" },
  guests: { sv: "gäster", en: "guests" },
  totalStay: { sv: "totalt", en: "total stay" },

  select: { sv: "Välj tält", en: "Select tent" },
  selected: { sv: "Vald", en: "Selected" },
  add: { sv: "Lägg till", en: "Add" },
  added: { sv: "Tillagd", en: "Added" },
  noThanks: { sv: "Nej tack", en: "No thanks" },
  moreInfo: { sv: "Mer info", en: "More info" },
  remove: { sv: "Ta bort", en: "Remove" },
  totalFor: { sv: "Totalt", en: "Total" },

  yourBooking: { sv: "Din bokning", en: "Your booking" },
  checkin: { sv: "Incheckning", en: "Check-in" },
  checkout: { sv: "Utcheckning", en: "Check-out" },
  nightsLabel: { sv: "Antal nätter", en: "Nights" },
  guestsLabel: { sv: "Gäster", en: "Guests" },
  included: { sv: "Ingår", en: "Included" },
  total: { sv: "Totalt", en: "Total" },
  continueCheckout: { sv: "Fortsätt till bokningssammanfattning", en: "Continue to summary" },
  backToBooking: { sv: "Tillbaka till bokning", en: "Back to booking" },
  selectTentFirst: {
    sv: "Välj ett tält för att se ditt pris.",
    en: "Select a tent to see your price.",
  },

  mediumSoldOut: { sv: "Medium tält är slutsålt", en: "Medium tent is sold out" },
  deluxeSoldOut: { sv: "Deluxe tält är slutsålt", en: "Deluxe tent is sold out" },
  allSoldOut: { sv: "Alla tält är slutsålda", en: "All tents are sold out" },
  availabilityLine: { sv: "tillgängliga", en: "available" },
  ofLabel: { sv: "av", en: "of" },
  totalTentsLabel: { sv: "tält totalt", en: "tents in total" },
  alreadyBookedTag: { sv: "tält är redan bokade", en: "tents already booked" },

  customerDetails: { sv: "Kunduppgifter", en: "Customer details" },
  firstName: { sv: "Förnamn", en: "First name" },
  lastName: { sv: "Efternamn", en: "Last name" },
  email: { sv: "E-post", en: "Email" },
  phone: { sv: "Telefon", en: "Phone" },
  country: { sv: "Land", en: "Country" },
  address: { sv: "Adress", en: "Address" },
  postalCode: { sv: "Postnummer", en: "Postal code" },
  city: { sv: "Stad", en: "City" },

  reviewBooking: { sv: "Kontrollera din bokning", en: "Review your booking" },
  depositLine: { sv: "Förskottsbetalning 20%", en: "Deposit 20%" },
  remainingLine: { sv: "Resterande belopp", en: "Remaining amount" },
  sendBookingRequest: { sv: "Skicka bokning", en: "Submit booking" },
  submitting: { sv: "Skickar...", en: "Submitting..." },
  continue: { sv: "Fortsätt", en: "Continue" },
  summary: { sv: "Sammanfattning", en: "Summary" },

  thanks: { sv: "Tack för din bokningsförfrågan!", en: "Thank you for your booking request!" },
  thanksBody: {
    sv: "Din bokning är mottagen och vi bekräftar den manuellt inom 24 timmar. För att säkra din plats betalar du en förskottsbetalning på 20% av totalbeloppet.",
    en: "Your booking has been received and we will confirm it manually within 24 hours. To secure your spot, please pay a 20% deposit of the total amount.",
  },
  paymentInfo: { sv: "Betalningsinformation", en: "Payment information" },
  totalAmountLabel: { sv: "Totalbelopp", en: "Total amount" },
  swishTitle: { sv: "Swish", en: "Swish" },
  bankgiroTitle: { sv: "Bankgiro", en: "Bankgiro" },
  markPayment: {
    sv: "Märk betalningen med ditt namn och bokningsnummer.",
    en: "Mark the payment with your name and booking number.",
  },
  confirmationTitle: { sv: "Bekräftelse", en: "Confirmation" },
  confirmationBody: {
    sv: "Vi kontrollerar betalningen och bekräftar din bokning inom 24 timmar.",
    en: "We verify the payment and confirm your booking within 24 hours.",
  },
  bookingNumber: { sv: "Bokningsnummer", en: "Booking number" },
  backHome: { sv: "Tillbaka till startsidan", en: "Back to homepage" },
  soldOutTypeError: {
    sv: "Tyvärr blev detta tält precis slutsålt. Välj ett annat tält eller kontakta oss.",
    en: "Unfortunately this tent just sold out. Please choose another tent or contact us.",
  },
  errorSubmit: {
    sv: "Kunde inte skicka bokningen. Försök igen.",
    en: "Could not submit booking. Please try again.",
  },
} as const;

export const t = (key: keyof typeof BOOKING_STRINGS, lang: Lang) =>
  BOOKING_STRINGS[key][lang];
