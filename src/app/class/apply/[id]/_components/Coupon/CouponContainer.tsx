import { mapItemToCoupon } from '@/utils/apiDataProcessor';
import calculateMaxDiscount from '@/utils/calculateMaxDiscount';
import formatDate from '@/utils/formatDate';
import CouponClient from './CouponClient';
import { IcouponsData, SelectCoupon, couponGET } from '@/types/coupon';

const CouponContainer = ({
  couponList: resCouponList,
  price,
}: {
  couponList: IcouponsData | null;
  price: number;
}) => {
  if (!resCouponList) {
    return null;
  }
  let normalCoupon: SelectCoupon | undefined;
  let stackableCoupon: SelectCoupon | undefined;
  const couponList = resCouponList.itemList.map(mapItemToCoupon);

  const {
    normalCoupon: maxNormalCouponId,
    stackableCoupon: maxStackableCouponId,
  } = calculateMaxDiscount(price, couponList);

  const normalCoupons = [] as SelectCoupon[];
  const stackableCoupons = [] as SelectCoupon[];

  couponList.forEach((coupon) => {
    const formattedCoupon: couponGET = {
      ...coupon,
      startAt: formatDate(coupon.startAt),
      endAt: formatDate(coupon.endAt),
    };

    (coupon.isStackable ? stackableCoupons : normalCoupons).push({
      value: formattedCoupon,
      label: coupon.title,
    });

    if (maxNormalCouponId === coupon.id) {
      normalCoupon = {
        value: formattedCoupon,
        label: coupon.title,
      };
    }

    if (maxStackableCouponId === coupon.id) {
      stackableCoupon = {
        value: formattedCoupon,
        label: coupon.title,
      };
    }
  });

  return (
    <CouponClient
      normalOptions={normalCoupons}
      stackableOptions={stackableCoupons}
      normalCoupon={normalCoupon ?? []}
      stackableCoupon={stackableCoupon ?? []}
    />
  );
};

export default CouponContainer;
