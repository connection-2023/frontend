export interface IReservationInfo {
  lectureScheduleId: number;
  participants: number;
}

export interface IPaymentInfo extends IApplicantInfo {
  lectureId: string;
  orderName: string;
  orderId: string;
  lectureSchedules: IReservationInfo[];
  price: number;
  couponId?: number;
  stackableCouponId?: number;
}

export interface IApplicantInfo {
  representative: string;
  phoneNumber: string;
  requests?: string;
}

export interface IPaymentConfirm {
  paymentKey: string;
  orderName: string;
  orderId: string;
  amount: number;
}

export interface IPaymentInfoResponse {
  orderId: string;
  orderName: string;
  value: number;
}
