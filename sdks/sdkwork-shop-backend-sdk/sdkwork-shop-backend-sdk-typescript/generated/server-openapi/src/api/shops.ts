import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';

import type { PageInfo } from '../types';


export class ShopsShopsAdminApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** List shops for operator review */
  async list(): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>(backendApiPath(`/shops`));
  }
}

export class ShopsShopsApi {
  private client: HttpClient;
  public readonly admin: ShopsShopsAdminApi;

  constructor(client: HttpClient) {
    this.client = client;
    this.admin = new ShopsShopsAdminApi(client);
  }

}

export class ShopsApi {
  private client: HttpClient;
  public readonly shops: ShopsShopsApi;

  constructor(client: HttpClient) {
    this.client = client;
    this.shops = new ShopsShopsApi(client);
  }

}

export function createShopsApi(client: HttpClient): ShopsApi {
  return new ShopsApi(client);
}

function appendQueryString(path: string, rawQueryString: string): string {
  const query = rawQueryString.replace(/^\?+/, '');
  if (!query) {
    return path;
  }
  return path.includes('?') ? `${path}&${query}` : `${path}?${query}`;
}
