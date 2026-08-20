import type { ShopShippingTemplateResponse } from './shop-shipping-template-response';

export interface ShopsCurrentShippingTemplatesUpdateResponse {
  code: 0;
  data: unknown & { item: ShopShippingTemplateResponse; };
  /** Server-owned request correlation id. */
  traceId: string;
}
