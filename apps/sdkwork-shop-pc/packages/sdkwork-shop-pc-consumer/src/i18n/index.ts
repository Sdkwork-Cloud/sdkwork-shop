import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getShopPcHost } from '@sdkwork/shop-pc-core';

import zhCNCommon from './zh-CN/commerce/consumer/common.json';
import zhCNShop from './zh-CN/commerce/consumer/shop.json';
import zhCNProduct from './zh-CN/commerce/consumer/product.json';
import zhCNCart from './zh-CN/commerce/consumer/cart.json';
import zhCNCheckout from './zh-CN/commerce/consumer/checkout.json';

import enUSCommon from './en-US/commerce/consumer/common.json';
import enUSShop from './en-US/commerce/consumer/shop.json';
import enUSProduct from './en-US/commerce/consumer/product.json';
import enUSCart from './en-US/commerce/consumer/cart.json';
import enUSCheckout from './en-US/commerce/consumer/checkout.json';

const SUPPORTED_LANGUAGES = ['zh-CN', 'en-US'] as const;
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

function normalizeLanguage(value: unknown): SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)
    ? value as SupportedLanguage
    : 'zh-CN';
}

function resolveInitialLanguage(): SupportedLanguage {
  try {
    return normalizeLanguage(getShopPcHost().languageBridge?.resolveInitialLanguage());
  } catch {
    return 'zh-CN';
  }
}

const resources = {
  'zh-CN': {
    common: zhCNCommon,
    shop: zhCNShop,
    product: zhCNProduct,
    cart: zhCNCart,
    checkout: zhCNCheckout,
  },
  'en-US': {
    common: enUSCommon,
    shop: enUSShop,
    product: enUSProduct,
    cart: enUSCart,
    checkout: enUSCheckout,
  },
};

const i18n = createInstance();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: resolveInitialLanguage(),
    fallbackLng: 'zh-CN',
    ns: ['common', 'shop', 'product', 'cart', 'checkout'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

if (typeof window !== 'undefined') {
  try {
    const unsubscribe = getShopPcHost().languageBridge?.onLanguageChange((language) => {
      const nextLanguage = normalizeLanguage(language);
      if (i18n.language !== nextLanguage) {
        void i18n.changeLanguage(nextLanguage);
      }
    });
    if (unsubscribe) {
      window.addEventListener('beforeunload', () => {
        unsubscribe();
      });
    }
  } catch {
    // Host adapter is configured before shop surfaces render in embedded mode.
  }
}

export default i18n;
