import type { ShopCustomerService } from './shop-customer-service';

export interface ShopCustomerServiceResponse {
  code: string;
  message: string;
  data: ShopCustomerService;
}
