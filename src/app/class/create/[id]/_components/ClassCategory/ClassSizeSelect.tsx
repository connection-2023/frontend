import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import createOptions from '@/utils/generateStudentCountOptions';
import NumberSelect from '../NumberSelect';

const ClassSizeSelect = ({
  defaultValue,
}: {
  defaultValue: { min: number; max: number };
}) => {
  const { min, max } = defaultValue;
  const allOptions = createOptions(1, 100);

  const optionChange = (type: 'min' | 'max', selectValue: number) => {
    const sliceOptions =
      type === 'max'
        ? allOptions.slice(selectValue, 100)
        : allOptions.slice(0, selectValue - 1);
    return sliceOptions;
  };

  const [minOptions, setMinOptions] = useState(optionChange('min', max));
  const [maxOptions, setMaxOptions] = useState(optionChange('max', min));

  const { watch, control, getValues, setValue } = useFormContext();

  const isGroupType = watch('lessonType');

  const studentCounts = [
    {
      title: '최소',
      state: { value: min, label: String(min) },
      rangeType: 'min' as 'min',
      options: minOptions,
    },
    {
      title: '최대',
      state: { value: max, label: String(max) },
      rangeType: 'max' as 'max',
      options: maxOptions,
    },
  ];

  const isDisabled = '그룹레슨' !== isGroupType;

  useEffect(() => {
    const lessonTypeMax = getValues('max');

    setMinOptions(
      optionChange('min', lessonTypeMax ? lessonTypeMax.value : max),
    );

    if (lessonTypeMax?.value === 1) setValue('max', studentCounts[1].state);
  }, []);

  return (
    <>
      {studentCounts.map(({ title, state, rangeType, options }) => {
        return (
          <div
            key={title}
            className={`flex items-center gap-1 ${
              isDisabled && 'text-sub-color4'
            }`}
          >
            <h3>{title}</h3>
            <Controller
              name={rangeType}
              control={control}
              defaultValue={state}
              render={({ field }) => (
                <NumberSelect
                  instanceId={`select-${rangeType}`}
                  value={field.value}
                  onChange={(selected) => {
                    const selectedValue = selected?.value;
                    if (selectedValue) {
                      if (rangeType === 'min') {
                        setMaxOptions(optionChange('max', selectedValue));
                      } else {
                        setMinOptions(optionChange('min', selectedValue));
                      }
                    }
                    field.onChange(selected);
                  }}
                  isDisabled={isDisabled}
                  options={options}
                />
              )}
            />
            명
          </div>
        );
      })}
    </>
  );
};

export default ClassSizeSelect;
