import { expect, test } from "bun:test";

test("command: check - 2 + 2", () => {
  expect(2 + 2).toBe(4);
});