// import { parseISO, format } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
import { ButtonStyles } from '@/constants/constants';
import { CloseSVG, ChatSVG } from '@/icons/svg';
import RefundAccountModal from './RefundAccountModal';

interface RefundListProps {
  id: number;
  handlePaymentDelete: (id: number) => void;
}

const RefundList = ({ id, handlePaymentDelete }: RefundListProps) => {
  const paymentStatus = { name: '' };
  const [isAccountModalOpened, setIsAccountModalOpened] = useState(false);
  const [isDeclineResonOpened, setIsDeclineReasonOpened] = useState(false);

  const textStyles =
    paymentStatus.name === 'WAITING_FOR_DEPOSIT'
      ? 'underline text-sub-color1'
      : 'text-black';

  const handleModalOpened = async () => {
    setIsAccountModalOpened(true);
  };

  return (
    <div className="relative w-full rounded-md bg-white px-3.5 py-2.5 font-medium shadow-vertical">
      <button
        onClick={() => handlePaymentDelete(id)}
        className="absolute right-2.5 top-3"
      >
        <CloseSVG width="24" height="24" className="stroke-gray-500 stroke-2" />
      </button>

      <div className="mb-3 flex items-center gap-2.5">
        <p className={`text-lg font-semibold ${textStyles}`}>
          {paymentStatus.name === 'WAITING_FOR_DEPOSIT'
            ? '환불대기'
            : paymentStatus.name === 'CANCELED'
            ? '환불거절'
            : '환불취소'}
        </p>

        <button
          onClick={handleModalOpened}
          className="text-sm text-gray-300 underline"
        >
          환불계좌확인
        </button>
      </div>

      <ul className="flex flex-col gap-2.5">
        <li className="flex">
          강사
          <button className="ml-2.5 flex items-center underline">
            리아킴 <ChatSVG className="ml-1 stroke-black" />
          </button>
        </li>

        <li>원밀리언의 리아킴과 함께하는 댄스클래스</li>

        <li>
          {/* ${format(
            parseISO(reservation[0].lectureSchedule.startDateTime),
            'yy.MM.dd HH:mm',
          )} */}
          23.11.07 14:00 5명
        </li>

        <li className="mt-3 flex flex-col">
          <div className="flex w-full items-center justify-between">
            {/* <p>
            환불 금액
            <span className="ml-2 text-lg font-semibold">
              {finalPrice.toLocaleString()}원
            </span>
          </p> */}

            <button
              onClick={() => setIsDeclineReasonOpened(!isDeclineResonOpened)}
              className="underline"
            >
              거절 사유 {isDeclineResonOpened ? '닫기' : '보기'}
            </button>
            <div className="w-40">
              <Link
                href={`/chat/${'id'}`}
                className={`h-[35px] w-40 ${ButtonStyles.secondary}`}
              >
                <ChatSVG className="mr-1 stroke-black" />
                채팅으로 문의하기
              </Link>
            </div>
          </div>

          {isDeclineResonOpened && (
            <span className="mt-2.5 text-base font-medium text-black">
              안녕하세요 태터님. 야근 일정으로 인해 환불 요청 하셨던 부분
              확인했습니다. 그러나 수업 시작 2시간 전에 취소 하시는 경우엔
              공지에 말씀드렸던 것처럼 환불이 불가능하세요ㅠ 원래 당일 취소도
              안되는 건데 최대한 회원님 배려해드리기 위해 3시간전 취소까지는
              환불 가능하게 해드리고있어서... 환불 거절 드렸습니다. 추가
              문의사항 있으시면 채팅으로 문의 주세요.
            </span>
          )}
        </li>
      </ul>

      <RefundAccountModal
        isOpened={isAccountModalOpened}
        handleClosed={() => setIsAccountModalOpened(false)}
      />
    </div>
  );
};

export default RefundList;
