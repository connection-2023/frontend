import SelectComponent from '@/components/Select/Select';
import { classCreateState } from '@/recoil/Create/atoms';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

const ClassSizeSelect = ({ lessonType }: { lessonType: string }) => {
  const classData = useRecoilValue(classCreateState);
  const allOptions = Array.from({ length: 101 }, (_, i) => ({
    value: i,
    label: String(i),
  }));
  const formMethods = useFormContext();

  const { setValue } = formMethods;

  const [minStudent, setMinStudent] = useState({
    select: {
      value: classData['수강생제한'].min,
      label: String(classData['수강생제한'].min),
    },
    option: allOptions,
  });
  const [maxStudent, setMaxStudent] = useState({
    select: {
      value: classData['수강생제한'].max,
      label: String(classData['수강생제한'].max),
    },
    option: allOptions,
  });

  useEffect(() => {
    const { value: minValue } = minStudent.select;
    const { value: maxValue } = maxStudent.select;

    setMinStudent({
      select: minStudent.select,
      option: allOptions.slice(0, maxValue + 1),
    });

    setMaxStudent({
      select: maxStudent.select,
      option: allOptions.slice(minValue),
    });

    setValue('수강생제한', {
      min: minStudent.select.value,
      max: maxStudent.select.value,
    });
  }, [minStudent.select, maxStudent.select]);

  const studentCounts = [
    { title: '최소', state: minStudent, setState: setMinStudent },
    { title: '최대', state: maxStudent, setState: setMaxStudent },
  ];

  const isDisabled = '그룹레슨' !== lessonType;

  type OptionType = { value: number; label: string };
  type StateType = {
    select: OptionType;
    option: OptionType[];
  };

  const selectClassSize = (
    selected: OptionType | null,
    title: string,
    setState: React.Dispatch<React.SetStateAction<StateType>>,
    option: OptionType[],
  ) => {
    setState({
      select:
        selected ||
        (title === '최소' ? allOptions[0] : allOptions[allOptions.length - 1]),
      option,
    });
  };

  return (
    <>
      {studentCounts.map(({ title, state, setState }) => (
        <div
          key={title}
          className={`flex items-center gap-1 ${
            isDisabled && 'text-sub-color4'
          }`}
        >
          <h3>{title}</h3>
          <SelectComponent
            instanceId={`select-${title}`}
            defaultValue={state.select}
            onChange={(selected) =>
              selectClassSize(selected, title, setState, state.option)
            }
            isDisabled={isDisabled}
            options={state.option}
          />
          명
        </div>
      ))}
    </>
  );
};

export default ClassSizeSelect;
