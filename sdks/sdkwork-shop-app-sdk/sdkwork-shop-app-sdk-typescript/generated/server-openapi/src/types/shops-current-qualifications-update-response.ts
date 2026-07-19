import type { ShopQualificationResponse } from './shop-qualification-response';

export interface ShopsCurrentQualificationsUpdateResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
