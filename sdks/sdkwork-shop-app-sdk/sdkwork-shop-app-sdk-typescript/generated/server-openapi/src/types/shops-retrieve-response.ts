import type { ShopDetailResponse } from './shop-detail-response';

export interface ShopsRetrieveResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
