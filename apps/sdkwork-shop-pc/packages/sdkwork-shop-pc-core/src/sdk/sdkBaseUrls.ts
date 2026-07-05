const SDKWORK_APP_API_PREFIX = '/app/v3/api';

function readEnvValue(...keys: string[]): string | undefined {
  const meta = import.meta as ImportMeta & {
    env?: Record<string, string | boolean | undefined>;
  };
  for (const key of keys) {
    const value = meta.env?.[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }
  }
  return undefined;
}

function stripAppApiSuffix(pathname: string): string {
  const normalized = pathname.replace(/\/+$/u, '');
  if (!normalized || normalized === SDKWORK_APP_API_PREFIX) {
    return '';
  }
  if (normalized.endsWith(SDKWORK_APP_API_PREFIX)) {
    return normalized.slice(0, -SDKWORK_APP_API_PREFIX.length) || '';
  }
  return normalized;
}

export function resolveCommerceAppSdkBaseUrl(): string {
  const configured = readEnvValue(
    'VITE_SDKWORK_IM_PLATFORM_API_GATEWAY_HTTP_URL',
    'VITE_SDKWORK_IAM_APP_API_BASE_URL',
    'VITE_SDKWORK_SHOP_APP_API_BASE_URL',
    'VITE_SDKWORK_CATALOG_APP_API_BASE_URL',
    'VITE_SDKWORK_ORDER_APP_API_BASE_URL',
  ) ?? 'http://127.0.0.1:8080';

  try {
    const parsed = new URL(configured);
    const normalizedPath = stripAppApiSuffix(parsed.pathname);
    return `${parsed.origin}${normalizedPath}`;
  } catch {
    return configured.replace(/\/app\/v3\/api\/?$/u, '');
  }
}
