import { useEffect, useState } from 'react';
import { ClearSVG } from '@/icons/svg';
import { calculateEndTime } from '@/utils/parseUtils';

/* eslint-disable no-unused-vars */
interface TimeListProps {
  startTime: { time: string; editable: boolean };
  duration: number;
  onChange: (newStartTime: string) => void;
  onRemove?: () => void;
}
/* eslint-enable no-unused-vars */
const TimeList = ({
  startTime,
  duration,
  onChange,
  onRemove,
}: TimeListProps) => {
  const [startValue, setStartValue] = useState(startTime);
  const [endTime, setEndTime] = useState<string>('');

  useEffect(() => {
    setStartValue(startTime);
  }, [startTime]);

  useEffect(() => {
    if (duration && startValue.time) {
      setEndTime(calculateEndTime(startValue.time, duration));
    }
  }, [startValue, duration]);

  return (
    <li className="relative mr-2 box-border flex h-10 shrink-0 items-center justify-between whitespace-nowrap rounded-md border border-solid border-gray-500 px-4 text-sm font-medium">
      <span className="mr-2">시작</span>
      <input
        type="time"
        value={startValue.time}
        disabled={!startValue.editable}
        onChange={(e) => onChange(e.target.value)}
        className="w-[100px]"
      />
      <span className="ml-2 mr-4">~</span>
      <span className="mr-2">종료</span>
      <span className="w-[66px]">{endTime}</span>
      {startValue.editable && (
        <button
          onClick={onRemove}
          aria-label="삭제"
          className="absolute right-0 top-0 -translate-y-2 translate-x-2 rounded-full border-[0.5px] border-solid border-gray-500"
        >
          <ClearSVG
            width={19}
            height={19}
            className="fill-white stroke-gray-500 stroke-2"
          />
        </button>
      )}
    </li>
  );
};

export default TimeList;
