import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LECTURE_COUPON_TAKE } from '@/constants/constants';
import { getCouponList } from '@/lib/apis/serverApis/couponApis';
import { getUserPassList } from '@/lib/apis/serverApis/passApis';
import { mapItemToCoupon } from '@/utils/apiDataProcessor';
import CouponView from './_components/CouponView';
import PassView from './_components/PassView';
import { OptionType, couponGET } from '@/types/coupon';
import { userPassList } from '@/types/pass';

const CouponPassPage = async ({
  params,
}: {
  params: { ['coupon-pass']: 'pass' | 'coupon' };
}) => {
  if (params['coupon-pass'] !== 'pass' && params['coupon-pass'] !== 'coupon') {
    redirect('/404');
  }

  const couponPassInfo = await getCouponPassInfo();

  const myClassListsOption = couponPassInfo?.myClassListsOption ?? [];
  const totalItemCount = couponPassInfo?.totalItemCount ?? 0;
  const passItemCount = couponPassInfo?.passItemCount ?? 0;
  const couponList = couponPassInfo?.couponList ?? [];
  const passList = couponPassInfo?.passList ?? [];

  return (
    <section className="z-0 col-span-1 flex w-full flex-col bg-white px-2 pt-5 sm:px-5">
      <nav className="flex justify-between pb-2">
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            className={`flex text-xl font-bold sm:text-2xl ${
              params['coupon-pass'] === 'pass' && 'text-gray-500'
            }`}
            href="/mypage/user/coupon"
          >
            쿠폰({totalItemCount ?? 0})
          </Link>
          <Link
            className={`text-xl font-bold sm:text-2xl ${
              params['coupon-pass'] === 'coupon' && 'text-gray-500'
            }`}
            href="/mypage/user/pass"
          >
            패스권({passItemCount ?? 0})
          </Link>
        </div>
      </nav>
      {params['coupon-pass'] === 'coupon' ? (
        <CouponView
          myLectureList={myClassListsOption ?? []}
          couponList={couponList ?? []}
          totalItemCount={totalItemCount}
        />
      ) : (
        <PassView passList={passList} />
      )}
    </section>
  );
};

export default CouponPassPage;

const getCouponPassInfo = async () => {
  let myClassListsOption;
  let totalItemCount = 0;
  let passItemCount = 0;
  let couponList: couponGET[] = [];
  let passList: userPassList[] = [];

  try {
    const reqData = {
      take: LECTURE_COUPON_TAKE,
      couponStatusOption: 'AVAILABLE' as 'AVAILABLE',
      filterOption: 'LATEST' as 'LATEST',
    };

    const result = await getCouponList(reqData, 'user');

    if (result) {
      const { totalItemCount: resTotalItemCount, itemList: resCouponList } =
        result;
      totalItemCount = resTotalItemCount;

      couponList = resCouponList?.map(mapItemToCoupon) ?? [];
    }

    const resLectureLists = findClassList(couponList);

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

    const reqPassData = await getUserPassList(10000);

    passItemCount = reqPassData.totalItemCount;

    passList = reqPassData.userPassList;

    return {
      totalItemCount,
      couponList,
      passItemCount,
      myClassListsOption,
      passList,
    };
  } catch (error) {
    console.error(error);
    throw error;
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
