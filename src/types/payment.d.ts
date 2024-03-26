import { PAYMENT_STATUS } from '@/constants/constants';
import { IClassSchedule, IRegularClassSchedule } from './class';

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
  couponId?: number | null;
  stackableCouponId?: number | null;
  passId?: number | null;
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
    lectureSchedule: IClassSchedule | null;
    regularLectureStatus: IRegularClassSchedule | null;
    lecture: { id: number; title: string };
  };
  paymentCouponUsage: IPaymentCoupon | null;
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
    representative: string;
    phoneNumber: string;
    participants: number;
    requests: string;
    lectureSchedule?: {
      startDateTime: string;
    };
    regularLectureStatus?: IRegularClassSchedule;
    lecture: {
      id: number;
      title: string;
      imageUrl: string;
    };
  } | null;
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
  bankCode: string;
  expired: boolean;
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

export type PaymentStatusType = keyof typeof PAYMENT_STATUS;

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

export interface ILecturerPayment {
  id: number;
  updatedAt: string;
  orderName: string;
  originalPrice: number;
  finalPrice: number;
  paymentStatus: {
    name: PaymentStatusType;
  };
  user: {
    id: number;
    nickname: string;
  };
  paymentCouponUsage: null; // 수정 필요
}

export interface IIncomeHistoryResponse {
  totalItemCount: number;
  lecturerPaymentList: ILecturerPayment[];
}

export interface IRefundRequest {
  cancelReason: string;
  refundAmount: number;
  userBankAccountId?: number;
}

export interface IMyPayment {
  id: number;
  orderId: string;
  orderName: string;
  originalPrice: number;
  finalPrice: number;
  paymentProductType: {
    name: '클래스' | '패스권';
  };
  paymentMethod: {
    name: '카드' | '가상계좌';
  };
  paymentStatus: {
    name: 'WAITING_FOR_DEPOSIT' | 'DONE' | 'CANCELED';
  };
  updatedAt: string;
  reservation: {
    representative: string;
    phoneNumber: string;
    participants: number;
    requests: string;
    lectureSchedule?: {
      startDateTime: string;
    };
    regularLectureStatus?: IRegularClassSchedule;
    lecture: {
      id: number;
      title: string;
      imageUrl: string;
    };
  } | null;

  userPass: {
    id: number;
    lecturePassId: number;
    remainingUses: number;
    isEnabled: false;
    startAt: null | string;
    endAt: null | string;
    lecturePass: {
      createdAt: string;
      updatedAt: string;
      id: number;
      title: string;
      price: number;
      maxUsageCount: number;
      availableMonths: number;
    };
  } | null;
}

export interface IMyPaymentResponse {
  totalItemCount: number;
  userPaymentsHistory: IMyPayment[];
}
