import type { ShopChannelResponse } from './shop-channel-response';

export interface ShopsCurrentChannelsUpdateResponse {
  code: 0;
  data: unknown & { item: ShopChannelResponse; };
  /** Server-owned request correlation id. */
  traceId: string;
}
