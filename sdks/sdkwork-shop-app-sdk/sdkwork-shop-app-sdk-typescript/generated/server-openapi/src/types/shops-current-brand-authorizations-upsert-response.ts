import type { ShopBrandAuthorizationResponse } from './shop-brand-authorization-response';

export interface ShopsCurrentBrandAuthorizationsUpsertResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
