import type { TentType } from "@/config/festivals";

// Only calculate new selections; existing bookings retain their saved prices.
export const extraGuestCost = (
  tent: Pick<TentType, "includedGuests"> | null,
  guests: number,
  pricePerGuest: number,
) => tent ? Math.max(0, guests - tent.includedGuests) * pricePerGuest : 0;