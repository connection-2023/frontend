'use client';
import { isSameDay } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { useEffect, useState } from 'react';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { DAY_MODIFIERS, DAY_MODIFIERS_CLASSNAMES } from '@/constants/constants';
import { dashboardStore } from '@/store';
import { FormattedCaption } from './BasicCalendar';
import 'react-day-picker/dist/style.css';
import '@/styles/calendar.css';

const scheduleDay = [
  new Date(2023, 10, 1),
  new Date(2023, 10, 15),
  new Date(2023, 10, 25),
];

const DashboardCalendar = () => {
  const store = dashboardStore();
  const [selected, setSelected] = useState<Date | undefined>(
    store.selectedDate || new Date(),
  );

  useEffect(() => {
    if (selected) {
      store.setSelectedDate(selected);
    }
  }, [selected]);

  useEffect(() => {
    const selectedDate = store.selectedDate;
    if (selectedDate && (!selected || !isSameDay(selected, selectedDate))) {
      setSelected(selectedDate);
    }
  }, [store.selectedDate]);

  const modifiersClassNames = {
    ...DAY_MODIFIERS_CLASSNAMES,
    scheduleDay: 'schedule-day',
  };

  const modifiers = {
    ...DAY_MODIFIERS,
    scheduleDay: (date: Date) =>
      scheduleDay.some((day) => isSameDay(date, day)),
  };

  return (
    <DayPicker
      locale={ko}
      mode="single"
      showOutsideDays
      defaultMonth={selected}
      selected={selected}
      onSelect={setSelected}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      components={{
        Caption: ({ displayMonth }: CaptionProps) =>
          FormattedCaption({
            displayMonth,
          }),
      }}
      className="h-[15.5rem] w-full px-5 py-6"
    />
  );
};

export default DashboardCalendar;
