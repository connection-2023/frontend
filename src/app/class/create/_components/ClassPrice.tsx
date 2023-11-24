'use client';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { dummyCouponList } from '@/constants/dummy';
import { getLecturerCoupons } from '@/lib/apis/couponApis';
import AppliedCouponDisplay from './ClassPrice/AppliedCouponDisplay';
import ClassInfo from './ClassPrice/ClassInfo';
import CouponButton from './ClassPrice/CouponButton';
import CouponCreator from './ClassPrice/CouponCreator';
import { CouponData, couponGET } from '@/types/coupon';

const ClassPrice = () => {
  const [isCouponSectionOpen, setIsCouponSectionOpen] = useState(false);
  const [couponList, setCouponList] = useState<couponGET[]>([]);

  useEffect(() => {
    const reqData = {
      take: 10000, //추후 null로 변경
      firstItemId: 1,
      issuedCouponStatusOptions: 'AVAILABLE' as 'AVAILABLE',
      filterOption: 'LATEST' as 'LATEST',
    };

    getLecturerCoupons(reqData).then((data) => setCouponList(data));
  }, []);

  const toggleCouponSection = () => {
    setIsCouponSectionOpen((prev) => !prev);
  };

  const changeCouponList = (couponOption: couponGET) => {
    setCouponList((couponList) => [...couponList, couponOption]);
  };

  return (
    <>
      <ClassInfo />

      <section className="flex flex-col gap-7 border-y border-solid border-sub-color1 py-5">
        <CouponButton
          isCouponSectionOpen={isCouponSectionOpen}
          toggleCouponSection={toggleCouponSection}
        />

        <CouponCreator
          isCouponSectionOpen={isCouponSectionOpen}
          changeCouponList={changeCouponList}
        />

        {isCouponSectionOpen && <hr className="border-gray-500" />}

        <AppliedCouponDisplay
          isCouponSectionOpen={isCouponSectionOpen}
          couponList={couponList}
        />
      </section>
    </>
  );
};

export default ClassPrice;
