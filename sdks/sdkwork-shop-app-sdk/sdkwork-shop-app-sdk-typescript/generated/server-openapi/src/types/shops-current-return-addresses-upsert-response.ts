import type { ShopReturnAddressResponse } from './shop-return-address-response';

export interface ShopsCurrentReturnAddressesUpsertResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
