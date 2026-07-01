import type { ShopReadinessResponse } from './shop-readiness-response';

export interface ShopsCurrentReadinessRetrieveResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
