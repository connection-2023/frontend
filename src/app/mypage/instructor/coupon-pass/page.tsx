import { redirect } from 'next/navigation';
import { LECTURE_COUPON_TAKE, LECTURE_PASS_TAKE } from '@/constants/constants';
import { getMyLecture } from '@/lib/apis/serverApis/classApi';
import { getCouponList } from '@/lib/apis/serverApis/couponApis';
import { getIssuedPassList } from '@/lib/apis/serverApis/passApis';
import { mapItemToCoupon } from '@/utils/apiDataProcessor';
import CouponView from './_components/CouponView';
import PassView from './_components/PassView';
import { OptionType, couponGET } from '@/types/coupon';
import { IpassData } from '@/types/pass';

const CouponPassPage = async ({
  searchParams,
}: {
  searchParams: { state: 'pass' | 'coupon' };
}) => {
  if (searchParams.state !== 'pass' && searchParams.state !== 'coupon') {
    redirect('/404');
  }

  let myClassListsOption;
  let couponCount = 0;
  let passCount = 0;
  let couponList: couponGET[] = [];
  let passList: IpassData[] = [];

  const couponInfo = await getCouponInfo();

  myClassListsOption = couponInfo?.myClassListsOption ?? [];
  couponCount = couponInfo?.CouponCount ?? 0;
  passCount = couponInfo?.passCount ?? 0;
  passList = couponInfo?.passList ?? [];
  couponList = couponInfo?.couponList ?? [];

  if (searchParams.state === 'coupon') {
    return (
      <CouponView
        myLectureList={myClassListsOption ?? []}
        couponList={couponList ?? []}
        totalItemCount={couponCount}
        passCount={passCount}
      />
    );
  }

  return (
    <PassView
      myLectureList={myClassListsOption ?? []}
      passList={passList ?? []}
      totalItemCount={passCount}
      couponCount={passCount}
    />
  );
};

export default CouponPassPage;

const getCouponInfo = async () => {
  let myClassListsOption;
  let CouponCount = 0;
  let passCount = 0;
  let couponList: couponGET[] = [];
  let passList: IpassData[] = [];

  try {
    const reqCouponData = {
      take: LECTURE_COUPON_TAKE,
      couponStatusOption: 'AVAILABLE' as 'AVAILABLE',
      filterOption: 'LATEST' as 'LATEST',
    };

    const reqPassData = {
      take: LECTURE_PASS_TAKE,
      passStatusOptions: 'AVAILABLE' as 'AVAILABLE',
      filterOption: 'LATEST' as 'LATEST',
    };

    const resultCoupon = await getCouponList(reqCouponData, 'lecturer');
    const { itemList, totalItemCount } = await getIssuedPassList(
      reqPassData,
      'lecturer',
    );
    passList = itemList;
    passCount = totalItemCount;

    if (resultCoupon) {
      const { totalItemCount: resTotalItemCount, itemList: resCouponList } =
        resultCoupon;
      CouponCount = resTotalItemCount;

      couponList = resCouponList.map(mapItemToCoupon);
    }

    const resLectureLists = await getMyLecture();

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

    return { CouponCount, couponList, passCount, myClassListsOption, passList };
  } catch (error) {
    console.error(error);
  }
};
