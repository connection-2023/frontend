'use client';
import { useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import CouponSelect from './CouponSelect';
import Coupon from '@/components/Coupon/Coupon';
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

  const onChangeNormalCoupon = (
    value: MultiValue<SelectCoupon> | SingleValue<SelectCoupon>,
  ) => {
    if (!value) {
      setNormalCouponSelect([]);
      return;
    }

    const newValue = Array.isArray(value) ? value : [value];
    setNormalCouponSelect(newValue);
  };

  const onChangeStackableCoupon = (
    value: MultiValue<SelectCoupon> | SingleValue<SelectCoupon>,
  ) => {
    if (!value) {
      setStackableCouponSelect([]);
      return;
    }
    const newValue = Array.isArray(value) ? value : [value];
    setStackableCouponSelect(newValue);
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
        options={stackableOptions}
        type="STACKABLE"
        selectValue={stackableCouponSelect}
        onChange={onChangeStackableCoupon}
      />

      <Coupon coupon={normalCouponSelect[0].value} type="user" />
      <Coupon coupon={stackableCouponSelect[0].value} type="user" />
    </div>
  );
};

export default CouponClient;
