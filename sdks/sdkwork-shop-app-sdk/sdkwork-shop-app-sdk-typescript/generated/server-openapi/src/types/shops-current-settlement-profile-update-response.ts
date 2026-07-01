import type { ShopSettlementProfileResponse } from './shop-settlement-profile-response';

export interface ShopsCurrentSettlementProfileUpdateResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
