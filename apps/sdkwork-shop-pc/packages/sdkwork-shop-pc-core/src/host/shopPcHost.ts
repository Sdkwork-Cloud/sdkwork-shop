export type ShopPcToastVariant = 'success' | 'error' | 'info';

export interface ShopPcToast {
  (message: string, variant?: ShopPcToastVariant): void;
}

export interface ShopPcSessionUser {
  phone?: string;
  displayName?: string;
  name?: string;
  nickname?: string;
}

export interface ShopPcLanguageBridge {
  resolveInitialLanguage(): string;
  onLanguageChange(listener: (language: string) => void): () => void;
}

export interface ShopPcHostAdapter {
  toast: ShopPcToast;
  sendAssistantMessage?(
    recipientId: string,
    text: string,
    messageType?: string,
  ): Promise<void>;
  readSessionUser?: () => ShopPcSessionUser | null;
  languageBridge?: ShopPcLanguageBridge;
}

let shopPcHostAdapter: ShopPcHostAdapter | null = null;

export function configureShopPcHost(adapter: ShopPcHostAdapter): void {
  shopPcHostAdapter = adapter;
}

export function getShopPcHost(): ShopPcHostAdapter {
  if (!shopPcHostAdapter) {
    throw new Error('Shop PC host adapter is not configured');
  }
  return shopPcHostAdapter;
}

export function resetShopPcHost(): void {
  shopPcHostAdapter = null;
}
