import { useWindowSize } from 'react-use';
import Coupon from '@/components/Coupon/Coupon';
import { couponGET } from '@/types/coupon';

interface CouponComponentProps {
  couponList: couponGET[];
  lastItemElementRef: (node: HTMLElement | null) => void;
  totalItemCount: number;
  type: 'user' | 'lecturer';
}

const CouponComponent = ({
  couponList,
  lastItemElementRef,
  totalItemCount,
  type,
}: CouponComponentProps) => {
  const { width } = useWindowSize();

  return (
    <>
      {couponList.map((coupon, index) => {
        return couponList.length === index + 1 &&
          couponList.length < totalItemCount ? (
          <Coupon
            key={coupon.id}
            coupon={coupon}
            lastItemElementRef={width < 640 ? lastItemElementRef : undefined}
            type={type}
          />
        ) : (
          <Coupon key={coupon.id} coupon={coupon} type={type} />
        );
      })}
    </>
  );
};

export default CouponComponent;
