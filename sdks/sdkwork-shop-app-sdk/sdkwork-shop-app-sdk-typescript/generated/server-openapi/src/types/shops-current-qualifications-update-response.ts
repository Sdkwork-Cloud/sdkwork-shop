import type { ShopQualificationResponse } from './shop-qualification-response';

export interface ShopsCurrentQualificationsUpdateResponse {
  code: 0;
  data: unknown & { item: ShopQualificationResponse; };
  /** Server-owned request correlation id. */
  traceId: string;
}
