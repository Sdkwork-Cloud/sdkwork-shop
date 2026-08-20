import { appApiPath } from './paths';
import type { ApiRequestOptions, HttpClient } from '../http/client';

import type { CommerceOperationCommand, CreateShopServiceAreaRequest, CurrentShopResponse, SdkWorkPageData, ShopApplicationResponse, ShopBrandAuthorizationResponse, ShopBusinessHourResponse, ShopCategoryBindingResponse, ShopChannelResponse, ShopCustomerServiceResponse, ShopDashboardResponse, ShopDepositAccountResponse, ShopDetailResponse, ShopFulfillmentProfileResponse, ShopPolicyResponse, ShopQualificationResponse, ShopReadinessResponse, ShopReturnAddressResponse, ShopServiceAreaResponse, ShopSettlementProfileResponse, ShopShippingTemplateResponse, SubmitShopApplicationRequest, UpdateShopBusinessHourRequest, UpdateShopChannelRequest, UpdateShopFulfillmentProfileRequest, UpdateShopPolicyRequest, UpdateShopServiceAreaRequest, UpdateShopSettlementProfileRequest, UpsertShopBrandAuthorizationRequest, UpsertShopCategoryBindingRequest, UpsertShopCustomerServiceRequest, UpsertShopQualificationRequest, UpsertShopReturnAddressRequest, UpsertShopShippingTemplateRequest } from '../types';


export interface ShopsCurrentSettlementsListParams {
  status?: string;
  page?: number;
  pageSize?: number;
}

export class ShopsCurrentSettlementsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current settlements list. */
  async list(params?: ShopsCurrentSettlementsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'status', value: params?.status, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/settlements`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }
}

export class ShopsCurrentOrdersFulfillmentsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current orders fulfillments create. */
  async create(orderId: string, body: CommerceOperationCommand, requestOptions?: ApiRequestOptions): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>(appApiPath(`/shops/current/orders/${serializePathParameter(orderId, { name: 'orderId', style: 'simple', explode: false })}/fulfillments`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'POST' as any, body, contentType: 'application/json', sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentOrdersListParams {
  status?: string;
  page?: number;
  pageSize?: number;
}

export class ShopsCurrentOrdersApi {
  private client: HttpClient;
  public readonly fulfillments: ShopsCurrentOrdersFulfillmentsApi;

  constructor(client: HttpClient) {
    this.client = client;
    this.fulfillments = new ShopsCurrentOrdersFulfillmentsApi(client);
  }


/** Shops current orders list. */
  async list(params?: ShopsCurrentOrdersListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'status', value: params?.status, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/orders`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current orders retrieve. */
  async retrieve(orderId: string, requestOptions?: ApiRequestOptions): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>(appApiPath(`/shops/current/orders/${serializePathParameter(orderId, { name: 'orderId', style: 'simple', explode: false })}`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentProductsListParams {
  q?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export class ShopsCurrentProductsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current products list. */
  async list(params?: ShopsCurrentProductsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'q', value: params?.q, style: 'form', explode: true, allowReserved: false },
      { name: 'status', value: params?.status, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/products`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current products create. */
  async create(body: CommerceOperationCommand, requestOptions?: ApiRequestOptions): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>(appApiPath(`/shops/current/products`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'POST' as any, body, contentType: 'application/json', sdkworkUnwrapKind: 'item' });
  }

/** Shops current products update. */
  async update(productId: string, body?: CommerceOperationCommand, requestOptions?: ApiRequestOptions): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>(appApiPath(`/shops/current/products/${serializePathParameter(productId, { name: 'productId', style: 'simple', explode: false })}`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PATCH' as any, ...(body !== undefined ? { body, contentType: 'application/json' } : {}), sdkworkUnwrapKind: 'item' });
  }

/** Shops current products publish. */
  async publish(productId: string, body: CommerceOperationCommand, requestOptions?: ApiRequestOptions): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>(appApiPath(`/shops/current/products/${serializePathParameter(productId, { name: 'productId', style: 'simple', explode: false })}/publish`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'POST' as any, body, contentType: 'application/json', sdkworkUnwrapKind: 'item' });
  }

/** Shops current products unpublish. */
  async unpublish(productId: string, body: CommerceOperationCommand, requestOptions?: ApiRequestOptions): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>(appApiPath(`/shops/current/products/${serializePathParameter(productId, { name: 'productId', style: 'simple', explode: false })}/unpublish`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'POST' as any, body, contentType: 'application/json', sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentRiskSignalsListParams {
  signalType?: string;
  riskLevel?: string;
  signalStatus?: string;
  page?: number;
  pageSize?: number;
}

export class ShopsCurrentRiskSignalsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current risk Signals list. */
  async list(params?: ShopsCurrentRiskSignalsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'signal_type', value: params?.signalType, style: 'form', explode: true, allowReserved: false },
      { name: 'risk_level', value: params?.riskLevel, style: 'form', explode: true, allowReserved: false },
      { name: 'signal_status', value: params?.signalStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/risk_signals`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }
}

export class ShopsCurrentDepositAccountApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current deposit Account retrieve. */
  async retrieve(requestOptions?: ApiRequestOptions): Promise<ShopDepositAccountResponse> {
    return this.client.request<ShopDepositAccountResponse>(appApiPath(`/shops/current/deposit_account`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentPoliciesListParams {
  policyType?: string;
  policyStatus?: string;
  page?: number;
  pageSize?: number;
}

export interface ShopsCurrentPoliciesUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentPoliciesApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current policies list. */
  async list(params?: ShopsCurrentPoliciesListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'policy_type', value: params?.policyType, style: 'form', explode: true, allowReserved: false },
      { name: 'policy_status', value: params?.policyStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/policies`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current policies update. */
  async update(policyId: string, body: UpdateShopPolicyRequest, params: ShopsCurrentPoliciesUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopPolicyResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopPolicyResponse>(appApiPath(`/shops/current/policies/${serializePathParameter(policyId, { name: 'policyId', style: 'simple', explode: false })}`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PATCH' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentServiceAreasListParams {
  areaType?: string;
  regionCode?: string;
  serviceStatus?: string;
  page?: number;
  pageSize?: number;
}

export interface ShopsCurrentServiceAreasCreateParams {
  idempotencyKey: string;
}

export interface ShopsCurrentServiceAreasUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentServiceAreasApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current service Areas list. */
  async list(params?: ShopsCurrentServiceAreasListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'area_type', value: params?.areaType, style: 'form', explode: true, allowReserved: false },
      { name: 'region_code', value: params?.regionCode, style: 'form', explode: true, allowReserved: false },
      { name: 'service_status', value: params?.serviceStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/service_areas`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current service Areas create. */
  async create(body: CreateShopServiceAreaRequest, params: ShopsCurrentServiceAreasCreateParams, requestOptions?: ApiRequestOptions): Promise<ShopServiceAreaResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopServiceAreaResponse>(appApiPath(`/shops/current/service_areas`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'POST' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }

/** Shops current service Areas update. */
  async update(serviceAreaId: string, body: UpdateShopServiceAreaRequest, params: ShopsCurrentServiceAreasUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopServiceAreaResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopServiceAreaResponse>(appApiPath(`/shops/current/service_areas/${serializePathParameter(serviceAreaId, { name: 'serviceAreaId', style: 'simple', explode: false })}`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PATCH' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentBusinessHoursUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentBusinessHoursApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current business Hours retrieve. */
  async retrieve(requestOptions?: ApiRequestOptions): Promise<ShopBusinessHourResponse> {
    return this.client.request<ShopBusinessHourResponse>(appApiPath(`/shops/current/business_hours`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'item' });
  }

/** Shops current business Hours update. */
  async update(body: UpdateShopBusinessHourRequest, params: ShopsCurrentBusinessHoursUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopBusinessHourResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopBusinessHourResponse>(appApiPath(`/shops/current/business_hours`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PATCH' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentSettlementProfileUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentSettlementProfileApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current settlement Profile retrieve. */
  async retrieve(requestOptions?: ApiRequestOptions): Promise<ShopSettlementProfileResponse> {
    return this.client.request<ShopSettlementProfileResponse>(appApiPath(`/shops/current/settlement_profile`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'item' });
  }

/** Shops current settlement Profile update. */
  async update(body: UpdateShopSettlementProfileRequest, params: ShopsCurrentSettlementProfileUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopSettlementProfileResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopSettlementProfileResponse>(appApiPath(`/shops/current/settlement_profile`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PATCH' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentFulfillmentProfileUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentFulfillmentProfileApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current fulfillment Profile retrieve. */
  async retrieve(requestOptions?: ApiRequestOptions): Promise<ShopFulfillmentProfileResponse> {
    return this.client.request<ShopFulfillmentProfileResponse>(appApiPath(`/shops/current/fulfillment_profile`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'item' });
  }

/** Shops current fulfillment Profile update. */
  async update(body: UpdateShopFulfillmentProfileRequest, params: ShopsCurrentFulfillmentProfileUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopFulfillmentProfileResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopFulfillmentProfileResponse>(appApiPath(`/shops/current/fulfillment_profile`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PATCH' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentChannelsListParams {
  channelCode?: string;
  storefrontStatus?: string;
  page?: number;
  pageSize?: number;
}

export interface ShopsCurrentChannelsUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentChannelsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current channels list. */
  async list(params?: ShopsCurrentChannelsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'channel_code', value: params?.channelCode, style: 'form', explode: true, allowReserved: false },
      { name: 'storefront_status', value: params?.storefrontStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/channels`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current channels update. */
  async update(channelId: string, body: UpdateShopChannelRequest, params: ShopsCurrentChannelsUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopChannelResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopChannelResponse>(appApiPath(`/shops/current/channels/${serializePathParameter(channelId, { name: 'channelId', style: 'simple', explode: false })}`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PATCH' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentStatusEventsListParams {
  eventType?: string;
  page?: number;
  pageSize?: number;
}

export class ShopsCurrentStatusEventsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current status Events list. */
  async list(params?: ShopsCurrentStatusEventsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'event_type', value: params?.eventType, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/status_events`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }
}

export interface ShopsCurrentVerificationsListParams {
  verificationType?: string;
  verificationStatus?: string;
  page?: number;
  pageSize?: number;
}

export class ShopsCurrentVerificationsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current verifications list. */
  async list(params?: ShopsCurrentVerificationsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'verification_type', value: params?.verificationType, style: 'form', explode: true, allowReserved: false },
      { name: 'verification_status', value: params?.verificationStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/verifications`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }
}

export interface ShopsCurrentApplicationsListParams {
  status?: string;
  page?: number;
  pageSize?: number;
}

export interface ShopsCurrentApplicationsCreateParams {
  idempotencyKey: string;
}

export class ShopsCurrentApplicationsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current applications list. */
  async list(params?: ShopsCurrentApplicationsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'status', value: params?.status, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/applications`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current applications create. */
  async create(body: SubmitShopApplicationRequest, params: ShopsCurrentApplicationsCreateParams, requestOptions?: ApiRequestOptions): Promise<ShopApplicationResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopApplicationResponse>(appApiPath(`/shops/current/applications`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'POST' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentShippingTemplatesListParams {
  templateStatus?: string;
  deliveryMethod?: string;
  isDefault?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ShopsCurrentShippingTemplatesUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentShippingTemplatesApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current shipping Templates list. */
  async list(params?: ShopsCurrentShippingTemplatesListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'template_status', value: params?.templateStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'delivery_method', value: params?.deliveryMethod, style: 'form', explode: true, allowReserved: false },
      { name: 'is_default', value: params?.isDefault, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/shipping_templates`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current shipping Templates upsert. */
  async update(body: UpsertShopShippingTemplateRequest, params: ShopsCurrentShippingTemplatesUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopShippingTemplateResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopShippingTemplateResponse>(appApiPath(`/shops/current/shipping_templates`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PUT' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentReturnAddressesListParams {
  addressUsage?: string;
  addressStatus?: string;
  isDefault?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ShopsCurrentReturnAddressesUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentReturnAddressesApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current return Addresses list. */
  async list(params?: ShopsCurrentReturnAddressesListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'address_usage', value: params?.addressUsage, style: 'form', explode: true, allowReserved: false },
      { name: 'address_status', value: params?.addressStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'is_default', value: params?.isDefault, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/return_addresses`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current return Addresses upsert. */
  async update(body: UpsertShopReturnAddressRequest, params: ShopsCurrentReturnAddressesUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopReturnAddressResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopReturnAddressResponse>(appApiPath(`/shops/current/return_addresses`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PUT' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentCustomerServicesListParams {
  serviceChannel?: string;
  serviceStatus?: string;
  isDefault?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ShopsCurrentCustomerServicesUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentCustomerServicesApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current customer Services list. */
  async list(params?: ShopsCurrentCustomerServicesListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'service_channel', value: params?.serviceChannel, style: 'form', explode: true, allowReserved: false },
      { name: 'service_status', value: params?.serviceStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'is_default', value: params?.isDefault, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/customer_services`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current customer Services upsert. */
  async update(body: UpsertShopCustomerServiceRequest, params: ShopsCurrentCustomerServicesUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopCustomerServiceResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopCustomerServiceResponse>(appApiPath(`/shops/current/customer_services`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PUT' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentQualificationsListParams {
  qualificationType?: string;
  subjectType?: string;
  subjectId?: string;
  qualificationStatus?: string;
  page?: number;
  pageSize?: number;
}

export interface ShopsCurrentQualificationsUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentQualificationsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current qualifications list. */
  async list(params?: ShopsCurrentQualificationsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'qualification_type', value: params?.qualificationType, style: 'form', explode: true, allowReserved: false },
      { name: 'subject_type', value: params?.subjectType, style: 'form', explode: true, allowReserved: false },
      { name: 'subject_id', value: params?.subjectId, style: 'form', explode: true, allowReserved: false },
      { name: 'qualification_status', value: params?.qualificationStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/qualifications`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current qualifications upsert. */
  async update(body: UpsertShopQualificationRequest, params: ShopsCurrentQualificationsUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopQualificationResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopQualificationResponse>(appApiPath(`/shops/current/qualifications`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PUT' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentBrandAuthorizationsListParams {
  brandCode?: string;
  authorizationStatus?: string;
  page?: number;
  pageSize?: number;
}

export interface ShopsCurrentBrandAuthorizationsUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentBrandAuthorizationsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current brand Authorizations list. */
  async list(params?: ShopsCurrentBrandAuthorizationsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'brand_code', value: params?.brandCode, style: 'form', explode: true, allowReserved: false },
      { name: 'authorization_status', value: params?.authorizationStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/brand_authorizations`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current brand Authorizations upsert. */
  async update(body: UpsertShopBrandAuthorizationRequest, params: ShopsCurrentBrandAuthorizationsUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopBrandAuthorizationResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopBrandAuthorizationResponse>(appApiPath(`/shops/current/brand_authorizations`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PUT' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsCurrentCategoryBindingsListParams {
  shopCategoryCode?: string;
  platformCategoryCode?: string;
  categoryStatus?: string;
  reviewStatus?: string;
  page?: number;
  pageSize?: number;
}

export interface ShopsCurrentCategoryBindingsUpdateParams {
  idempotencyKey: string;
}

export class ShopsCurrentCategoryBindingsApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current category Bindings list. */
  async list(params?: ShopsCurrentCategoryBindingsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'shop_category_code', value: params?.shopCategoryCode, style: 'form', explode: true, allowReserved: false },
      { name: 'platform_category_code', value: params?.platformCategoryCode, style: 'form', explode: true, allowReserved: false },
      { name: 'category_status', value: params?.categoryStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'review_status', value: params?.reviewStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops/current/category_bindings`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops current category Bindings upsert. */
  async update(body: UpsertShopCategoryBindingRequest, params: ShopsCurrentCategoryBindingsUpdateParams, requestOptions?: ApiRequestOptions): Promise<ShopCategoryBindingResponse> {
    const requestHeaders = buildRequestHeaders(
      {
        'Idempotency-Key': { value: params.idempotencyKey, style: 'simple', explode: false },
      },
      {}
    );
    return this.client.request<ShopCategoryBindingResponse>(appApiPath(`/shops/current/category_bindings`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'PUT' as any, body, contentType: 'application/json', ...(requestHeaders !== undefined ? { headers: requestHeaders } : {}), sdkworkUnwrapKind: 'item' });
  }
}

export class ShopsCurrentReadinessApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current readiness retrieve. */
  async retrieve(requestOptions?: ApiRequestOptions): Promise<ShopReadinessResponse> {
    return this.client.request<ShopReadinessResponse>(appApiPath(`/shops/current/readiness`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'item' });
  }
}

export class ShopsCurrentDashboardApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


/** Shops current dashboard retrieve. */
  async retrieve(requestOptions?: ApiRequestOptions): Promise<ShopDashboardResponse> {
    return this.client.request<ShopDashboardResponse>(appApiPath(`/shops/current/dashboard`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'item' });
  }
}

export class ShopsCurrentApi {
  private client: HttpClient;
  public readonly dashboard: ShopsCurrentDashboardApi;
  public readonly readiness: ShopsCurrentReadinessApi;
  public readonly categoryBindings: ShopsCurrentCategoryBindingsApi;
  public readonly brandAuthorizations: ShopsCurrentBrandAuthorizationsApi;
  public readonly qualifications: ShopsCurrentQualificationsApi;
  public readonly customerServices: ShopsCurrentCustomerServicesApi;
  public readonly returnAddresses: ShopsCurrentReturnAddressesApi;
  public readonly shippingTemplates: ShopsCurrentShippingTemplatesApi;
  public readonly applications: ShopsCurrentApplicationsApi;
  public readonly verifications: ShopsCurrentVerificationsApi;
  public readonly statusEvents: ShopsCurrentStatusEventsApi;
  public readonly channels: ShopsCurrentChannelsApi;
  public readonly fulfillmentProfile: ShopsCurrentFulfillmentProfileApi;
  public readonly settlementProfile: ShopsCurrentSettlementProfileApi;
  public readonly businessHours: ShopsCurrentBusinessHoursApi;
  public readonly serviceAreas: ShopsCurrentServiceAreasApi;
  public readonly policies: ShopsCurrentPoliciesApi;
  public readonly depositAccount: ShopsCurrentDepositAccountApi;
  public readonly riskSignals: ShopsCurrentRiskSignalsApi;
  public readonly products: ShopsCurrentProductsApi;
  public readonly orders: ShopsCurrentOrdersApi;
  public readonly settlements: ShopsCurrentSettlementsApi;

  constructor(client: HttpClient) {
    this.client = client;
    this.dashboard = new ShopsCurrentDashboardApi(client);
    this.readiness = new ShopsCurrentReadinessApi(client);
    this.categoryBindings = new ShopsCurrentCategoryBindingsApi(client);
    this.brandAuthorizations = new ShopsCurrentBrandAuthorizationsApi(client);
    this.qualifications = new ShopsCurrentQualificationsApi(client);
    this.customerServices = new ShopsCurrentCustomerServicesApi(client);
    this.returnAddresses = new ShopsCurrentReturnAddressesApi(client);
    this.shippingTemplates = new ShopsCurrentShippingTemplatesApi(client);
    this.applications = new ShopsCurrentApplicationsApi(client);
    this.verifications = new ShopsCurrentVerificationsApi(client);
    this.statusEvents = new ShopsCurrentStatusEventsApi(client);
    this.channels = new ShopsCurrentChannelsApi(client);
    this.fulfillmentProfile = new ShopsCurrentFulfillmentProfileApi(client);
    this.settlementProfile = new ShopsCurrentSettlementProfileApi(client);
    this.businessHours = new ShopsCurrentBusinessHoursApi(client);
    this.serviceAreas = new ShopsCurrentServiceAreasApi(client);
    this.policies = new ShopsCurrentPoliciesApi(client);
    this.depositAccount = new ShopsCurrentDepositAccountApi(client);
    this.riskSignals = new ShopsCurrentRiskSignalsApi(client);
    this.products = new ShopsCurrentProductsApi(client);
    this.orders = new ShopsCurrentOrdersApi(client);
    this.settlements = new ShopsCurrentSettlementsApi(client);
  }


/** Shops current retrieve. */
  async retrieve(requestOptions?: ApiRequestOptions): Promise<CurrentShopResponse> {
    return this.client.request<CurrentShopResponse>(appApiPath(`/shops/current`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'item' });
  }
}

export interface ShopsListParams {
  q?: string;
  shopType?: string;
  operationStatus?: string;
  page?: number;
  pageSize?: number;
}

export class ShopsApi {
  private client: HttpClient;
  public readonly current: ShopsCurrentApi;

  constructor(client: HttpClient) {
    this.client = client;
    this.current = new ShopsCurrentApi(client);
  }


/** Shops list. */
  async list(params?: ShopsListParams, requestOptions?: ApiRequestOptions): Promise<SdkWorkPageData> {
    const query = buildQueryString([
      { name: 'q', value: params?.q, style: 'form', explode: true, allowReserved: false },
      { name: 'shop_type', value: params?.shopType, style: 'form', explode: true, allowReserved: false },
      { name: 'operation_status', value: params?.operationStatus, style: 'form', explode: true, allowReserved: false },
      { name: 'page', value: params?.page, style: 'form', explode: true, allowReserved: false },
      { name: 'page_size', value: params?.pageSize, style: 'form', explode: true, allowReserved: false },
    ]);
    return this.client.request<SdkWorkPageData>(appendQueryString(appApiPath(`/shops`), query), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'page' });
  }

/** Shops retrieve. */
  async retrieve(shopId: string, requestOptions?: ApiRequestOptions): Promise<ShopDetailResponse> {
    return this.client.request<ShopDetailResponse>(appApiPath(`/shops/${serializePathParameter(shopId, { name: 'shopId', style: 'simple', explode: false })}`), { ...(requestOptions?.signal !== undefined ? { signal: requestOptions.signal } : {}), ...(requestOptions?.timeout !== undefined ? { timeout: requestOptions.timeout } : {}), method: 'GET' as any, sdkworkUnwrapKind: 'item' });
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

interface PathParameterSpec {
  name: string;
  style: string;
  explode: boolean;
}

function serializePathParameter(value: unknown, spec: PathParameterSpec): string {
  if (value === undefined || value === null) {
    return '';
  }

  const style = spec.style || 'simple';
  if (Array.isArray(value)) {
    return serializePathArray(spec.name, value, style, spec.explode);
  }
  if (typeof value === 'object') {
    return serializePathObject(spec.name, value as Record<string, unknown>, style, spec.explode);
  }
  return pathPrefix(spec.name, style, false) + encodePathValue(serializePathPrimitive(value));
}

function serializePathArray(name: string, values: unknown[], style: string, explode: boolean): string {
  const serialized = values
    .filter((item) => item !== undefined && item !== null)
    .map((item) => encodePathValue(serializePathPrimitive(item)));
  if (serialized.length === 0) {
    return pathPrefix(name, style, false);
  }
  if (style === 'matrix') {
    return explode
      ? serialized.map((item) => `;${name}=${item}`).join('')
      : `;${name}=${serialized.join(',')}`;
  }
  return pathPrefix(name, style, false) + serialized.join(explode ? '.' : ',');
}

function serializePathObject(name: string, value: Record<string, unknown>, style: string, explode: boolean): string {
  const entries = Object.entries(value).filter(([, entryValue]) => entryValue !== undefined && entryValue !== null);
  if (entries.length === 0) {
    return pathPrefix(name, style, true);
  }
  if (style === 'matrix') {
    return explode
      ? entries.map(([key, entryValue]) => `;${encodePathValue(key)}=${encodePathValue(serializePathPrimitive(entryValue))}`).join('')
      : `;${name}=${entries.flatMap(([key, entryValue]) => [encodePathValue(key), encodePathValue(serializePathPrimitive(entryValue))]).join(',')}`;
  }
  const serialized = explode
    ? entries.map(([key, entryValue]) => `${encodePathValue(key)}=${encodePathValue(serializePathPrimitive(entryValue))}`).join(style === 'label' ? '.' : ',')
    : entries.flatMap(([key, entryValue]) => [encodePathValue(key), encodePathValue(serializePathPrimitive(entryValue))]).join(',');
  return pathPrefix(name, style, true) + serialized;
}

function pathPrefix(name: string, style: string, _objectValue: boolean): string {
  if (style === 'label') return '.';
  if (style === 'matrix') return `;${name}`;
  return '';
}

function encodePathValue(value: string): string {
  return encodeURIComponent(value);
}

function serializePathPrimitive(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}
interface QueryParameterSpec {
  name: string;
  value: unknown;
  style: string;
  explode: boolean;
  allowReserved: boolean;
  contentType?: string;
}

function buildQueryString(parameters: QueryParameterSpec[]): string {
  const pairs: string[] = [];
  for (const parameter of parameters) {
    appendSerializedParameter(pairs, parameter);
  }
  return pairs.join('&');
}

function appendSerializedParameter(pairs: string[], parameter: QueryParameterSpec): void {
  if (parameter.value === undefined || parameter.value === null) {
    return;
  }

  if (parameter.contentType) {
    pairs.push(`${encodeQueryComponent(parameter.name)}=${encodeQueryValue(JSON.stringify(parameter.value), parameter.allowReserved)}`);
    return;
  }

  const style = parameter.style || 'form';
  if (style === 'deepObject') {
    appendDeepObjectParameter(pairs, parameter.name, parameter.value, parameter.allowReserved);
    return;
  }

  if (Array.isArray(parameter.value)) {
    appendArrayParameter(pairs, parameter.name, parameter.value, style, parameter.explode, parameter.allowReserved);
    return;
  }

  if (typeof parameter.value === 'object') {
    appendObjectParameter(pairs, parameter.name, parameter.value as Record<string, unknown>, style, parameter.explode, parameter.allowReserved);
    return;
  }

  pairs.push(`${encodeQueryComponent(parameter.name)}=${encodeQueryValue(serializePrimitive(parameter.value), parameter.allowReserved)}`);
}

function appendArrayParameter(
  pairs: string[],
  name: string,
  value: unknown[],
  style: string,
  explode: boolean,
  allowReserved: boolean,
): void {
  const values = value
    .filter((item) => item !== undefined && item !== null)
    .map((item) => serializePrimitive(item));
  if (values.length === 0) {
    return;
  }

  if (style === 'form' && explode) {
    for (const item of values) {
      pairs.push(`${encodeQueryComponent(name)}=${encodeQueryValue(item, allowReserved)}`);
    }
    return;
  }

  pairs.push(`${encodeQueryComponent(name)}=${encodeQueryValue(values.join(','), allowReserved)}`);
}

function appendObjectParameter(
  pairs: string[],
  name: string,
  value: Record<string, unknown>,
  style: string,
  explode: boolean,
  allowReserved: boolean,
): void {
  const entries = Object.entries(value).filter(([, entryValue]) => entryValue !== undefined && entryValue !== null);
  if (entries.length === 0) {
    return;
  }

  if (style === 'form' && explode) {
    for (const [key, entryValue] of entries) {
      pairs.push(`${encodeQueryComponent(key)}=${encodeQueryValue(serializePrimitive(entryValue), allowReserved)}`);
    }
    return;
  }

  const serialized = entries.flatMap(([key, entryValue]) => [key, serializePrimitive(entryValue)]).join(',');
  pairs.push(`${encodeQueryComponent(name)}=${encodeQueryValue(serialized, allowReserved)}`);
}

function appendDeepObjectParameter(
  pairs: string[],
  name: string,
  value: unknown,
  allowReserved: boolean,
): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    pairs.push(`${encodeQueryComponent(name)}=${encodeQueryValue(serializePrimitive(value), allowReserved)}`);
    return;
  }

  for (const [key, entryValue] of Object.entries(value as Record<string, unknown>)) {
    if (entryValue === undefined || entryValue === null) {
      continue;
    }
    pairs.push(`${encodeQueryComponent(`${name}[${key}]`)}=${encodeQueryValue(serializePrimitive(entryValue), allowReserved)}`);
  }
}

function serializePrimitive(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

function encodeQueryComponent(value: string): string {
  return encodeURIComponent(value);
}

function encodeQueryValue(value: string, allowReserved: boolean): string {
  const encoded = encodeURIComponent(value);
  if (!allowReserved) {
    return encoded;
  }
  return encoded.replace(/%3A/gi, ':')
    .replace(/%2F/gi, '/')
    .replace(/%3F/gi, '?')
    .replace(/%23/gi, '#')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
    .replace(/%40/gi, '@')
    .replace(/%21/gi, '!')
    .replace(/%24/gi, '$')
    .replace(/%26/gi, '&')
    .replace(/%27/gi, "'")
    .replace(/%28/gi, '(')
    .replace(/%29/gi, ')')
    .replace(/%2A/gi, '*')
    .replace(/%2B/gi, '+')
    .replace(/%2C/gi, ',')
    .replace(/%3B/gi, ';')
    .replace(/%3D/gi, '=');
}
function buildRequestHeaders(
  headers: Record<string, HeaderParameterSpec | undefined>,
  cookies: Record<string, HeaderParameterSpec | undefined> = {},
): Record<string, string> | undefined {
  const requestHeaders: Record<string, string> = {};

  for (const [name, parameter] of Object.entries(headers)) {
    const serialized = serializeParameterValue(parameter);
    if (serialized !== undefined) {
      requestHeaders[name] = serialized;
    }
  }

  const cookieHeader = buildCookieHeader(cookies);
  if (cookieHeader) {
    requestHeaders.Cookie = requestHeaders.Cookie
      ? `${requestHeaders.Cookie}; ${cookieHeader}`
      : cookieHeader;
  }

  return Object.keys(requestHeaders).length > 0 ? requestHeaders : undefined;
}

interface HeaderParameterSpec {
  value: unknown;
  style: string;
  explode: boolean;
  contentType?: string;
}

function buildCookieHeader(cookies: Record<string, HeaderParameterSpec | undefined>): string | undefined {
  const pairs: string[] = [];
  for (const [name, parameter] of Object.entries(cookies)) {
    const serialized = serializeParameterValue(parameter);
    if (serialized !== undefined) {
      pairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(serialized)}`);
    }
  }
  return pairs.length > 0 ? pairs.join('; ') : undefined;
}

function serializeParameterValue(parameter: HeaderParameterSpec | undefined): string | undefined {
  const value = parameter?.value;
  if (value === undefined || value === null) {
    return undefined;
  }
  if (parameter?.contentType) {
    return JSON.stringify(value);
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (Array.isArray(value)) {
    return value.map((item) => serializeHeaderPrimitive(item)).join(',');
  }
  if (typeof value === 'object' && value !== null) {
    return serializeHeaderObject(value as Record<string, unknown>, parameter?.explode === true);
  }
  return serializeHeaderPrimitive(value);
}

function serializeHeaderObject(value: Record<string, unknown>, explode: boolean): string {
  const entries = Object.entries(value).filter(([, entryValue]) => entryValue !== undefined && entryValue !== null);
  if (explode) {
    return entries.map(([key, entryValue]) => `${key}=${serializeHeaderPrimitive(entryValue)}`).join(',');
  }
  return entries.flatMap(([key, entryValue]) => [key, serializeHeaderPrimitive(entryValue)]).join(',');
}

function serializeHeaderPrimitive(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}
