import { createNewCoupon } from '@/lib/apis/couponApis';
import { CouponData } from '@/types/coupon';

export const createCouponUtils = async (data: CouponData) => {
  const {
    validityPeriod,
    couponQuantity,
    discountValue,
    maxUsageCount,
    couponDistributionCount,
    lectureIds,
    title,
    maxDiscountAmount,
    isPrivate,
    isStackable,
  } = data;

  const createData = {
    title,
    startAt: new Date(validityPeriod.startDate),
    endAt: new Date(validityPeriod.endDate),
    percentage: couponQuantity === '%' ? Number(discountValue) : undefined,
    discountPrice: couponQuantity === '원' ? Number(discountValue) : undefined,
    maxUsageCount: maxUsageCount ? undefined : Number(couponDistributionCount),
    isPrivate,
    isStackable,
    lectureIds: lectureIds.map(({ value }) => Number(value)),
    maxDiscountPrice: Number(maxDiscountAmount) ?? undefined,
  };

  return await createNewCoupon(createData);
};
