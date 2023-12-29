import { format, parseISO } from 'date-fns';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useMemo } from 'react';
import { ClassStatusSVG } from '@/icons/svg';
import { IMonthlyClassSchedules } from '@/types/class';

const statusColor: Record<string, string> = {
  private: 'fill-sub-color1',
  group: 'fill-main-color',
  full: 'fill-sub-color2',
};

const ResponsiveScheduleView = ({
  selectedEvent,
}: {
  selectedEvent: IMonthlyClassSchedules[];
}) => {
  const schedules = useMemo(
    () =>
      selectedEvent.map((event) => {
        const status = event.lecture.isGroup
          ? 'group'
          : event.numberOfParticipants === event.lecture.maxCapacity
          ? 'full'
          : 'private';
        const formattedStart = format(parseISO(event.startDateTime), 'HH:mm');
        const formattedEnd = format(parseISO(event.endDateTime), 'HH:mm');

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

  return (
    <ul className="flex flex-col gap-2">
      {schedules.map((schedule) => (
        <li key={nanoid()} className="flex text-sm">
          <p className="mb-2 flex w-28 items-center gap-1 whitespace-nowrap font-semibold">
            <ClassStatusSVG
              width="11"
              height="11"
              className={statusColor[schedule.status]}
            />
            {schedule.time}
          </p>
          <Link href={`/class/${schedule.lectureId}`} className="font-medium">
            {schedule.title}
            <span className="text-gray-300">{` (${schedule.numberOfParticipants}/${schedule.maxCapacity})`}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ResponsiveScheduleView;
