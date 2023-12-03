import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { EditSVG, LinkSVG } from '@/icons/svg';
import formatDate from '@/utils/formatDate';
import Button from '../Button/Button';
import UniqueButton from '../Button/UniqueButton';
import { couponGET } from '@/types/coupon';

interface CouponProps {
  coupon: couponGET;
  cancelSelectedCoupon?: () => void;
  editEventHandler?: () => void;
  lastItemElementRef?: (node: HTMLElement | null) => void;
  type?: 'user' | 'lecturer';
}

const Coupon = ({
  coupon,
  cancelSelectedCoupon,
  lastItemElementRef,
  type = 'lecturer',
}: CouponProps) => {
  const {
    title,
    percentage,
    discountPrice,
    isPrivate,
    startAt: startDate,
    endAt: endDate,
    isStackable,
    maxDiscountPrice,
    lectureCouponTarget,
    id,
  } = coupon;

  const startAt = formatDate(startDate);
  const endAt = formatDate(endDate);

  const [classListsView, setClassListsView] = useState(false);
  const classListRef = useRef(null);
  const pathname = usePathname();

  useClickAway(classListRef, () => {
    setClassListsView(false);
  });

  return (
    <dl
      className="relative flex w-[20.5rem] flex-col justify-evenly gap-1 p-3 shadow-float sm:w-[18.125rem] lg:w-[20.5rem]"
      ref={lastItemElementRef}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <dt className="text-2xl font-bold text-main-color">
            {percentage
              ? percentage + '%'
              : discountPrice.toLocaleString() + '원'}
          </dt>
          {isPrivate && type === 'lecturer' && (
            <LinkSVG className="fill-black" />
          )}
        </div>

        {pathname === '/class/create' ? (
          <div className="text-sm">
            <UniqueButton
              type="button"
              onClick={cancelSelectedCoupon}
              size="small"
            >
              <p className="mx-2">적용취소</p>
            </UniqueButton>
          </div>
        ) : type === 'lecturer' ? (
          <Link
            href={{
              pathname: '/my/lecturer/coupon-pass/management',
              query: {
                type: 'UPDATE',
                state: 'coupon',
                coupon: JSON.stringify(coupon),
              },
            }}
          >
            <EditSVG className="h-4 w-4 fill-gray-500" />
          </Link>
        ) : (
          <div className="text-sm">
            <UniqueButton
              type="button"
              onClick={() => console.log('추후 삭제 api 추가', id)}
              size="small"
              color="secondary"
            >
              <p className="mx-2">삭제</p>
            </UniqueButton>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <dd
          className={`rounded-md px-2 py-0.5 text-sm ${
            isStackable
              ? 'bg-sub-color1-transparent text-sub-color1'
              : 'bg-black/10'
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
                  className="border-b border-solid border-gray-500 px-4 py-2 hover:bg-sub-color1-transparent"
                >
                  {lecture.title}
                </Link>
              );
            })}
          </div>
        )}
      </span>
    </dl>
  );
};

export default Coupon;
