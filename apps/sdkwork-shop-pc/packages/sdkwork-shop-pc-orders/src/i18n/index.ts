import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getShopPcHost } from '@sdkwork/shop-pc-core';

import zhCN from './locales/zh-CN/orders.json';
import enUS from './locales/en-US/orders.json';

const SUPPORTED_LANGUAGES = ['zh-CN', 'en-US'] as const;
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

function normalizeLanguage(value: unknown): SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(value as SupportedLanguage) ? value as SupportedLanguage : 'zh-CN';
}

function resolveInitialLanguage(): SupportedLanguage {
  try {
    return normalizeLanguage(getShopPcHost().languageBridge?.resolveInitialLanguage());
  } catch {
    return 'zh-CN';
  }
}

const i18n = createInstance();
i18n.use(initReactI18next).init({
  resources: { 'zh-CN': { orders: zhCN }, 'en-US': { orders: enUS } },
  lng: resolveInitialLanguage(),
  fallbackLng: 'zh-CN',
  ns: ['orders'],
  defaultNS: 'orders',
  interpolation: { escapeValue: false },
});

if (typeof window !== 'undefined') {
  try {
    getShopPcHost().languageBridge?.onLanguageChange((language) => {
      const nextLanguage = normalizeLanguage(language);
      if (i18n.language !== nextLanguage) {
        void i18n.changeLanguage(nextLanguage);
      }
    });
  } catch {
    // Host adapter is configured before orders surfaces render in embedded mode.
  }
}

export default i18n;
