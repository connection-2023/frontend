import { format } from 'date-fns';
import { compareAsc, isSameDay } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import DayOffCalendar from '@/components/Calendar/BasicCalendar';
import { IClassSchedule } from '@/types/class';
import { getUniqueDates } from '@/utils/parseUtils';

const DayOffOption = ['네, 휴무일이 있어요', '아니요, 휴무일 없어요'];

interface EditDayoffProps {
  onChange: (value: Date[]) => void;
  defaultValue: {
    schedules: IClassSchedule[];
    holidays: string[];
  };
}

const EditDayoff = ({ onChange, defaultValue }: EditDayoffProps) => {
  const initialValues = useRef(defaultValue);
  const parsedSchedules = useMemo(
    () =>
      initialValues.current.schedules?.map(
        (schedule) => new Date(schedule.startDateTime),
      ) || [],
    [initialValues.current.schedules],
  );
  const parsedHolidays = useMemo(
    () =>
      initialValues.current.holidays?.map((holiday) => new Date(holiday)) || [],
    [initialValues.current.holidays],
  );
  const allDays = useMemo(
    () => [...parsedSchedules, ...parsedHolidays],
    [parsedSchedules, parsedHolidays],
  );
  const initialUnselectedDates = useRef(parsedHolidays);

  const defultOption = defaultValue.holidays?.length ? 0 : null;
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    defultOption,
  );
  const [unselectedDates, setUnselectedDates] =
    useState<Date[]>(parsedHolidays);

  useEffect(() => {
    initialUnselectedDates.current = parsedHolidays;
  }, [parsedHolidays]);

  const uniqueSelectableDates = useMemo(
    () => getUniqueDates(allDays),
    [allDays],
  );

  const uniqueScheduleDates = useMemo(
    () => getUniqueDates(parsedSchedules),
    [parsedSchedules],
  );

  const uniqueUnselectedDates = useMemo(
    () => getUniqueDates(unselectedDates),
    [unselectedDates],
  ).sort(compareAsc);

  const handleUnselected = (unselectedDates: Date[]) => {
    const filteredunselectedDates = allDays.filter((schedule) =>
      unselectedDates.some((unselectedDate) =>
        isSameDay(schedule, unselectedDate),
      ),
    );

    setUnselectedDates(filteredunselectedDates);
    onChange(filteredunselectedDates);
  };

  const handleOptionClick = (index: number) => {
    setSelectedOptionIndex(index);

    if (index === 1) {
      setUnselectedDates([]);
    } else if (index === 0) {
      setUnselectedDates(initialUnselectedDates.current);
    }
  };

  return (
    <>
      <div className="flex w-full gap-4">
        {DayOffOption.map((option, index) => (
          <button
            key={option}
            onClick={() => handleOptionClick(index)}
            className={getClassNames(selectedOptionIndex === index, false)}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOptionIndex === 0 ? (
        <>
          <h3 className="mt-7 text-lg font-bold font-semibold">
            아래 달력에서 휴무일을 선택해주세요
          </h3>
          <div className="mt-5 flex w-full px-5">
            <div className="w-fit">
              <DayOffCalendar
                mode="dayoff"
                selectableDates={uniqueSelectableDates}
                selectedDates={uniqueScheduleDates}
                handleSelected={handleUnselected}
              />
            </div>
            <div className="ml-[3.75rem] flex w-full flex-col">
              <p className="mb-[0.87rem] text-sm font-semibold">
                선택한 휴무일
              </p>
              <div className="flex h-fit w-fit flex-wrap gap-x-2 gap-y-3 text-sm font-medium text-gray-100">
                {uniqueUnselectedDates.map((date) => (
                  <p
                    key={date.toLocaleDateString()}
                    className="h-fit rounded-[0.3125rem] border border-solid border-gray-500 px-[0.69rem] py-[0.31rem]"
                  >
                    {format(date, 'yy.MM.dd (E)', { locale: ko })}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default React.memo(EditDayoff);

const getClassNames = (isSelected: boolean, isDisabled: boolean) => {
  let classNames = 'h-10 w-1/2 rounded-md';

  if (isDisabled) {
    classNames += ' border border-solid border-gray-500 text-gray-500';
  }

  if (isSelected) {
    classNames += ' bg-sub-color1 text-white';
  } else if (isSelected && !isDisabled) {
    classNames += ' border border-solid border-gray-500 text-gray-100';
  } else {
    classNames += ' border border-solid border-gray-500';
  }

  return classNames;
};
