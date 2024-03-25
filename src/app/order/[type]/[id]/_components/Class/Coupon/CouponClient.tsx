'use client';
import { useEffect, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { toast } from 'react-toastify';
import { usePaymentStore } from '@/store';
import CouponSelect from './CouponSelect';
import Coupon from '@/components/Coupon/Coupon';
import { SelectCoupon } from '@/types/coupon';

interface CouponClient {
  normalOptions: SelectCoupon[];
  stackableOptions: SelectCoupon[];
  normalCoupon: SelectCoupon[];
  stackableCoupon: SelectCoupon[];
  price: number;
}

const CouponClient = ({
  normalOptions,
  stackableOptions,
  normalCoupon = [],
  stackableCoupon = [],
  price: originalPrice,
}: CouponClient) => {
  const applyClass = usePaymentStore((state) => state.applyClass);
  const { setPass, setCoupon, pass } = usePaymentStore((state) => ({
    setPass: state.setPass,
    setCoupon: state.setCoupon,
    pass: state.pass,
  }));

  const price = originalPrice * (applyClass?.participants ?? 1);

  const [normalCouponSelect, setNormalCouponSelect] = useState(normalCoupon);
  const [stackableCouponSelect, setStackableCouponSelect] =
    useState(stackableCoupon);

  const calculateDiscount = (couponSelect: SelectCoupon[], price: number) => {
    if (couponSelect.length === 0) return 0;

    const coupon = couponSelect[0].value;
    const isPercentage = !!coupon.percentage;

    if (!isPercentage) return coupon.discountPrice;

    const maxDiscountPrice = coupon.maxDiscountPrice;
    const discountPrice = (price * coupon.percentage) / 100;

    return maxDiscountPrice && discountPrice > maxDiscountPrice
      ? maxDiscountPrice
      : discountPrice;
  };

  useEffect(() => {
    const normalCouponDiscount = calculateDiscount(normalCouponSelect, price);
    const stackableCouponDiscount = calculateDiscount(
      stackableCouponSelect,
      price,
    );

    const coupon = {
      discountPrice: normalCouponDiscount + stackableCouponDiscount,
      couponId: normalCouponSelect[0]?.value.lectureCouponId ?? null,
      stackableCouponId:
        stackableCouponSelect[0]?.value.lectureCouponId ?? null,
    };

    setCoupon(coupon);
    if (normalCouponSelect.length > 0 || stackableCouponSelect.length > 0) {
      setPass(null);
    }
  }, [normalCouponSelect, stackableCouponSelect, price]);

  useEffect(() => {
    if (pass) {
      setNormalCouponSelect((prev) => (prev.length > 0 ? [] : prev));
      setStackableCouponSelect((prev) => (prev.length > 0 ? [] : prev));
    }
  }, [pass]);

  const onChangeNormalCoupon = (
    coupon: MultiValue<SelectCoupon> | SingleValue<SelectCoupon>,
  ) => {
    handleOnChangeCoupon(
      coupon,
      setNormalCouponSelect,
      setStackableCouponSelect,
    );
  };

  const onChangeStackableCoupon = (
    coupon: MultiValue<SelectCoupon> | SingleValue<SelectCoupon>,
  ) => {
    handleOnChangeCoupon(
      coupon,
      setStackableCouponSelect,
      setNormalCouponSelect,
    );
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

      <div className="mt-5 flex flex-wrap justify-evenly gap-4">
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
    </div>
  );
};

export default CouponClient;

const handleOnChangeCoupon = (
  coupon: MultiValue<SelectCoupon> | SingleValue<SelectCoupon>,
  setSelectCoupon: React.Dispatch<React.SetStateAction<SelectCoupon[]>>,
  setAnotherSelectCoupon: React.Dispatch<React.SetStateAction<SelectCoupon[]>>,
) => {
  if (!coupon) {
    setSelectCoupon([]);
    return;
  }

  if ('value' in coupon && !!coupon.value.percentage) {
    let changeAnotherCoupon = false;

    setAnotherSelectCoupon((coupon) => {
      if (coupon.length > 0 && coupon[0].value.percentage) {
        changeAnotherCoupon = true;
        return [];
      }
      return coupon;
    });

    if (changeAnotherCoupon) {
      toast.error('퍼센트 쿠폰은 하나만 적용이 가능합니다.');
    }
  }

  const newValue = Array.isArray(coupon) ? coupon : [coupon];
  setSelectCoupon(newValue);
};
