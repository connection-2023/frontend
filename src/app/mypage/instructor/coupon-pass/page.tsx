import { redirect } from 'next/navigation';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { getMyLecture } from '@/lib/apis/serverApis/classApi';
import { getCouponList } from '@/lib/apis/serverApis/couponApis';
import { mapItemToCoupon } from '@/utils/apiDataProcessor';
import CouponView from './_components/CouponView';
import { OptionType, couponGET } from '@/types/coupon';

const CouponPassPage = async ({
  searchParams,
}: {
  searchParams: { state: 'pass' | 'coupon' };
}) => {
  if (searchParams.state !== 'pass' && searchParams.state !== 'coupon') {
    redirect('/404');
  }

  if (searchParams.state === 'coupon') {
    let myClassListsOption;
    let totalItemCount = 0;
    let passItemCount = 0;
    let couponList: couponGET[] = [];

    const couponInfo = await getCouponInfo();

    myClassListsOption = couponInfo?.myClassListsOption ?? [];
    totalItemCount = couponInfo?.totalItemCount ?? 0;
    passItemCount = couponInfo?.passItemCount ?? 0;
    couponList = couponInfo?.couponList ?? [];

    return (
      <CouponView
        myLectureList={myClassListsOption ?? []}
        couponList={couponList ?? []}
        totalItemCount={totalItemCount}
      />
    );
  }

  return <div>패스권</div>;
};

export default CouponPassPage;

const getCouponInfo = async () => {
  let myClassListsOption;
  let totalItemCount = 0;
  let passItemCount = 0;
  let couponList: couponGET[] = [];

  try {
    const reqData = {
      take: LECTURE_COUPON_TAKE,
      couponStatusOption: 'AVAILABLE' as 'AVAILABLE',
      filterOption: 'LATEST' as 'LATEST',
    };

    const result = await getCouponList(reqData, 'lecturer');

    if (result) {
      const { totalItemCount: resTotalItemCount, itemList: resCouponList } =
        result;
      totalItemCount = resTotalItemCount;

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

    //passItemCount 가져오는 로직 필요
    return { totalItemCount, couponList, passItemCount, myClassListsOption };
  } catch (error) {
    console.error(error);
  }
};
