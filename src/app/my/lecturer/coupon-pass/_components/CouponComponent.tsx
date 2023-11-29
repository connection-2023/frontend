import { useWindowSize } from 'react-use';
import formatDate from '@/utils/formatDate';
import InstructorCoupon from '@/components/Coupon/InstructorCoupon';
import { couponGET } from '@/types/coupon';

interface CouponComponentProps {
  couponList: couponGET[];
  handleOpenCouponModal: (
    type: 'CREATE' | 'UPDATE',
    coupon?: couponGET,
  ) => void;
  lastItemElementRef: (node: HTMLElement | null) => void;
  totalItemCount: number;
}

const CouponComponent = ({
  couponList,
  handleOpenCouponModal,
  lastItemElementRef,
  totalItemCount,
}: CouponComponentProps) => {
  const { width } = useWindowSize();

  return (
    <>
      {couponList.map((coupon, index) => {
        const customCoupon = {
          ...coupon,
          startAt: formatDate(coupon.startAt),
          endAt: formatDate(coupon.endAt),
        };

        return couponList.length === index + 1 &&
          couponList.length < totalItemCount ? (
          <InstructorCoupon
            key={coupon.id}
            coupon={customCoupon}
            editEventHandler={() => {
              handleOpenCouponModal('UPDATE', coupon);
            }}
            lastItemElementRef={width < 640 ? lastItemElementRef : undefined}
          />
        ) : (
          <InstructorCoupon
            key={coupon.id}
            coupon={customCoupon}
            editEventHandler={() => {
              handleOpenCouponModal('UPDATE', coupon);
            }}
          />
        );
      })}
    </>
  );
};

export default CouponComponent;
