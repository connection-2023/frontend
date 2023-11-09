import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import createOptions from '@/utils/generateStudentCountOptions';
import NumberSelect from '../NumberSelect';

const ClassSizeSelect = ({
  defaultValue,
}: {
  defaultValue: { min: number; max: number } | undefined;
}) => {
  const allOptions = createOptions(1, 100);

  const { watch, control, getValues } = useFormContext();
  const isGroupType = watch('lessonType');

  const [minStudent, setMinStudent] = useState({
    select: {
      value: defaultValue?.min ?? 1,
      label: String(defaultValue?.min ?? 1),
    },
    option: allOptions,
  });

  const [maxStudent, setMaxStudent] = useState({
    select: {
      value: defaultValue?.max ?? 100,
      label: String(defaultValue?.max ?? 100),
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

  interface OptionType {
    value: number;
    label: string;
  }
  interface StateType {
    select: OptionType;
    option: OptionType[];
  }

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
            defaultValue={defaultValue}
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
