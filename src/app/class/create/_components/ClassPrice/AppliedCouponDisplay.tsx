import { useEffect, useState } from 'react';
import InstructorCoupon from '@/components/Coupon/InstructorCoupon';
import { SelectCoupons, couponGET } from '@/types/coupon';
import CouponSelect from './CouponSelect';

interface AppliedCouponDisplayProps {
  isCouponSectionOpen: boolean;
  couponList: couponGET[] | [];
  classPrice: number;
}

const AppliedCouponDisplay = ({
  isCouponSectionOpen,
  couponList,
  classPrice,
}: AppliedCouponDisplayProps) => {
  const [selectCoupons, setSelectCoupons] = useState<SelectCoupons | []>([]);
  const [discountedMinPrice, setDiscountedMinPrice] = useState(0);

  useEffect(() => {
    calculateMaxDiscount(selectCoupons);
  }, [classPrice]);

  const calculateMaxDiscount = (selected: SelectCoupons) => {
    if (classPrice) {
      const sortedSelectCoupons = selected.sort(
        ({ value: aValue }, { value: bValue }) => {
          if (aValue.unit === '%' && bValue.unit !== '%') return -1;
          if (aValue.unit !== '%' && bValue.unit === '%') return 1;
          if (aValue.unit === '%' && bValue.unit === '%') {
            return bValue.discount - aValue.discount;
          }
          return 0;
        },
      );
      setDiscountedMinPrice(
        sortedSelectCoupons.reduce((acc, { value }) => {
          if (value.unit === '%') {
            return acc * ((100 - value.discount) / 100);
          } else {
            return acc - value.discount;
          }
        }, classPrice),
      );
    }
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

      <section className="flex items-center">
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
