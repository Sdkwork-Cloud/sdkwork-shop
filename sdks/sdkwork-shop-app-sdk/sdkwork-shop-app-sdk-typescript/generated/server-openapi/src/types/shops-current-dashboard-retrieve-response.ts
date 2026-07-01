import type { ShopDashboardResponse } from './shop-dashboard-response';

export interface ShopsCurrentDashboardRetrieveResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
