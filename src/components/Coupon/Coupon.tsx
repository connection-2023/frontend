import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import { EditSVG, LinkSVG } from '@/icons/svg';
import { deleteCoupon, getPrivateCode } from '@/lib/apis/couponApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import formatDate from '@/utils/formatDate';
import UniqueButton from '../Button/UniqueButton';
import { couponGET } from '@/types/coupon';
import { FetchError } from '@/types/types';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
interface CouponProps {
  coupon: couponGET;
  cancelSelectedCoupon?: () => void;
  editEventHandler?: () => void;
  lastItemElementRef?: (node: HTMLElement | null) => void;
  type?: 'user' | 'lecturer';
  expiration?: boolean;
  edit?: boolean;
}

const Coupon = ({
  coupon,
  cancelSelectedCoupon,
  lastItemElementRef,
  type = 'lecturer',
  expiration = false,
  edit = true,
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
    lectureCouponId,
  } = coupon;

  const router = useRouter();
  const startAt = formatDate(startDate);
  const endAt = formatDate(endDate);

  const [classListsView, setClassListsView] = useState(false);
  const classListRef = useRef(null);
  const pathname = usePathname();

  useClickAway(classListRef, () => {
    setClassListsView(false);
  });

  const getPrivateCouponCodeAction = async () => {
    const { privateCouponCode } = await getPrivateCode(id);
    const userStoreState = useUserStore.getState();

    const lecturerInfo = userStoreState.authUser;

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
  };

  const getPrivateCouponCodeHandler = async () => {
    try {
      await getPrivateCouponCodeAction();
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await getPrivateCouponCodeAction();
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  const deleteCouponHandler = async (couponID?: number) => {
    if (!couponID) return toast.error('잘못된 요청입니다!');

    try {
      if (
        confirm(`쿠폰명: '${title}'
해당 쿠폰을 삭제 하시겠습니까?`)
      ) {
        await deleteCoupon(couponID, type);
        toast.success(`${title} 쿠폰 제거 완료`);
        router.refresh();
      }
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await deleteCoupon(couponID, type);
            toast.success(`${title} 쿠폰 제거 완료`);
            router.refresh();
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  return (
    <dl
      className={`relative flex w-[20.5rem] flex-col justify-evenly gap-1 rounded-md p-3 shadow-float sm:w-[18.125rem] ${
        pathname.startsWith('/mypage') || pathname.startsWith('/class/create')
          ? 'lg:w-[20.5rem] xl:w-[19rem]'
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
            <button onClick={getPrivateCouponCodeHandler}>
              <LinkSVG className="fill-black" />
            </button>
          )}
        </div>

        {edit &&
          (pathname.startsWith('/class') ? (
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
                pathname: '/mypage/instructor/coupon/management',
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
                onClick={() => deleteCouponHandler(lectureCouponId)}
                size="small"
                color="secondary"
              >
                <p className="mx-2">삭제</p>
              </UniqueButton>
            </div>
          ))}
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
      <dd className="flex flex-wrap gap-2 text-sm ">
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
