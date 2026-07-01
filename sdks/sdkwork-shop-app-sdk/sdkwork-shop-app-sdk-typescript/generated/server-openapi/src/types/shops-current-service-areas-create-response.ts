import type { ShopServiceAreaResponse } from './shop-service-area-response';

export interface ShopsCurrentServiceAreasCreateResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
