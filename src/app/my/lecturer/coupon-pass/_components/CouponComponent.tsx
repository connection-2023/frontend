import { useWindowSize } from 'react-use';
import InstructorCoupon from '@/components/Coupon/InstructorCoupon';
import { couponGET } from '@/types/coupon';

interface CouponComponentProps {
  couponList: couponGET[];
  lastItemElementRef: (node: HTMLElement | null) => void;
  totalItemCount: number;
}

const CouponComponent = ({
  couponList,
  lastItemElementRef,
  totalItemCount,
}: CouponComponentProps) => {
  const { width } = useWindowSize();

  return (
    <>
      {couponList.map((coupon, index) => {
        return couponList.length === index + 1 &&
          couponList.length < totalItemCount ? (
          <InstructorCoupon
            key={coupon.id}
            coupon={coupon}
            lastItemElementRef={width < 640 ? lastItemElementRef : undefined}
          />
        ) : (
          <InstructorCoupon key={coupon.id} coupon={coupon} />
        );
      })}
    </>
  );
};

export default CouponComponent;
