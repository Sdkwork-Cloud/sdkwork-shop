import { formatMoney } from "@sdkwork/utils/money";

/**
 * Local helper to format prices in CNY with the locale-aware ¥ symbol.
 * Mobile apps default to zh-CN; pass the host i18n locale when available.
 *
 * @param fractionDigits 2 (default) keeps two decimals ("¥39.00", matching the
 *   "10.00"-style price strings used across this package); 0 keeps whole-yuan
 *   display for prices that previously had no decimals ("¥39").
 */
export const formatCny = (
  value: number | string | null | undefined,
  locale?: string,
  fractionDigits: 0 | 2 = 2,
): string | null =>
  formatMoney(value, {
    currency: "CNY",
    locale: locale || "zh-CN",
    mode: "symbol",
    minFractionDigits: fractionDigits,
    maxFractionDigits: 2,
  });
