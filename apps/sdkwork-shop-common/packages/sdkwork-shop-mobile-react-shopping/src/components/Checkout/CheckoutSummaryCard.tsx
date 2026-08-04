import React from "react";
import { useTranslation } from "react-i18next";
import { formatCny } from "../../money";

interface CheckoutSummaryCardProps {
  totalPrice: string;
}

export const CheckoutSummaryCard: React.FC<CheckoutSummaryCardProps> = ({
  totalPrice,
}) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || "zh-CN";

  return (
    <div className="bg-chat-other-bg rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[14px] text-text-sub">
          {t("shopping.auto_280d7b97", "商品总价")}
        </span>
        <span className="text-[14px] text-text-main">
          {formatCny(totalPrice, locale) ?? "--"}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[14px] text-text-sub">
          {t("shopping.auto_11f769", "运费")}
        </span>
        <span className="text-[14px] text-text-main">
          {formatCny(0, locale) ?? "--"}
        </span>
      </div>
      <div className="flex justify-end items-center mt-4 pt-3 border-t border-border-color">
        <span className="text-[14px] text-text-main">
          {t("shopping.auto_14d59a1", "合计：")}
        </span>
        <span className="text-[18px] font-bold text-[#FA5151]">
          {formatCny(totalPrice, locale) ?? "--"}
        </span>
      </div>
    </div>
  );
};
