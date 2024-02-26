import isSameDay from 'date-fns/isSameDay';
import dynamic from 'next/dynamic';
import { useEffect, useState, memo } from 'react';
import { useClassScheduleStore } from '@/store';
import { getDayoffClassNames } from '@/utils/classUtils';
import { formatDateWithDay } from '@/utils/dateTimeUtils';

const DayOffOption = ['네, 휴무일이 있어요', '아니요, 휴무일 없어요'];

const DayOffCalendar = dynamic(
  () => import('@/components/Calendar/BasicCalendar'),
  {
    ssr: false,
  },
);

const DayOff = ({
  onChange,
  defaultValue,
}: {
  onChange: (value: Date[]) => void;
  defaultValue: Date[];
}) => {
  const defultOption = defaultValue.length ? 0 : null;
  const initialValue =
    defaultValue && defaultValue.length > 0
      ? defaultValue.map((date) => new Date(date))
      : [];
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    defultOption,
  );
  const store = useClassScheduleStore();
  const [unselectedDates, setUnselectedDates] = useState<Date[]>(initialValue);
  const classDates = store.filteredDates;
  const classSchedules = useClassScheduleStore((state) => state.classSchedules);
  const setClassDates = useClassScheduleStore((state) => state.setFilteredDate);
  const classType = store.classType;
  const initDates = store.classDates;
  const classRange = store.classRange;
  const classTime = store.classDuration;
  const isDisabled =
    !(classRange && classTime && initDates) || classType === '특정 날짜';

  useEffect(() => {
    if (classDates && classSchedules) {
      const newClassDates = classSchedules.filter((date) => {
        const hasSameDay = unselectedDates.some((date2) =>
          isSameDay(date, date2),
        );

        return !hasSameDay;
      });
      setClassDates(newClassDates);
    }
  }, [unselectedDates]);

  const handleOptionClick = (index: number) => {
    setSelectedOptionIndex(index);

    if (index === 1) {
      setUnselectedDates([]);
      if (initDates) {
        setClassDates(initDates);
      }
    }
  };

  const handleUnselected = (unselectedDates: Date[]) => {
    setUnselectedDates(unselectedDates);
    onChange(unselectedDates);
  };

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
                    selectableDates={initDates}
                    handleSelected={handleUnselected}
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
