import type { ShopApplication } from './shop-application';

export interface ShopApplicationResponse {
  code: string;
  message: string;
  data: ShopApplication;
}
