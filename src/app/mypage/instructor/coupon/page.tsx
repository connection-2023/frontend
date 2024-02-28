import React from 'react';
import getCouponPassInfo from '@/utils/getInstructorCouponPassInfo';
import CouponNav from './_components/CouponNav';
import CouponView from './_components/CouponView';
import { couponGET } from '@/types/coupon';

const CouponPage = async () => {
  const couponInfo = await getCouponPassInfo();

  const myClassListsOption = couponInfo?.myClassListsOption ?? [];
  const couponCount = couponInfo?.CouponCount ?? 0;
  const passCount = couponInfo?.passCount ?? 0;
  const couponList: couponGET[] = couponInfo?.couponList ?? [];

  return (
    <section className="z-0 flex w-full flex-col px-3 sm:px-6 md:px-9 xl:px-0">
      <div className="z-0 flex w-full flex-col rounded-lg bg-white p-5 shadow-float">
        <CouponNav couponCount={couponCount} passCount={passCount} />

        <CouponView
          myLectureList={myClassListsOption ?? []}
          couponList={couponList ?? []}
          totalItemCount={couponCount}
        />
      </div>
    </section>
  );
};

export default CouponPage;
