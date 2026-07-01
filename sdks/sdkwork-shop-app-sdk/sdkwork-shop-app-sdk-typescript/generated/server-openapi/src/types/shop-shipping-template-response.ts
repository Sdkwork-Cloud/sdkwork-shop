import type { ShopShippingTemplate } from './shop-shipping-template';

export interface ShopShippingTemplateResponse {
  code: string;
  message: string;
  data: ShopShippingTemplate;
}
