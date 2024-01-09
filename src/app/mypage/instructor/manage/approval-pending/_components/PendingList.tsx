'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import DeclineModal from './DeclineModal';
import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';
import Dropdown from '@/components/Dropdown/Dropdown';
import ProfileImg from '@/components/ProfileImage/ProfileImage';

const PendingList = () => {
  const [isProfileMenuOpened, setIsProfileMenuOpened] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isDeclineModalOpened, setIseclineModalOpened] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const listRef = useRef(null);

  useClickAway(listRef, () => {
    setIsProfileMenuOpened(false);
  });

  const handleRequestClick = () => {};

  const handleApprove = () => {
    setIsApproved(true);
  };

  const handleApproveCancel = () => {
    setIsApproved(false);
  };

  const handleSubmitDeclineForm = () => {
    setIsDeclined(true);
    setIsApproved(true);
  };

  return (
    <li className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <ProfileImg size="small" src={null} label={false} />
        <div className="relative" ref={listRef}>
          <button
            onClick={() => setIsProfileMenuOpened(!isProfileMenuOpened)}
            className="cursor-pointer"
          >
            nickname
          </button>

          {isProfileMenuOpened && (
            <Dropdown
              options={[
                {
                  component: (
                    <Link href="" className="whitespace-nowrap text-sm">
                      프로필 보러가기
                    </Link>
                  ),
                },
                {
                  component: (
                    <Link href="" className="whitespace-nowrap text-sm">
                      채팅하기
                    </Link>
                  ),
                },
              ]}
              className="left-0 top-6"
            />
          )}
        </div>
      </div>

      <p>23.08/04 14:00-15:00</p>
      <p>010-1234-5678</p>
      <p>
        <span className="mr-2 w-14 text-sub-color1">현장결제</span>
        50,000원 (1명)
      </p>

      <button onClick={handleRequestClick} className="text-gray-300">
        요청사항
      </button>

      <div className="flex w-32 justify-between whitespace-nowrap text-sm">
        <div className="w-11">
          {isApproved ? (
            <UniqueButton
              color="secondary"
              size="medium"
              onClick={handleApproveCancel}
            >
              취소
            </UniqueButton>
          ) : (
            <Button
              color="secondary"
              size="medium"
              onClick={() => setIseclineModalOpened(true)}
            >
              거절
            </Button>
          )}
        </div>

        <div className="w-[4.5rem]">
          {isApproved ? (
            <div className="flex h-[35px] w-full items-center justify-center rounded-md bg-gray-300 text-white">
              {isDeclined ? '거절' : '승인완료'}
            </div>
          ) : (
            <Button color="default" size="medium" onClick={handleApprove}>
              승인
            </Button>
          )}
        </div>
      </div>

      <DeclineModal
        isDeclineModalOpened={isDeclineModalOpened}
        handleClosed={() => setIseclineModalOpened(false)}
        handleSubmitDeclineForm={handleSubmitDeclineForm}
      />
    </li>
  );
};

export default PendingList;
