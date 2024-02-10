'use client';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { getCouponLists } from '@/lib/apis/couponApis';
import { useClassCreateStore } from '@/store/classCreate';
import formatDate from '@/utils/formatDate';
import AppliedCouponDisplay from './ClassPrice/AppliedCouponDisplay';
import ClassInfo from './ClassPrice/ClassInfo';
import CouponButton from './ClassPrice/CouponButton';
import CouponCreator from './ClassPrice/CouponCreator';
import { couponGET, createCoupon } from '@/types/coupon';

const ClassPrice = () => {
  const { classData } = useClassCreateStore((state) => ({
    classData: state.classData,
  }));
  const [isCouponSectionOpen, setIsCouponSectionOpen] = useState(false);
  const [couponList, setCouponList] = useState<couponGET[]>([]);
  const { getValues, setValue } = useFormContext();

  useEffect(() => {
    const reqData = {
      take: 10000, //추후 null로 변경
      couponStatusOption: 'AVAILABLE' as 'AVAILABLE',
      filterOption: 'LATEST' as 'LATEST',
    };

    getCouponLists(reqData, 'lecturer').then((data) => {
      data.itemList?.map((coupon) => {
        coupon.startAt = formatDate(coupon.startAt);
        coupon.endAt = formatDate(coupon.endAt);
        return coupon;
      });

      setCouponList(data.itemList ?? []);
    });
  }, []);

  const toggleCouponSection = () => {
    setIsCouponSectionOpen((prev) => !prev);
  };

  const changeCouponList = (couponOption: createCoupon) => {
    const formattedCoupon: couponGET = {
      ...couponOption,
      startAt: formatDate(couponOption.startAt),
      endAt: formatDate(couponOption.endAt),
      lectureCouponTarget: couponOption.lectureCouponTarget.map(
        ({ value, label }) => ({ lecture: { id: value, title: label } }),
      ),
    };

    setValue('coupons', [
      ...(getValues('coupons') || []),
      { value: formattedCoupon, label: formattedCoupon.title },
    ]);
    setCouponList((couponList) => [formattedCoupon, ...couponList]);
  };

  return (
    <>
      <ClassInfo classData={classData} />

      <section
        className={`flex flex-col border-y-2 border-solid border-sub-color1 py-5 ${
          isCouponSectionOpen && 'gap-7'
        } `}
      >
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
