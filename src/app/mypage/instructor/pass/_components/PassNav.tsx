import Link from 'next/link';
import React from 'react';
import { PassSVG } from '@/icons/svg';
import Button from '@/components/Button/Button';

interface PassNavProps {
  couponCount: number;
  passCount: number;
}

const PassNav = ({ couponCount, passCount }: PassNavProps) => {
  return (
    <nav className="flex justify-between pb-2">
      <div className="flex items-center gap-2 sm:gap-6">
        <Link
          href="/mypage/instructor/coupon"
          className="text-xl font-bold text-gray-500 sm:text-2xl"
        >
          쿠폰({couponCount ?? 0})
        </Link>
        <button className="flex text-xl font-bold sm:text-2xl" disabled={true}>
          패스권({passCount ?? 0})
        </button>
      </div>

      <div className="w-[8rem]">
        <Button>
          <Link
            href={{
              pathname: '/mypage/instructor/pass/management',
            }}
            className="flex"
          >
            <PassSVG className="mr-1 fill-sub-color1 group-active:fill-white" />
            패스권 생성
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default PassNav;
