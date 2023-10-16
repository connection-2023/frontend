import React from 'react';
import { ArrowDownSVG, CouponSVG } from '../../../../../../public/icons/svg';

interface CouponButtonProps {
  toggleCouponSection: () => void;
  isCouponSectionOpen: Boolean;
}

const CouponButton = ({
  toggleCouponSection,
  isCouponSectionOpen,
}: CouponButtonProps) => {
  return (
    <button className="flex items-center gap-2" onClick={toggleCouponSection}>
      <CouponSVG className="h-6 w-6 fill-sub-color1" />
      <h2 className="text-lg font-semibold">쿠폰 생성/적용</h2>
      <ArrowDownSVG
        className={`h-9 w-9 fill-black ${isCouponSectionOpen && 'rotate-180'}`}
      />
    </button>
  );
};

export default CouponButton;
