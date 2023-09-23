import InputClassDates from '@/components/Calendar/InputClassDates';
import { useEffect, useState } from 'react';
import { eachDayOfInterval, format } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { useRecoilValue } from 'recoil';
import TimeList from './TimeList';
import { classRangeState, classDatesState } from '@/recoil/ClassSchedule/atoms';

const SpecificDate = () => {
  const classRange = useRecoilValue(classRangeState);
  const classDates = useRecoilValue(classDatesState);

  const [selectedDates, setSelectedDates] = useState<Date[]>();
  const [timeList, setTimeList] = useState(['']);

  const handleStartTimeChange = (index: number, newStartTime: string) => {
    setTimeList(
      timeList.map((startTime, i) => (i === index ? newStartTime : startTime)),
    );
  };

  const addTimeSlot = () => {
    setTimeList([...timeList, '']);
  };

  const removeTimeSlot = (indexToRemove: number) => {
    if (timeList.length > 1)
      setTimeList(timeList.filter((_, index) => index !== indexToRemove));
    else return;
  };

  const clearTimeSlot = () => {
    setTimeList(['']);
  };

  useEffect(() => {
    if (classRange && classRange.from && classRange.to) {
      const allDatesInRange = eachDayOfInterval({
        start: classRange.from,
        end: classRange.to,
      });
      setSelectedDates(allDatesInRange);
    }
  }, [classRange]);

  return (
    <>
      <p className="mb-3 text-sm font-medium text-main-color">
        *달력에서 날짜를 클릭 후 수업 시간을 추가해주세요.
      </p>
      {selectedDates && (
        <div className="flex w-full justify-between">
          <InputClassDates clickableDates={selectedDates} />
          <div className="ml-2 flex flex-col">
            {/* Time 리스트 위 */}
            <div className="flex w-full">
              {/* 선택 날짜 리스트 */}
              <div className="flex w-[300px] flex-wrap gap-x-2 text-base font-bold">
                {classDates &&
                  classDates?.map((date, i) => (
                    <span key={i}>
                      {format(date, 'yy.MM.dd(E)', { locale: ko })}
                    </span>
                  ))}
              </div>
              <button
                onClick={clearTimeSlot}
                className="flex items-start whitespace-nowrap text-sm font-semibold text-sub-color2 underline"
              >
                전체 삭제
              </button>
            </div>
            {/* 시간 리스트 */}
            <ul className="mt-2 flex w-auto flex-col gap-2">
              {timeList.map((startTime, index) => (
                <TimeList
                  key={index}
                  startTime={startTime}
                  onChange={(newStartTime) =>
                    handleStartTimeChange(index, newStartTime)
                  }
                  onRemove={() => removeTimeSlot(index)}
                />
              ))}
            </ul>
            <button
              onClick={addTimeSlot}
              className="mt-2 flex w-full justify-end text-sm font-bold text-sub-color2"
            >
              + 시간추가
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecificDate;
