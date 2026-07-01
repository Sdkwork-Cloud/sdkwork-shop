import type { ShopChannel } from './shop-channel';

export interface ShopChannelResponse {
  code: string;
  message: string;
  data: ShopChannel;
}
