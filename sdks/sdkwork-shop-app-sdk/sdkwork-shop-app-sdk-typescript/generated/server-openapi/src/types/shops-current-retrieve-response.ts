import type { CurrentShopResponse } from './current-shop-response';

export interface ShopsCurrentRetrieveResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
