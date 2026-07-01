import type { ShopFulfillmentProfileResponse } from './shop-fulfillment-profile-response';

export interface ShopsCurrentFulfillmentProfileRetrieveResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
