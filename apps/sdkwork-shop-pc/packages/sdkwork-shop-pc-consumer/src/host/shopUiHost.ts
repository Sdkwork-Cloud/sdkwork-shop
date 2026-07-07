import {
  getShopPcHost,
  type ShopPcToastVariant,
} from '@sdkwork/shop-pc-core';

export interface ShopPcSessionUser {
  phone?: string;
  displayName?: string;
  name?: string;
  nickname?: string;
}

export function shopToast(message: string, variant: ShopPcToastVariant = 'info'): void {
  getShopPcHost().toast(message, variant);
}

export function readShopSessionUser(): ShopPcSessionUser | null {
  return getShopPcHost().readSessionUser?.() ?? null;
}

export async function sendShopAssistantMessage(
  recipientId: string,
  text: string,
  messageType = 'text',
): Promise<void> {
  await getShopPcHost().sendAssistantMessage?.(recipientId, text, messageType);
}
