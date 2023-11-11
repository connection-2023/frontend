'use client';
import { isSameDay } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import React from 'react';
import { useEffect, useState } from 'react';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { dashboardStore } from '../../store';
import { FormattedCaption } from '../../utils/calendarUtils/CalendarCaption';
import {
  SCHEDULE_CLASSNAMES,
  getSingleCalendarModifiers,
  getSingleCalendarModifiersClassNames,
} from '../../utils/calendarUtils/dateUtils';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

// mockData
const scheduleDay = [
  new Date(2023, 10, 1),
  new Date(2023, 10, 15),
  new Date(2023, 10, 25),
];
interface SingleCalendarProps {
  mode: 'schedule' | 'dashboard';
  clickableDates?: Date[];
  handleClickDate?: (newDate: Date) => void;
}

const SingleCalendar = ({
  mode,
  clickableDates = [],
  handleClickDate,
}: SingleCalendarProps) => {
  const store = dashboardStore();
  const [selected, setSelected] = useState<Date | undefined>(
    store.selectedDate || new Date(),
  );

  useEffect(() => {
    if (selected && mode === 'dashboard') {
      store.setSelectedDate(selected);
    }
    if (selected && mode !== 'dashboard' && handleClickDate) {
      handleClickDate(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (mode === 'dashboard') {
      const selectedDate = store.selectedDate;
      if (selectedDate && (!selected || !isSameDay(selected, selectedDate))) {
        setSelected(selectedDate);
      }
    }
  }, [store.selectedDate]);

  if (!clickableDates.length && mode === 'schedule') {
    return null;
  }

  const modifiers = getSingleCalendarModifiers(
    mode,
    clickableDates,
    scheduleDay,
  );
  const modifiersClassNames = getSingleCalendarModifiersClassNames(mode);
  const classNames = mode === 'schedule' ? SCHEDULE_CLASSNAMES : {};
  const className =
    mode === 'schedule'
      ? 'w-fit rounded-[0.625rem] px-5 py-4 md:shadow-horizontal'
      : 'h-[15.5rem] w-full px-5 py-6';

  return (
    <DayPicker
      mode="single"
      locale={ko}
      showOutsideDays
      defaultMonth={clickableDates[0]}
      selected={selected}
      onSelect={setSelected}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      classNames={classNames}
      components={{
        Caption: ({ displayMonth }: CaptionProps) =>
          FormattedCaption({
            displayMonth,
          }),
      }}
      className={className}
    />
  );
};

export default React.memo(SingleCalendar);
