'use client';
import { ko } from 'date-fns/esm/locale';
import { useEffect, useState } from 'react';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { FormattedCaption } from './BasicCalendar';
import {
  DAY_MODIFIERS,
  SCHEDULE_MODIFIERS_CLASSNAMES,
} from '../../constants/constants';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

interface ScheduleCalendarProps {
  clickableDates: Date[];
  handleClickDate: (newDate: Date) => void;
}

const ScheduleCalendar = ({
  clickableDates,
  handleClickDate,
}: ScheduleCalendarProps) => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (selected) {
      handleClickDate(selected);
    }
  }, [selected]);

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
      className="w-fit rounded-[0.625rem] px-5 py-4 md:shadow-horizontal"
    />
  );
};

export default ScheduleCalendar;
