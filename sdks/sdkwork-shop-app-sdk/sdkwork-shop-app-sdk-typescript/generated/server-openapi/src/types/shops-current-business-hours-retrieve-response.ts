import type { ShopBusinessHourResponse } from './shop-business-hour-response';

export interface ShopsCurrentBusinessHoursRetrieveResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
