import { useEffect, useState } from 'react';
import { ClearSVG } from '@/icons/svg';
import { useClassScheduleStore } from '@/store';
import { calculateEndTime } from '@/utils/parseUtils';

interface TimeListProps {
  startTime: string;
  onChange: (newStartTime: string) => void;
  onRemove?: () => void;
}

const TimeList = ({ startTime, onChange, onRemove }: TimeListProps) => {
  const classTime = useClassScheduleStore((state) => state.classDuration);
  const [startValue, setStartValue] = useState(startTime);
  const [endTime, setEndTime] = useState<string>('');

  useEffect(() => {
    setStartValue(startTime);
  }, [startTime]);

  useEffect(() => {
    if (classTime) {
      setEndTime(calculateEndTime(startValue, classTime));
    }
  }, [startValue, classTime]);

  return (
    <li className="relative box-border flex h-10 items-center justify-between whitespace-nowrap rounded-md border border-solid border-gray-500 px-4 text-sm font-medium">
      <span className="mr-2">시작</span>
      <input
        type="time"
        value={startValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-[100px]"
      />
      <span className="ml-2 mr-4">~</span>
      <span className="mr-2">종료</span>
      <span className="w-[66px]">{endTime}</span>

      <ClearSVG
        width={19}
        height={19}
        onClick={onRemove}
        className="absolute right-0 top-0 -translate-y-2 translate-x-2 cursor-pointer fill-gray-500"
      />
    </li>
  );
};

export default TimeList;
