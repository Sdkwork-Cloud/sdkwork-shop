import type { ShopFulfillmentProfile } from './shop-fulfillment-profile';

export interface ShopFulfillmentProfileResponse {
  code: string;
  message: string;
  data: ShopFulfillmentProfile;
}
