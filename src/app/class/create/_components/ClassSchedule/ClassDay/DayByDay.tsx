import { eachDayOfInterval, getDay } from 'date-fns';
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { FILTER_WEEK } from '@/constants/constants';
import { useClassScheduleStore } from '@/store';
import TimeList from './TimeList';
import { DayTimeList } from '@/types/class';

const DayByDay = ({
  lectureMethod = '원데이 레슨',
}: {
  lectureMethod?: string;
}) => {
  const isRegularClass = lectureMethod !== '원데이 레슨';
  const [dayTimeLists, setDayTimeLists] = useState<DayTimeList[]>([
    { day: [], timeSlots: [''] },
  ]);
  const store = useClassScheduleStore();
  const setClassDates = useClassScheduleStore((state) => state.setFilteredDate);
  const setSelectedDates = useClassScheduleStore(
    (state) => state.setClassDates,
  );
  const classRange = store.classRange;
  const isEveryListHasDay = dayTimeLists.every((list) => list.day.length > 0);
  const allSelectedDays = useMemo(
    () => dayTimeLists.flatMap((list) => list.day),
    [dayTimeLists],
  );

  const [selectedDaysCountList, setSelectedDaysCountList] = useState<number[]>(
    [],
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
  }, [dayTimeLists, classRange, allSelectedDays, setClassDates]);

  const toggleDaySelection = (day: string, listIndex: number) => {
    setDayTimeLists(
      dayTimeLists.map((list, index) =>
        index === listIndex
          ? list.day.includes(day)
            ? { ...list, day: list.day.filter((d) => d !== day) }
            : { ...list, day: [...list.day, day] }
          : list,
      ),
    );
  };

  const handleDayClick = (day: string, listIndex: number) => {
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
      setDayTimeLists([...dayTimeLists, { day: [], timeSlots: [''] }]);
    } else {
      toast.error('모든 요일이 이미 선택되었습니다.');
    }
  };

  const updateStartTime = (
    listIndex: number,
    timeslotIndex: number,
    newStartTime: string,
  ) => {
    setDayTimeLists((prevDayTimeList) =>
      prevDayTimeList.map((list, index) =>
        index === listIndex
          ? {
              ...list,
              timeSlots: list.timeSlots.map((timeslot, i) =>
                i === timeslotIndex ? newStartTime : timeslot,
              ),
            }
          : list,
      ),
    );
  };

  const updateTimeslots = (listIndex: number, newTimeslots: string[]) => {
    setDayTimeLists((prevDayTimeList) =>
      prevDayTimeList.map((timeslots, index) =>
        index === listIndex
          ? { ...timeslots, timeSlots: newTimeslots }
          : timeslots,
      ),
    );
  };

  const addNewTimeSlot = (listIndex: number) => {
    const newTimeslot = '';
    const updatedTimeslots = [
      ...dayTimeLists[listIndex].timeSlots,
      newTimeslot,
    ];

    updateTimeslots(listIndex, updatedTimeslots);
  };

  const removeTimeSlot = (listIndex: number, timeslotIndex: number) => {
    const updatedTimeslots = dayTimeLists[listIndex].timeSlots.filter(
      (_, i) => i !== timeslotIndex,
    );

    if (listIndex !== 0 && updatedTimeslots.length === 0) {
      setDayTimeLists((prevDayTimeList) =>
        prevDayTimeList.filter((_, index) => index !== listIndex),
      );
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

    if (list.day.includes(day)) {
      styleKey = 'selected';
    } else if (!allSelectedDays.includes(day) || list.day.includes(day)) {
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
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="구분"
                    className="h-7 w-16 rounded-md border border-solid border-gray-500 px-2.5 py-0.5 text-base font-medium focus:outline-sub-color1"
                  />
                  <span className="text-base font-medium text-sub-color1">
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

            <div className={`flex flex-col ${isRegularClass && 'mt-12'}`}>
              <ul className="flex flex-col gap-2">
                {list.timeSlots.map((timeslot, timeslotIndex) => (
                  <TimeList
                    key={timeslotIndex + timeslot}
                    startTime={timeslot}
                    onChange={(newStartTime) =>
                      updateStartTime(listIndex, timeslotIndex, newStartTime)
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
