import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { useClassScheduleStore, useClassCreateStore } from '@/store';
import { getDayoffClassNames } from '@/utils/classUtils';
import { formatDateWithDay } from '@/utils/dateTimeUtils';
import {
  getUniqueDates,
  calculateUnSelectedDate,
  calculateSelectedDate,
} from '@/utils/parseUtils';

const DayOffOption = ['네, 휴무일이 있어요', '아니요, 휴무일 없어요'];

const DayOffCalendar = dynamic(
  () => import('@/components/Calendar/BasicCalendar'),
  {
    ssr: false,
  },
);

interface DayOffProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: Date[]) => void;
  defaultValue: Date[] | undefined;
}

const DayOff = ({ onChange, defaultValue = [] }: DayOffProps) => {
  const defultOption = defaultValue?.length ? 0 : null;
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    defultOption,
  );
  const [selectedDates, setSelectedDate] = useState<Date[] | undefined>();
  const {
    setFinalDate,
    classType,
    classRange,
    classDuration: classTime,
    classDates,
  } = useClassScheduleStore();
  const { classData } = useClassCreateStore((state) => ({
    classData: state.classData,
  }));

  const selectableDates = classDates ? getUniqueDates(classDates) : undefined;
  const unselectedDates = useMemo(() => {
    if (!classDates || !selectedDates) return [];

    const calculateDates = calculateUnSelectedDate(classDates, selectedDates);
    return getUniqueDates(calculateDates);
  }, [classDates, selectedDates]);

  const isDisabled =
    !(classRange && classTime && classDates) ||
    (classData?.lectureMethod !== '정기클래스' && classType === '특정 날짜');

  useEffect(() => {
    // 휴무일 필터링해서 저장하기
    if (classDates && selectedDates) {
      const holidays = calculateUnSelectedDate(classDates, selectedDates);

      onChange(holidays);
    }
  }, [selectedDates?.length]);

  useEffect(() => {
    if (classDates) {
      const selected = getUniqueDates(
        calculateUnSelectedDate(classDates, defaultValue),
      );

      setSelectedDate(selected);
    }
  }, [classDates, defaultValue]);

  const handleOptionClick = (index: number) => {
    setSelectedOptionIndex(index);

    if (index === 1 && classDates && classDates) {
      setSelectedDate(classDates);
      setFinalDate(classDates);
    }
  };

  const handleSelected = useCallback(
    (newDates: Date[] | undefined) => {
      setSelectedDate(newDates);

      if (newDates && classDates) {
        // 선택된 클래스 일정 저장
        const finalClass = calculateSelectedDate(classDates, newDates);
        setFinalDate(finalClass);
      }
    },
    [classDates],
  );

  return (
    <>
      <div className="flex w-full gap-4">
        {DayOffOption.map((option, index) => (
          <button
            key={option}
            disabled={isDisabled}
            onClick={() => handleOptionClick(index)}
            className={getDayoffClassNames(
              selectedOptionIndex === index,
              isDisabled,
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOptionIndex === 0 && (
        <>
          <h3 className="mt-7 text-lg font-bold font-semibold">
            아래 달력에서 휴무일을 선택해주세요
          </h3>
          <div className="mt-5 flex w-full flex-col px-5 md:flex-row">
            {!isDisabled && (
              <>
                <div className="mx-auto w-fit">
                  <DayOffCalendar
                    mode="dayoff"
                    selectableDates={selectableDates}
                    selectedDates={selectedDates}
                    handleSelected={handleSelected}
                  />
                </div>
                <div className="mt-7 flex w-full flex-col md:ml-[3.75rem] md:mt-0">
                  <p className="mb-3.5 text-sm font-semibold">선택한 휴무일</p>
                  <div className="flex h-fit w-fit flex-wrap gap-x-2 gap-y-3 text-sm font-medium text-gray-100">
                    {unselectedDates.map((date) => (
                      <p
                        key={date.toLocaleDateString()}
                        className="h-fit rounded-md border border-solid border-gray-500 px-2.5 py-1.5"
                      >
                        {formatDateWithDay(date)}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default memo(DayOff);
