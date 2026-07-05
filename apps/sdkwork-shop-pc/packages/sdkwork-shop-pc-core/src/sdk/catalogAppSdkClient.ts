import { readPcReactRuntimeSession } from '@sdkwork/core-pc-react';
import {
  createClient,
  type SdkworkAppClient,
  type SdkworkAppConfig,
} from '@sdkwork/catalog-app-sdk';

import { getShopPcTokenManager, readOptionalBearerToken } from './pcTokenManager';
import { resolveCommerceAppSdkBaseUrl } from './sdkBaseUrls';

export type CatalogAppSdkClient = SdkworkAppClient;
export type CatalogAppSdkClientConfig = SdkworkAppConfig;

let catalogAppSdkClient: CatalogAppSdkClient | null = null;

export function createCatalogAppSdkClientConfig(
  session = readPcReactRuntimeSession(),
): CatalogAppSdkClientConfig {
  return {
    baseUrl: resolveCommerceAppSdkBaseUrl(),
    authToken: readOptionalBearerToken(session.authToken),
    accessToken: readOptionalBearerToken(session.accessToken),
    platform: 'pc',
  };
}

export function initCatalogAppSdkClient(
  config: CatalogAppSdkClientConfig = createCatalogAppSdkClientConfig(),
): CatalogAppSdkClient {
  const client = createClient(config);
  client.setTokenManager(getShopPcTokenManager());
  catalogAppSdkClient = client;
  return catalogAppSdkClient;
}

export function getCatalogAppSdkClient(): CatalogAppSdkClient {
  return catalogAppSdkClient ?? initCatalogAppSdkClient();
}

export function getCatalogAppSdkClientWithSession(
  session = readPcReactRuntimeSession(),
): CatalogAppSdkClient {
  return initCatalogAppSdkClient(createCatalogAppSdkClientConfig(session));
}

export function resetCatalogAppSdkClient(): void {
  catalogAppSdkClient = null;
}
