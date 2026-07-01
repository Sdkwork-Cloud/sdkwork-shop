import type { ShopFulfillmentProfileResponse } from './shop-fulfillment-profile-response';

export interface ShopsCurrentFulfillmentProfileUpdateResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
