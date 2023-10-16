'use client';
import { ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import ClassInfo from './ClassPrice/ClassInfo';
import CouponButton from './ClassPrice/CouponButton';
import CouponCreator from './ClassPrice/CouponCreator';
import AppliedCouponDisplay from './ClassPrice/AppliedCouponDisplay';
import { CouponData, couponGET } from '@/types/coupon';
import { dummyCouponList } from '@/constants/dummy';

const ClassPrice = () => {
  const [classPrice, setClassPrice] = useState(0);
  const [isCouponSectionOpen, setIsCouponSectionOpen] = useState(false);
  const [couponList, setCouponList] = useState<couponGET[] | []>(
    dummyCouponList,
  ); //추후 적용 api로 받아올 예정

  const toggleCouponSection = () => {
    setIsCouponSectionOpen((prev) => !prev);
  };

  const changeClassPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    } else {
      setClassPrice(value);
    }
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
      <ClassInfo changeClassPrice={changeClassPrice} />

      <section className="flex flex-col gap-7 border-y border-solid border-sub-color1 py-5">
        <CouponButton
          isCouponSectionOpen={isCouponSectionOpen}
          toggleCouponSection={toggleCouponSection}
        />

        <CouponCreator
          isCouponSectionOpen={isCouponSectionOpen}
          changeCouponList={changeCouponList}
        />

        {isCouponSectionOpen && <hr className="border-sub-color2" />}

        <AppliedCouponDisplay
          isCouponSectionOpen={isCouponSectionOpen}
          couponList={couponList}
          classPrice={classPrice}
        />
      </section>
    </>
  );
};

export default ClassPrice;
