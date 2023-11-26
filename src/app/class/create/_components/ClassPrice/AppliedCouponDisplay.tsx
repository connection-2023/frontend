import { Controller, useFormContext } from 'react-hook-form';
import CouponSelect from './CouponSelect';
import InstructorCoupon from '@/components/Coupon/InstructorCoupon';
import { classCreateData } from '@/types/class';
import { couponGET } from '@/types/coupon';

interface AppliedCouponDisplayProps {
  isCouponSectionOpen: boolean;
  couponList: couponGET[];
}

const AppliedCouponDisplay = ({
  isCouponSectionOpen,
  couponList,
}: AppliedCouponDisplayProps) => {
  const { control, watch } = useFormContext<classCreateData>();

  const couponOptions = couponList.map((option) => {
    return { value: option, label: option.title };
  });

  const selectCoupons = watch('coupons');

  return (
    <section className={`${!isCouponSectionOpen ? 'hidden' : ''} flex gap-10`}>
      <h2 className="w-1/6 font-semibold">적용할 쿠폰</h2>
      <div className="flex w-5/6 flex-wrap gap-5">
        <div className="w-full">
          <Controller
            name="coupons"
            control={control}
            render={({ field }) => (
              <CouponSelect options={couponOptions} onChange={field.onChange} />
            )}
          />
        </div>
        {selectCoupons &&
          selectCoupons.map(({ value }, index) => {
            const key = value.id ? value.id + String(index) : String(index);
            return <InstructorCoupon key={key} coupon={value} />;
          })}
      </div>
    </section>
  );
};

export default AppliedCouponDisplay;
