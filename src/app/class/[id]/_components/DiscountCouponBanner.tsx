'use client';
import { useState } from 'react';
import Modal from 'react-modal';
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
        <Modal
          onRequestClose={() => {
            setIsOpened(false);
          }}
          isOpen={isOpened}
          style={customModalStyles}
          ariaHideApp={false}
        >
          {/* 쿠폰 목록 추가하기 */}
        </Modal>
      )}
    </>
  );
};

export default DiscountCouponBanner;

const customModalStyles: ReactModal.Styles = {
  content: {
    width: '80%',
    height: '27.5rem',
    maxWidth: '40.0625rem',
    padding: '1.2rem 0',
    zIndex: '40',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 1px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
};
