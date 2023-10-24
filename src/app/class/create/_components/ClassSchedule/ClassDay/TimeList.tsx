import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ClearSVG } from '@/icons/svg';
import { classDurationState } from '@/recoil/ClassSchedule/atoms';

interface ITimeListProps {
  startTime: string;
  onChange: (newStartTime: string) => void;
  onRemove?: () => void;
}

const TimeList = ({ startTime, onChange, onRemove }: ITimeListProps) => {
  const classTime = useRecoilValue(classDurationState);
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
    <li className="relative box-border flex h-10 items-center justify-between whitespace-nowrap rounded-[0.31rem] border border-solid border-sub-color2 px-4 text-sm font-medium">
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
        className="absolute right-0 top-0 -translate-y-2 translate-x-2 cursor-pointer fill-sub-color2"
      />
    </li>
  );
};

export default TimeList;

// 종료시간 계산
const calculateEndTime = (start: string, duration: number) => {
  if (start.trim() === '') {
    return '--:-- --';
  }

  const timeParts = start.split(':');
  const dateObj = new Date();
  dateObj.setHours(parseInt(timeParts[0]));
  dateObj.setMinutes(parseInt(timeParts[1]));

  // runningTime 은 분 단위
  dateObj.setMinutes(dateObj.getMinutes() + duration);

  let hours = dateObj.getHours();

  const period = hours >= 12 ? 'PM' : 'AM';

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    // midnight
    hours = 12;
  }

  // 항상 두 자릿수로 유지
  const strHours = ('0' + hours).slice(-2);
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);

  return `${strHours}:${minutes} ${period}`;
};
