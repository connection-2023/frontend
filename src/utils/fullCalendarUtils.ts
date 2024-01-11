import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import koLocale from 'date-fns/locale/ko';
import startOfWeek from 'date-fns/startOfWeek';
import { dateFnsLocalizer, EventPropGetter } from 'react-big-calendar';
import { IFullCalendarEvent } from '@/types/types';

export const localizer = dateFnsLocalizer({
  format,
  startOfWeek,
  getDay,
  locales: {
    ko: koLocale,
  },
});

export const formats = {
  monthHeaderFormat: (date: Date) =>
    format(date, 'yy년 MMMM', { locale: koLocale }),
  weekdayFormat: (date: Date) => format(date, 'eee').toUpperCase(),

  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, 'MM월 dd일', { locale: koLocale })} - ${format(
      end,
      'MM월 dd일',
      { locale: koLocale },
    )}`,

  dayHeaderFormat: (date: Date) =>
    format(date, 'yy.MM.dd (eee)', { locale: koLocale }),
  timeGutterFormat: 'ha',
};

export const eventStyleGetter: EventPropGetter<IFullCalendarEvent> = (
  event,
) => {
  if (!event || !event.id) return {};
  const color = getEventColor(event);
  const transparency = '2A';

  const style = {
    background: color + transparency,
    borderRadius: '3px',
    color,
    border: 'none',
    display: 'block',
  };

  return {
    style,
  };
};

export const getEventColor = (event: IFullCalendarEvent) => {
  if (event.maxCapacity === event.numberOfParticipants) {
    return '#FF961B';
  } else if (event.isGroup) {
    return '#8338EC';
  } else {
    return '#FF3E9A';
  }
};

export const messages = {
  showMore: (count: number) => `+${count} 더보기`,
};
