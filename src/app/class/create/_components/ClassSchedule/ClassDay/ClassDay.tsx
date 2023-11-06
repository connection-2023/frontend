import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { CheckSVG } from '@/icons/svg';
import {
  classRangeState,
  classTimeState,
  classDayTypeState,
} from '@/recoil/ClassSchedule/atoms';
import DayByDay from './DayByDay';
import SpecificDate from './SpecificDate';

interface DayTypeComponents {
  [key: string]: JSX.Element;
}

const dayTypeComponents: DayTypeComponents = {
  '요일별로 달라요': <DayByDay />,
  '특정 날짜에만 운영해요': <SpecificDate />,
};

const ClassDay = () => {
  const [selectedType, setSelectedType] = useState('요일별로 달라요');
  const classRange = useRecoilValue(classRangeState);
  const classTime = useRecoilValue(classTimeState);
  const [classType, setClassType] = useRecoilState(classDayTypeState);
  const isDisabled = !(classRange && classTime);

  useEffect(() => {
    const classType = selectedType === '요일별로 달라요' ? '요일' : '특정 날짜';
    setClassType(classType);
  }, [selectedType]);

  return (
    <>
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
      <div>{!isDisabled && dayTypeComponents[selectedType]}</div>
    </>
  );
};

export default React.memo(ClassDay);
