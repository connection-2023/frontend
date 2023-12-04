import { DownloadSVG } from '@/icons/svg';
import { couponGET } from '@/types/coupon';

const DownloadCoupon = ({ coupon }: { coupon: couponGET }) => {
  //   const {
  //     title,
  //     percentage,
  //     discountPrice,
  //     isPrivate,
  //     startAt: startDate,
  //     endAt: endDate,
  //     isStackable,
  //     maxDiscountPrice,
  //     lectureCouponTarget,
  //     id,
  //   } = coupon;

  return (
    <div className="relative flex h-[8.5rem] w-[21.8125rem] flex-col gap-1 bg-white px-4 pt-4 shadow-float">
      <div className="mb-2 flex items-center gap-2">
        <dt className="text-2xl font-bold text-main-color">1,000원</dt>
        <dd className={`rounded-md px-2 py-0.5 text-sm `}>
          {true ? '중복가능' : '중복불가'}
        </dd>
      </div>

      <dd className="w-3/4 truncate text-sm">
        제ddddddddddd에에에에에엥에에에목
      </dd>
      <dd className="flex gap-2 text-sm">
        21323123123
        <p className="text-gray-500">(최대 할인 1,000원)</p>
      </dd>
      <span className="relative cursor-pointer text-sm text-gray-500 underline underline-offset-4">
        적용가능한 클래스(1)
      </span>
      <button className="absolute right-[6%] top-1/2 -translate-y-1/2 transform">
        <DownloadSVG width="34" height="34" className="fill-main-color" />
      </button>
      <div className="absolute -top-3 right-[20%] z-10 h-[0.71rem] w-5 rounded-t-full bg-white" />
      <div className="absolute -top-3 right-[20%] z-0 h-[1.42rem] w-5 rounded-full bg-white shadow-[inset_0_-1px_2px_rgba(0,0,0,0.25)]" />
      <hr className="absolute right-[22.4%] top-7 h-20 border-l-[3px] border-dotted border-gray-500" />
      <div className="absolute -bottom-3 right-[20%] z-10 h-[0.71rem] w-5 rounded-b-full bg-white" />
      <div className="absolute -bottom-3 right-[20%] z-0 h-[1.42rem] w-5 rounded-full bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]" />
    </div>
  );
};

export default DownloadCoupon;
