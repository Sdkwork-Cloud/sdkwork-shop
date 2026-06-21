import { describe, expect, it } from "vitest";

import { formatShopHeadline, normalizeCreateShopInput } from "../src/index.ts";

describe("shop service helpers", () => {
  it("normalizes slug via sdkwork-utils", () => {
    expect(normalizeCreateShopInput({ name: "Demo Shop", slug: "" })).toEqual({
      name: "Demo Shop",
      slug: "demo-shop",
    });
  });

  it("formats shop headline", () => {
    expect(
      formatShopHeadline({ id: "1", name: "Demo", slug: "demo", status: "draft" }),
    ).toBe("Demo (draft)");
  });
});
