import { redirect } from 'next/navigation';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { getMyLecture } from '@/lib/apis/serverApis/classApi';
import { getCouponList } from '@/lib/apis/serverApis/couponApis';
import { mapItemToCoupon } from '@/utils/apiDataProcessor';
import CouponView from './_components/CouponView';
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
    <CouponView
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

const getCouponInfo = async (type: 'user' | 'lecturer') => {
  let myClassListsOption;
  let totalItemCount = 0;
  let passItemCount = 0;
  let couponList: couponGET[] = [];

  try {
    const reqData = {
      take: LECTURE_COUPON_TAKE,
      couponStatusOptions: 'AVAILABLE' as 'AVAILABLE',
      filterOption: 'LATEST' as 'LATEST',
    };

    const result = await getCouponList(reqData, type);

    if (result) {
      const { totalItemCount: resTotalItemCount, itemList: resCouponList } =
        result;
      totalItemCount = resTotalItemCount;

      couponList = resCouponList.map(mapItemToCoupon);
    }

    const resLectureLists =
      type === 'lecturer' ? await getMyLecture() : findClassList(couponList);

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

    //passItemCount 가져오는 로직 필요
    return { totalItemCount, couponList, passItemCount, myClassListsOption };
  } catch (error) {
    console.error(error);
  }
};

const findClassList = (couponList: couponGET[]) => {
  const lectureList = couponList.flatMap(({ lectureCouponTarget }) =>
    lectureCouponTarget.map(({ lecture }) => lecture),
  );

  const uniqueLectureList = Array.from(
    new Set(lectureList.map((lecture) => JSON.stringify(lecture))),
  ).map((lecture) => JSON.parse(lecture));

  return uniqueLectureList;
};
