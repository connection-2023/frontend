import { useEffect, useState } from 'react';
import { ClearSVG } from '@/icons/svg';

interface ApplyClassListProps {
  dateTime: string;
  lectureScheduleId: number;
  participants: number;
  remain: number;
  updateParticipants: (id: number, value: number) => void;
  removeSchedule: (id: number) => void;
}

const ApplyClassList = ({
  dateTime,
  lectureScheduleId,
  participants,
  remain,
  updateParticipants,
  removeSchedule,
}: ApplyClassListProps) => {
  const [reservationCount, setReservationCount] = useState(1);

  useEffect(() => {
    if (participants) {
      setReservationCount(participants);
    }
  }, [participants]);

  const onClickUp = () => {
    if (reservationCount < remain) {
      setReservationCount((prev) => prev + 1);
      updateParticipants(lectureScheduleId, reservationCount + 1);
    }
  };

  const onClickDown = () => {
    if (reservationCount > 1) {
      setReservationCount((prev) => prev - 1);
      updateParticipants(lectureScheduleId, reservationCount - 1);
    }
  };

  const handleClear = () => {
    removeSchedule(lectureScheduleId);
  };

  return (
    <li className="flex w-full items-center justify-between whitespace-nowrap py-2 text-sm font-semibold text-sub-color3">
      <span>{dateTime}</span>
      <div className="flex items-center">
        <span className="mr-[1.31rem] text-sub-color2">
          잔여자리: {remain}명
        </span>
        <div className="flex items-center text-sm text-sub-color3">
          <CountButton onClick={onClickDown}>-</CountButton>
          <span className="flex h-[31px] w-[34px] items-center justify-center border-y border-solid border-sub-color2">
            {reservationCount}
          </span>
          <CountButton onClick={onClickUp}>+</CountButton>
        </div>
        <span className="ml-[0.31rem]">명</span>
        <button onClick={handleClear} className="ml-4 cursor-pointer">
          <ClearSVG width={18} height={18} className="fill-sub-color4" />
        </button>
      </div>
    </li>
  );
};

export default ApplyClassList;

const CountButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    className="h-[31px] w-[35px] border border-solid border-sub-color2 bg-[#F5F5F5F5] text-sub-color2"
    onClick={onClick}
  >
    {children}
  </button>
);
