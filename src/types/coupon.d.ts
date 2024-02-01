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

export interface userCouponGET {
  id: number;
  lectureCouponId: number;
  isUsed: boolean;
  updatedAt: string;
  lectureCoupon: {
    title: string;
    isPrivate: boolean;
    maxUsageCount: number | null;
    usageCount: number;
    percentage: number | null;
    discountPrice: number;
    maxDiscountPrice: number;
    startAt: string;
    endAt: string;
    isDisabled: boolean;
    isStackable: boolean;
    lectureCouponTarget: lectureCouponTarget[];
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
  isOwned?: boolean;
}

export interface IprivateCoupon {
  id: number;
  title: string;
  percentage: number;
  discountPrice: number;
  startAt: string;
  endAt: string;
  isStackable: boolean;
  maxDiscountPrice: number;
  lectureCouponTarget: lectureCouponTarget[];
}

export interface IcouponsData {
  totalItemCount: number;
  itemList: couponGET[];
}

export interface IuserCouponsData {
  totalItemCount: number;
  itemList: userCouponGET[];
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

export interface IgetFunction {
  take: number | undefined;
  currentPage?: number;
  targetPage?: number;
  firstItemId?: number;
  lastItemId?: number;
  passStatusOptions?: 'AVAILABLE' | 'DISABLED' | 'USED' | 'EXPIRED';
  couponStatusOption?: 'AVAILABLE' | 'DISABLED' | 'USED' | 'EXPIRED';
  filterOption: 'LATEST' | 'UPCOMING' | 'HIGHEST_PRICE' | 'BEST_SELLING';
  lectureId?: string | number;
}

export interface IFilterState {
  isInterested: 'COUPON' | 'PASS';
  passStatusOptions: 'AVAILABLE' | 'DISABLED' | 'USED' | 'EXPIRED';
  filterOption: 'LATEST' | 'UPCOMING' | 'HIGHEST_PRICE' | 'BEST_SELLING';
  selectedClass: { value: string; label: string } | null;
  currentPage: number;
  targetPage: number;
}

export interface IonChangeItemList {
  type: 'COUPON' | 'PASS';
  itemList: any[];
  prevPage?: boolean;
}

export interface IgetListFunctionHandler {
  type: 'COUPON' | 'PASS';
  data: IgetFunction;
  signal?: AbortSignal;
}

export interface IclassCouponList {
  lectureCoupon: IclassCoupon;
}

export interface IclassCoupon {
  id: number;
  title: string;
  maxUsageCount: number;
  percentage: number;
  discountPrice: number;
  maxDiscountPrice: number;
  isStackable: boolean;
  startAt: string;
  endAt: string;
  createdAt: Date;
  isDisabled: boolean;
  isPrivate: boolean;
  lectureCouponTarget: lectureCouponTarget[];
  isOwned?: boolean;
}
