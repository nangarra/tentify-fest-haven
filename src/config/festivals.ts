import type { LucideIcon } from "lucide-react";
import { ADDONS, PRICING_VERSION, STAY } from "../../supabase/functions/_shared/booking-pricing";
import {
  Armchair,
  Square,
  Layers,
  LayoutGrid,
  Gift,
  Droplets,
  Lightbulb,
  DoorOpen,
  Zap,
  Car,
} from "lucide-react";
import bekvamtImg from "@/assets/bekvamt-boende-sweden-rock-glamping.webp.asset.json";

import bookingHeroImg from "@/assets/sweden-rock-glamping-5-2.webp.asset.json";
import luxuryBedImg from "@/assets/dubbelbad-swedenrock.webp.asset.json";
import extraBedImg from "@/assets/extra-sang-swedenrock.webp.asset.json";
import beddingImg from "@/assets/baddset-swedenrock.webp.asset.json";
import mediumTentImg from "@/assets/medium_tentify_sweden_rock_glamping.webp.asset.json";
import breakfastImg from "@/assets/frukost_sweden_rock_glamping.webp.asset.json";
import survivalPackImg from "@/assets/glamping_swedenrock_tillagg.webp.asset.json";
import towelImg from "@/assets/handdukar_sweden_rock_glamping.webp.asset.json";
import mediumStudioImg from "@/assets/Swedenrock_glamping_medium_taltet_tentify.webp.asset.json";
import mediumStudioLargeImg from "@/assets/Swedenrock_glamping_stora_taltet_tentify.webp.asset.json";
import fardigtTaltImg from "@/assets/fardigt-talt-sweden-rock.webp.asset.json";
import interiorImg from "@/assets/glampingtalt-sweden-rock-interior.webp.asset.json";

export type Lang = "sv" | "en";
export type Localized = Record<Lang, string>;

export type IncludedItem = {
  Icon: LucideIcon;
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
  includedGuests: number;
  image: string;
  /** Optional image gallery shown in the tent card. First image is the main image. */
  gallery?: string[];
  includedStandard?: IncludedItem[];
  /** Number of physical tents of this type in inventory. */
  totalCount?: number;
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
  image?: string;
};


