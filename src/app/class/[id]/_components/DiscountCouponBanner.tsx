'use client';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { DownloadSVG } from '@/icons/svg';

const DiscountCouponBanner = ({ discountPrice }: { discountPrice: string }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpened(true)}
        className="flex h-[2.2rem] w-full cursor-pointer items-center gap-0.5 rounded-md border border-solid border-sub-color1 px-2.5 text-sm font-medium text-sub-color1 md:justify-center"
      >
        <DownloadSVG width="21" height="21" className="fill-sub-color1" /> 최대
        {discountPrice}원 할인쿠폰 받기
      </div>
      {isOpened && (
        <Modal isOpened={isOpened} handleClosed={() => setIsOpened(false)}>
          {/* 쿠폰 목록 추가하기 */}
        </Modal>
      )}
    </>
  );
};

export default DiscountCouponBanner;
