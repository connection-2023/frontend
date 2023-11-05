export interface IReservationInfo {
  lectureScheduleId: number;
  participants: number;
}

export interface IPaymentInfo {
  lectureId: string;
  orderName: string;
  orderId: string;
  lectureSchedules: IReservationInfo[];
  price: number;
  couponId?: number;
  stackableCouponId?: number;

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
