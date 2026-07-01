import type { ShopReturnAddress } from './shop-return-address';

export interface ShopReturnAddressResponse {
  code: string;
  message: string;
  data: ShopReturnAddress;
}
