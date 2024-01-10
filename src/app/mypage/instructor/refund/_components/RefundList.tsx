'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import { CopySVG } from '@/icons/svg';
import ApplyDetailModal from './ApplyDetailModal';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';

interface RefundListProps {
  statusOptions: any;
}

const RefundList = ({ statusOptions }: RefundListProps) => {
  const [isStatusDropdownOpened, setIsStatusDropdownOpened] = useState(false);
  const [isNameDropdownOpened, setIsNameDropdownOpened] = useState(false);
  const [isApplyModalOpened, setIsApplyModalOpened] = useState(false);

  const statusRef = useRef(null);
  const nameRef = useRef(null);

  useClickAway(statusRef, () => {
    setIsStatusDropdownOpened(false);
  });

  useClickAway(nameRef, () => {
    setIsNameDropdownOpened(false);
  });

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText('신한 1002-123-456789').then(() => {
      toast.success('계좌번호가 복사되었습니다!');
    });
  };

  const handleCopyContact = () => {
    navigator.clipboard.writeText('01012341234').then(() => {
      toast.success('연락처가 복사되었습니다!');
    });
  };

  const applicantOptions = [
    {
      component: <p className="whitespace-nowrap text-sm">계좌번호 복사</p>,
      onClick: handleCopyAccountNumber,
    },
    {
      component: <p className="whitespace-nowrap text-sm">연락처 복사</p>,
      onClick: handleCopyContact,
    },
    {
      component: (
        <Link href="" className="whitespace-nowrap text-sm">
          채팅하기
        </Link>
      ),
    },
    {
      component: (
        <Link href="" className="whitespace-nowrap text-sm">
          신고하기
        </Link>
      ),
    },
    {
      component: (
        <Link href="" className="whitespace-nowrap text-sm">
          차단하기
        </Link>
      ),
    },
  ];

  return (
    <>
      <li className="mt-2 hidden w-full items-center justify-between md:flex">
        <div className="flex w-16 items-center">
          <input
            type="checkbox"
            id="status-checkbox"
            checked={false}
            onChange={() => {}}
            className="mr-1.5 h-[18px] w-[18px] accent-sub-color1"
            aria-label="상태변경 다중선택"
          />
          <div className="relative" ref={nameRef}>
            <button
              onClick={() => {
                setIsNameDropdownOpened(!isNameDropdownOpened);
              }}
            >
              김민정
            </button>
            {isNameDropdownOpened && (
              <Dropdown options={applicantOptions} className="left-0 top-6" />
            )}
          </div>
        </div>

        <p className="w-32">010-1234-5678</p>
        <p className="w-20">120,000원</p>

        <p className="hidden w-60 lg:block">신한 1002-123-456789 (김민정)</p>

        <button
          className="w-14 underline"
          onClick={() => setIsApplyModalOpened(true)}
        >
          상세보기
        </button>

        <p className="w-14">환불대기</p>

        <div className="relative w-[4.5rem]" ref={statusRef}>
          <Button
            color="default"
            size="medium"
            onClick={() => {
              setIsStatusDropdownOpened(!isStatusDropdownOpened);
            }}
          >
            변경
          </Button>

          {isStatusDropdownOpened && (
            <Dropdown options={statusOptions} className="left-0 top-10" />
          )}
        </div>
      </li>

      {/* 반응형 */}
      <li className="mb-3.5 rounded-lg bg-white shadow-float md:hidden">
        <div className="flex items-center justify-between border-b border-solid border-gray-700 px-3.5 py-2">
          <div className="flex flex-col">
            <div className="relative" ref={nameRef}>
              <button
                onClick={() => {
                  setIsNameDropdownOpened(!isNameDropdownOpened);
                }}
              >
                김민정
              </button>
              {isNameDropdownOpened && (
                <Dropdown options={applicantOptions} className="left-0 top-6" />
              )}
            </div>
            <span>010-1234-1234</span>
          </div>

          <div className="relative w-[4.5rem]" ref={statusRef}>
            <Button
              color="default"
              size="medium"
              onClick={() => {
                setIsStatusDropdownOpened(!isStatusDropdownOpened);
              }}
            >
              상태변경
            </Button>

            {isStatusDropdownOpened && (
              <Dropdown options={statusOptions} className="left-0 top-10" />
            )}
          </div>
        </div>

        <ul className="flex flex-col gap-2.5 px-3.5 py-4 text-base text-gray-100">
          <li className="flex">
            <p className="mr-4 w-14">상태</p>
            <p>환불대기</p>
          </li>
          <li className="flex">
            <p className="mr-4 w-14">신청정보</p>
            <p
              className="underline"
              onClick={() => setIsApplyModalOpened(true)}
            >
              상세보기
            </p>
          </li>
          <li className="flex">
            <p className="mr-4 w-14">환불계좌</p>

            <div className="flex items-center">
              신한 1002-123-456789 (김민정)
              <button
                onClick={handleCopyAccountNumber}
                className="ml-0.5 flex items-center text-gray-300"
              >
                <CopySVG width="21" height="21" />
              </button>
            </div>
          </li>

          <li className="flex">
            <p className="mr-4 w-14">환불금액</p>
            <p>50,000원</p>
          </li>
        </ul>
      </li>

      <ApplyDetailModal
        isModalOpened={isApplyModalOpened}
        handleClosed={() => setIsApplyModalOpened(false)}
        statusOptions={statusOptions}
      />
    </>
  );
};

export default RefundList;
