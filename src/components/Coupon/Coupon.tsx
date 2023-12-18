import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import { DOMAIN } from '@/constants/constants';
import { EditSVG, LinkSVG } from '@/icons/svg';
import { getPrivateCode } from '@/lib/apis/couponApis';
import { useUserStore } from '@/store';
import formatDate from '@/utils/formatDate';
import UniqueButton from '../Button/UniqueButton';
import { instructorProfile } from '@/types/auth';
import { couponGET } from '@/types/coupon';

interface CouponProps {
  coupon: couponGET;
  cancelSelectedCoupon?: () => void;
  editEventHandler?: () => void;
  lastItemElementRef?: (node: HTMLElement | null) => void;
  type?: 'user' | 'lecturer';
  expiration?: boolean;
}

const Coupon = ({
  coupon,
  cancelSelectedCoupon,
  lastItemElementRef,
  type = 'lecturer',
  expiration = false,
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

  const getPrivateCouponCode = async () => {
    try {
      const { privateCouponCode } = await getPrivateCode(id);
      const userStoreState = useUserStore.getState();

      const lecturerInfo = userStoreState.authUser as instructorProfile;

      const params = new URLSearchParams();
      params.append('lecturerInfo', JSON.stringify(lecturerInfo));

      params.append(
        'coupon',
        JSON.stringify({
          title,
          percentage,
          discountPrice,
          startAt,
          endAt,
          isStackable,
          maxDiscountPrice,
          lectureCouponTarget,
        }),
      );

      const link = `${DOMAIN}/coupon/${privateCouponCode}?${params.toString()}`;

      await navigator.clipboard.writeText(link);

      toast.success('쿠폰 다운로드 링크가 클립보드에 복사되었습니다.');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <dl
      className={`relative flex w-[20.5rem] flex-col justify-evenly gap-1 p-3 shadow-float sm:w-[18.125rem] ${
        pathname.startsWith('/my') || pathname.startsWith('/class/create')
          ? 'lg:w-[20.5rem]'
          : 'md:w-[20.5rem] lg:w-[17rem]'
      }`}
      ref={lastItemElementRef}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <dt
            className={`text-2xl font-bold ${
              expiration ? 'text-gray-300' : 'text-main-color'
            } `}
          >
            {percentage
              ? percentage + '%'
              : discountPrice.toLocaleString() + '원'}
          </dt>
          {!expiration && isPrivate && type === 'lecturer' && (
            <button onClick={getPrivateCouponCode}>
              <LinkSVG className="fill-black" />
            </button>
          )}
        </div>

        {pathname.startsWith('/class') ? (
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
        {maxDiscountPrice !== null &&
          maxDiscountPrice.toLocaleString() !== '0' && (
            <p className="text-gray-500">
              (최대할인 {maxDiscountPrice.toLocaleString()}원)
            </p>
          )}
      </dd>
      <span
        ref={classListRef}
        className="relative cursor-pointer text-gray-500 underline underline-offset-4"
        onClick={() => setClassListsView((prev) => !prev)}
      >
        {`적용${type === 'lecturer' ? ' 된' : '가능한'} 클래스(${
          lectureCouponTarget.length
        })`}
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
