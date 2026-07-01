import type { ShopChannelResponse } from './shop-channel-response';

export interface ShopsCurrentChannelsUpdateResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
