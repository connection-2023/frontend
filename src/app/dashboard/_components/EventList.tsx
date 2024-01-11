import { format } from 'date-fns';
import Link from 'next/link';
import { CalendarDetailSVG } from '@/icons/svg';
import { getEventColor } from '@/utils/fullCalendarUtils';
import { IFullCalendarEvent } from '@/types/types';

const EventList = ({ event }: { event: IFullCalendarEvent }) => {
  const formattedStart = format(event.start, 'HH:mm');
  const formattedEnd = format(event.end, 'HH:mm');
  const color = getEventColor(event);
  const transparency = '2A';

  return (
    <li
      className="flex h-11 items-center justify-between rounded px-2.5 text-sm text-white"
      style={{
        background: color + transparency,
      }}
    >
      <span className="w-full max-w-[20rem]" style={{ color: color }}>
        {`${formattedStart}-${formattedEnd} (${event.numberOfParticipants}/${event.maxCapacity})`}
        <br />
        {event.title}
      </span>

      <Link href={`/class/${event.lectureId}`}>
        <CalendarDetailSVG fill={color} />
      </Link>
    </li>
  );
};

export default EventList;
