'use client';
import { format } from 'date-fns';
import { useState } from 'react';
import { dummyCouponList } from '@/constants/dummy';
import AppliedCouponDisplay from './ClassPrice/AppliedCouponDisplay';
import ClassInfo from './ClassPrice/ClassInfo';
import CouponButton from './ClassPrice/CouponButton';
import CouponCreator from './ClassPrice/CouponCreator';
import { CouponData, couponGET } from '@/types/coupon';

const ClassPrice = () => {
  const [isCouponSectionOpen, setIsCouponSectionOpen] = useState(false);
  const [couponList, setCouponList] = useState<couponGET[] | []>(
    dummyCouponList,
  ); //추후 적용 api로 받아올 예정

  const toggleCouponSection = () => {
    setIsCouponSectionOpen((prev) => !prev);
  };

  const changeCouponList = (couponOption: CouponData) => {
    const {
      couponName,
      discountValue,
      allowDuplicateCoupons,
      maxDiscountAmount,
      couponQuantity,
      validityPeriod,
    } = couponOption;
    const { from, to } = validityPeriod;

    const startDate = new Date(from);
    const endDate = new Date(to);

    const startAt = format(startDate, 'yyyy-MM-dd');
    const endAt = format(endDate, 'yyyy-MM-dd');

    const newCoupon = {
      title: couponName,
      discount: discountValue,
      isStackable: allowDuplicateCoupons,
      maxDiscountAmount,
      unit: couponQuantity,
      startAt,
      endAt,
    };

    setCouponList((couponList) => [...couponList, newCoupon]);
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
