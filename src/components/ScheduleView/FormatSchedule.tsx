import isSameDay from 'date-fns/isSameDay';
import { formatDateTime } from '@/utils/parseUtils';
import { IClassSchedule } from '@/types/class';

interface IFormatSchedule {
  clickDate: Date | undefined;
  duration: number;
  schedule: IClassSchedule;
  maxCapacity: number;
}

const FormatSchedule = ({
  clickDate,
  duration,
  schedule,
  maxCapacity,
}: IFormatSchedule) => {
  if (!clickDate || !isSameDay(clickDate, new Date(schedule.startDateTime)))
    return null;

  const scheduleDate = new Date(schedule.startDateTime);
  const formattedDateTime = formatDateTime(scheduleDate, duration);
  const mode =
    schedule.numberOfParticipants === maxCapacity ? 'full' : 'normal';
  return (
    <li
      key={schedule.id}
      className={`border-box flex h-[2.8125rem] w-full items-center justify-between rounded-md border border-solid
      border-gray-700 px-6 ${textStyle[mode]} text-sm font-medium`}
    >
      <p>{formattedDateTime}</p>
      <p>
        {mode === 'normal'
          ? `(${schedule.numberOfParticipants}/${maxCapacity}명)`
          : '(인원마감)'}
      </p>
    </li>
  );
};

export default FormatSchedule;

const textStyle = {
  normal: 'text-gray-100',
  full: 'text-gray-300',
};
