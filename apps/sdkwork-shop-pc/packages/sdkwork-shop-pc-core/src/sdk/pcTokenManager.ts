import { readPcReactRuntimeSession } from '@sdkwork/core-pc-react';
import { createTokenManager, type AuthTokenManager } from '@sdkwork/sdk-common';

let shopPcTokenManager: AuthTokenManager | null = null;

export function readOptionalBearerToken(value: string | undefined): string | undefined {
  if (!value?.trim()) {
    return undefined;
  }
  const normalized = value.trim().replace(/^Bearer\s+/iu, '').trim();
  return normalized.length > 0 ? normalized : undefined;
}

export function syncShopPcTokenManagerFromRuntimeSession(manager: AuthTokenManager): void {
  const session = readPcReactRuntimeSession();
  const authToken = readOptionalBearerToken(session.authToken);
  const accessToken = readOptionalBearerToken(session.accessToken);
  if (authToken || accessToken) {
    manager.setTokens({
      ...(authToken ? { authToken } : {}),
      ...(accessToken ? { accessToken } : {}),
      ...(session.refreshToken ? { refreshToken: session.refreshToken } : {}),
    });
    return;
  }
  manager.clearTokens();
}

export function getShopPcTokenManager(): AuthTokenManager {
  if (!shopPcTokenManager) {
    shopPcTokenManager = createTokenManager();
  }
  syncShopPcTokenManagerFromRuntimeSession(shopPcTokenManager);
  return shopPcTokenManager;
}

export function resetShopPcTokenManager(): void {
  shopPcTokenManager = null;
}
