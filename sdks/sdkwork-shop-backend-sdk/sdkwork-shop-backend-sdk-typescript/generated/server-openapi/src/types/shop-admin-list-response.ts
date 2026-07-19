import type { PageInfo } from './page-info';

export interface ShopAdminListResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
