import { useEffect, useState } from 'react';
import CouponSelect from './CouponSelect';
import InstructorCoupon from '@/components/Coupon/InstructorCoupon';
import { SelectCoupon, SelectCoupons, couponGET } from '@/types/coupon';

const sortCoupons = (selected: SelectCoupons): SelectCoupons => {
  return selected.sort(({ value: aValue }, { value: bValue }) => {
    if (aValue.unit === '%' && bValue.unit !== '%') return -1;
    if (aValue.unit !== '%' && bValue.unit === '%') return 1;
    if (aValue.unit === '%' && bValue.unit === '%') {
      return bValue.discount - aValue.discount;
    }
    return 0;
  });
};

const calculateDiscountedPrice = (
  acc: number,
  { value }: SelectCoupon,
): number => {
  const { unit, discount, maxDiscountAmount } = value;

  const initialPrice =
    unit === '%' ? acc * ((100 - discount) / 100) : acc - discount;

  if (maxDiscountAmount) {
    if (unit !== '%' && maxDiscountAmount < discount) {
      const priceWithMaxDiscount = acc - maxDiscountAmount;
      return Math.min(acc - maxDiscountAmount, priceWithMaxDiscount);
    }
    return Math.min(acc - maxDiscountAmount, initialPrice);
  }

  return initialPrice;
};

interface AppliedCouponDisplayProps {
  isCouponSectionOpen: boolean;
  couponList: couponGET[];
}

const AppliedCouponDisplay = ({
  isCouponSectionOpen,
  couponList,
}: AppliedCouponDisplayProps) => {
  const [selectCoupons, setSelectCoupons] = useState<SelectCoupons>([]);
  const [discountedMinPrice, setDiscountedMinPrice] = useState(0);

  const couponOptions = couponList.map((option) => {
    return { value: option, label: option.title };
  });

  return (
    <section className={`${!isCouponSectionOpen ? 'hidden' : ''} flex gap-10`}>
      <h2 className="w-1/6 font-semibold">적용할 쿠폰</h2>
      <div className="flex w-5/6 flex-wrap gap-5">
        <div className="w-96">
          <CouponSelect
            options={couponOptions.filter(
              ({ value }) =>
                value.isStackable !== selectCoupons[0]?.value.isStackable &&
                selectCoupons.length !== 2,
            )}
            selectedOptionsLength={selectCoupons.length}
            onChange={(selected) => {
              setSelectCoupons(Array.isArray(selected) ? [...selected] : []);
            }}
          />
        </div>
        {selectCoupons.map(({ value }, index) => {
          return <InstructorCoupon key={value.title + index} {...value} />;
        })}
      </div>
    </section>
  );
};

export default AppliedCouponDisplay;
