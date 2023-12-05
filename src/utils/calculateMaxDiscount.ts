import { IclassCoupon, IclassCouponList } from '@/types/coupon';

const calculateMaxDiscount = (
  lecturePrice: number,
  coupons: IclassCouponList[],
) => {
  const normalCoupons = [] as IclassCoupon[];
  const stackableCoupons = [] as IclassCoupon[];

  coupons.forEach(({ lectureCoupon: coupon }) => {
    (coupon.isStackable ? stackableCoupons : normalCoupons).push(coupon);
  });

  const calculateDiscount = (coupon: IclassCoupon, price: number) => {
    let discount = 0;
    if (coupon.percentage) {
      discount = (price * coupon.percentage) / 100;
    } else if (coupon.discountPrice) {
      discount = coupon.discountPrice;
    }

    return coupon.maxDiscountPrice && discount > coupon.maxDiscountPrice
      ? coupon.maxDiscountPrice
      : discount;
  };

  const calculateMaxDiscounts = (coupons: IclassCoupon[]) => {
    let maxDiscount = 0;
    let maxPercentDiscount = 0;
    let maxDiscountCouponId: number | null = null;
    let maxPercentDiscountCouponId: number | null = null;

    coupons.forEach((coupon) => {
      const discount = calculateDiscount(coupon, lecturePrice);
      if (coupon.percentage) {
        if (discount > maxPercentDiscount) {
          maxPercentDiscount = discount;
          maxPercentDiscountCouponId = coupon.id;
        }
      } else {
        if (discount > maxDiscount) {
          maxDiscount = discount;
          maxDiscountCouponId = coupon.id;
        }
      }
    });

    return {
      maxDiscount,
      maxPercentDiscount,
      maxDiscountCouponId,
      maxPercentDiscountCouponId,
    };
  };

  const {
    maxDiscount: maxNormalDiscount,
    maxPercentDiscount: maxNormalPercentDiscount,
    maxDiscountCouponId: maxNormalDiscountCouponId,
    maxPercentDiscountCouponId: maxNormalPercentDiscountCouponId,
  } = calculateMaxDiscounts(normalCoupons);

  const {
    maxDiscount: totalStackableDiscount,
    maxPercentDiscount: maxStackablePercentDiscount,
    maxDiscountCouponId: maxStackableDiscountCouponId,
    maxPercentDiscountCouponId: maxStackablePercentDiscountCouponId,
  } = calculateMaxDiscounts(stackableCoupons);

  const normalAndStackable = maxNormalDiscount + totalStackableDiscount;
  const normalAndStackablePercent =
    maxNormalDiscount + maxStackablePercentDiscount;
  const normalPercentAndStackable =
    maxNormalPercentDiscount + totalStackableDiscount;

  let maxDiscount = Math.max(
    normalAndStackable,
    normalAndStackablePercent,
    normalPercentAndStackable,
  );

  let normalCouponId: number | null, stackableCouponId: number | null;

  if (maxDiscount === normalAndStackable) {
    normalCouponId = maxNormalDiscountCouponId;
    stackableCouponId = maxStackableDiscountCouponId;
  } else if (maxDiscount === normalAndStackablePercent) {
    normalCouponId = maxNormalDiscountCouponId;
    stackableCouponId = maxStackablePercentDiscountCouponId;
  } else {
    normalCouponId = maxNormalPercentDiscountCouponId;
    stackableCouponId = maxStackableDiscountCouponId;
  }

  const normalCoupon = coupons.find(
    (coupon) => coupon.lectureCoupon.id === normalCouponId,
  )?.lectureCoupon;
  const stackableCoupon = coupons.find(
    (coupon) => coupon.lectureCoupon.id === stackableCouponId,
  )?.lectureCoupon;

  return {
    maxDiscount: maxDiscount,
    normalCoupon: normalCoupon
      ? { value: normalCoupon.id, label: normalCoupon.title }
      : null,
    stackableCoupon: stackableCoupon
      ? { value: stackableCoupon.id, label: stackableCoupon.title }
      : null,
  };
};

export default calculateMaxDiscount;
