'use client';
import { useState } from 'react';
import ClassInfo from './ClassPrice/ClassInfo';
import CouponButton from './ClassPrice/CouponButton';
import CouponCreator from './ClassPrice/CouponCreator';
import AppliedCouponDisplay from './ClassPrice/AppliedCouponDisplay';
import { dummyCouponList } from '@/constants/dummy';

const ClassPrice = () => {
  const [isCouponSectionOpen, setIsCouponSectionOpen] = useState(false);
  const [couponList, setCouponList] = useState(dummyCouponList); //추후 적용 api로 받아올 예정

  const toggleCouponSection = () => {
    setIsCouponSectionOpen((prev) => !prev);
  };

  return (
    <>
      <ClassInfo />

      <section className="flex flex-col gap-7 border-y border-solid border-sub-color1 py-5">
        <CouponButton
          isCouponSectionOpen={isCouponSectionOpen}
          toggleCouponSection={toggleCouponSection}
        />

        <CouponCreator isCouponSectionOpen={isCouponSectionOpen} />

        {isCouponSectionOpen && <hr className="border-sub-color2" />}

        <AppliedCouponDisplay
          isCouponSectionOpen={isCouponSectionOpen}
          couponList={couponList}
        />
      </section>
    </>
  );
};

export default ClassPrice;
