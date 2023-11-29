import formatDate from '@/utils/formatDate';
import InstructorCoupon from '@/components/Coupon/InstructorCoupon';
import { couponGET } from '@/types/coupon';

interface CouponComponentProps {
  couponList: couponGET[];
  handleOpenCouponModal: (
    type: 'CREATE' | 'UPDATE',
    coupon?: couponGET,
  ) => void;
}

const CouponComponent = ({
  couponList,
  handleOpenCouponModal,
}: CouponComponentProps) => {
  return (
    <>
      {couponList.map((coupon) => {
        const customCoupon = {
          ...coupon,
          startAt: formatDate(coupon.startAt),
          endAt: formatDate(coupon.endAt),
        };

        return (
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
