'use client';
import isSameDay from 'date-fns/isSameDay';
import ko from 'date-fns/locale/ko';
import { useEffect, useState, memo } from 'react';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { useClassScheduleStore } from '@/store';
import { dashboardStore } from '../../store';
import { FormattedCaption } from '../../utils/calendarUtils/CalendarCaption';
import {
  getSingleCalendarModifiers,
  getSingleCalendarModifiersClassNames,
  getSingleCalendarClassNames,
} from '../../utils/calendarUtils/dateUtils';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

/* eslint-disable no-unused-vars */
interface SingleCalendarProps {
  mode: 'schedule' | 'dashboard' | 'specific';
  clickableDates?: Date[];
  handleClickDate: (newDate: Date | undefined) => void;
}

/* eslint-enable no-unused-vars */
const SingleCalendar = ({
  mode,
  clickableDates = [],
  handleClickDate,
}: SingleCalendarProps) => {
  const store = dashboardStore();
  const classDates =
    useClassScheduleStore((state) => state.filteredDates) || [];
  const initSelected =
    mode === 'dashboard' ? store.selectedDate || undefined : undefined;
  const [selected, setSelected] = useState<Date | undefined>(initSelected);

  useEffect(() => {
    if (selected && handleClickDate) {
      handleClickDate(selected);
    }
  }, [selected, handleClickDate]);

  useEffect(() => {
    if (mode === 'dashboard') {
      const selectedDate = store.selectedDate;
      if (selectedDate && (!selected || !isSameDay(selected, selectedDate))) {
        setSelected(selectedDate);
      }
    }
  }, [store.selectedDate, mode, selected]);

  if (!clickableDates.length && mode !== 'dashboard') {
    return null;
  }

  const disabledDays = (date: Date) => {
    if (mode === 'specific') {
      return !clickableDates.some((clickableDate) =>
        isSameDay(new Date(clickableDate), date),
      );
    } else {
      return false;
    }
  };

  const modifiers = getSingleCalendarModifiers(
    mode,
    classDates,
    clickableDates,
  );
  const modifiersClassNames = getSingleCalendarModifiersClassNames(mode);
  const classNames = getSingleCalendarClassNames(mode);

  const className =
    mode === 'schedule'
      ? 'w-fit rounded-lg px-5 py-4 md:shadow-horizontal'
      : mode === 'specific'
      ? 'flex w-fit rounded-[0.625rem] px-4 py-6 shadow-horizontal'
      : 'h-fit w-fit flex justify-center px-5 py-4';

  return (
    <DayPicker
      mode="single"
      locale={ko}
      showOutsideDays
      defaultMonth={clickableDates[0]}
      selected={selected}
      onSelect={(newSelectedDate) => {
        if (mode === 'dashboard' && newSelectedDate) {
          store.setSelectedDate(newSelectedDate);
        }
        setSelected(newSelectedDate);
      }}
      disabled={disabledDays}
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

export default memo(SingleCalendar);
