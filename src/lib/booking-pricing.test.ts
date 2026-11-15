/// <reference types="node" />
import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { SWEDEN_ROCK_2027 } from "../config/festivals";
import { extraGuestCost } from "./booking-pricing";
import { calculateBooking, assertQuotedTotal, savedDeposit, STAY, LEGACY_PRICING_VERSION } from "../../supabase/functions/_shared/booking-pricing";

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
  test("Medium charges 799 per extra guest for the whole stay", () => {
    assert.equal(festival.extraGuestPrice, 799);
    assert.deepEqual([1, 2, 3].map(g => medium.price + extraGuestCost(medium, g, festival.extraGuestPrice)), [7900, 8699, 9498]);
  });
  test("Deluxe only charges beyond two guests for the whole stay", () => {
    assert.deepEqual([2, 3, 4].map(g => deluxe.price + extraGuestCost(deluxe, g, festival.extraGuestPrice)), [11900, 12699, 13498]);
  });
});

describe("verified festival pricing", () => {
  test("Medium example includes one extra guest, electricity and two towels", () => {
    const q = calculateBooking("medium", 2, ["electricity", "towel"]);
    assert.equal(q.totalPrice, 9748);
    assert.equal(q.deposit, 1950);
    assert.equal(q.extraGuestsCost, 799);
    assert.deepEqual(q.addOns.map(a => a.total), [849, 200]);
  });
  test("Deluxe example includes one extra guest, electricity and three towels", () => {
    const q = calculateBooking("deluxe", 3, ["electricity", "towel"]);
    assert.equal(q.totalPrice, 13848);
    assert.equal(q.deposit, 2770);
  });
  test("guest minimums and maximums are enforced on the server", () => {
    for (const [tent, guests] of [["medium", 0], ["medium", 4], ["deluxe", 1], ["deluxe", 5]] as const) {
      assert.throws(() => calculateBooking(tent, guests, []));
    }
  });
  test("electricity is not selected by default and costs 849 per tent", () => {
    assert.equal(calculateBooking("medium", 1, []).addOns.length, 0);
    for (const guests of [2, 3, 4]) assert.equal(calculateBooking("deluxe", guests, ["electricity"]).addOnsTotal, 849);
    assert.equal(calculateBooking("medium", 1, ["electricity"]).totalPrice - calculateBooking("medium", 1, []).totalPrice, 849);
  });
  test("Comfort Pack, fridge, duplicates and manipulated amounts are rejected", () => {
    for (const ids of [["comfort-pack"], ["fridge"], ["electricity", "electricity"]]) assert.throws(() => calculateBooking("medium", 1, ids));
    assert.throws(() => assertQuotedTotal(calculateBooking("medium", 1, []), 1));
  });
  test("towels, breakfast and bedding retain per-person pricing at new rates", () => {
    assert.deepEqual(calculateBooking("deluxe", 2, ["towel", "breakfast", "bedding"]).addOns.map(a => [a.unitPrice, a.qty, a.total]), [[100, 2, 200], [699, 2, 1398], [500, 2, 1000]]);
  });
  test("historic payments use saved amounts rather than current prices", () => {
    const old = { totalPrice: 8450, deposit: 1690, addOns: [{ id: "comfort-pack", total: 499 }], checkIn: "9 juni 2027" };
    const before = JSON.stringify(old);
    assert.equal(savedDeposit(old), 1690);
    assert.equal(JSON.stringify(old), before);
  });
  test("new stay information has the agreed camping and dates", () => {
    assert.equal(STAY.location, "Ingemans Camping, Truckvägen 1, Sölvesborg");
    assert.equal(STAY.checkIn, "Tisdag 8 juni 2027, från kvällen");
    assert.equal(STAY.checkOut, "Söndag 13 juni 2027, senast kl. 12.00");
    assert.equal(STAY.nights, 5);
  });
});
 describe("previous version compatibility", () => {
  test("v2 bookings retain 850 kr guest and electricity rates", () => {
    const q = calculateBooking("medium", 2, ["electricity", "towel"], LEGACY_PRICING_VERSION);
    assert.equal(q.extraGuestPrice, 850);
    assert.equal(q.addOns[0].unitPrice, 850);
    assert.equal(q.totalPrice, 9800);
    assert.equal(savedDeposit(q), 1960);
  });
  test("unknown pricing versions are rejected", () => {
    assert.throws(() => calculateBooking("medium", 1, [], "unknown"));
  });
});
