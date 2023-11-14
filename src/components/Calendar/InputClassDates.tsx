import { isSameDay } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { useEffect, useState } from 'react';
import React from 'react';
import { DayPicker, CaptionProps } from 'react-day-picker';
import { useClassScheduleStore } from '@/store';
import { FormattedCaption } from '@/utils/calendarUtils/CalendarCaption';
import {
  getInputCalendarModifiers,
  INPUT_SCHEDULE_MODIFIERS_ClassNames,
  INPUT_SCHEDULE_ClassNames,
} from '../../utils/calendarUtils/dateUtils';
import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';
interface IInputClassDatesProps {
  clickableDates: Date[];
  handleClickDate: (date: Date) => void;
}
const InputClassDates = ({
  clickableDates,
  handleClickDate,
}: IInputClassDatesProps) => {
  const classDates =
    useClassScheduleStore((state) => state.filteredDates) || [];
  const [selected, setSelected] = useState<Date | undefined>();

  useEffect(() => {
    if (selected) handleClickDate(selected);
  }, [selected]);

  if (!clickableDates.length) {
    return null;
  }
  const disabledDays = (date: Date) =>
    !clickableDates.some((clickableDate) =>
      isSameDay(new Date(clickableDate), date),
    );

  return (
    <DayPicker
      mode="single"
      locale={ko}
      showOutsideDays
      defaultMonth={clickableDates[0]}
      selected={selected}
      onSelect={setSelected}
      disabled={disabledDays}
      modifiers={getInputCalendarModifiers(classDates, clickableDates)}
      modifiersClassNames={INPUT_SCHEDULE_MODIFIERS_ClassNames}
      className="flex w-fit rounded-[0.625rem] px-4 py-6 shadow-horizontal"
      classNames={INPUT_SCHEDULE_ClassNames}
      components={{
        Caption: ({ displayMonth }: CaptionProps) =>
          FormattedCaption({
            displayMonth,
          }),
      }}
    />
  );
};

export default React.memo(InputClassDates);
