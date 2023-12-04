'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { DownloadSVG } from '@/icons/svg';
import formatDate from '@/utils/formatDate';
import { IprivateCoupon } from '@/types/coupon';

const DownloadCoupon = ({ coupon }: { coupon: IprivateCoupon }) => {
  const {
    title,
    percentage,
    discountPrice,
    startAt,
    endAt,
    isStackable,
    maxDiscountPrice,
    lectureCouponTarget,
  } = coupon;

  const [classListsView, setClassListsView] = useState(false);
  const classListRef = useRef(null);

  useClickAway(classListRef, () => {
    setClassListsView(false);
  });

  return (
    <div className="relative flex h-[8.5rem] w-[21.8125rem] flex-col gap-1 bg-white px-4 pt-4 shadow-float">
      <div className="mb-2 flex items-center gap-2">
        <dt className="text-2xl font-bold text-main-color">
          {percentage
            ? percentage + '%'
            : discountPrice.toLocaleString() + '원'}
        </dt>
        <dd
          className={`rounded-md px-2 py-0.5 text-sm ${
            isStackable
              ? 'bg-sub-color1-transparent text-sub-color1'
              : 'bg-black/10'
          }`}
        >
          {isStackable ? '중복가능' : '중복불가'}
        </dd>
      </div>

      <dd className="w-3/4 truncate text-sm">{title}</dd>
      <dd className="flex gap-2 text-sm">
        {startAt + '-' + endAt}
        {maxDiscountPrice.toLocaleString() !== '0' && (
          <p className="text-gray-500">
            (최대할인 {maxDiscountPrice.toLocaleString()}원)
          </p>
        )}
      </dd>
      <div
        ref={classListRef}
        className="relative cursor-pointer text-gray-500 underline underline-offset-4"
        onClick={() => setClassListsView((prev) => !prev)}
      >
        {`적용가능한 클래스(${lectureCouponTarget.length})`}
        {classListsView && lectureCouponTarget.length > 0 && (
          <div className="absolute top-5 z-20 flex min-w-[16rem] flex-col border border-solid border-gray-500 bg-white text-black">
            {lectureCouponTarget.map(({ lecture }) => {
              return (
                <Link
                  key={lecture.id + lecture.title}
                  href={`/class/${lecture.id}`}
                  className="border-b border-solid border-gray-500 px-4 py-2 hover:bg-sub-color1-transparent"
                >
                  {lecture.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
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
