import type { ShopReadiness } from './shop-readiness';

export interface ShopReadinessResponse {
  code: string;
  message: string;
  data: ShopReadiness;
}
