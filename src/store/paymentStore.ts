import { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { create } from 'zustand';
import { IReservationInfo, IApplicantInfo } from '@/types/payment';

interface IPaymentStore {
  paymentWidget: PaymentWidgetInstance | null;
  paymentMethodsWidget: ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null;
  applyClass: IReservationInfo | null;
  applicant: IApplicantInfo | null;
  discountPrice: number | null;
  setDiscountPrice: (price: number) => void;
  setPaymentWidget: (widget: PaymentWidgetInstance) => void;
  setPaymentMethodsWidget: (
    widget: ReturnType<PaymentWidgetInstance['renderPaymentMethods']>,
  ) => void;
  setApplyClass: (participants: IReservationInfo) => void;
  setApplicant: (applicantInfo: IApplicantInfo) => void;
}

export const usePaymentStore = create<IPaymentStore>()((set) => ({
  paymentWidget: null,
  paymentMethodsWidget: null,
  applyClass: null,
  applicant: null,
  discountPrice: null,
  setDiscountPrice: (price) => set({ discountPrice: price }),
  setPaymentWidget: (widget) => set({ paymentWidget: widget }),
  setPaymentMethodsWidget: (widget) => set({ paymentMethodsWidget: widget }),
  setApplyClass: (participants) => set({ applyClass: participants }),
  setApplicant: (applicantInfo) => set({ applicant: applicantInfo }),
}));
