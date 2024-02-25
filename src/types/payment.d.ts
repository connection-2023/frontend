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
  lectureSchedule: IReservationInfo;
  originalPrice: number;
  finalPrice: number;
  couponId: number | null;
  stackableCouponId: number | null;
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
    id: number;
    representative: string;
    phoneNumber: string;
    participants: number;
    requests: string;
    lectureSchedule: {
      id: number;
      lectureId: number;
      day: number;
      startDateTime: string;
      endDateTime: string;
      numberOfParticipants: number;
    };
    regularLectureStatus: null;
  };

  cardPaymentInfo: ICardPaymentInfo | null;
  virtualAccountPaymentInfo: IVirtualAccountInfo | null;
}

export interface IPaymentInfoResponse {
  orderId: string;
  orderName: string;
  value: number;
}

export interface IReceiptResponse {
  createdAt: string;
  updatedAt: string;
  orderId: string;
  orderName: string;
  originalPrice: number;
  finalPrice: number;
  paymentProductType: { name: string };
  paymentMethod: { name: string };
  cardPaymentInfo: ICardPaymentInfo | null;
  virtualAccountPaymentInfo: IVirtualAccountInfo | null;
  paymentCouponUsage: IPaymentCoupon | null;
  reservation: {
    id: number;
    representative: string;
    phoneNumber: number | string;
    participants: number;
    requests: string;
    lectureSchedule: {
      id: number;
      startDateTime: string;
      endDateTime: string;
      numberOfParticipants: number;
      lecture: { id: number; title: string; imageUrl: string | null };
    };
    regularLectureStatus: null;
  };
}

interface ICardPaymentInfo {
  number: string;
  installmentPlanMonths: number;
  approveNo: number;
  issuerCode: string;
  acquirerCode?: number;
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

export type PaymentStatusType = WAITING_FOR_DEPOSIT | DONE | REFUSED;

export interface PaymentCoupon {
  discountPrice: null | number;
  couponId: null | number;
  stackableCouponId: null | number;
}

export interface PaymentPassInfoParam {
  passId: number;
  orderId: string;
  orderName: string;
  originalPrice: number;
  finalPrice: number;
}
