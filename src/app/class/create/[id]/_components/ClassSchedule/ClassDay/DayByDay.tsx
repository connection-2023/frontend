import { eachDayOfInterval, getDay } from 'date-fns';
import dynamic from 'next/dynamic';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { FILTER_WEEK } from '@/constants/constants';
import { useClassScheduleStore } from '@/store';
import { day, DayTimeList } from '@/types/class';

const TimeList = dynamic(() => import('./TimeList'), {
  ssr: false,
});

interface DayByDayProps {
  lectureMethod?: string;
  onChange: (value: DayTimeList[]) => void;
  defaultValue: DayTimeList[];
}

const DayByDay = ({
  lectureMethod = '원데이 레슨',
  defaultValue,
  onChange,
}: DayByDayProps) => {
  const initialValue =
    defaultValue.length && !Object.keys(defaultValue[0]).includes('day')
      ? [{ day: [], startDateTime: [''] }]
      : defaultValue.length > 0
      ? defaultValue
      : [{ day: [], startDateTime: [''] }];
  const isRegularClass = lectureMethod !== '원데이 레슨';
  const [dayTimeLists, setDayTimeLists] = useState<DayTimeList[]>(initialValue);
  const [selectedDaysCountList, setSelectedDaysCountList] = useState<number[]>( // 정기 클래스 일때만 사용
    [],
  );
  const classRange = useClassScheduleStore((state) => state.classRange);
  const setClassDates = useClassScheduleStore((state) => state.setFilteredDate);
  const setSelectedDates = useClassScheduleStore(
    (state) => state.setClassDates,
  );
  const isEveryListHasDay = dayTimeLists.every((list) => list.day.length > 0);
  const allSelectedDays = useMemo(
    () => dayTimeLists.flatMap((list) => list.day),
    [dayTimeLists],
  );
  const setClassSchedules = useClassScheduleStore(
    (state) => state.setClassSchedules,
  );

  useEffect(() => {
    if (!classRange || !classRange.from || !classRange.to) return;

    const allDatesInRange = eachDayOfInterval({
      start: classRange.from,
      end: classRange.to,
    });

    const selectedDaysCountList = dayTimeLists.map((list) => {
      const daysInThisList = allDatesInRange.filter((date) => {
        const dayIndex = (getDay(date) + 6) % 7;
        return list.day.includes(FILTER_WEEK[dayIndex]);
      });

      return daysInThisList.length;
    });

    setSelectedDaysCountList(selectedDaysCountList);

    const selectedDays = allDatesInRange.filter((date) => {
      const dayIndex = (getDay(date) + 6) % 7;
      return allSelectedDays.includes(FILTER_WEEK[dayIndex]);
    });

    setClassDates(selectedDays);
    setSelectedDates(selectedDays);

    const classSchedules = allDatesInRange.flatMap((date) => {
      const dayOfWeek = (getDay(date) + 6) % 7;

      return dayTimeLists.flatMap((obj) => {
        if (obj.day.includes(FILTER_WEEK[dayOfWeek])) {
          return obj.startDateTime.map((t) => {
            const [hours, minutes] = t.split(':').map(Number);
            if (!hours || !minutes) [];
            const newDate = new Date(date);
            newDate.setHours(hours, minutes);
            return newDate;
          });
        }
        return [];
      });
    });
    setClassSchedules(classSchedules);
  }, [dayTimeLists, classRange, allSelectedDays, setClassDates]);

  const toggleDaySelection = (day: string, listIndex: number) => {
    const newDaytimeLists = dayTimeLists.map((list, index) =>
      index === listIndex
        ? list.day.includes(day as day)
          ? { ...list, day: list.day.filter((d) => d !== (day as day)) }
          : { ...list, day: [...list.day, day as day] }
        : list,
    );

    setDayTimeLists(newDaytimeLists);
    onChange(newDaytimeLists);
  };

  const handleDayClick = (day: day, listIndex: number) => {
    if (
      !allSelectedDays.includes(day) ||
      (allSelectedDays.includes(day) &&
        dayTimeLists[listIndex].day.includes(day))
    ) {
      toggleDaySelection(day, listIndex);
    }
  };

  const addNewDayList = () => {
    if (dayTimeLists.length < 7) {
      const newDayTimeLists = [
        ...dayTimeLists,
        { day: [], startDateTime: [''] },
      ];
      setDayTimeLists(newDayTimeLists);
      onChange(newDayTimeLists);
    } else {
      toast.error('모든 요일이 이미 선택되었습니다.');
    }
  };

  const updatestartDateTime = (
    listIndex: number,
    timeslotIndex: number,
    newStartTime: string,
  ) => {
    const newDayTimeLists = dayTimeLists.map((list, index) =>
      index === listIndex
        ? {
            ...list,
            startDateTime: list.startDateTime.map((timeslot, i) =>
              i === timeslotIndex ? newStartTime : timeslot,
            ),
          }
        : list,
    );

    setDayTimeLists(newDayTimeLists);
    onChange(newDayTimeLists);
  };

  const updateTimeslots = (listIndex: number, newTimeslots: string[]) => {
    const newDayTimeLists = dayTimeLists.map((timeslots, index) =>
      index === listIndex
        ? { ...timeslots, startDateTime: newTimeslots }
        : timeslots,
    );

    setDayTimeLists(newDayTimeLists);
    onChange(newDayTimeLists);
  };

  const addNewTimeSlot = (listIndex: number) => {
    const newTimeslot = '';
    const updatedTimeslots = [
      ...dayTimeLists[listIndex].startDateTime,
      newTimeslot,
    ];

    updateTimeslots(listIndex, updatedTimeslots);
  };

  const removeTimeSlot = (listIndex: number, timeslotIndex: number) => {
    const updatedTimeslots = dayTimeLists[listIndex].startDateTime.filter(
      (_, i) => i !== timeslotIndex,
    );

    if (listIndex !== 0 && updatedTimeslots.length === 0) {
      const newDayTimeLists = dayTimeLists.filter(
        (_, index) => index !== listIndex,
      );

      setDayTimeLists(newDayTimeLists);
      onChange(newDayTimeLists);
      return;
    }

    updateTimeslots(listIndex, updatedTimeslots);
  };

  const getDayStyle = (day: string, list: DayTimeList) => {
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

  return (
    <>
      <div className="flex flex-col gap-5">
        {dayTimeLists.map((list, listIndex) => (
          <div key={listIndex} className="flex w-full justify-between">
            <div
              className={`flex w-full flex-col gap-3 ${
                isRegularClass && 'mb-8'
              }`}
            >
              {isRegularClass && (
                <div className="flex items-center gap-3.5 text-lg font-medium">
                  <span>{list.day.join('')}</span>
                  <span className="text-sub-color1">
                    {selectedDaysCountList[listIndex]}회
                  </span>
                </div>
              )}
              <ul key={listIndex} className="flex gap-3">
                {FILTER_WEEK.map((day) => (
                  <li
                    key={listIndex + day}
                    onClick={() => handleDayClick(day, listIndex)}
                    className={getDayStyle(day, list)}
                  >
                    {day}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`flex flex-col ${isRegularClass && 'mt-8'}`}>
              <ul className="flex flex-col gap-2">
                {list.startDateTime.map((timeslot, timeslotIndex) => (
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
                className="mt-2 flex w-full justify-end text-sm font-bold text-gray-500"
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
    'mt-[0.88rem] flex h-10 w-full items-center justify-center rounded-[0.3125rem] text-lg font-semibold shadow-float';

  const isDisabled =
    !isEveryListHasDay || FILTER_WEEK.length === allSelectedDays.length;
  const colorClass = isDisabled ? 'text-gray-500' : 'black';

  return `${baseClass} ${colorClass}`;
};
