import type { ShopCategoryBindingResponse } from './shop-category-binding-response';

export interface ShopsCurrentCategoryBindingsUpsertResponse {
  code: 0;
  data: unknown & Record<string, unknown>;
  /** Server-owned request correlation id. */
  traceId: string;
}
