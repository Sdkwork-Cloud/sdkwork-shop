import { formatShopHeadline, normalizeCreateShopInput } from "@sdkwork/shop-service";

import type { CreateShopInput, ShopProfile } from "@sdkwork/shop-contracts";

export function buildShopDraft(input: CreateShopInput): CreateShopInput {
  return normalizeCreateShopInput(input);
}

export function describeShop(profile: ShopProfile): string {
  return formatShopHeadline(profile);
}
