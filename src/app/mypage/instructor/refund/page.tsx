'use client';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import DeclineModal from './_components/DeclineModal';
import RefundList from './_components/RefundList';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';

const RefundPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isStatusDropdownOpened, setIsStatusDropdownOpened] = useState(false);
  const [isDeclineModalOpened, setIsDeclineModalOpened] = useState(false);
  const statusRef = useRef(null);

  useClickAway(statusRef, () => {
    setIsStatusDropdownOpened(false);
  });

  const handleRefundComplete = () => {
    toast.success('환불처리가 완료되었습니다!');
    setIsStatusDropdownOpened(false);
  };

  const statusOptions = [
    {
      component: <p className="whitespace-nowrap text-sm">환불완료</p>,
      onClick: handleRefundComplete,
    },
    {
      component: <p className="whitespace-nowrap text-sm">환불취소</p>,
      onClick: () => {
        setIsDeclineModalOpened(true);
      },
    },
  ];

  const handleSubmitDeclineForm = () => {
    setIsStatusDropdownOpened(false);
  };

  return (
    <section className="mx-4 h-full rounded-lg md:mx-9 md:bg-white md:p-6 md:shadow-float xl:mx-0">
      <div className="rounded-lg bg-white px-3.5 py-5 shadow-float md:p-0 md:shadow-none">
        <div className="mb-2.5 flex gap-x-9 text-xl font-medium text-gray-300">
          <h1
            onClick={() => setActiveTab(0)}
            className={
              activeTab === 0
                ? 'cursor-pointer font-bold text-sub-color1 underline underline-offset-4'
                : 'cursor-pointer'
            }
          >
            환불요청(4)
          </h1>
          <h1
            onClick={() => setActiveTab(1)}
            className={
              activeTab === 1
                ? 'cursor-pointer font-bold text-sub-color1 underline underline-offset-4'
                : 'cursor-pointer'
            }
          >
            환불완료
          </h1>
        </div>

        <p className="whitespace-pre-line break-keep">
          *환불요청을 한 수강생의 계좌로 강사가 환불금액 입금 후{' '}
          <br className="hidden md:block" />
          {`우측 [상태변경]->[환불완료]를 클릭하시면 수강생에게 환불완료 알림이 갑니다.`}
        </p>
      </div>

      <ul className="mt-6 w-full whitespace-nowrap text-gray-100">
        <li className="mb-2 hidden w-full items-center justify-between border-b border-solid border-gray-700 pb-2 md:flex">
          <div className="flex w-16 items-center">
            <input
              type="checkbox"
              id="status-checkbox"
              checked={false}
              onChange={() => {}}
              className="mr-1.5 h-[18px] w-[18px] accent-sub-color1"
              aria-label="상태변경 다중선택"
            />
            <button className="cursor-pointer">신청자</button>
          </div>

          <p className="w-32">연락처</p>
          <p className="w-20">환불금액</p>
          <p className="hidden w-60 lg:block">환불계좌</p>

          <button className="w-14">신청정보</button>

          <p className="w-14">상태</p>

          <div className="relative w-[4.5rem]" ref={statusRef}>
            <Button
              color="default"
              size="medium"
              onClick={() => setIsStatusDropdownOpened(!isStatusDropdownOpened)}
            >
              상태변경
            </Button>

            {isStatusDropdownOpened && (
              <Dropdown options={statusOptions} className="left-0 top-10" />
            )}
          </div>
        </li>

        {[...Array(8)].map((_, index) => (
          <RefundList key={index} statusOptions={statusOptions} />
        ))}
      </ul>

      <DeclineModal
        isDeclineModalOpened={isDeclineModalOpened}
        handleClosed={() => setIsDeclineModalOpened(false)}
        handleSubmitDeclineForm={handleSubmitDeclineForm}
      />
    </section>
  );
};

export default RefundPage;
