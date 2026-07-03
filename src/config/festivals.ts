import bekvamtImg from "@/assets/bekvamt-boende-sweden-rock-glamping.webp.asset.json";
import interiorImg from "@/assets/glampingtalt-sweden-rock-interior.webp.asset.json";
import heroImg from "@/assets/sweden-rock-2027-hero.png.asset.json";

export type TentType = {
  id: string;
  name: string;
  size: string;
  bestFor: string;
  description: string;
  price: number;
  image: string;
};

export type AddOnType = {
  id: string;
  name: string;
  description: string;
  price: number;
  perPerson: boolean;
  category: "comfort" | "food" | "extra";
};

export type FestivalConfig = {
  id: string;
  name: string;
  shortName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalTents: number;
  heroImage: string;
  currency: string;
  extraGuestPrice: number;
  tents: TentType[];
  addOns: AddOnType[];
};

export const SWEDEN_ROCK_2027: FestivalConfig = {
  id: "sweden-rock-2027",
  name: "Sweden Rock Festival 2027",
  shortName: "Sweden Rock 2027",
  location: "Near Sweden Rock Festival",
  checkIn: "Tuesday, 8 June 2027",
  checkOut: "Sunday, 13 June 2027",
  nights: 5,
  totalTents: 10,
  heroImage: heroImg.url,
  currency: "SEK",
  extraGuestPrice: 500,
  tents: [
    {
      id: "medium",
      name: "Medium Tent",
      size: "6 m²",
      bestFor: "1–2 guests",
      description: "Simple and comfortable festival glamping. Ready when you arrive.",
      price: 7900,
      image: bekvamtImg.url,
    },
    {
      id: "deluxe",
      name: "Deluxe Tent",
      size: "12 m²",
      bestFor: "2–4 guests",
      description: "More space and premium comfort with a fully furnished interior.",
      price: 11900,
      image: interiorImg.url,
    },
  ],
  addOns: [
    {
      id: "luxury-bed",
      name: "Luxury Double Bed Upgrade",
      description: "Upgrade your sleeping setup to a more comfortable luxury double bed.",
      price: 500,
      perPerson: false,
      category: "comfort",
    },
    {
      id: "extra-bed",
      name: "Extra Bed",
      description: "Add an extra bed for an additional guest.",
      price: 500,
      perPerson: false,
      category: "comfort",
    },
    {
      id: "bedding",
      name: "Bedding Set",
      description: "Bedding set for the full festival stay. Includes duvet, pillow and sheet.",
      price: 400,
      perPerson: true,
      category: "comfort",
    },
    {
      id: "breakfast",
      name: "Luxury Festival Breakfast",
      description: "Enjoy a premium breakfast every morning of the festival stay.",
      price: 599,
      perPerson: true,
      category: "food",
    },
    {
      id: "towel",
      name: "Towel",
      description: "Add a fresh towel for each guest.",
      price: 50,
      perPerson: true,
      category: "extra",
    },
    {
      id: "fridge",
      name: "Mini Fridge",
      description: "Keep drinks and snacks cold during the festival.",
      price: 500,
      perPerson: false,
      category: "extra",
    },
  ],
};
