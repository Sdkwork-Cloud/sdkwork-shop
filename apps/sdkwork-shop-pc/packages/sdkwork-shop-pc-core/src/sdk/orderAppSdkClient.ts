import { readPcReactRuntimeSession } from '@sdkwork/core-pc-react';
import {
  createClient,
  type SdkworkAppClient,
  type SdkworkAppConfig,
} from '@sdkwork/order-app-sdk';

import { getShopPcTokenManager, readOptionalBearerToken } from './pcTokenManager';
import { resolveCommerceAppSdkBaseUrl } from './sdkBaseUrls';

export type OrderAppSdkClient = SdkworkAppClient;
export type OrderAppSdkClientConfig = SdkworkAppConfig;

let orderAppSdkClient: OrderAppSdkClient | null = null;

export function createOrderAppSdkClientConfig(
  session = readPcReactRuntimeSession(),
): OrderAppSdkClientConfig {
  return {
    baseUrl: resolveCommerceAppSdkBaseUrl(),
    authToken: readOptionalBearerToken(session.authToken),
    accessToken: readOptionalBearerToken(session.accessToken),
    platform: 'pc',
  };
}

export function initOrderAppSdkClient(
  config: OrderAppSdkClientConfig = createOrderAppSdkClientConfig(),
): OrderAppSdkClient {
  const client = createClient(config);
  client.setTokenManager(getShopPcTokenManager());
  orderAppSdkClient = client;
  return orderAppSdkClient;
}

export function getOrderAppSdkClient(): OrderAppSdkClient {
  return orderAppSdkClient ?? initOrderAppSdkClient();
}

export function getOrderAppSdkClientWithSession(
  session = readPcReactRuntimeSession(),
): OrderAppSdkClient {
  return initOrderAppSdkClient(createOrderAppSdkClientConfig(session));
}

export function resetOrderAppSdkClient(): void {
  orderAppSdkClient = null;
}
