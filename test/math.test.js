import assert from "node:assert/strict";
import test from "node:test";

import { add } from "../src/math.js";

test("add returns sum", () => {
  assert.equal(add(1, 2), 3);
});
