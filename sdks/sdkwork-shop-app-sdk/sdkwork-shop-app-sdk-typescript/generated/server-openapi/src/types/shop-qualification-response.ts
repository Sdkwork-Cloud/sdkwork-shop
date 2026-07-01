import type { ShopQualification } from './shop-qualification';

export interface ShopQualificationResponse {
  code: string;
  message: string;
  data: ShopQualification;
}
