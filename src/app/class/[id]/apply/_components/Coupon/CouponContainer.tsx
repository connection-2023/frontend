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
  let normalCoupon: SelectCoupon[] | undefined;
  let stackableCoupon: SelectCoupon[] | undefined;
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

    const selectOption = {
      value: formattedCoupon,
      label: coupon.title,
    };

    (coupon.isStackable ? stackableCoupons : normalCoupons).push(selectOption);

    if (maxNormalCouponId === coupon.id) {
      normalCoupon = [selectOption];
    }

    if (maxStackableCouponId === coupon.id) {
      stackableCoupon = [selectOption];
    }
  });

  return (
    <CouponClient
      normalOptions={normalCoupons}
      stackableOptions={stackableCoupons}
      normalCoupon={normalCoupon ?? []}
      stackableCoupon={stackableCoupon ?? []}
      price={price}
    />
  );
};

export default CouponContainer;
