import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Controller, useFormContext } from 'react-hook-form';
import { classCreateState } from '@/recoil/Create/atoms';
import createOptions from '@/utils/generateStudentCountOptions';
import NumberSelect from '../NumberSelect';

const ClassSizeSelect = () => {
  const classData = useRecoilValue(classCreateState);
  const allOptions = createOptions(1, 100);

  const { watch, control, getValues } = useFormContext();
  const isGroupType = watch('classLessonType');

  const [minStudent, setMinStudent] = useState({
    select: {
      value: classData.classSize.min,
      label: String(classData.classSize.min),
    },
    option: allOptions,
  });

  const [maxStudent, setMaxStudent] = useState({
    select: {
      value: classData.classSize.max,
      label: String(classData.classSize.max),
    },
    option: allOptions,
  });

  useEffect(() => {
    const { value: minValue } = minStudent.select;
    const { value: maxValue } = maxStudent.select;

    setMinStudent({
      select: minStudent.select,
      option: allOptions.slice(0, maxValue),
    });

    setMaxStudent({
      select: maxStudent.select,
      option: allOptions.slice(minValue),
    });
  }, [minStudent.select, maxStudent.select]);

  const studentCounts = [
    {
      title: '최소',
      state: minStudent,
      setState: setMinStudent,
      rangeType: 'min',
    },
    {
      title: '최대',
      state: maxStudent,
      setState: setMaxStudent,
      rangeType: 'max',
    },
  ];

  const isDisabled = '그룹레슨' !== isGroupType;

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
      {studentCounts.map(({ title, state, setState, rangeType }) => (
        <div
          key={title}
          className={`flex items-center gap-1 ${
            isDisabled && 'text-sub-color4'
          }`}
        >
          <h3>{title}</h3>
          <Controller
            name="classSize"
            control={control}
            defaultValue={classData.classSize}
            render={({ field }) => (
              <NumberSelect
                instanceId={`select-${title}`}
                defaultValue={state.select}
                onChange={(selected) => {
                  selectClassSize(selected, title, setState, state.option);
                  field.onChange({
                    ...getValues('classSize'),
                    [rangeType]: selected?.value,
                  });
                }}
                isDisabled={isDisabled}
                options={state.option}
              />
            )}
          />
          명
        </div>
      ))}
    </>
  );
};

export default ClassSizeSelect;
