'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import DeclineModal from './DeclineModal';
import PaymentInfoModal from './PaymentInfoModal';
import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';
import Dropdown from '@/components/Dropdown/Dropdown';
import ProfileImg from '@/components/ProfileImage/ProfileImage';

const PendingList = () => {
  const [isProfileMenuOpened, setIsProfileMenuOpened] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isDeclineModalOpened, setIsDeclineModalOpened] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [isRequestModalOpened, setIsRequestModalOpened] = useState(false);
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

  const profileOptions = [
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
  ];

  return (
    <>
      <li className="hidden w-full items-center justify-between md:flex">
        <div className="flex items-center gap-2">
          <ProfileImg size="small" src={null} label={false} />
          <div className="relative" ref={listRef}>
            <button
              onClick={() => setIsProfileMenuOpened(!isProfileMenuOpened)}
            >
              nickname
            </button>

            {isProfileMenuOpened && (
              <Dropdown options={profileOptions} className="left-0 top-6" />
            )}
          </div>
        </div>

        <p>23.08/04 14:00-15:00</p>
        <p className="hidden lg:block">010-1234-5678</p>
        <p className="hidden lg:block">
          <span className="mr-2 w-14 text-sub-color1">현장결제</span>
          50,000원 (1명)
        </p>

        <button
          onClick={() => setIsRequestModalOpened(true)}
          className="underline lg:hidden"
        >
          결제정보/요청사항
        </button>

        <button
          onClick={handleRequestClick}
          className="hidden text-gray-300 lg:block"
        >
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
                onClick={() => setIsDeclineModalOpened(true)}
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
      </li>

      {/* 반응형 */}
      <li className="px-3.5 pt-2.5 md:hidden">
        <div className="mb-3 flex w-full justify-between">
          <div className="flex items-center gap-2">
            <ProfileImg size="small" src={null} label={false} />
            <div className="relative" ref={listRef}>
              <button
                onClick={() => setIsProfileMenuOpened(!isProfileMenuOpened)}
              >
                nickname
              </button>

              {isProfileMenuOpened && (
                <Dropdown options={profileOptions} className="left-0 top-6" />
              )}
            </div>
          </div>

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
                  onClick={() => setIsDeclineModalOpened(true)}
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
        </div>

        <p>23.08/04 14:00-15:00</p>

        <button
          onClick={() => setIsRequestModalOpened(true)}
          className="mt-1 text-gray-100 underline"
        >
          결제정보/요청사항
        </button>
      </li>

      <DeclineModal
        isDeclineModalOpened={isDeclineModalOpened}
        handleClosed={() => setIsDeclineModalOpened(false)}
        handleSubmitDeclineForm={handleSubmitDeclineForm}
      />

      <PaymentInfoModal
        isModalOpened={isRequestModalOpened}
        handleClosed={() => setIsRequestModalOpened(false)}
      />
    </>
  );
};

export default PendingList;
