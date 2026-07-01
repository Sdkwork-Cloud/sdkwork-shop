import type { ShopSettlementProfile } from './shop-settlement-profile';

export interface ShopSettlementProfileResponse {
  code: string;
  message: string;
  data: ShopSettlementProfile;
}
