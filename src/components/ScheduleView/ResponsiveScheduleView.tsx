import Link from 'next/link';
import { useMemo } from 'react';
import { formatTimeNoSec } from '@/utils/dateTimeUtils';
import { IMonthlyClassSchedules } from '@/types/class';

const statusColor: Record<string, string> = {
  private: 'bg-sub-color1',
  group: 'bg-main-color',
  full: 'bg-sub-color2',
};

interface ResponsiveScheduleViewProps {
  selectedEvent: IMonthlyClassSchedules[];
  mode?: 'dashboard';
}
const ResponsiveScheduleView = (props: ResponsiveScheduleViewProps) => {
  const { selectedEvent, mode } = props;
  const schedules = useMemo(
    () =>
      selectedEvent.map((event) => {
        const status = event.lecture.isGroup
          ? 'group'
          : event.numberOfParticipants === event.lecture.maxCapacity
          ? 'full'
          : 'private';
        const formattedStart = formatTimeNoSec(event.startDateTime);
        const formattedEnd = formatTimeNoSec(event.endDateTime);

        return {
          status,
          title: event.lecture.title,
          time: `${formattedStart}-${formattedEnd}`,
          numberOfParticipants: event.numberOfParticipants,
          maxCapacity: event.lecture.maxCapacity,
          lectureId: event.lectureId,
        };
      }),
    [selectedEvent],
  );

  return schedules.length ? (
    <ul className="flex h-40 flex-col gap-2 overflow-y-auto">
      {schedules.map((schedule, index) => (
        <li key={index} className="flex text-sm">
          <p className="mb-2 flex w-28 items-center gap-1 whitespace-nowrap font-semibold">
            <span
              className={`h-[11px] w-[11px] rounded-full ${
                statusColor[schedule.status]
              }`}
            />
            {schedule.time}
          </p>
          <Link href={`/class/${schedule.lectureId}`} className="font-medium">
            {schedule.title}
            {mode === 'dashboard' && (
              <span className="text-gray-300">{` (${schedule.numberOfParticipants}/${schedule.maxCapacity})`}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p className="flex h-40 w-full items-center justify-center">
      클래스 일정이 없습니다.
    </p>
  );
};

export default ResponsiveScheduleView;
