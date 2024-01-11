export interface IReservationInfo {
  lectureScheduleId: number;
  participants: number;
}

export interface IApplyClassList extends IReservationInfo {
  dateTime: string;
  remain: number;
}

export interface IPaymentInfo extends IApplicantInfo {
  lectureId: string;
  orderName: string;
  orderId: string;
  lectureSchedules: IReservationInfo[];
  originalPrice: number;
  finalPrice: number;
  couponId?: number;
  stackableCouponId?: number;
}

export interface IApplicantInfo {
  representative: string;
  phoneNumber: string;
  requests?: string;
}

export interface IPaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: string;
}

export interface IPaymentConfirmResponse {
  orderId: string;
  orderName: string;
  originalPrice: number;
  finalPrice: number;
  paymentProductType: { name: string };
  paymentMethod: { name: string };
  updatedAt: string;
  reservation: {
    participants: number;
    requests: string;
    lectureSchedule: {
      startDateTime: string;
    };
  }[];

  cardPaymentInfo: ICardPaymentInfo | null;
  virtualAccountPaymentInfo: IVirtualAccountInfo | null;
}

export interface IPaymentInfoResponse {
  orderId: string;
  orderName: string;
  value: number;
}

export interface IReceiptResponse {
  orderId: string;
  orderName: string;
  originalPrice: number;
  finalPrice: number;
  paymentProductType: { name: string };
  paymentMethod: { name: string };
  createdAt: string;
  updatedAt: string;
  cardPaymentInfo: ICardPaymentInfo | null;
  virtualAccountPaymentInfo: IVirtualAccountInfo | null;
  paymentCouponUsage: IPaymentCoupon | null;
}

interface ICardPaymentInfo {
  number: string;
  installmentPlanMonths: number;
  approveNo: number;
  issuer?: { code: string; name: string };
  acquirer?: { code: string; name: string };
}

export interface IVirtualAccountInfo {
  accountNumber: string;
  customerName: string;
  dueDate: string;
  bank: { code: number; name: string };
}

interface IPaymentCoupon {
  couponTitle: string | null;
  couponDiscountPrice: number | null;
  couponMaxDiscountPrice: number | null;
  couponPercentage: number | null;
  stackableCouponTitle: string | null;
  stackableCouponPercentage: number | null;
  stackableCouponDiscountPrice: number | null;
  stackableCouponMaxDiscountPrice: number | null;
}
