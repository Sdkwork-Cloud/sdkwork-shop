import type { ShopBrandAuthorization } from './shop-brand-authorization';

export interface ShopBrandAuthorizationResponse {
  code: string;
  message: string;
  data: ShopBrandAuthorization;
}
