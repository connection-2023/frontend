interface ValidityPeriod {
  startDate: string;
  endDate: string;
}

interface BaseCouponData {
  title: string;
  isStackable: boolean;
  maxDiscountAmount?: number;
  validityPeriod: ValidityPeriod;
  couponQuantity: '원' | '%';
  discountValue: number;
  isPrivate: boolean;
  lectureIds: SelectClassType[];
}

interface CouponDataWithDiscount extends BaseCouponData {
  couponDistributionCount: number;
  maxUsageCount?: never;
}

interface CouponDataWithLimit extends BaseCouponData {
  couponDistributionCount?: never;
  maxUsageCount: boolean;
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

export interface SelectCoupon {
  value: CouponGET;
  label: string;
}

export type SelectCoupons = SelectCoupon[];

export interface SelectClassType {
  value: string | number;
  label: string;
}

export interface createCouponData {
  title: string;
  percentage: number | undefined;
  discountPrice: number | undefined;
  maxDiscountPrice: number | undefined;
  maxUsageCount: number | undefined;
  startAt: Date;
  endAt: Date;
  isStackable: boolean;
  isPrivate: boolean;
  lectureIds: number[];
}

export interface IgetLecturerCoupons {
  take: number | undefined;
  currentPage?: number;
  targetPage?: number;
  firstItemId?: number;
  lastItemId?: number;
  issuedCouponStatusOptions: 'AVAILABLE' | 'DISABLED';
  filterOption: 'LATEST' | 'UPCOMING';
  lectureId?: number;
}
