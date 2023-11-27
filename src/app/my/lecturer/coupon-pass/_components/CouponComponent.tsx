import InstructorCoupon from '@/components/Coupon/InstructorCoupon';
import { couponGET } from '@/types/coupon';

const CouponComponent = ({ couponList }: { couponList: couponGET[] }) => {
  return (
    <>
      {couponList.map((coupon) => (
        <InstructorCoupon key={coupon.id} coupon={coupon} />
      ))}
    </>
  );
};

export default CouponComponent;
