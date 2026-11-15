/// <reference types="node" />
import { test } from "node:test";
import { strict as assert } from "node:assert";
import { hasElectricityAnswer } from "./booking-selections";

test("electricity must be answered yes or no before continuing", () => {
  assert.equal(hasElectricityAnswer(true, null), false);
  assert.equal(hasElectricityAnswer(true, "yes"), true);
  assert.equal(hasElectricityAnswer(true, "no"), true);
});

test("events without electricity do not require an electricity answer", () => {
  assert.equal(hasElectricityAnswer(false, null), true);
});