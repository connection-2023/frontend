'use client';
import { useEffect, useState } from 'react';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { ko } from 'date-fns/esm/locale';
import { isSameDay } from 'date-fns';
import { FormattedCaption } from './BasicCalendar';
import {
  DAY_MODIFIERS,
  DAY_MODIFIERS_CLASSNAMES,
} from '../../constants/constants';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

interface ICalendarProps {
  selectedDates?: Date[];
  handleSelected?: (value: Date[]) => void;
}

const DayOffCalendar = ({
  selectedDates = [],
  handleSelected,
}: ICalendarProps) => {
  const [selected, setSelected] = useState<Date[] | undefined>(selectedDates);

  useEffect(() => {
    if (handleSelected !== undefined && selected) {
      const unselectedDates = selectedDates.filter(
        (date) => !selected.some((selDate) => isSameDay(selDate, date)),
      );

      handleSelected(unselectedDates);
    }
  }, [selected]);

  useEffect(() => {
    setSelected(selectedDates);
  }, [selectedDates]);

  const disabledDays = (date: Date) =>
    !selectedDates.some((clickableDate) => isSameDay(clickableDate, date));

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
    return selectedDates.some(
      (clickableDate) =>
        date.getDate() === clickableDate.getDate() &&
        date.getMonth() === clickableDate.getMonth() &&
        date.getFullYear() === clickableDate.getFullYear(),
    );
  };

  const offModifiersClassNames = {
    ...DAY_MODIFIERS_CLASSNAMES,
    selectableDays: 'class-input-selectable',
  };

  return (
    <DayPicker
      locale={ko}
      showOutsideDays
      mode="multiple"
      selected={selected}
      defaultMonth={selectedDates[0]}
      onSelect={setSelected}
      disabled={disabledDays}
      modifiers={scheduleModifiers}
      modifiersClassNames={offModifiersClassNames}
      classNames={{
        day_selected: 'dayOff-selected-day',
      }}
      components={{
        Caption: ({ displayMonth }: CaptionProps) =>
          FormattedCaption({
            displayMonth,
          }),
      }}
    />
  );
};

export default DayOffCalendar;
