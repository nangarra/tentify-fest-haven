import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { SWEDEN_ROCK_2027 } from "../config/festivals";
import { extraGuestCost } from "./booking-pricing";

describe("new Sweden Rock guest pricing", () => {
  const festival = SWEDEN_ROCK_2027;
  const medium = festival.tents.find(t => t.id === "medium");
  const deluxe = festival.tents.find(t => t.id === "deluxe");
  if (!medium || !deluxe) throw new Error("Missing festival tents");

  test("Medium defaults to one included guest and retains its base price and maximum", () => {
    assert.equal(medium.includedGuests, 1);
    assert.equal(medium.price, 7900);
    assert.equal(medium.maxGuests, 3);
  });
  test("Deluxe defaults to two included guests and retains its base price and maximum", () => {
    assert.equal(deluxe.includedGuests, 2);
    assert.equal(deluxe.price, 11900);
    assert.equal(deluxe.maxGuests, 4);
  });
  test("Medium charges 850 per extra guest for the whole stay", () => {
    assert.equal(festival.extraGuestPrice, 850);
    assert.deepEqual([1, 2, 3].map(g => medium.price + extraGuestCost(medium, g, festival.extraGuestPrice)), [7900, 8750, 9600]);
  });
  test("Deluxe only charges beyond two guests for the whole stay", () => {
    assert.deepEqual([1, 2, 3, 4].map(g => deluxe.price + extraGuestCost(deluxe, g, festival.extraGuestPrice)), [11900, 11900, 12750, 13600]);
  });
});