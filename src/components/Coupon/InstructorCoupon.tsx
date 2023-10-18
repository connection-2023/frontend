import { couponGET } from '@/types/coupon';

const InstructorCoupon = ({
  discount,
  title,
  startAt,
  endAt,
  unit,
}: couponGET) => {
  return (
    <dl className="shadow-float flex h-[5.625rem] w-60 flex-col justify-evenly gap-1 px-3">
      <dt className="text-xl font-bold text-main-color">
        {discount}
        {unit}
      </dt>
      <dd className="text-sm">
        <div className="truncate">{title}</div>
        <span>
          {startAt} - {endAt}
        </span>
      </dd>
    </dl>
  );
};

export default InstructorCoupon;
