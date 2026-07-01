import type { ShopDetail } from './shop-detail';

export interface CurrentShopResponse {
  code: string;
  message: string;
  data: ShopDetail;
}
