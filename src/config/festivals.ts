import bekvamtImg from "@/assets/bekvamt-boende-sweden-rock-glamping.webp.asset.json";
import interiorImg from "@/assets/glampingtalt-sweden-rock-interior.webp.asset.json";
import heroImg from "@/assets/sweden-rock-2027-hero.png.asset.json";

export type Lang = "sv" | "en";
export type Localized = Record<Lang, string>;

export type IncludedItem = {
  icon: string;
  label: Localized;
};

export type TentType = {
  id: string;
  name: Localized;
  size: string;
  bestFor: Localized;
  description: Localized;
  price: number;
  maxGuests: number;
  image: string;
  includedStandard?: IncludedItem[];
};

export type AddOnType = {
  id: string;
  name: Localized;
  description: Localized;
  price: number;
  perPerson: boolean;
  category: "comfort" | "food" | "extra" | "package";
  badge?: Localized;
  includedItems?: Localized[];
};


export type FestivalConfig = {
  slug: string;
  id: string; // used as festival key in DB / inventory
  name: string;
  displayTitle: Localized;
  subtitle: Localized;
  location: Localized;
  checkIn: Localized;
  checkOut: Localized;
  nights: number;
  totalTents: number;
  heroImage: string;
  currency: string;
  extraGuestPrice: number;
  tents: TentType[];
  addOns: AddOnType[];
};

export const SWEDEN_ROCK_2027: FestivalConfig = {
  slug: "sweden-rock-2027",
  id: "sweden-rock-2027",
  name: "Sweden Rock Festival 2027",
  displayTitle: {
    sv: "Glamping till Sweden Rock 2027",
    en: "Sweden Rock 2027 Glamping",
  },
  subtitle: {
    sv: "Boka ditt färdiga glampingtält nära festivalen. Välj tält, lägg till bekvämligheter och säkra din plats.",
    en: "Book your ready-made glamping tent for Sweden Rock Festival 2027.",
  },
  location: {
    sv: "Nära Sweden Rock Festival",
    en: "Near Sweden Rock Festival",
  },
  checkIn: { sv: "8 juni 2027", en: "8 June 2027" },
  checkOut: { sv: "13 juni 2027", en: "13 June 2027" },
  nights: 5,
  totalTents: 10,
  heroImage: heroImg.url,
  currency: "SEK",
  extraGuestPrice: 500,
  tents: [
    {
      id: "medium",
      name: { sv: "Medium tält", en: "Medium Tent" },
      size: "6 m²",
      bestFor: { sv: "1–2 gäster", en: "1–2 guests" },
      description: {
        sv: "Enkel och bekväm festivalglamping. Klart när du kommer.",
        en: "Simple and comfortable festival glamping. Ready when you arrive.",
      },
      price: 7900,
      maxGuests: 2,
      image: bekvamtImg.url,
      includedStandard: STANDARD_INCLUDED,
    },
    {
      id: "deluxe",
      name: { sv: "Deluxe tält", en: "Deluxe Tent" },
      size: "12 m²",
      bestFor: { sv: "2–4 gäster", en: "2–4 guests" },
      description: {
        sv: "Mer utrymme och premiumkomfort med fullt möblerad interiör.",
        en: "More space and premium comfort with a fully furnished interior.",
      },
      price: 11900,
      maxGuests: 4,
      image: interiorImg.url,
      includedStandard: STANDARD_INCLUDED,
    },
  ],

  addOns: [
    {
      id: "luxury-bed",
      name: { sv: "Lyxig dubbelsäng", en: "Luxury Double Bed Upgrade" },
      description: {
        sv: "Uppgradera din sovplats till en bekvämare lyxig dubbelsäng.",
        en: "Upgrade your sleeping setup to a more comfortable luxury double bed.",
      },
      price: 500,
      perPerson: false,
      category: "comfort",
    },
    {
      id: "extra-bed",
      name: { sv: "Extra säng", en: "Extra Bed" },
      description: {
        sv: "Lägg till en extra säng för ytterligare en gäst.",
        en: "Add an extra bed for an additional guest.",
      },
      price: 500,
      perPerson: false,
      category: "comfort",
    },
    {
      id: "bedding",
      name: { sv: "Bäddset", en: "Bedding Set" },
      description: {
        sv: "Bäddset för hela festivalvistelsen. Innehåller täcke, kudde och lakan.",
        en: "Bedding set for the full festival stay. Includes duvet, pillow and sheet.",
      },
      price: 400,
      perPerson: true,
      category: "comfort",
    },
    {
      id: "breakfast",
      name: { sv: "Lyxig festivalfrukost", en: "Luxury Festival Breakfast" },
      description: {
        sv: "Njut av en premiumfrukost varje morgon under festivalvistelsen.",
        en: "Enjoy a premium breakfast every morning of the festival stay.",
      },
      price: 599,
      perPerson: true,
      category: "food",
    },
    {
      id: "towel",
      name: { sv: "Handduk", en: "Towel" },
      description: {
        sv: "Lägg till en fräsch handduk för varje gäst.",
        en: "Add a fresh towel for each guest.",
      },
      price: 50,
      perPerson: true,
      category: "extra",
    },
    {
      id: "fridge",
      name: { sv: "Minikyl", en: "Mini Fridge" },
      description: {
        sv: "Håll drycker och snacks kalla under festivalen.",
        en: "Keep drinks and snacks cold during the festival.",
      },
      price: 500,
      perPerson: false,
      category: "extra",
    },
  ],
};

export const FESTIVALS: Record<string, FestivalConfig> = {
  [SWEDEN_ROCK_2027.slug]: SWEDEN_ROCK_2027,
};

export const getFestival = (slug: string): FestivalConfig | undefined =>
  FESTIVALS[slug];
