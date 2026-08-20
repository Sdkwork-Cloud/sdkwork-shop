import type { ShopBusinessHourResponse } from './shop-business-hour-response';

export interface ShopsCurrentBusinessHoursUpdateResponse {
  code: 0;
  data: unknown & { item: ShopBusinessHourResponse; };
  /** Server-owned request correlation id. */
  traceId: string;
}
