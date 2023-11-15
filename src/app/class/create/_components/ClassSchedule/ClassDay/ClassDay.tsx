import React, { useEffect, useState } from 'react';
import { CheckSVG } from '@/icons/svg';
import { useClassScheduleStore } from '@/store';
import DayByDay from './DayByDay';
import SpecificDate from './SpecificDate';

interface DayTypeComponents {
  [key: string]: JSX.Element;
}

const dayTypeComponents: DayTypeComponents = {
  '요일별로 달라요': <DayByDay />,
  '특정 날짜에만 운영해요': <SpecificDate />,
};

const ClassDay = ({ lectureMethod }: { lectureMethod: string }) => {
  const [selectedType, setSelectedType] = useState('요일별로 달라요');
  const store = useClassScheduleStore();
  const setClassType = useClassScheduleStore((state) => state.setClassType);
  const duration = store.classDuration;
  const classRange = useClassScheduleStore((state) => state.classRange);
  const isDisabled = !(classRange && duration);

  useEffect(() => {
    if (lectureMethod !== '원데이 레슨') return;

    const classType = selectedType === '요일별로 달라요' ? '요일' : '특정 날짜';
    setClassType(classType);
  }, [selectedType]);

  return (
    <>
      {lectureMethod === '원데이 레슨' ? (
        <>
          <ClassDayOptions
            isDisabled={isDisabled}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <div>{!isDisabled && dayTypeComponents[selectedType]}</div>
        </>
      ) : (
        !isDisabled && <DayByDay lectureMethod={lectureMethod} />
      )}
    </>
  );
};

export default React.memo(ClassDay);

interface ClassDayOptionsProps {
  isDisabled: boolean;
  selectedType: string;
  setSelectedType: (value: React.SetStateAction<string>) => void;
}

const ClassDayOptions = ({
  isDisabled,
  selectedType,
  setSelectedType,
}: ClassDayOptionsProps) => {
  return (
    <ul className="mb-4 flex gap-5">
      {Object.keys(dayTypeComponents).map((label, index) => (
        <li key={index}>
          <label
            className={`flex cursor-pointer items-center whitespace-nowrap ${
              isDisabled ? 'text-gray-500' : ''
            }`}
          >
            <input
              type="radio"
              name="dayType"
              value={label}
              checked={selectedType === label}
              disabled={isDisabled}
              onChange={(e) => setSelectedType(e.target.value)}
              className="hidden" // 라디오 버튼 숨기기
            />
            <div
              className={`mr-2 h-[18px] w-[18px] rounded-[0.09rem] ${
                selectedType !== label &&
                'border border border-solid border-gray-500'
              }`}
            >
              {selectedType === label && (
                <CheckSVG className="centerInContainer" />
              )}
            </div>
            <span className={`${selectedType === label && 'font-bold'}`}>
              {label}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};
