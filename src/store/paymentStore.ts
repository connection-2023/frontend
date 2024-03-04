import { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { create } from 'zustand';
import { userPassList } from '@/types/pass';
import {
  IReservationInfo,
  IApplicantInfo,
  PaymentCoupon,
} from '@/types/payment';

interface IPaymentStore {
  paymentWidget: PaymentWidgetInstance | null;
  paymentMethodsWidget: ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null;
  applyClass: IReservationInfo | null;
  applicant: IApplicantInfo | null;
  coupon: PaymentCoupon;
  pass: null | userPassList;
  setPaymentWidget: (widget: PaymentWidgetInstance) => void;
  setPaymentMethodsWidget: (
    widget: ReturnType<PaymentWidgetInstance['renderPaymentMethods']>,
  ) => void;
  setApplyClass: (participants: IReservationInfo) => void;
  setApplicant: (applicantInfo: IApplicantInfo) => void;
  setCoupon: (coupon: PaymentCoupon) => void;
  setPass: (pass: userPassList | null) => void;
}

export const usePaymentStore = create<IPaymentStore>()((set) => ({
  paymentWidget: null,
  paymentMethodsWidget: null,
  applyClass: null,
  applicant: null,
  coupon: {
    discountPrice: null,
    couponId: null,
    stackableCouponId: null,
  },
  pass: null,
  setPaymentWidget: (widget) => set({ paymentWidget: widget }),
  setPaymentMethodsWidget: (widget) => set({ paymentMethodsWidget: widget }),
  setApplyClass: (participants) => set({ applyClass: participants }),
  setApplicant: (applicantInfo) => set({ applicant: applicantInfo }),
  setCoupon: (coupon) => set({ coupon: coupon }),
  setPass: (pass) => set({ pass }),
}));
