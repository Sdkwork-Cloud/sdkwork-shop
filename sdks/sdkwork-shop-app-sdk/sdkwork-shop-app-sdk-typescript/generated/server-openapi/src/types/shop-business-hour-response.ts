import type { ShopBusinessHour } from './shop-business-hour';

export interface ShopBusinessHourResponse {
  code: string;
  message: string;
  data: ShopBusinessHour;
}
