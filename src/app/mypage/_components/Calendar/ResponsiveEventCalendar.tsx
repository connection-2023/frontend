import isSameDay from 'date-fns/isSameDay';
import ko from 'date-fns/locale/ko';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { FormattedCaption } from '@/utils/calendarUtils/CalendarCaption';
import {
  getSingleCalendarModifiers,
  getSingleCalendarModifiersClassNames,
  getSingleCalendarClassNames,
} from '@/utils/calendarUtils/dateUtils';
import { localizer, formats } from '@/utils/fullCalendarUtils';
import DayToolBar from '@/components/Calendar/DayToolBar';
import { IMonthlyClassSchedules } from '@/types/class';
import 'react-day-picker/dist/style.css';
import '@/styles/calendar.css';

const ResponsiveScheduleView = dynamic(
  () => import('@/components/ScheduleView/ResponsiveScheduleView'),
  {
    ssr: false,
  },
);

interface ResponsiveEventCalendarProps {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  handleDateChange: (newDate: Date) => void;
  scheduleData: IMonthlyClassSchedules[] | undefined;
  mode?: 'dashboard';
}

const ResponsiveEventCalendar = (props: ResponsiveEventCalendarProps) => {
  const { date, handleDateChange, scheduleData, mode } = props;
  const [selectedDate, setSelectedDate] = useState(date);
  const classNames = getSingleCalendarClassNames('dashboard');
  const clickableDates = scheduleData?.map(
    (schedule) => new Date(schedule.startDateTime),
  );
  const modifiers = getSingleCalendarModifiers(
    'dashboard',
    [],
    [...new Set(clickableDates)],
  );
  const modifiersClassNames = getSingleCalendarModifiersClassNames('dashboard');

  const selectedEvent =
    scheduleData?.filter((event) =>
      isSameDay(selectedDate, new Date(event.startDateTime)),
    ) || [];

  const onNavigate = (newDate: Date | undefined) => {
    if (!newDate) return;
    setSelectedDate(newDate);

    if (
      date.getFullYear() !== newDate.getFullYear() ||
      date.getMonth() !== newDate.getMonth()
    ) {
      handleDateChange(newDate);
    }
  };

  return (
    <>
      <div className="flex rounded-md bg-white">
        <DayPicker
          mode="single"
          locale={ko}
          showOutsideDays
          defaultMonth={date}
          selected={selectedDate}
          onSelect={onNavigate}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          classNames={classNames}
          components={{
            Caption: ({ displayMonth }: CaptionProps) =>
              FormattedCaption({
                displayMonth,
              }),
          }}
          className="flex w-fit justify-center py-3.5"
        />
      </div>

      <div className="mx-4 mt-4 rounded-lg bg-white p-4 shadow-float">
        <Calendar
          localizer={localizer}
          formats={formats}
          defaultView={Views.DAY}
          date={selectedDate}
          onNavigate={onNavigate}
          components={{
            toolbar: DayToolBar,
          }}
        />

        <ResponsiveScheduleView selectedEvent={selectedEvent} mode={mode} />
      </div>
    </>
  );
};

export default ResponsiveEventCalendar;
