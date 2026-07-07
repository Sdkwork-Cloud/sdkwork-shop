import React from "react";
import {
  ChevronLeft,
  Package,
  ShieldCheck,
  Clock,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Order } from "../services/OrdersService";
import { shopToast } from "../host/shopUiHost";

interface OrderDetailViewProps {
  order: Order;
  onBack: () => void;
  onAction: (orderId: string, action: string, msg: string) => Promise<void>;
  onPay: (orderId: string) => Promise<void>;
}

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "PENDING_PAY":
      return <CreditCard size={32} className="text-orange-400" />;
    case "PENDING_SHIP":
      return <Package size={32} className="text-blue-400" />;
    case "SHIPPED":
      return <Package size={32} className="text-indigo-400" />;
    case "COMPLETED":
      return <CheckCircle2 size={32} className="text-green-400" />;
    case "CANCELLED":
      return <Clock size={32} className="text-gray-400" />;
  }
};

export const OrderDetailView: React.FC<OrderDetailViewProps> = ({
  order,
  onBack,
  onAction,
  onPay,
}) => {
  const { t } = useTranslation("orders");

  const getStatusBadge = (status: Order["status"]) => {
    const label = t(`statusDetail.${status}`);
    switch (status) {
      case "PENDING_PAY":
        return <span className="text-orange-400 font-bold text-xl">{label}</span>;
      case "PENDING_SHIP":
        return <span className="text-blue-400 font-bold text-xl">{label}</span>;
      case "SHIPPED":
        return <span className="text-indigo-400 font-bold text-xl">{label}</span>;
      case "COMPLETED":
        return <span className="text-green-400 font-bold text-xl">{label}</span>;
      case "CANCELLED":
        return <span className="text-gray-400 font-bold text-xl">{label}</span>;
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-[#1e1e20] text-gray-200 overflow-hidden">
      <div className="h-16 border-b border-white/5 flex items-center px-8 shrink-0 bg-[#1e1e20] shadow-sm sticky top-0 z-10 w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:bg-white/5 px-3 py-1.5 rounded-full transition-colors text-gray-400 hover:text-white"
        >
          <ChevronLeft size={18} />
          <span className="text-sm font-medium">{t("detail.backToList")}</span>
        </button>
        <div className="mx-auto flex items-center font-bold text-lg text-gray-100 tracking-wide pr-24">
          {t("detail.title")}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-3xl mx-auto space-y-6 pb-24">
          <div className="bg-gradient-to-r from-[#2b2b2d] to-[#252528] rounded-3xl p-8 border border-white/5 shadow-xl flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              {getStatusIcon(order.status)}
            </div>
            <div className="flex items-center gap-6 z-10 w-full">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                {getStatusIcon(order.status)}
              </div>
              <div>
                <div className="mb-2">{getStatusBadge(order.status)}</div>
                <div className="text-sm text-gray-400">
                  {t(`statusDesc.${order.status}`)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="bg-[#2b2b2d] rounded-2xl border border-white/5 p-6 shadow-lg flex flex-col">
                <h3 className="text-sm font-bold text-gray-200 mb-5 flex items-center gap-2 shrink-0">
                  <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                  {t("detail.shippingInfo")}
                </h3>
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 text-sm text-gray-400">
                  {t("detail.shippingAddressUnavailable")}
                </div>
              </div>

              <div className="bg-[#2b2b2d] rounded-2xl border border-white/5 p-6 shadow-lg flex flex-col">
                <h3 className="text-sm font-bold text-gray-200 mb-5 flex items-center gap-2 shrink-0">
                  <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                  {t("detail.orderInfo")}
                </h3>
                <div className="space-y-4 text-sm font-mono text-gray-400 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5 mb-1">
                    <span className="text-gray-500 font-medium shrink-0">
                      {t("detail.orderNo")}
                    </span>
                    <span className="text-gray-200 flex items-center gap-3 font-semibold truncate justify-end w-full pl-4 relative">
                      <span className="truncate">{order.id}</span>
                      <button
                        className="text-blue-400 text-xs hover:text-blue-300 transition-colors shrink-0 font-bold bg-blue-500/10 px-2 py-0.5 rounded cursor-pointer"
                        onClick={() =>
                          shopToast(t("toast.orderNoCopied"), "success")
                        }
                      >
                        {t("detail.copy")}
                      </button>
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-3 py-1">
                    <span className="text-gray-500 font-medium shrink-0">
                      {t("detail.createTime")}
                    </span>
                    <span className="text-gray-300 truncate pl-4">
                      {order.createTime}
                    </span>
                  </div>
                  {order.status !== "PENDING_PAY" && order.createTime && (
                    <div className="flex justify-between items-center px-3 py-1">
                      <span className="text-gray-500 font-medium shrink-0">
                        {t("detail.payTime")}
                      </span>
                      <span className="text-gray-300 truncate pl-4">
                        {order.createTime}
                      </span>
                    </div>
                  )}
                  {order.status === "COMPLETED" && (
                    <div className="flex justify-between items-center px-3 py-1">
                      <span className="text-gray-500 font-medium shrink-0">
                        {t("detail.completeTime")}
                      </span>
                      <span className="text-green-400 font-medium truncate pl-4">
                        {t("detail.deliveredOnTime")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#2b2b2d] rounded-2xl border border-white/5 overflow-hidden shadow-lg p-6">
              <div className="flex items-center gap-2 text-gray-200 mb-6 font-medium">
                <ShieldCheck size={18} className="text-blue-400" />
                {t("detail.officialStore")}
              </div>
              <div className="space-y-6">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-[#1e1e20] rounded-xl overflow-hidden shrink-0 border border-transparent group-hover:border-blue-500/30 transition-colors cursor-pointer shadow-sm">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <h4
                          className="text-[15px] font-bold text-gray-200 truncate mb-1.5 group-hover:text-blue-400 transition-colors cursor-pointer"
                          title={item.productName}
                        >
                          {item.productName}
                        </h4>
                        <span className="inline-flex bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[11px] text-gray-400 font-medium tracking-wide">
                          {t("detail.customConfig")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-orange-400 border border-orange-400/20 bg-orange-400/10 px-1.5 py-0.5 rounded font-medium">
                          {t("detail.returnPolicy")}
                        </span>
                        <span className="text-[10px] text-blue-400 border border-blue-400/20 bg-blue-400/10 px-1.5 py-0.5 rounded font-medium">
                          {t("detail.authenticGuarantee")}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end py-1 shrink-0 ml-4">
                      <div className="text-base font-bold text-gray-200 mb-1">
                        <span className="text-sm mr-0.5">�</span>
                        {item.price.toLocaleString("zh-CN", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        x {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}

                {(!order.items || order.items.length === 0) && (
                  <div className="text-center py-6 text-gray-500 border border-dashed border-white/10 rounded-xl">
                    {t("detail.noItemDetail", { info: order.productInfo })}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-6 mt-6 border-t border-white/5 border-dashed gap-6 text-sm">
                <div className="flex flex-col gap-3 flex-1 px-4">
                  <span className="text-gray-500 font-medium tracking-widest hidden lg:block">
                    ORDER ITEMS INFO
                  </span>
                </div>
                <div className="w-64 space-y-4">
                  <div className="flex justify-between items-center text-gray-400">
                    <span>{t("detail.productTotal")}</span>
                    <span>
                      �{" "}
                      {order.amount.toLocaleString("zh-CN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span>{t("detail.shippingFee")}</span>
                    <span>� 0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span>{t("detail.shopDiscount")}</span>
                    <span className="text-orange-400">- � 0.00</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-end">
                    <span className="text-gray-200 font-medium pb-1">
                      {t("detail.actualPayment")}
                    </span>
                    <span className="text-2xl font-bold text-orange-500 mb-[-2px] tracking-tight">
                      <span className="text-sm font-normal mr-1">�</span>
                      {order.amount.toLocaleString("zh-CN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-12"></div>
        </div>
      </div>

      <div className="bg-[#252527] border-t border-white/5 p-4 flex justify-end gap-3 shrink-0 shadow-lg relative z-20">
        <div className="max-w-3xl flex-1 mx-auto flex justify-end gap-3">
          {order.status === "PENDING_PAY" && (
            <>
              <button
                onClick={() =>
                  void onAction(order.id, "CANCELLED", t("toast.orderCancelled"))
                }
                className="px-6 py-2 border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 font-medium rounded-lg transition-colors text-sm"
              >
                {t("detail.cancelOrder")}
              </button>
              <button
                onClick={() => void onPay(order.id)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-lg transition-all shadow-md"
              >
                {t("detail.payNow")}
              </button>
            </>
          )}
          {order.status === "PENDING_SHIP" && (
            <>
              <button
                onClick={() =>
                  void onAction(
                    order.id,
                    "CANCELLED",
                    t("toast.cancelRequestSubmitted"),
                  )
                }
                className="px-6 py-2 border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 font-medium rounded-lg transition-colors text-sm"
              >
                {t("detail.cancelOrder")}
              </button>
              <button
                onClick={() =>
                  void onAction(order.id, "SHIPPED", t("toast.orderShipped"))
                }
                className="px-6 py-2 border border-blue-500/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white font-bold rounded-lg transition-colors shadow-sm"
              >
                {t("detail.remindShip")}
              </button>
            </>
          )}
          {order.status === "SHIPPED" && (
            <button
              disabled
              title={t("detail.waitFulfillmentTitle")}
              className="px-6 py-2 border border-white/10 text-gray-500 font-medium rounded-lg text-sm cursor-not-allowed"
            >
              {t("detail.waitFulfillment")}
            </button>
          )}
          {order.status === "COMPLETED" && (
            <>
              <button
                onClick={() =>
                  shopToast(t("toast.afterSalesApplied"), "success")
                }
                className="px-6 py-2 border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 font-medium rounded-lg transition-colors text-sm"
              >
                {t("detail.applyAfterSales")}
              </button>
              <button className="px-6 py-2 border border-blue-500/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white font-bold rounded-lg transition-colors shadow-sm">
                {t("detail.reviewOrder")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
