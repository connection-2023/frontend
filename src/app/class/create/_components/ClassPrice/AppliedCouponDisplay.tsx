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
  classPrice: number;
}

const AppliedCouponDisplay = ({
  isCouponSectionOpen,
  couponList,
  classPrice,
}: AppliedCouponDisplayProps) => {
  const [selectCoupons, setSelectCoupons] = useState<SelectCoupons>([]);
  const [discountedMinPrice, setDiscountedMinPrice] = useState(0);

  useEffect(() => {
    calculateMaxDiscount(selectCoupons);
  }, [classPrice]);

  const calculateMaxDiscount = (selected: SelectCoupons): void => {
    if (!classPrice) return;

    const sortedSelectCoupons = sortCoupons(selected);

    const calculatedFinalPrice = sortedSelectCoupons.reduce(
      calculateDiscountedPrice,
      classPrice,
    );

    setDiscountedMinPrice(Math.max(0, calculatedFinalPrice));
  };

  const couponOptions = couponList.map((option) => {
    return { value: option, label: option.title };
  });

  return (
    <>
      <section
        className={`${!isCouponSectionOpen ? 'hidden' : ''} flex gap-10`}
      >
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
                if (Array.isArray(selected)) {
                  setSelectCoupons([...selected]);
                  calculateMaxDiscount([...selected]);
                } else {
                  setSelectCoupons([]);
                }
              }}
            />
          </div>
          {selectCoupons.map(({ value }, index) => {
            return <InstructorCoupon key={value.title + index} {...value} />;
          })}
        </div>
      </section>

      <section
        className={`${!isCouponSectionOpen ? 'hidden' : ''} flex items-center`}
      >
        <h2 className="mr-7 font-semibold">최대 할인된 클래스 금액</h2>
        <input
          type="number"
          value={selectCoupons.length > 0 ? discountedMinPrice : ''}
          readOnly
          className="mr-1 h-7 w-20 rounded-md border border-solid border-sub-color2 text-right focus:outline-none"
        />
        원
      </section>
    </>
  );
};

export default AppliedCouponDisplay;
