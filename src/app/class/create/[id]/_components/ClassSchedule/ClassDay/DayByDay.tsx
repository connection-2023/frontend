import { eachDayOfInterval, getDay } from 'date-fns';
import dynamic from 'next/dynamic';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { day, IDayTimeList } from '@/types/class';
import { FILTER_WEEK } from '@/constants/constants';
import { useClassScheduleStore } from '@/store';

const TimeList = dynamic(() => import('./TimeList'), {
  ssr: false,
});

interface DayByDayProps {
  lectureMethod?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: IDayTimeList[]) => void;
  defaultValue: IDayTimeList[];
}

const DayByDay = ({
  lectureMethod = '원데이 레슨',
  defaultValue,
  onChange,
}: DayByDayProps) => {
  const initialValue = (() => {
    if (defaultValue.length && !Object.keys(defaultValue[0]).includes('day')) {
      return [{ day: [], dateTime: [''] }];
    } else if (defaultValue.length > 0) {
      return defaultValue;
    } else {
      return [{ day: [], dateTime: [''] }];
    }
  })();

  const isRegularClass = lectureMethod !== '원데이 레슨';
  const [IDayTimeLists, setIDayTimeLists] =
    useState<IDayTimeList[]>(initialValue);
  // 정기 클래스 일때만 사용
  const [selectedDaysCountList, setSelectedDaysCountList] = useState<number[]>(
    [],
  );
  const { classRange, setFinalDate, setClassDates } = useClassScheduleStore();

  const isEveryListHasDay = IDayTimeLists.every((list) => list.day.length > 0);
  const allSelectedDays = useMemo(
    () => IDayTimeLists.flatMap((list) => list.day),
    [IDayTimeLists],
  );

  useEffect(() => {
    if (!classRange || !classRange.from || !classRange.to) return;

    const allDatesInRange = eachDayOfInterval({
      start: classRange.from,
      end: classRange.to,
    });

    const newSelectedDaysCountList = IDayTimeLists.map((list) => {
      const daysInThisList = allDatesInRange.filter((date) => {
        const dayIndex = (getDay(date) + 6) % 7;
        return list.day.includes(FILTER_WEEK[dayIndex]);
      });

      return daysInThisList.length;
    });

    setSelectedDaysCountList(newSelectedDaysCountList);

    const getDayOfWeek = (date: Date) => (getDay(date) + 6) % 7;
    const convertTimeToDate = (date: Date, time: string): Date | null => {
      const [hours, minutes] = time.split(':').map(Number);
      if (!hours || !minutes) return null;

      const newDate = new Date(date);
      newDate.setHours(hours, minutes);
      return newDate;
    };
    const convertIDayTimeListToDate = (
      date: Date,
      obj: IDayTimeList,
    ): Date[] => {
      const dayOfWeek = FILTER_WEEK[getDayOfWeek(date)];
      if (!obj.day.includes(dayOfWeek)) return [];

      return obj.dateTime
        .map((t) => convertTimeToDate(date, t))
        .filter(Boolean) as Date[];
    };
    const convertAllDatesToDate = (
      allDatesInRange: Date[],
      IDayTimeLists: IDayTimeList[],
    ): Date[] => {
      return allDatesInRange.flatMap((date) =>
        IDayTimeLists.flatMap((obj) => convertIDayTimeListToDate(date, obj)),
      );
    };

    const classSchedules = convertAllDatesToDate(
      allDatesInRange,
      IDayTimeLists,
    );

    setFinalDate(classSchedules);
    setClassDates(classSchedules);
  }, [IDayTimeLists, classRange, allSelectedDays, setFinalDate]);

  const toggleDaySelection = (day: string, listIndex: number) => {
    const newIDayTimeLists = IDayTimeLists.map((list, index) =>
      index === listIndex
        ? list.day.includes(day as day)
          ? { ...list, day: list.day.filter((d) => d !== (day as day)) }
          : { ...list, day: [...list.day, day as day] }
        : list,
    );

    setIDayTimeLists(newIDayTimeLists);
    onChange(newIDayTimeLists);
  };

  const handleDayClick = (day: day, listIndex: number) => {
    if (
      !allSelectedDays.includes(day) ||
      (allSelectedDays.includes(day) &&
        IDayTimeLists[listIndex].day.includes(day))
    ) {
      toggleDaySelection(day, listIndex);
    }
  };

  const addNewDayList = () => {
    if (IDayTimeLists.length < 7) {
      const newIDayTimeLists = [...IDayTimeLists, { day: [], dateTime: [''] }];
      setIDayTimeLists(newIDayTimeLists);
      onChange(newIDayTimeLists);
    } else {
      toast.error('모든 요일이 이미 선택되었습니다.');
    }
  };

  const updatestartDateTime = (
    listIndex: number,
    timeslotIndex: number,
    newStartTime: string,
  ) => {
    const newIDayTimeLists = IDayTimeLists.map((list, index) =>
      index === listIndex
        ? {
            ...list,
            dateTime: list.dateTime.map((timeslot, i) =>
              i === timeslotIndex ? newStartTime : timeslot,
            ),
          }
        : list,
    );
    setIDayTimeLists(newIDayTimeLists);
    onChange(newIDayTimeLists);
  };

  const updateTimeslots = (listIndex: number, newTimeslots: string[]) => {
    const newIDayTimeLists = IDayTimeLists.map((timeslots, index) =>
      index === listIndex
        ? { ...timeslots, dateTime: newTimeslots }
        : timeslots,
    );

    setIDayTimeLists(newIDayTimeLists);
    onChange(newIDayTimeLists);
  };

  const addNewTimeSlot = (listIndex: number) => {
    const newTimeslot = '';
    const updatedTimeslots = [
      ...IDayTimeLists[listIndex].dateTime,
      newTimeslot,
    ];

    updateTimeslots(listIndex, updatedTimeslots);
  };

  const removeTimeSlot = (listIndex: number, timeslotIndex: number) => {
    const updatedTimeslots = IDayTimeLists[listIndex].dateTime.filter(
      (_, i) => i !== timeslotIndex,
    );

    if (listIndex !== 0 && updatedTimeslots.length === 0) {
      const newIDayTimeLists = IDayTimeLists.filter(
        (_, index) => index !== listIndex,
      );

      setIDayTimeLists(newIDayTimeLists);
      onChange(newIDayTimeLists);
      return;
    }

    updateTimeslots(listIndex, updatedTimeslots);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {IDayTimeLists.map((list, listIndex) => (
          <div
            key={listIndex}
            className="flex w-full flex-col justify-between md:flex-row"
          >
            <div
              className={`flex w-full flex-col gap-3 ${
                isRegularClass && 'md:mb-8'
              }`}
            >
              {isRegularClass && (
                <div className="flex h-7 items-center gap-3.5 text-lg font-medium">
                  <span>{list.day.join('')}</span>
                  {selectedDaysCountList[listIndex] > 0 && (
                    <span className="text-sub-color1">
                      {selectedDaysCountList[listIndex]}회
                    </span>
                  )}
                </div>
              )}
              <ul key={listIndex} className="flex gap-3">
                {FILTER_WEEK.map((day) => (
                  <li
                    key={listIndex + day}
                    onClick={() => handleDayClick(day, listIndex)}
                    className={getDayStyle(allSelectedDays, day, list)}
                  >
                    {day}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`mt-2.5 flex flex-col ${
                isRegularClass ? 'md:mt-8' : 'md:mt-0'
              }`}
            >
              <ul className="flex flex-col gap-2">
                {list.dateTime.map((timeslot, timeslotIndex) => (
                  <TimeList
                    key={timeslotIndex + timeslot}
                    startTime={timeslot}
                    onChange={(newStartTime) =>
                      updatestartDateTime(
                        listIndex,
                        timeslotIndex,
                        newStartTime,
                      )
                    }
                    onRemove={() => removeTimeSlot(listIndex, timeslotIndex)}
                  />
                ))}
              </ul>

              <button
                onClick={() => addNewTimeSlot(listIndex)}
                className="mt-2 flex w-full justify-end whitespace-nowrap text-sm font-bold text-gray-500"
              >
                + 시간 추가
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={
          !isEveryListHasDay || FILTER_WEEK.length === allSelectedDays.length
        }
        onClick={addNewDayList}
        className={getButtonClass(isEveryListHasDay, allSelectedDays)}
        aria-disabled={FILTER_WEEK.length === allSelectedDays.length}
      >
        {isRegularClass ? '+ 새로운 일정 추가' : '+ 요일 추가'}
      </button>
    </>
  );
};

export default DayByDay;

const getButtonClass = (
  isEveryListHasDay: boolean,
  allSelectedDays: string[],
) => {
  const baseClass =
    'mt-3.5 flex h-10 w-full items-center justify-center rounded-md text-lg font-semibold shadow-float';

  const isDisabled =
    !isEveryListHasDay || FILTER_WEEK.length === allSelectedDays.length;
  const colorClass = isDisabled ? 'text-gray-500' : 'black';

  return `${baseClass} ${colorClass}`;
};

const getDayStyle = (
  allSelectedDays: day[],
  day: string,
  list: IDayTimeList,
) => {
  const baseClass =
    'flex h-[34px] w-[34px] items-center justify-center rounded-full border border-solid text-sm  text-gray-500';
  const styles = {
    selected: 'cursor-pointer bg-sub-color1 font-bold text-white',
    clickable: 'cursor-pointer font-medium',
    default: 'cursor-default font-medium',
  };

  let styleKey: keyof typeof styles;

  if (list.day.includes(day as day)) {
    styleKey = 'selected';
  } else if (
    !allSelectedDays.includes(day as day) ||
    list.day.includes(day as day)
  ) {
    styleKey = 'clickable';
  } else {
    styleKey = 'default';
  }

  return `${baseClass} ${styles[styleKey]}`;
};
