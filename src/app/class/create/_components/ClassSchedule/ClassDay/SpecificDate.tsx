import { eachDayOfInterval, format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { useEffect, useId, useReducer, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { classRangeState, classDatesState } from '@/recoil/ClassSchedule/atoms';
import { specificDateReducer } from '@/utils/specificDateReducer';
import TimeList from './TimeList';
import InputClassDates from '@/components/Calendar/InputClassDates';
import { dateTimes } from '@/types/types';

const initialState = {
  selected: [],
  selectableDates: [],
  selectedDate: null,
};

const SpecificDate = () => {
  const [classDates, setClassDates] = useRecoilState(classDatesState);
  const classRange = useRecoilValue(classRangeState);
  const [state, dispatch] = useReducer(specificDateReducer, initialState);

  useEffect(() => {
    if (classRange && classRange.from && classRange.to) {
      const allDatesInRange = eachDayOfInterval({
        start: classRange.from,
        end: classRange.to,
      });
      dispatch({ type: 'SET_SELECTABLE_DATES', payload: allDatesInRange });
    }
  }, [classRange]);

  useEffect(() => {
    const dates = state.selected.map((item) => item.date);
    setClassDates(dates);
  }, [state.selected]);

  const findIndexBySelectedDate = (selectedDate: Date) => {
    return state.selected.findIndex((item) =>
      isSameDay(item.date, selectedDate),
    );
  };

  const getUpdatedItem = (index: number) => {
    return { ...state.selected[index] };
  };

  const updateOrAddTimeSlot = (index: number, newStartTime?: string) => {
    if (!state.selectedDate) return;
    const selectedIndex = findIndexBySelectedDate(state.selectedDate);

    if (selectedIndex !== -1) {
      const updatedItem = getUpdatedItem(selectedIndex);

      if (newStartTime !== undefined) updatedItem.time[index] = newStartTime;
      else updatedItem.time.push('');

      dispatch({
        type: 'UPDATE_SELECTED',
        index: selectedIndex,
        item: updatedItem,
      });
    } else {
      if (state.selectedDate && newStartTime !== undefined) {
        dispatch({
          type: 'ADD_SELECTED',
          payload: { date: state.selectedDate, time: [newStartTime] },
        });
      }
    }
  };

  const handleStartTimeChange = (index: number, newStartTime: string) => {
    if (!state.selectedDate || !newStartTime) return;

    updateOrAddTimeSlot(index, newStartTime);
  };

  const handleSelectedDate = (date: Date) => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: date });
  };

  const addTimeSlot = () => {
    if (!state.selectedDate) return;

    updateOrAddTimeSlot(0);
  };

  const removeTimeSlot = (indexToRemove: number) => {
    if (!state.selectedDate) return;
    const selectedIndex = findIndexBySelectedDate(state.selectedDate);

    if (selectedIndex !== -1) {
      const updatedItem = { ...state.selected[selectedIndex] };
      updatedItem.time.splice(indexToRemove, 1);

      if (updatedItem.time.length === 0) {
        dispatch({ type: 'REMOVE_SELECTED', index: selectedIndex });
      } else {
        dispatch({
          type: 'UPDATE_SELECTED',
          index: selectedIndex,
          item: updatedItem,
        });
      }
    }
  };

  const clearTimeSlot = () => {
    if (!state.selectedDate) return;

    const selectedIndex = findIndexBySelectedDate(state.selectedDate);

    if (selectedIndex !== -1) {
      dispatch({ type: 'REMOVE_SELECTED', index: selectedIndex });
    }
  };

  const selectedItem = useMemo(() => {
    if (!state.selectedDate) return null;

    return state.selected.find(
      (item) =>
        item.date &&
        state.selectedDate &&
        isSameDay(item.date, state.selectedDate),
    );
  }, [state.selected, state.selectedDate]);

  return (
    <>
      <p className="mb-3 text-sm font-medium text-main-color">
        *달력에서 날짜를 클릭 후 수업 시간을 추가해주세요.
      </p>
      {state.selectableDates && (
        <div className="flex w-full justify-between">
          {state.selectableDates && (
            <InputClassDates
              clickableDates={state.selectableDates}
              handleSelectedDate={handleSelectedDate}
            />
          )}
          {state.selectedDate && (
            <div className="ml-2 flex flex-col">
              {/* Time 리스트 위 */}
              <div className="flex w-full">
                {/* 선택 날짜 리스트 */}
                <div className="flex w-[300px] flex-wrap gap-x-2 text-base font-bold">
                  <span>
                    {state.selectedDate &&
                      format(state.selectedDate, 'yy.MM.dd(E)', { locale: ko })}
                  </span>
                </div>
                <button
                  onClick={clearTimeSlot}
                  className="flex items-start whitespace-nowrap text-sm font-semibold text-sub-color2 underline"
                >
                  전체 삭제
                </button>
              </div>
              {/* 시간 리스트 */}
              <TimeSlotManager
                selectedItem={selectedItem}
                handleStartTimeChange={handleStartTimeChange}
                addTimeSlot={addTimeSlot}
                removeTimeSlot={removeTimeSlot}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SpecificDate;

interface TimeSlotManagerProps {
  selectedItem?: dateTimes | null;
  handleStartTimeChange: (index: number, newStartTime: string) => void;
  addTimeSlot: () => void;
  removeTimeSlot: (indexToRemove: number) => void;
}

const TimeSlotManager = ({
  selectedItem,
  handleStartTimeChange,
  addTimeSlot,
  removeTimeSlot,
}: TimeSlotManagerProps) => {
  const key = useId();
  return (
    <>
      <ul className="mt-2 flex w-auto flex-col gap-2">
        {selectedItem ? (
          selectedItem.time.map((startTime, index) => (
            <TimeList
              key={index}
              startTime={startTime}
              onChange={(newStartTime) =>
                handleStartTimeChange(index, newStartTime)
              }
              onRemove={() => removeTimeSlot(index)}
            />
          ))
        ) : (
          <TimeList
            key={key}
            startTime=""
            onChange={(newStartTime) => handleStartTimeChange(0, newStartTime)}
          />
        )}
      </ul>

      <button
        onClick={addTimeSlot}
        className="mt-2 flex w-full justify-end text-sm font-bold text-sub-color2"
      >
        + 시간추가
      </button>
    </>
  );
};
