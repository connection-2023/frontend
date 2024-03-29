'use client';
import isSameDay from 'date-fns/isSameDay';
import ko from 'date-fns/locale/ko';
import { useEffect, useState, memo } from 'react';
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
  selectableDates?: Date[];
  selectedDates?: Date[];
  // eslint-disable-next-line no-unused-vars
  handleSelected?: (value: Date[]) => void;
}

const BasicCalendar = ({
  mode,
  selectableDates = [],
  selectedDates = selectableDates,
  handleSelected,
}: ICalendarProps) => {
  const [selected, setSelected] = useState<Date[] | undefined>(selectedDates);

  useEffect(() => {
    if (handleSelected && selected) {
      handleSelected(selected);
    }
  }, [selected?.length]);

  useEffect(() => {
    if (mode === 'preview') {
      if (JSON.stringify(selected) !== JSON.stringify(selectedDates)) {
        setSelected(selectedDates);
      }
    }
  }, [selected?.length, selectedDates.length]);

  const disabledDays = (date: Date) =>
    !selectedDates.some((clickableDate) => isSameDay(clickableDate, date));

  const modifiers = getBasicCalendarModifiers(mode, selectableDates);
  const modifiersClassNames = getBasicCalendarModifiersClassNames(mode);
  const classNames = mode === 'dayoff' ? DAY_OFF_ClassNames : undefined;
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
    />
  );
};

export default memo(BasicCalendar);
