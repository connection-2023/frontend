interface ValidityPeriod {
  from: string;
  to: string;
}

interface BaseCouponData {
  couponName: number;
  allowDuplicateCoupons?: boolean;
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
