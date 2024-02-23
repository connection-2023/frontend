import { eachDayOfInterval, isSameDay } from 'date-fns';
import dynamic from 'next/dynamic';
import { useEffect, useId, useReducer, useMemo } from 'react';
import { useClassScheduleStore } from '@/store';
import { formatDateWithDay } from '@/utils/dateTimeUtils';
import { specificDateReducer } from '@/utils/specificDateReducer';
import { DateTimeList } from '@/types/class';

const InputClassDates = dynamic(
  () => import('@/components/Calendar/SingleCalendar'),
  {
    ssr: false,
  },
);

const TimeList = dynamic(() => import('./TimeList'), {
  ssr: false,
});

interface SpecificDateProps {
  onChange: (value: DateTimeList[]) => void;
  defaultValue: DateTimeList[];
}

const SpecificDate = ({ defaultValue, onChange }: SpecificDateProps) => {
  const initialDates =
    defaultValue.length && Object.keys(defaultValue[0]).includes('date')
      ? defaultValue.map((value) => ({
          date: new Date(value.date),
          startDateTime: [...value.startDateTime],
        }))
      : [];

  const initialState = {
    selected: [...initialDates] as DateTimeList[],
    selectableDates: [],
    selectedDate: null,
  };
  const classRange = useClassScheduleStore((state) => state.classRange);
  const setClassDates = useClassScheduleStore((state) => state.setFilteredDate);
  const setClassSchedules = useClassScheduleStore(
    (state) => state.setClassSchedules,
  );
  const [state, dispatch] = useReducer(specificDateReducer, initialState);

  const updateState = () => {
    const dates = state.selected.map((item) => item.date);
    const classSchedules = state.selected.flatMap((schedule) => {
      return schedule.startDateTime.map((time) => {
        const date = new Date(schedule.date);
        const [hours, minutes] = time.split(':').map(Number);
        date.setHours(hours, minutes);
        return date;
      });
    });

    setClassSchedules(classSchedules);
    setClassDates(dates);
    onChange(state.selected);
  };

  useEffect(() => {
    updateState();
  }, []);

  useEffect(() => {
    if (classRange && classRange.from && classRange.to) {
      const allDatesInRange = eachDayOfInterval({
        start: classRange.from,
        end: classRange.to,
      });
      dispatch({ type: 'SET_SELECTABLE_DATES', payload: allDatesInRange });
    }
  }, [classRange]);

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

      if (newStartTime !== undefined)
        updatedItem.startDateTime[index] = newStartTime;
      else updatedItem.startDateTime.push('');

      dispatch({
        type: 'UPDATE_SELECTED',
        index: selectedIndex,
        item: updatedItem,
      });
    } else {
      if (state.selectedDate && newStartTime !== undefined) {
        const newItem = {
          date: state.selectedDate,
          startDateTime: [newStartTime],
        };

        dispatch({
          type: 'ADD_SELECTED',
          payload: newItem,
        });
      }
    }
    updateState();
  };

  const handleStartTimeChange = (index: number, newStartTime: string) => {
    if (!state.selectedDate || !newStartTime) return;

    updateOrAddTimeSlot(index, newStartTime);
  };

  const handleSelectedDate = (date: Date | undefined) => {
    if (date instanceof Date) {
      dispatch({ type: 'SET_SELECTED_DATE', payload: date });
    }
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
      updatedItem.startDateTime.splice(indexToRemove, 1);

      if (updatedItem.startDateTime.length === 0) {
        dispatch({ type: 'REMOVE_SELECTED', index: selectedIndex });
      } else {
        dispatch({
          type: 'UPDATE_SELECTED',
          index: selectedIndex,
          item: updatedItem,
        });
      }
    }

    updateState();
  };

  const clearTimeSlot = () => {
    if (!state.selectedDate) return;

    const selectedIndex = findIndexBySelectedDate(state.selectedDate);

    if (selectedIndex !== -1) {
      dispatch({ type: 'REMOVE_SELECTED', index: selectedIndex });
    }

    updateState();
  };

  const selectedItem = useMemo(() => {
    if (!state.selectedDate) return null;

    return state.selected.find(
      (item) => state.selectedDate && isSameDay(item.date, state.selectedDate),
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
            <div className="w-fit">
              <InputClassDates
                mode="specific"
                clickableDates={state.selectableDates}
                handleClickDate={handleSelectedDate}
              />
            </div>
          )}
          {state.selectedDate && (
            <div className="ml-2 flex flex-col">
              {/* Time 리스트 위 */}
              <div className="flex w-full">
                {/* 선택 날짜 리스트 */}
                <div className="flex w-[300px] flex-wrap gap-x-2 text-base font-bold">
                  <span>
                    {state.selectedDate &&
                      formatDateWithDay(state.selectedDate)}
                  </span>
                </div>
                <button
                  onClick={clearTimeSlot}
                  className="flex items-start whitespace-nowrap text-sm font-semibold text-gray-500 underline"
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
  selectedItem?: DateTimeList | null;
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
          selectedItem.startDateTime.map((startTime, index) => (
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
        className="mt-2 flex w-full justify-end text-sm font-bold text-gray-500"
      >
        + 시간추가
      </button>
    </>
  );
};
