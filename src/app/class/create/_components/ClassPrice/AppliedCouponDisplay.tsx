import { useEffect, useState } from 'react';
import { getLecturerCoupons } from '@/lib/apis/couponApis';
import CouponSelect from './CouponSelect';
import InstructorCoupon from '@/components/Coupon/InstructorCoupon';
import { SelectCoupons, couponGET } from '@/types/coupon';

interface AppliedCouponDisplayProps {
  isCouponSectionOpen: boolean;
  couponList: couponGET[];
}

const AppliedCouponDisplay = ({
  isCouponSectionOpen,
  couponList,
}: AppliedCouponDisplayProps) => {
  const [selectCoupons, setSelectCoupons] = useState<SelectCoupons>([]);
  const [couponLists, setCouponLists] = useState([]);

  useEffect(() => {
    const reqData = {
      take: 10000,
      firstItemId: 1,
      issuedCouponStatusOptions: 'AVAILABLE' as 'AVAILABLE',
      filterOption: 'LATEST' as 'LATEST',
    };
    getLecturerCoupons(reqData).then((data) => console.log(data));
  }, []);

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
