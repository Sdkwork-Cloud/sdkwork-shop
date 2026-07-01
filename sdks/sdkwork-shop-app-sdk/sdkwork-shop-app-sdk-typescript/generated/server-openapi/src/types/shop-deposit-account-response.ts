import type { ShopDepositAccount } from './shop-deposit-account';

export interface ShopDepositAccountResponse {
  code: string;
  message: string;
  data: ShopDepositAccount;
}
