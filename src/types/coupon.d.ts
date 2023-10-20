interface ValidityPeriod {
  from: string;
  to: string;
}

interface BaseCouponData {
  couponName: string;
  allowDuplicateCoupons: boolean;
  maxDiscountAmount?: number;
  validityPeriod: ValidityPeriod;
  couponQuantity: '원' | '%';
  discountValue: number;
}

interface CouponDataWithDiscount extends BaseCouponData {
  couponDistributionCount: number;
  hasCouponLimit?: never;
}

interface CouponDataWithLimit extends BaseCouponData {
  couponDistributionCount?: never;
  hasCouponLimit: boolean;
}

export type CouponData = CouponDataWithDiscount | CouponDataWithLimit;

export interface couponGET {
  //추후 수정 예정
  discount: number;
  unit: string;
  title: string;
  startAt: string;
  endAt: string;
  isStackable: boolean;
  maxDiscountAmount?: number;
}

interface classOption {
  className: string;
  classLink: string;
}

export interface studentCouponGET {
  discount: number;
  unit: string;
  title: string;
  startAt: string;
  endAt: string;
  classList: classOption[];
}

export interface SelectCoupon {
  value: CouponGET;
  label: string;
}

export type SelectCoupons = SelectCoupon[];
