import { useEffect, useState } from 'react';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { ko } from 'date-fns/esm/locale';
import { isSameDay } from 'date-fns';
import { useRecoilState } from 'recoil';
import { classDatesState } from '@/recoil/ClassSchedule/atoms';
import { FormattedCaption } from './BasicCalendar';
import { DAY_MODIFIERS, DAY_MODIFIERS_CLASSNAMES } from '@/constants/constants';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';

interface IRangeCalendarProps {
  clickableDates: Date[];
}
const InputClassDates = ({ clickableDates }: IRangeCalendarProps) => {
  const [classDates, setClassDates] = useRecoilState(classDatesState);
  const [selected, setSelected] = useState<Date[] | undefined>();

  useEffect(() => {
    if (selected) {
      setClassDates(selected);
    } else {
      setClassDates([]);
    }
  }, [selected]);

  const clickableDateObjects = clickableDates.map(
    (dateStr) => new Date(dateStr),
  );

  const disabledDays = (date: Date) =>
    !clickableDateObjects.some((clickableDate) =>
      isSameDay(clickableDate, date),
    );

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

  const inputModifiersClassNames = {
    ...DAY_MODIFIERS_CLASSNAMES,
    selectableDays: 'class-input-selectable',
    root: 'class-input-rdp',
  };

  return (
    <DayPicker
      mode="multiple"
      locale={ko}
      showOutsideDays
      defaultMonth={clickableDates[0]}
      selected={selected}
      onSelect={setSelected}
      disabled={disabledDays}
      modifiers={scheduleModifiers}
      modifiersClassNames={inputModifiersClassNames}
      className="flex w-fit rounded-[0.625rem] px-4 py-6 shadow-[1px_1px_3px_1px_rgba(0,0,0,0.25)]"
      classNames={{
        day_selected: 'schedule-selected-day',
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

export default InputClassDates;
