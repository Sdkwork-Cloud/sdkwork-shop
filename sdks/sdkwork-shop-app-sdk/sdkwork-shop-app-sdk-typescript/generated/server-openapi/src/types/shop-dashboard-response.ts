import type { ShopMetricSnapshot } from './shop-metric-snapshot';
import type { ShopSummary } from './shop-summary';

export interface ShopDashboardResponse {
  code: string;
  message: string;
  data: { shop: ShopSummary; metrics: ShopMetricSnapshot; pendingApplicationCount: number; pendingVerificationCount: number; pendingSettlementAmount: string; currencyCode: string; };
}
