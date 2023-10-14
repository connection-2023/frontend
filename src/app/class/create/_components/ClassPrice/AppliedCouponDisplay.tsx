import { useState } from 'react';
import InstructorCoupon from '@/components/Coupon/InstructorCoupon';
import { couponGET } from '@/types/coupon';
import CouponSelect from './CouponSelect';

interface AppliedCouponDisplayProps {
  isCouponSectionOpen: boolean;
  couponList: couponGET[] | [];
}

const AppliedCouponDisplay = ({
  isCouponSectionOpen,
  couponList,
}: AppliedCouponDisplayProps) => {
  const [selectCoupons, setSelectCoupons] = useState<
    { value: couponGET; label: string }[]
  >([]);

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
              options={couponOptions}
              selectedOptionsLength={selectCoupons.length}
              onChange={(selected) =>
                // setSelectCoupons(
                //   Array.isArray(selected) ? selected : [selected],
                // )
                setSelectCoupons(selected)
              }
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
          readOnly
          className="mr-1 h-7 w-20 rounded-md border border-solid border-sub-color2"
        />
        원
      </section>
    </>
  );
};

export default AppliedCouponDisplay;
