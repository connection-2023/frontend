'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AlarmSVG, CloseSVG } from '@/icons/svg';

const UserReservation = ({ userReservation }: { userReservation: boolean }) => {
  const [isShow, setIsShow] = useState(userReservation);

  const handleClosed = () => {
    setIsShow(false);
  };

  return isShow ? (
    <div className="flex h-[2.8rem] w-screen items-center justify-center gap-2.5 rounded-md bg-main-color px-2.5 text-sm text-white md:w-1/2">
      <AlarmSVG width="19" height="19" className="fill-white" />
      <p>신청 내역이 있습니다.</p>

      <Link href="/my/" className="underline">
        더보기
      </Link>

      <button
        onClick={handleClosed}
        className="flex flex-1 justify-end"
        aria-label="닫기"
      >
        <CloseSVG width="21" height="21" className="stroke-white stroke-2" />
      </button>
    </div>
  ) : null;
};

export default UserReservation;
