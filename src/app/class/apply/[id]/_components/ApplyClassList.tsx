import { useState } from 'react';
import { ClearSVG } from '../../../../../../public/icons/svg';

interface ApplyClassListProps {
  selectedCount: number;
  // onClear: () => void;
}
// --- 추후 API 연결 시 props로 받을 예정 ---
const space = {
  total: 10,
  current: 4,
};

const ApplyClassList = ({ selectedCount }: ApplyClassListProps) => {
  const [reservationCount, setReservationCount] = useState(selectedCount);
  const remainSpace = space.total - space.current;

  const onClickUp = () => {
    if (reservationCount < remainSpace) {
      setReservationCount((prev) => prev + 1);
    }
  };

  const onClickDown = () => {
    if (reservationCount > 1) {
      setReservationCount((prev) => prev - 1);
    }
  };

  return (
    <li className="flex w-full items-center justify-between py-2 text-sm font-semibold text-sub-color3">
      <span>09월 09일 (토) 15:00-16:00</span>
      <div className="flex items-center">
        <span className="mr-[1.31rem] text-sub-color2">
          잔여자리: {remainSpace}명
        </span>
        <div className="flex items-center text-sm text-sub-color3">
          <CountButton onClick={onClickDown}>-</CountButton>
          <span className="flex h-[31px] w-[34px] items-center justify-center border-y border-solid border-sub-color2">
            {reservationCount}
          </span>
          <CountButton onClick={onClickUp}>+</CountButton>
        </div>
        <span className="ml-[0.31rem]">명</span>
        <button
          //   onClick={onClear}
          className="ml-4 cursor-pointer"
        >
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
