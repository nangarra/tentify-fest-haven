import type { LucideIcon } from "lucide-react";
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
  { Icon: Zap, label: { sv: "El", en: "Electricity" } },
  { Icon: Car, label: { sv: "Parkering", en: "Parking" } },
];

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
  checkIn: { sv: "8 juni 2026", en: "8 June 2026" },
  checkOut: { sv: "12 juni 2026", en: "12 June 2026" },
  nights: 4,
  totalTents: 20,
  heroImage: bookingHeroImg.url,
  currency: "SEK",
  extraGuestPrice: 500,
  tents: [
    {
      id: "medium",
      name: { sv: "Medium tält", en: "Medium Tent" },
      size: "6 m²",
      bestFor: { sv: "2–3 gäster", en: "2–3 guests" },
      description: {
        sv: "Enkel och bekväm festivalglamping. Klart när du kommer.",
        en: "Simple and comfortable festival glamping. Ready when you arrive.",
      },
      price: 7900,
      maxGuests: 3,
      image: mediumStudioImg.url,
      gallery: [
        mediumStudioImg.url,
        mediumTentImg.url,
      ],

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
      image: bekvamtImg.url,
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
        sv: "Bäddset för hela festivalvistelsen. Innehåller täcke, kudde och lakan.",
        en: "Bedding set for the full festival stay. Includes duvet, pillow and sheet.",
      },
      price: 400,
      perPerson: true,
      category: "comfort",
      image: beddingImg.url,
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
      image: breakfastImg.url,
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
      id: "comfort-pack",
      name: { sv: "Comfort Pack", en: "Comfort Pack" },
      description: {
        sv: "Gör tältet ännu bekvämare med extra saker för vila och häng.",
        en: "Make your tent even cosier with extras for resting and hanging out.",
      },
      price: 499,
      perPerson: false,
      category: "package",
      badge: { sv: "Bekvämlighetspaket", en: "Comfort package" },
      includedItems: [
        { sv: "Extra stol", en: "Extra chair" },
        { sv: "Extra kudde", en: "Extra pillow" },
        { sv: "Extra filt", en: "Extra blanket" },
      ],
    },
    {
      id: "festival-survival-pack",
      name: { sv: "Festival Survival Pack", en: "Festival Survival Pack" },
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
