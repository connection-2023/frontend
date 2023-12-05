'use client';
import { useState } from 'react';
import CouponSelect from './CouponSelect';
import { SelectCoupon, couponGET } from '@/types/coupon';

interface CouponClient {
  normalOptions: SelectCoupon[];
  stackableOptions: SelectCoupon[];
  normalCoupon: SelectCoupon | [];
  stackableCoupon: SelectCoupon | [];
}

const CouponClient = ({
  normalOptions,
  stackableOptions,
  normalCoupon,
  stackableCoupon,
}: CouponClient) => {
  const [normalCouponSelect, setNormalCouponSelect] = useState(normalCoupon);
  const [stackableCouponSelect, setStackableCouponSelect] =
    useState(stackableCoupon);

  return (
    <CouponSelect
      options={normalOptions}
      type="NOMAL"
      selectValue={normalCouponSelect}
    />
  );
};

export default CouponClient;
