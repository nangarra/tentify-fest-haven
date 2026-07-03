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
  continueCheckout: { sv: "Fortsätt till betalning", en: "Continue to checkout" },
  backToBooking: { sv: "Tillbaka till bokning", en: "Back to booking" },
  selectTentFirst: {
    sv: "Välj ett tält för att se ditt pris.",
    en: "Select a tent to see your price.",
  },

  customerDetails: { sv: "Kunduppgifter", en: "Customer details" },
  firstName: { sv: "Förnamn", en: "First name" },
  lastName: { sv: "Efternamn", en: "Last name" },
  email: { sv: "E-post", en: "Email" },
  phone: { sv: "Telefon", en: "Phone" },
  country: { sv: "Land", en: "Country" },
  address: { sv: "Adress", en: "Address" },
  postalCode: { sv: "Postnummer", en: "Postal code" },
  city: { sv: "Stad", en: "City" },

  payment: { sv: "Betalning", en: "Payment" },
  payDeposit: { sv: "Betala handpenning", en: "Pay deposit today" },
  payDepositDesc: {
    sv: "Säkra ditt tält nu och betala resten senare.",
    en: "Secure your tent now and pay the remaining balance later.",
  },
  payFull: { sv: "Betala hela beloppet", en: "Pay full amount now" },
  payFullDesc: {
    sv: "Slutför bokningen med en enda betalning.",
    en: "Complete your booking with a single payment.",
  },
  depositLabel: { sv: "20% handpenning", en: "20% deposit" },
  fullAmountLabel: { sv: "Hela beloppet", en: "Full amount" },
  paymentNote: {
    sv: "Betallösning kopplas in inom kort. Du får betalningsinstruktioner via e-post efter bekräftelse.",
    en: "Payment provider will be connected shortly. You will receive payment instructions by email after confirming.",
  },
  confirmBooking: { sv: "Bekräfta bokning", en: "Confirm booking" },
  submitting: { sv: "Skickar...", en: "Submitting..." },
  continue: { sv: "Fortsätt", en: "Continue" },
  summary: { sv: "Sammanfattning", en: "Summary" },

  thanks: { sv: "Tack för din bokning!", en: "Thank you for your booking!" },
  thanksBody: {
    sv: "Vi har tagit emot din bokning. Du får en bekräftelse via e-post inom kort med betalningsinstruktioner till",
    en: "We have received your booking. You will receive a confirmation email with payment instructions shortly at",
  },
  backHome: { sv: "Tillbaka till startsidan", en: "Back to homepage" },
  errorSubmit: {
    sv: "Kunde inte skicka bokningen. Försök igen.",
    en: "Could not submit booking. Please try again.",
  },
} as const;

export const t = (key: keyof typeof BOOKING_STRINGS, lang: Lang) =>
  BOOKING_STRINGS[key][lang];
