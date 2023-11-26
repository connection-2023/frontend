import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { CloseSVG, EditSVG, LinkSVG } from '@/icons/svg';
import { couponGET } from '@/types/coupon';

interface InstructorCouponProps {
  coupon: couponGET;
  cancelSelectedCoupon: () => void;
}

const InstructorCoupon = ({
  coupon,
  cancelSelectedCoupon,
}: InstructorCouponProps) => {
  const {
    title,
    percentage,
    discountPrice,
    isPrivate,
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
    <dl className="relative flex w-80 flex-col justify-evenly gap-1 p-3 shadow-float">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <dt className="text-2xl font-bold text-main-color">
            {percentage
              ? percentage + '%'
              : discountPrice.toLocaleString() + '원'}
          </dt>
          {isPrivate && <LinkSVG className="fill-black" />}
        </div>
        <EditSVG className="h-4 w-4 fill-gray-500" />
      </div>
      <div className="flex gap-2">
        <dd
          className={`rounded-md px-2 py-0.5 text-sm ${
            isStackable
              ? 'bg-sub-color1-transparent text-sub-color1'
              : 'bg-gray-700'
          }`}
        >
          {isStackable ? '중복가능' : '중복불가'}
        </dd>
        {isPrivate && (
          <dd className="rounded-md bg-sub-color1-transparent px-2 py-0.5 text-sm text-sub-color1">
            일부공개
          </dd>
        )}
      </div>
      <dd className="w-full truncate text-sm">{title}</dd>
      <dd className="flex gap-2 text-sm">
        {startAt + '-' + endAt}
        <p className="text-gray-500">
          (최대할인 {maxDiscountPrice.toLocaleString()}원)
        </p>
      </dd>
      <span
        ref={classListRef}
        className="relative cursor-pointer text-gray-500 underline underline-offset-4"
        onClick={() => setClassListsView((prev) => !prev)}
      >
        {`적용 된 클래스(${lectureCouponTarget.length})`}
        {classListsView && lectureCouponTarget.length > 0 && (
          <div className="absolute top-5 z-10 flex min-w-[16rem] flex-col border border-solid border-gray-500 bg-white text-black">
            {lectureCouponTarget.map(({ lecture }, index) => {
              return (
                <Link
                  key={lecture.id + lecture.title + String(index)}
                  href={`/class/${lecture.id}`}
                  className="border-b border-solid border-gray-500 px-4 py-2 hover:bg-sub-color4"
                >
                  {lecture.title}
                </Link>
              );
            })}
          </div>
        )}
      </span>
      <button
        type="button"
        onClick={cancelSelectedCoupon}
        className="absolute left-0 top-0"
      >
        <CloseSVG className="h-4 w-4 stroke-black" />
      </button>
    </dl>
  );
};

export default InstructorCoupon;
