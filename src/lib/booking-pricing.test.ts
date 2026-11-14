import { describe, expect, test } from "bun:test";
import { SWEDEN_ROCK_2027 } from "../config/festivals";
import { extraGuestCost } from "./booking-pricing";

describe("new Sweden Rock guest pricing", () => {
  const festival = SWEDEN_ROCK_2027;
  const medium = festival.tents.find(t => t.id === "medium");
  const deluxe = festival.tents.find(t => t.id === "deluxe");
  if (!medium || !deluxe) throw new Error("Missing festival tents");

  test("Medium defaults to one included guest and retains its base price and maximum", () => {
    expect(medium.includedGuests).toBe(1);
    expect(medium.price).toBe(7900);
    expect(medium.maxGuests).toBe(3);
  });
  test("Deluxe defaults to two included guests and retains its base price and maximum", () => {
    expect(deluxe.includedGuests).toBe(2);
    expect(deluxe.price).toBe(11900);
    expect(deluxe.maxGuests).toBe(4);
  });
  test("Medium charges 850 per extra guest for the whole stay", () => {
    expect(festival.extraGuestPrice).toBe(850);
    expect([1, 2, 3].map(g => medium.price + extraGuestCost(medium, g, festival.extraGuestPrice)))
      .toEqual([7900, 8750, 9600]);
  });
  test("Deluxe only charges beyond two guests for the whole stay", () => {
    expect([1, 2, 3, 4].map(g => deluxe.price + extraGuestCost(deluxe, g, festival.extraGuestPrice)))
      .toEqual([11900, 11900, 12750, 13600]);
  });
});