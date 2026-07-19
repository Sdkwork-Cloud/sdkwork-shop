import type { ShopCustomerServiceResponse } from './shop-customer-service-response';

export interface ShopsCurrentCustomerServicesUpdateResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
