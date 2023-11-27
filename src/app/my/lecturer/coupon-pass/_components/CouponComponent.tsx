import formatDate from '@/utils/formatDate';
import InstructorCoupon from '@/components/Coupon/InstructorCoupon';
import { couponGET } from '@/types/coupon';

const CouponComponent = ({ couponList }: { couponList: couponGET[] }) => {
  return (
    <>
      {couponList.map((coupon) => {
        const coupo = {
          ...coupon,
          startAt: formatDate(coupon.startAt),
          endAt: formatDate(coupon.endAt),
        };

        return <InstructorCoupon key={coupon.id} coupon={coupo} />;
      })}
    </>
  );
};

export default CouponComponent;
