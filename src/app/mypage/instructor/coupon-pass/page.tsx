import { redirect } from 'next/navigation';
import getCouponPassInfo from '@/utils/getInstructorCouponPassInfo';
import CouponView from './_components/CouponView';
import PassContainer from './_components/PassContainer';
import { couponGET } from '@/types/coupon';
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

  const couponInfo = await getCouponPassInfo();

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
    <PassContainer
      myLectureList={myClassListsOption ?? []}
      passList={passList ?? []}
      totalItemCount={passCount}
      couponCount={couponCount}
    />
  );
};

export default CouponPassPage;
