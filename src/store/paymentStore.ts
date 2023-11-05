import { create } from 'zustand';
import { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { IReservationInfo } from '@/types/payment';

interface IPaymentStore {
  paymentWidget: PaymentWidgetInstance | null;
  paymentMethodsWidget: ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null;
  applyClass: IReservationInfo[] | null;
  setPaymentWidget: (widget: PaymentWidgetInstance) => void;
  setPaymentMethodsWidget: (
    widget: ReturnType<PaymentWidgetInstance['renderPaymentMethods']>,
  ) => void;
  setApplyClass: (participants: IReservationInfo[]) => void;
}

export const usePaymentStore = create<IPaymentStore>()((set) => ({
  paymentWidget: null,
  paymentMethodsWidget: null,
  applyClass: null,
  setPaymentWidget: (widget) => set({ paymentWidget: widget }),
  setPaymentMethodsWidget: (widget) => set({ paymentMethodsWidget: widget }),
  setApplyClass: (participants) => set({ applyClass: participants }),
}));
