import { useState } from 'react';
import { IApplyClassList } from '@/types/payment';

interface ApplyClassListProps extends IApplyClassList {
  updateParticipants: (id: number, value: number) => void;
}

const ApplyClassList = ({
  dateTime,
  lectureScheduleId,
  participants,
  remain,
  updateParticipants,
}: ApplyClassListProps) => {
  const [reservationCount, setReservationCount] = useState(participants || 1);
  const [isChecked, setIsChecked] = useState(true);
  const date = dateTime.substring(0, dateTime.length - 11);
  const time = dateTime.substring(dateTime.length - 11);

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

  const handleCheckbox = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);

    updateParticipants(
      lectureScheduleId,
      newCheckedStatus ? reservationCount : 0,
    );
  };

  return (
    <li className="flex w-full items-center justify-between py-2 text-sm font-semibold text-gray-100">
      <label className="flex items-start gap-1.5">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckbox}
          className="h-[18px] w-[18px] cursor-pointer accent-sub-color1"
        />
        <div className="flex flex-wrap gap-1">
          <p>{date}</p>
          <p>{time}</p>
        </div>
      </label>

      <div className="flex items-center whitespace-nowrap">
        <span className="mr-[1.31rem] text-gray-500">잔여자리: {remain}명</span>
        <div className="flex items-center text-sm text-gray-100">
          <CountButton onClick={onClickDown}>-</CountButton>
          <span className="flex h-[31px] w-[34px] items-center justify-center border-y border-solid border-gray-500">
            {reservationCount}
          </span>
          <CountButton onClick={onClickUp}>+</CountButton>
        </div>
        <span className="ml-[0.31rem]">명</span>
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
