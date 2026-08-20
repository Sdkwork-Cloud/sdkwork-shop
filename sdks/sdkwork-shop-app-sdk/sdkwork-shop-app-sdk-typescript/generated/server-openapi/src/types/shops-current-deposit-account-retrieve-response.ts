import type { ShopDepositAccountResponse } from './shop-deposit-account-response';

export interface ShopsCurrentDepositAccountRetrieveResponse {
  code: 0;
  data: unknown & { item: ShopDepositAccountResponse; };
  /** Server-owned request correlation id. */
  traceId: string;
}
