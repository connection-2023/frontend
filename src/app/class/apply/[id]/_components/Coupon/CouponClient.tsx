'use client';
import { useRef, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import CouponSelect from './CouponSelect';
import Coupon from '@/components/Coupon/Coupon';
import { SelectCoupon } from '@/types/coupon';

interface CouponClient {
  normalOptions: SelectCoupon[];
  stackableOptions: SelectCoupon[];
  normalCoupon: SelectCoupon[];
  stackableCoupon: SelectCoupon[];
}

const handleOnChangeCoupon = (
  coupon: MultiValue<SelectCoupon> | SingleValue<SelectCoupon>,
  setSelectCoupon: React.Dispatch<React.SetStateAction<SelectCoupon[]>>,
  selectPercentage: React.MutableRefObject<boolean>,
  setOptions: React.Dispatch<React.SetStateAction<SelectCoupon[]>>,
  options: SelectCoupon[],
) => {
  if (!coupon) {
    setSelectCoupon([]);
    return;
  }

  if (
    Array.isArray(coupon) &&
    coupon.length === 0 &&
    selectPercentage.current
  ) {
    selectPercentage.current = false;
    setOptions(options);
  }

  if ('value' in coupon && coupon.value.percentage) {
    selectPercentage.current = true;

    setOptions((options) =>
      options.filter((option) => !option.value.percentage),
    );
  }

  const newValue = Array.isArray(coupon) ? coupon : [coupon];
  setSelectCoupon(newValue);
};

const CouponClient = ({
  normalOptions,
  stackableOptions,
  normalCoupon = [],
  stackableCoupon = [],
}: CouponClient) => {
  const [normalCouponSelect, setNormalCouponSelect] = useState(normalCoupon);
  const [stackableCouponSelect, setStackableCouponSelect] =
    useState(stackableCoupon);

  const normalSelectPercentage = useRef(
    !!normalCoupon?.[0]?.value.percentage ?? false,
  );
  const stackablePercentage = useRef(
    !!stackableCoupon?.[0]?.value.percentage ?? false,
  );

  const [normalOption, setNormalOption] = useState(normalOptions);
  const [stackableOption, setStackableOption] = useState(stackableOptions);

  const onChangeNormalCoupon = (
    coupon: MultiValue<SelectCoupon> | SingleValue<SelectCoupon>,
  ) => {
    handleOnChangeCoupon(
      coupon,
      setNormalCouponSelect,
      normalSelectPercentage,
      setStackableOption,
      stackableOptions,
    );
  };

  const onChangeStackableCoupon = (
    coupon: MultiValue<SelectCoupon> | SingleValue<SelectCoupon>,
  ) => {
    handleOnChangeCoupon(
      coupon,
      setStackableCouponSelect,
      stackablePercentage,
      setNormalOption,
      normalOptions,
    );
  };

  return (
    <div className="mt-11 flex flex-col gap-2">
      <CouponSelect
        options={normalOption}
        type="NOMAL"
        selectValue={normalCouponSelect}
        onChange={onChangeNormalCoupon}
      />
      <CouponSelect
        options={stackableOption}
        type="STACKABLE"
        selectValue={stackableCouponSelect}
        onChange={onChangeStackableCoupon}
      />

      {normalCouponSelect.length > 0 && (
        <Coupon
          coupon={normalCouponSelect[0].value}
          type="user"
          cancelSelectedCoupon={() => onChangeNormalCoupon([])}
        />
      )}
      {stackableCouponSelect.length > 0 && (
        <Coupon
          coupon={stackableCouponSelect[0].value}
          type="user"
          cancelSelectedCoupon={() => onChangeStackableCoupon([])}
        />
      )}
    </div>
  );
};

export default CouponClient;
