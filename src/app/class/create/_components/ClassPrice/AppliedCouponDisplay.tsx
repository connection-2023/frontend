import ReactSelect from '@/components/Select/ReactSelect';
import InstructorCoupon from '@/components/Coupon/InstructorCoupon';

const AppliedCouponDisplay = ({
  isCouponSectionOpen,
}: {
  isCouponSectionOpen: boolean;
}) => {
  const couponOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <>
      <section
        className={`${!isCouponSectionOpen ? 'hidden' : ''} flex gap-10`}
      >
        <h2 className="w-1/6 font-semibold">적용할 쿠폰</h2>
        <div className="flex w-5/6 flex-wrap gap-5">
          <div className="w-96">
            <ReactSelect
              instanceId="select-coupon"
              options={couponOptions}
              placeholder="적용할 쿠폰 선택"
              noOptionsMessage="적용 가능한 쿠폰이 없습니다"
            />
          </div>
          <InstructorCoupon />
          <InstructorCoupon />
        </div>
      </section>

      <section className="flex items-center">
        <h2 className="mr-7 font-semibold">최대 할인된 클래스 금액</h2>
        <input
          type="number"
          readOnly
          className="mr-1 h-7 w-20 rounded-md border border-solid border-sub-color2"
        />
        원
      </section>
    </>
  );
};

export default AppliedCouponDisplay;
