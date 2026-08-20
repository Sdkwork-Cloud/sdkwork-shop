import type { CurrentShopResponse } from './current-shop-response';

export interface ShopsCurrentRetrieveResponse {
  code: 0;
  data: unknown & { item: CurrentShopResponse; };
  /** Server-owned request correlation id. */
  traceId: string;
}
