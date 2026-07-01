import type { ShopDetail } from './shop-detail';

export interface ShopDetailResponse {
  code: string;
  message: string;
  data: ShopDetail;
}
