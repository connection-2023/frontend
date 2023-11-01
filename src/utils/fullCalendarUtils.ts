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
    format(date, 'yy.MM.dd (eeee)', { locale: koLocale }),
};

export const eventStyleGetter: EventPropGetter<IFullCalendarEvent> = (
  event,
) => {
  if (!event || !event.id) return {};
  const colors = ['#8338EC', '#FF3E9A', '#FF961B'];
  const transparency = '2A';

  const style = {
    background: colors[event.id % colors.length] + transparency,
    borderRadius: '3px',
    color: colors[event.id % colors.length],
    border: 'none',
    display: 'block',
  };

  return {
    style,
  };
};

export const messages = {
  showMore: (count: number) => `+${count} 더보기`,
};
