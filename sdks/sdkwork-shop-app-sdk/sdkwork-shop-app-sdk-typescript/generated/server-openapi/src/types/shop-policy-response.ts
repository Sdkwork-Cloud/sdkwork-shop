import type { ShopPolicy } from './shop-policy';

export interface ShopPolicyResponse {
  code: string;
  message: string;
  data: ShopPolicy;
}
