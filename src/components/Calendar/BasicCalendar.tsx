'use client';
import { isSameDay } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import React from 'react';
import { useEffect, useState } from 'react';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { FormattedCaption } from '../../utils/calendarUtils/CalendarCaption';
import {
  getBasicCalendarModifiersClassNames,
  DAY_OFF_ClassNames,
  getBasicCalendarModifiers,
} from '../../utils/calendarUtils/dateUtils';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';
interface ICalendarProps {
  mode: 'preview' | 'filter' | 'dayoff';
  selectedDates?: Date[];
  handleSelected?: (value: Date[]) => void;
}

const BasicCalendar = ({
  mode,
  selectedDates = [],
  handleSelected,
}: ICalendarProps) => {
  const [selected, setSelected] = useState<Date[] | undefined>(selectedDates);
  const initialSelectedDates = selectedDates;

  useEffect(() => {
    if (handleSelected !== undefined && selected) {
      if (mode === 'dayoff') {
        const unselectedDates = initialSelectedDates.filter(
          (date) => !selected.some((selDate) => isSameDay(selDate, date)),
        );

        handleSelected(unselectedDates);
      } else {
        handleSelected(selected);
      }
    }
  }, [selected]);

  useEffect(() => {
    setSelected(selectedDates);
  }, [selectedDates]);

  const disabledDays = (date: Date) =>
    !selectedDates.some((clickableDate) => isSameDay(clickableDate, date));

  const modifiers = getBasicCalendarModifiers(mode, selectedDates);
  const modifiersClassNames = getBasicCalendarModifiersClassNames(mode);
  const classNames = mode === 'dayoff' ? DAY_OFF_ClassNames : undefined;
  const className = mode === 'dayoff' ? '' : '';
  const disabled = mode === 'dayoff' ? disabledDays : undefined;

  return (
    <DayPicker
      mode={mode === 'preview' ? 'default' : 'multiple'}
      locale={ko}
      showOutsideDays
      selected={selected}
      onSelect={setSelected}
      defaultMonth={selectedDates[0] || new Date()}
      disabled={disabled}
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

export default React.memo(BasicCalendar);
