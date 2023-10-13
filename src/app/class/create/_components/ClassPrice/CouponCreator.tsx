import CouponOption from '@/components/Coupon/CreateCoupon/CouponOption';

const CouponCreator = () => {
  return (
    <section className="relative">
      <CouponOption />
      <button className="absolute bottom-0 right-5 h-7 w-[5.375rem] rounded-md bg-sub-color1 text-white">
        생성하기
      </button>
    </section>
  );
};

export default CouponCreator;
