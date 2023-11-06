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
    <li className="flex w-full items-center justify-between whitespace-nowrap py-2 text-sm font-semibold text-gray-100">
      <span>{dateTime}</span>
      <div className="flex items-center">
        <span className="mr-[1.31rem] text-gray-500">잔여자리: {remain}명</span>
        <div className="flex items-center text-sm text-gray-100">
          <CountButton onClick={onClickDown}>-</CountButton>
          <span className="flex h-[31px] w-[34px] items-center justify-center border-y border-solid border-gray-500">
            {reservationCount}
          </span>
          <CountButton onClick={onClickUp}>+</CountButton>
        </div>
        <span className="ml-[0.31rem]">명</span>
        <button onClick={handleClear} className="ml-4 cursor-pointer">
          <ClearSVG width={18} height={18} className="fill-gray-700" />
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
    className="h-[31px] w-[35px] border border-solid border-gray-500 bg-gray-900 text-gray-500"
    onClick={onClick}
  >
    {children}
  </button>
);
