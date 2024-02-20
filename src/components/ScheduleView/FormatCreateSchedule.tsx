import isSameDay from 'date-fns/isSameDay';
import { formatDateTime } from '@/utils/parseUtils';

interface IFormatCreateSchedule {
  clickDate: Date | undefined;
  duration: number;
  schedule: Date;
}

const FormatCreateSchedule = ({
  clickDate,
  duration,
  schedule,
}: IFormatCreateSchedule) => {
  if (!clickDate || !isSameDay(clickDate, schedule)) {
    return null;
  }
  const formattedDateTime = formatDateTime(schedule, duration);

  return (
    <li
      key={schedule.toDateString()}
      className={`border-box flex h-[2.8125rem] w-full items-center justify-between rounded-md border border-solid
        border-gray-700 px-6 text-sm font-medium md:max-w-[16.8125rem]`}
    >
      <p>{formattedDateTime}</p>
    </li>
  );
};

export default FormatCreateSchedule;
