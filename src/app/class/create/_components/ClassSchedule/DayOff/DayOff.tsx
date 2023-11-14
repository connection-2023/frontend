import { format } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import React, { useEffect, useState } from 'react';
import { useClassScheduleStore } from '@/store';
import DayOffCalendar from '@/components/Calendar/BasicCalendar';

const DayOffOption = ['네, 휴무일이 있어요', '아니요, 휴무일 없어요'];

//to은서: defaultValue 값만 올바른 곳에 넣어줘 unselectedDates 값이 들어와 휴무일 있는지 없는지도 처리하면 될거 같아

const DayOff = ({
  onChange,
  defaultValue = [],
}: {
  onChange: (value: Date[]) => void;
  defaultValue?: Date[];
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const store = useClassScheduleStore();
  const [unselectedDates, setUnselectedDates] = useState<Date[]>([]);

  const classDates = store.filteredDates;
  const setClassDates = useClassScheduleStore((state) => state.setFilteredDate);
  const classType = store.classType;
  const initDates = store.classDates;
  const classRange = store.classRange;
  const classTime = store.classDuration;
  const isDisabled =
    !(classRange && classTime && initDates) || classType === '특정 날짜';

  const handleOptionClick = (index: number) => {
    setSelectedOptionIndex(index);
  };

  const handleUnselected = (unselectedDates: Date[]) => {
    setUnselectedDates(unselectedDates);
  };

  useEffect(() => {
    if (classDates && initDates) {
      const newClassDates = initDates.filter(
        (date) => !unselectedDates.includes(date),
      );
      setClassDates(newClassDates);
      onChange(unselectedDates);
    }
  }, [unselectedDates]);

  return (
    <>
      <div className="flex w-full gap-4">
        {DayOffOption.map((option, index) => (
          <button
            key={option}
            disabled={isDisabled}
            onClick={() => handleOptionClick(index)}
            className={getClassNames(selectedOptionIndex === index, isDisabled)}
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
          <div className="mt-5 flex w-full px-5">
            {!isDisabled && (
              <>
                <DayOffCalendar
                  mode="dayoff"
                  selectedDates={initDates}
                  handleSelected={handleUnselected}
                />

                <div className="ml-[3.75rem] flex flex-col">
                  <p className="mb-[0.87rem] text-sm font-semibold">
                    선택한 휴무일
                  </p>
                  <div className="flex h-fit w-fit flex-wrap gap-x-2 gap-y-3 text-sm font-medium text-gray-100">
                    {unselectedDates.map((date) => (
                      <p
                        key={date.toLocaleDateString()}
                        className="h-fit rounded-[0.3125rem] border border-solid border-gray-500 px-[0.69rem] py-[0.31rem]"
                      >
                        {format(date, 'yy.MM.dd (E)', { locale: ko })}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <p />
        </>
      )}
    </>
  );
};

export default React.memo(DayOff);

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
