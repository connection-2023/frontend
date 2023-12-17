import { useWindowSize } from 'react-use';
import Coupon from '@/components/Coupon/Coupon';
import { couponGET } from '@/types/coupon';

interface CouponComponentProps {
  couponList: couponGET[];
  lastItemElementRef: (node: HTMLElement | null) => void;
  totalItemCount: number;
  type: 'user' | 'lecturer';
  expiration: 'AVAILABLE' | 'DISABLED' | 'USED' | 'EXPIRED';
}

const CouponComponent = ({
  couponList,
  lastItemElementRef,
  totalItemCount,
  type,
  expiration,
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
            expiration={expiration === 'DISABLED'}
          />
        ) : (
          <Coupon
            key={coupon.id}
            coupon={coupon}
            type={type}
            expiration={expiration === 'DISABLED'}
          />
        );
      })}
    </>
  );
};

export default CouponComponent;
