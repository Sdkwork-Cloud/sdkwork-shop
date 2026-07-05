import { readPcReactRuntimeSession } from '@sdkwork/core-pc-react';
import {
  createClient,
  type SdkworkAppClient,
  type SdkworkAppConfig,
} from '@sdkwork/shop-app-sdk';

import { getShopPcTokenManager, readOptionalBearerToken } from './pcTokenManager';
import { resolveCommerceAppSdkBaseUrl } from './sdkBaseUrls';

export type ShopAppSdkClient = SdkworkAppClient;
export type ShopAppSdkClientConfig = SdkworkAppConfig;

let shopAppSdkClient: ShopAppSdkClient | null = null;

export function createShopAppSdkClientConfig(
  session = readPcReactRuntimeSession(),
): ShopAppSdkClientConfig {
  return {
    baseUrl: resolveCommerceAppSdkBaseUrl(),
    authToken: readOptionalBearerToken(session.authToken),
    accessToken: readOptionalBearerToken(session.accessToken),
    platform: 'pc',
  };
}

export function initShopAppSdkClient(
  config: ShopAppSdkClientConfig = createShopAppSdkClientConfig(),
): ShopAppSdkClient {
  const client = createClient(config);
  client.setTokenManager(getShopPcTokenManager());
  shopAppSdkClient = client;
  return shopAppSdkClient;
}

export function getShopAppSdkClient(): ShopAppSdkClient {
  return shopAppSdkClient ?? initShopAppSdkClient();
}

export function getShopAppSdkClientWithSession(
  session = readPcReactRuntimeSession(),
): ShopAppSdkClient {
  return initShopAppSdkClient(createShopAppSdkClientConfig(session));
}

export function resetShopAppSdkClient(): void {
  shopAppSdkClient = null;
}
