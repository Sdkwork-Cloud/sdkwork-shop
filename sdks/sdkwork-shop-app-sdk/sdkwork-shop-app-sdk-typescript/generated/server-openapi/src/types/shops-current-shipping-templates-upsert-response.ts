import type { ShopShippingTemplateResponse } from './shop-shipping-template-response';

export interface ShopsCurrentShippingTemplatesUpsertResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
