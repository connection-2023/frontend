'use client';
import { useEffect, useState } from 'react';
import { dummyStudentCouponList } from '@/constants/dummy';
import useCouponStore from '@/store/my-coupon';
import CoponNav from './_components/CoponNav';
import StudentCoupon from '@/components/Coupon/StudentCoupon';

const PassCouponPage = () => {
  const [isInterested, setIsInterested] = useState(true);

  const { selectedOption, sortOption, selectClassFilter } = useCouponStore();

  useEffect(() => {
    if (selectClassFilter.length < 1) {
      // 클래스 리스트 zustand에 초기 값 받기
    }
    //else 쿠폰 받아오는 api 로직
  }, [selectedOption, sortOption, selectClassFilter]);

  return (
    <main className="mx-auto flex w-full flex-col p-4 text-sm">
      <nav className="mb-2 flex gap-6">
        <button
          className={`flex text-2xl font-bold hover:text-black ${
            !isInterested && 'text-sub-color2'
          }`}
          onClick={() => setIsInterested(true)}
        >
          쿠폰({4})
        </button>
        <button
          className={`text-2xl font-bold hover:text-black ${
            isInterested && 'text-sub-color2'
          }`}
          onClick={() => setIsInterested(false)}
        >
          패스권({4})
        </button>
      </nav>

      <CoponNav />

      <section className="flex flex-wrap gap-4">
        {dummyStudentCouponList.map((coupon, index) => (
          <StudentCoupon key={coupon.title + index} {...coupon} />
        ))}
      </section>
    </main>
  );
};

export default PassCouponPage;
