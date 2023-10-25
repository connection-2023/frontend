'use client';
import { isSameDay } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { useEffect, useState } from 'react';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DAY_MODIFIERS, DAY_MODIFIERS_CLASSNAMES } from '@/constants/constants';
import {
  classScheduleState,
  classHolidayState,
} from '@/recoil/ClassSchedule/atoms';
import { FormattedCaption } from './BasicCalendar';
import 'react-day-picker/dist/style.css';
import '@/styles/calendar.css';

interface ICalendarProps {
  handleSelected: (value: Date[]) => void;
}

const DayOffCalendar = ({ handleSelected }: ICalendarProps) => {
  const ScheduleDates = useRecoilValue(classScheduleState);
  const [holidays, setHolidays] = useRecoilState(classHolidayState);
  const [uniqueDates, setUniqueDates] = useState<Date[]>();
  const [selected, setSelected] = useState<Date[] | undefined>(undefined);

  useEffect(() => {
    const uniqueDatesArray = [
      ...new Set(
        ScheduleDates.map((date) => new Date(date).setHours(0, 0, 0, 0)),
      ),
    ].map((dateNum) => new Date(dateNum));
    setUniqueDates(uniqueDatesArray);
    setSelected(uniqueDatesArray);
  }, [ScheduleDates]);

  useEffect(() => {
    if (selected && uniqueDates) {
      const unselectedDates = uniqueDates.filter(
        (initDate) =>
          !selected.some((selDate) =>
            isSameDay(new Date(selDate), new Date(initDate)),
          ),
      );

      handleSelected(unselectedDates);
      const unselectedDatesWithOriginalTime = ScheduleDates.filter(
        (selectedDate) =>
          !selected.some((selDate) => isSameDay(selectedDate, selDate)),
      );

      setHolidays(unselectedDatesWithOriginalTime);
    }
  }, [selected]);

  const disabledDays = (date: Date) =>
    !ScheduleDates.some((clickableDate) => isSameDay(clickableDate, date));

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
    return ScheduleDates.some(
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
      defaultMonth={ScheduleDates[0]}
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
