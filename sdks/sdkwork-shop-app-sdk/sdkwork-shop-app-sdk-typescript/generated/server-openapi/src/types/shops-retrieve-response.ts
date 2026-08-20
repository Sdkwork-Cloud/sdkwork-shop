import type { ShopDetailResponse } from './shop-detail-response';

export interface ShopsRetrieveResponse {
  code: 0;
  data: unknown & { item: ShopDetailResponse; };
  /** Server-owned request correlation id. */
  traceId: string;
}
