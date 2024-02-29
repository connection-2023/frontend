import dynamic from 'next/dynamic';
import { useEffect, useState, memo } from 'react';
import { IDayTimeList, IDateTimeList } from '@/types/class';
import { useClassScheduleStore } from '@/store';

const DayByDay = dynamic(() => import('./DayByDay'), {
  ssr: false,
});

const SpecificDate = dynamic(() => import('./SpecificDate'), {
  ssr: false,
});

const ClassDayOptions = dynamic(() => import('./ClassDayOptions'), {
  ssr: false,
});
interface DayTypeComponents {
  [key: string]: JSX.Element;
}
interface ClassDayProps {
  lectureMethod: string;
  duration: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: IDayTimeList[] | IDateTimeList[]) => void;
  defaultValue: IDayTimeList[] | IDateTimeList[];
}

const ClassDay = ({
  lectureMethod,
  duration,
  defaultValue,
  onChange,
}: ClassDayProps) => {
  const [selectedType, setSelectedType] = useState('요일별로 달라요');
  const setClassType = useClassScheduleStore((state) => state.setClassType);
  const classRange = useClassScheduleStore((state) => state.classRange);
  const isDisabled = !(classRange && duration);

  useEffect(() => {
    if (defaultValue.length) {
      if (Object.keys(defaultValue[0]).includes('date')) {
        setSelectedType('특정 날짜에만 운영해요');
      } else {
        setSelectedType('요일별로 달라요');
      }
    }
  }, [defaultValue]);

  useEffect(() => {
    if (lectureMethod !== '원데이 레슨') return;

    const classType = selectedType === '요일별로 달라요' ? '요일' : '특정 날짜';
    setClassType(classType);
  }, [selectedType]);

  const dayTypeComponents: DayTypeComponents = {
    '요일별로 달라요': (
      <DayByDay
        defaultValue={defaultValue as IDayTimeList[]}
        onChange={onChange}
      />
    ),
    '특정 날짜에만 운영해요': (
      <SpecificDate
        defaultValue={defaultValue as IDateTimeList[]}
        onChange={onChange}
      />
    ),
  };

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
        !isDisabled && (
          <DayByDay
            lectureMethod={lectureMethod}
            defaultValue={defaultValue as IDayTimeList[]}
            onChange={onChange}
          />
        )
      )}
    </>
  );
};

export default memo(ClassDay);
