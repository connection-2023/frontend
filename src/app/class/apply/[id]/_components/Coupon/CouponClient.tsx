'use client';
import { useState } from 'react';
import CouponSelect from './CouponSelect';
import { SelectCoupon, couponGET } from '@/types/coupon';

interface CouponClient {
  normalOptions: SelectCoupon[];
  stackableOptions: SelectCoupon[];
  normalCoupon: SelectCoupon[];
  stackableCoupon: SelectCoupon[];
}

const CouponClient = ({
  normalOptions,
  stackableOptions,
  normalCoupon = [],
  stackableCoupon = [],
}: CouponClient) => {
  const [normalCouponSelect, setNormalCouponSelect] = useState(normalCoupon);
  const [stackableCouponSelect, setStackableCouponSelect] =
    useState(stackableCoupon);

  const onChangeNormalCoupon = (value) => {
    setNormalCouponSelect(value);
  };

  const onChangeStackableCoupon = (value) => {
    setStackableCouponSelect(value);
  };

  return (
    <div className="mt-11 flex flex-col gap-2">
      <CouponSelect
        options={normalOptions}
        type="NOMAL"
        selectValue={normalCouponSelect}
        onChange={onChangeNormalCoupon}
      />
      <CouponSelect
        options={normalOptions}
        type="STACKABLE"
        selectValue={stackableCouponSelect}
        onChange={onChangeStackableCoupon}
      />
    </div>
  );
};

export default CouponClient;
