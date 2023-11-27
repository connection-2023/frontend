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

interface lectureCouponTarget {
  lecture: {
    id: number;
    title: string;
  };
}

export interface couponGET {
  createdAt: Date;
  updatedAt: Date;
  startAt: string;
  endAt: string;
  id: number;
  title: string;
  discountPrice: number;
  isDisabled: boolean;
  isPrivate: boolean;
  isStackable: boolean;
  lectureCouponTarget: lectureCouponTarget[];
  maxDiscountPrice: number;
  maxUsageCount: number;
  percentage: number;
}

export interface createCoupon {
  createdAt: Date;
  updatedAt: Date;
  startAt: string;
  endAt: string;
  id: number;
  title: string;
  discountPrice: number;
  isDisabled: boolean;
  isPrivate: boolean;
  isStackable: boolean;
  lectureCouponTarget: {
    value: number;
    label: string;
  }[];
  maxDiscountPrice: number;
  maxUsageCount: number;
  percentage: number;
}

export interface SelectCoupon {
  value: couponGET;
  label: string;
}

export type SelectCoupons = SelectCoupon[];

export interface SelectClassType {
  value: string | number;
  label: string;
}

export interface OptionType {
  value: number | string;
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
