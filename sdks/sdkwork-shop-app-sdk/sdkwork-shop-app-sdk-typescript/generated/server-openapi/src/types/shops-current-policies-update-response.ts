import type { ShopPolicyResponse } from './shop-policy-response';

export interface ShopsCurrentPoliciesUpdateResponse {
  code: 0;
  data: unknown & { item: ShopPolicyResponse; };
  /** Server-owned request correlation id. */
  traceId: string;
}
