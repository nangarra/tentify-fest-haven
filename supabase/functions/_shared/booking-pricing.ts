export const PRICING_VERSION = "sweden-rock-2027-v2";
export const STAY = {
  location: "Ingemans Camping, Truckvägen 1, Sölvesborg",
  distance: "Cirka 800 meter från festivalentrén",
  checkIn: "Tisdag 8 juni 2027, från kvällen",
  checkOut: "Söndag 13 juni 2027, senast kl. 12.00",
  nights: 5,
};
export const TENTS = {
  medium: { name: "Medium tält", price: 7900, includedGuests: 1, maxGuests: 3 },
  deluxe: { name: "Deluxe tält", price: 11900, includedGuests: 2, maxGuests: 4 },
};
export const ADDONS: Record<string, { name: string; price: number; perPerson: boolean }> = {
  "luxury-bed": { name: "Lyxig dubbelsäng", price: 500, perPerson: false },
  "extra-bed": { name: "Extra säng", price: 500, perPerson: false },
  bedding: { name: "Bäddset", price: 500, perPerson: true },
  breakfast: { name: "Lyxfrukost", price: 699, perPerson: true },
  towel: { name: "Handduk (hyra)", price: 100, perPerson: true },
  electricity: { name: "El till tältet", price: 850, perPerson: false },
  "festival-survival-pack": { name: "Festivalpaket", price: 499, perPerson: true },
};

export function calculateBooking(tentId: string, guests: number, addonIds: string[]) {
  const tent = TENTS[tentId as keyof typeof TENTS];
  if (!tent || !Number.isInteger(guests) || guests < tent.includedGuests || guests > tent.maxGuests) {
    throw new Error("Ogiltigt antal gäster eller tälttyp.");
  }
  if (!Array.isArray(addonIds) || new Set(addonIds).size !== addonIds.length) {
    throw new Error("Ogiltiga tillval.");
  }
  const addOns = addonIds.map(id => {
    const item = ADDONS[id];
    if (!item) throw new Error("Tillvalet kan inte bokas.");
    const qty = item.perPerson ? guests : 1;
    return { id, name: item.name, qty, unitPrice: item.price, total: item.price * qty };
  });
  const extraGuestsCost = (guests - tent.includedGuests) * 850;
  const addOnsTotal = addOns.reduce((sum, a) => sum + a.total, 0);
  const totalPrice = tent.price + extraGuestsCost + addOnsTotal;
  const deposit = Math.round(totalPrice * 0.2);
  return {
    pricingVersion: PRICING_VERSION, tentType: tentId, tentBatch: tentId, tentName: tent.name,
    tentBasePrice: tent.price, guests, includedGuests: tent.includedGuests, extraGuestPrice: 850,
    extraGuestsCost, addOns, addOnsTotal, totalPrice, deposit, depositPercent: 20,
    remainingAmount: totalPrice - deposit, ...STAY,
  };
}

export function assertQuotedTotal(quote: ReturnType<typeof calculateBooking>, total: unknown) {
  if (total !== quote.totalPrice) throw new Error("Priset stämmer inte med bokningsunderlaget.");
}

// Payments always use the saved snapshot, never today's catalogue.
export function savedDeposit(meta: Record<string, unknown>) {
  const deposit = Number(meta.deposit);
  const total = Number(meta.totalPrice);
  if (!Number.isFinite(total) || total <= 0 || !Number.isFinite(deposit) || deposit !== Math.round(total * 0.2)) {
    throw new Error("Bokningen saknar ett giltigt sparat betalningsunderlag.");
  }
  return deposit;
}