export type FestivalConfig = {
  pricingVersion?: string;
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

const STANDARD_INCLUDED: IncludedItem[] = [
  { Icon: Armchair, label: { sv: "2 stolar", en: "2 chairs" } },
  { Icon: Square, label: { sv: "Bord", en: "Table" } },
  { Icon: Layers, label: { sv: "Filt", en: "Blanket" } },
  { Icon: LayoutGrid, label: { sv: "Matta", en: "Rug" } },
  { Icon: Gift, label: { sv: "Goodiebag", en: "Goodie bag" } },
  { Icon: Droplets, label: { sv: "Våtservetter", en: "Wet wipes" } },
  { Icon: Lightbulb, label: { sv: "USB-lampa", en: "USB lamp" } },
  { Icon: DoorOpen, label: { sv: "Dörrmatta", en: "Doormat" } },
  { Icon: Car, label: { sv: "Parkering", en: "Parking" } },
];

export const SWEDEN_ROCK_2027: FestivalConfig = {
  pricingVersion: PRICING_VERSION,

  slug: "sweden-rock-2027",
  id: "sweden-rock-2027",
  name: "Sweden Rock Festival 2027",
  displayTitle: {
    sv: "Glamping på Sweden Rock Festival 2027",
    en: "Sweden Rock 2027 Glamping",
  },
  subtitle: {
    sv: "Upplev Sweden Rock med ett bekvämt och färdigställt glampingtält på Ingemans Camping, bara cirka 800 meter från festivalentrén.",
    en: "Book your ready-made glamping tent for Sweden Rock Festival 2027.",
  },
  location: {
    sv: STAY.location,
    en: "Near Sweden Rock Festival",
  },
  checkIn: { sv: STAY.checkIn, en: STAY.checkIn },
  checkOut: { sv: STAY.checkOut, en: STAY.checkOut },
  nights: 5,
  totalTents: 20,
  heroImage: bookingHeroImg.url,
  currency: "kr",
  extraGuestPrice: 850,
  tents: [
    {
      id: "medium",
      name: { sv: "Medium tält", en: "Medium Tent" },
      size: "6 m²",
      bestFor: { sv: "1–3 gäster", en: "1–3 guests" },
      description: {
        sv: "Enkel och bekväm festivalglamping. Klart när du kommer.",
        en: "Simple and comfortable festival glamping. Ready when you arrive.",
      },
      price: 7900,
      maxGuests: 3,
      includedGuests: 1,
      image: mediumTentImg.url,
      gallery: [mediumStudioImg.url, mediumTentImg.url],

      includedStandard: STANDARD_INCLUDED,
      totalCount: 10,
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
      includedGuests: 2,
      image: mediumStudioLargeImg.url,
      gallery: [mediumStudioLargeImg.url, bekvamtImg.url],

      includedStandard: STANDARD_INCLUDED,
      totalCount: 10,
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
      image: luxuryBedImg.url,
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
      image: extraBedImg.url,
    },
    {
      id: "bedding",
      name: { sv: "Bäddset", en: "Bedding Set" },
      description: {
        sv: "Gör din vistelse extra bekväm med ett bäddset för en skön natts sömn. För hela festivalvistelsen. Innehåller täcke, kudde och lakan.",
        en: "Bedding set for the full festival stay. Includes duvet, pillow and sheet.",
      },
      price: ADDONS.bedding.price,
      perPerson: true,
      category: "comfort",
      image: beddingImg.url,
    },
    {
      id: "breakfast",
      name: { sv: "Lyxfrukost", en: "Luxury Festival Breakfast" },
      description: {
        sv: "Starta festivaldagen på bästa sätt med vårt lyxiga frukostalternativ. Njut av en premiumfrukost varje morgon under festivalvistelsen.",
        en: "Enjoy a premium breakfast every morning of the festival stay.",
      },
      price: ADDONS.breakfast.price,
      perPerson: true,
      category: "food",
      image: breakfastImg.url,
    },
    {
      id: "towel",
      name: { sv: "Handduk (hyra)", en: "Towel" },
      description: {
        sv: "Slipp packa med egen handduk! Hyr en handduk under din festivalvistelse.",
        en: "Add a fresh towel for each guest.",
      },
      price: ADDONS.towel.price,
      perPerson: true,
      category: "extra",
      image: towelImg.url,
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
    {
      id: "electricity",
      name: { sv: "El till tältet", en: "El till tältet" },
      description: {
        sv: "Begränsad elförsörjning med 230 V och max 230 W per tält. Passar för laddning av mobiltelefoner, datorer, powerbanks och andra mindre elektroniska enheter. Elen är inte avsedd för strömkrävande utrustning som vattenkokare, värmeelement, kokplattor eller annan matlagningsutrustning. Behöver du tillgång till kraftigare el eller möjlighet att värma mat kan vi i vissa fall hjälpa till vid vårt serviceområde på campingen.",
        en: "230 V, max 230 W per tent.",
      },
      price: ADDONS.electricity.price,
      perPerson: false,
      category: "extra",
    },
    {
      id: "festival-survival-pack",
      name: { sv: "Festivalpaket", en: "Festival Survival Pack" },
      description: {
        sv: "Ett praktiskt festivalpaket med saker som gör vistelsen enklare och skönare.",
        en: "A practical festival pack with essentials that make your stay easier.",
      },
      price: 499,
      perPerson: true,
      category: "package",
      badge: { sv: "Perfekt för festivalen", en: "Perfect for the festival" },
      includedItems: [
        { sv: "Vatten", en: "Water" },
        { sv: "Snacks", en: "Snacks" },
        { sv: "Regnponcho", en: "Rain poncho" },
        { sv: "Öronproppar", en: "Earplugs" },
        { sv: "Ögonbindel", en: "Sleep mask" },
      ],
      image: survivalPackImg.url,
    },
  ],
};


export const FESTIVALS: Record<string, FestivalConfig> = {
  [SWEDEN_ROCK_2027.slug]: SWEDEN_ROCK_2027,
};

export const getFestival = (slug: string): FestivalConfig | undefined =>
  FESTIVALS[slug];
