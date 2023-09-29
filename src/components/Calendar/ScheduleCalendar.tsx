'use client';
import { useState } from 'react';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { ko } from 'date-fns/esm/locale';
import { FormattedCaption } from './BasicCalendar';
import {
  DAY_MODIFIERS,
  SCHEDULE_MODIFIERS_CLASSNAMES,
} from '../../constants/constants';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

const ScheduleCalendar = ({ clickableDates }: { clickableDates: Date[] }) => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  if (!clickableDates.length) {
    return null;
  }

  const scheduleModifiers = {
    ...DAY_MODIFIERS,

    selectableDays: (date: Date) => {
      return isDateSelectable(date);
    },

    disabled: (date: Date) => {
      return !isDateSelectable(date);
    },
  };

  const isDateSelectable = (date: Date) => {
    return clickableDates.some(
      (clickableDate) =>
        date.getDate() === clickableDate.getDate() &&
        date.getMonth() === clickableDate.getMonth() &&
        date.getFullYear() === clickableDate.getFullYear(),
    );
  };

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelected(date);
    }
  };

  return (
    <DayPicker
      mode="single"
      locale={ko}
      showOutsideDays
      defaultMonth={clickableDates[0]}
      selected={selected}
      onSelect={handleSelect}
      modifiers={scheduleModifiers}
      modifiersClassNames={SCHEDULE_MODIFIERS_CLASSNAMES}
      classNames={{
        day_selected: 'schedule-selected-day',
      }}
      components={{
        Caption: ({ displayMonth }: CaptionProps) =>
          FormattedCaption({
            displayMonth,
          }),
      }}
      className="rounded-[0.625rem] px-5 py-4 shadow-[1px_1px_6px_1px_rgba(0,0,0,0.25)]"
    />
  );
};

export default ScheduleCalendar;
