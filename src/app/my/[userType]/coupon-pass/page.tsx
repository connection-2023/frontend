import { redirect } from 'next/navigation';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { getMyLecture } from '@/lib/apis/serverApis/classApi';
import { getLecturerCoupons } from '@/lib/apis/serverApis/couponApis';
import Coupon from './_components/Coupon';
import { OptionType, couponGET } from '@/types/coupon';

const CouponPassPage = async ({
  params,
  searchParams,
}: {
  params: { userType: 'user' | 'lecturer' };
  searchParams?: {
    state?: 'pass' | 'coupon';
  };
}) => {
  if (
    (params.userType !== 'user' && params.userType !== 'lecturer') ||
    (searchParams?.state !== 'pass' && searchParams?.state !== 'coupon')
  ) {
    redirect('/404');
  }

  let myClassListsOption;
  let totalItemCount = 0;
  let passItemCount = 0;
  let couponList: couponGET[] = [];

  if (searchParams?.state === 'coupon') {
    const couponInfo = await getCouponInfo(params.userType);

    myClassListsOption = couponInfo?.myClassListsOption ?? [];
    totalItemCount = couponInfo?.totalItemCount ?? 0;
    passItemCount = couponInfo?.passItemCount ?? 0;
    couponList = couponInfo?.couponList ?? [];
  } else if (searchParams?.state === 'pass') {
  }

  return searchParams?.state === 'coupon' ? (
    <Coupon
      myLectureList={myClassListsOption ?? []}
      couponList={couponList ?? []}
      totalItemCount={totalItemCount}
      userType={params.userType}
    />
  ) : (
    <div>패스권</div>
  );
};

export default CouponPassPage;

const getCouponInfo = async (type: string) => {
  let myClassListsOption;
  let totalItemCount = 0;
  let passItemCount = 0;
  let couponList: couponGET[] = [];

  try {
    const resLectureLists = type === 'lecturer' ? await getMyLecture() : [];

    myClassListsOption = resLectureLists.map(
      ({ id, title }): OptionType => ({
        value: id,
        label: title,
      }),
    );

    myClassListsOption.length > 0 &&
      myClassListsOption.unshift({
        value: 'select-all',
        label: `전체 클래스(${myClassListsOption.length})`,
      });

    const reqData = {
      take: LECTURE_COUPON_TAKE,
      issuedCouponStatusOptions: 'AVAILABLE' as 'AVAILABLE',
      filterOption: 'LATEST' as 'LATEST',
    };

    const result =
      type === 'lecturer'
        ? await getLecturerCoupons(reqData)
        : { totalItemCount: 0, itemList: [] };

    if (result) {
      const { totalItemCount: resTotalItemCount, itemList: resCouponList } =
        result;
      totalItemCount = resTotalItemCount;
      couponList = resCouponList;
    }

    //passItemCount 가져오는 로직 필요
    return { totalItemCount, couponList, passItemCount, myClassListsOption };
  } catch (error) {
    console.error(error);
  }
};
