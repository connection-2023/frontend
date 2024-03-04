import Link from 'next/link';
import React from 'react';
import { CouponSVG } from '@/icons/svg';
import Button from '@/components/Button/Button';

interface CouponNavProps {
  couponCount: number;
  passCount: number;
}

const CouponNav = ({ couponCount, passCount }: CouponNavProps) => {
  return (
    <nav className="flex justify-between pb-2">
      <div className="flex items-center gap-2 sm:gap-6">
        <button className="flex text-xl font-bold sm:text-2xl" disabled={true}>
          쿠폰({couponCount ?? 0})
        </button>
        <Link
          className="text-xl font-bold text-gray-500 sm:text-2xl"
          href="/mypage/instructor/pass"
        >
          패스권({passCount ?? 0})
        </Link>
      </div>

      <div className="w-[7.3rem]">
        <Button>
          <Link
            href={{
              pathname: '/mypage/instructor/coupon/management',
              query: { type: 'CREATE', state: 'coupon' },
            }}
            className="flex"
          >
            <CouponSVG className="mr-1 h-6 w-6 fill-sub-color1 group-active:fill-white" />
            쿠폰 생성
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default CouponNav;
