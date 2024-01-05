import { eachDayOfInterval, format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { useEffect, useId, useReducer, useMemo, useState } from 'react';
import TimeList from './TimeList';
import InputClassDates from '@/components/Calendar/SingleCalendar';
import { IEditSpecificDateType, IEditStartDateTime } from '@/types/class';
import { editSpecificDateReducer } from '@/utils/editSpecificDateReducer';

// /* eslint-disable no-unused-vars */
interface AddSchedulesProps {
  onChange: (value: Date[]) => void;
  defaultValue: {
    range: { startDate: string; endDate: string };
    schedules: Date[];
  };
  duration: number;
}

/* eslint-enable no-unused-vars */
const AddSchedules = ({
  defaultValue,
  onChange,
  duration,
}: AddSchedulesProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const initialDates = (): IEditSpecificDateType[] => {
    let dateGroupedSchedules: { [key: string]: IEditStartDateTime[] } = {};

    if (!defaultValue.schedules) return [];

    defaultValue.schedules.forEach((schedule) => {
      const date = format(schedule, 'yyyy-MM-dd');
      const time = format(schedule, 'HH:mm');

      if (dateGroupedSchedules[date]) {
        dateGroupedSchedules[date].push({ time: time, editable: false });
      } else {
        dateGroupedSchedules[date] = [{ time: time, editable: false }];
      }
    });

    const result = Object.keys(dateGroupedSchedules).map((date) => {
      return {
        date: new Date(date),
        startDateTime: dateGroupedSchedules[date],
      };
    });

    return result;
  };

  useEffect(() => {
    if (
      !defaultValue.range ||
      !defaultValue.range.startDate ||
      !defaultValue.range.endDate
    )
      return;

    const allDatesInRange = eachDayOfInterval({
      start: new Date(defaultValue.range.startDate),
      end: new Date(defaultValue.range.endDate),
    });

    dispatch({ type: 'SET_SELECTABLE_DATES', payload: allDatesInRange });
  }, [defaultValue.range.endDate]);

  const initialState = {
    selected: initialDates(),
    selectableDates: [],
    selectedDate: null,
  };

  const [state, dispatch] = useReducer(editSpecificDateReducer, initialState);

  const addedSchedules = state.selected.reduce(
    (sum: number, current: IEditSpecificDateType) =>
      sum + current.startDateTime.length,
    0,
  );

  const updateState = () => {
    const classSchedules = state.selected.flatMap(
      (schedule: IEditSpecificDateType) => {
        return schedule.startDateTime.map((item) => {
          const date = new Date(schedule.date);
          const [hours, minutes] = item.time.split(':').map(Number);
          date.setHours(hours, minutes);
          return date;
        });
      },
    );

    onChange(classSchedules);
  };

  useEffect(() => {
    updateState();
  }, [addedSchedules]);

  const findIndexBySelectedDate = (selectedDate: Date) => {
    return state.selected.findIndex((item: IEditSpecificDateType) =>
      isSameDay(item.date, selectedDate),
    );
  };

  const getUpdatedItem = (index: number) => {
    return { ...state.selected[index] };
  };

  const updateOrAddTimeSlot = (index: number, newStartTime?: string) => {
    if (!selectedDate) return;
    const selectedIndex = findIndexBySelectedDate(selectedDate);

    if (selectedIndex !== -1) {
      const updatedItem = getUpdatedItem(selectedIndex);

      if (newStartTime !== undefined)
        updatedItem.startDateTime[index] = {
          time: newStartTime,
          editable: true,
        };
      else updatedItem.startDateTime.push({ time: '', editable: true });

      dispatch({
        type: 'UPDATE_SELECTED',
        index: selectedIndex,
        item: updatedItem,
      });
    } else {
      if (selectedDate && newStartTime !== undefined) {
        const newItem = {
          date: selectedDate,
          startDateTime: [{ time: newStartTime, editable: true }],
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
    if (!selectedDate || !newStartTime) return;

    updateOrAddTimeSlot(index, newStartTime);
  };

  const handleSelectedDate = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const addTimeSlot = () => {
    if (!selectedDate) return;

    updateOrAddTimeSlot(0);
  };

  const removeTimeSlot = (indexToRemove: number) => {
    if (!selectedDate) return;
    const selectedIndex = findIndexBySelectedDate(selectedDate);

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

  const selectedItem = useMemo(() => {
    if (!selectedDate) return undefined;

    return state.selected.find(
      (item: IEditSpecificDateType) =>
        selectedDate && isSameDay(item.date, selectedDate),
    );
  }, [state.selected, selectedDate]);

  return (
    <>
      <p className="mb-3 text-sm font-medium text-main-color">
        *달력에서 날짜를 클릭 후 수업 시간을 추가해주세요.
      </p>
      {state.selectableDates && (
        <div className="grid w-full max-w-[40rem] grid-cols-1 gap-y-4 md:grid-cols-2">
          <div className="w-fit">
            <InputClassDates
              mode="specific"
              clickableDates={state.selectableDates}
              handleClickDate={handleSelectedDate}
            />
          </div>

          {selectedDate ? (
            <div className="ml-2 flex flex-col">
              {/* Time 리스트 위 */}
              <div className="flex w-full">
                {/* 선택 날짜 리스트 */}
                <div className="flex w-[300px] flex-wrap gap-x-2 text-base font-bold">
                  <span>
                    {format(selectedDate, 'yy.MM.dd(E)', { locale: ko })}
                  </span>
                </div>
              </div>
              {/* 시간 리스트 */}
              <TimeSlotManager
                selectedItem={selectedItem}
                duration={duration}
                handleStartTimeChange={handleStartTimeChange}
                addTimeSlot={addTimeSlot}
                removeTimeSlot={removeTimeSlot}
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default AddSchedules;

/* eslint-disable no-unused-vars */
interface TimeSlotManagerProps {
  selectedItem: IEditSpecificDateType | undefined;
  duration: number;
  handleStartTimeChange: (index: number, newStartTime: string) => void;
  addTimeSlot: () => void;
  removeTimeSlot: (indexToRemove: number) => void;
}

/* eslint-enable no-unused-vars */
const TimeSlotManager = ({
  selectedItem,
  duration,
  handleStartTimeChange,
  addTimeSlot,
  removeTimeSlot,
}: TimeSlotManagerProps) => {
  const key = useId();

  return (
    <>
      <ul className="flex max-h-60 w-80 w-max flex-col gap-2 overflow-y-auto overflow-x-clip pt-2">
        {selectedItem ? (
          selectedItem.startDateTime.map((startTime, index) => (
            <TimeList
              key={index}
              startTime={startTime}
              duration={duration}
              onChange={(newStartTime) =>
                handleStartTimeChange(index, newStartTime)
              }
              onRemove={() => removeTimeSlot(index)}
            />
          ))
        ) : (
          <TimeList
            key={key}
            startTime={{ time: '', editable: true }}
            duration={duration}
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
