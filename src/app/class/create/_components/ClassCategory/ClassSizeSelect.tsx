import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Select, {
  components,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
} from 'react-select';
import { hookForm } from '@/recoil/hookForm/atom';

const { DropdownIndicator, IndicatorSeparator } = components;

const CustomDropdownIndicator = (
  props: DropdownIndicatorProps<{ value: number; label: string }, false>,
) => {
  return props.selectProps.menuIsOpen ? null : <DropdownIndicator {...props} />;
};

const CustomIndicatorSeparator = (
  props: IndicatorSeparatorProps<{ value: number; label: string }, false>,
) => {
  return props.selectProps.menuIsOpen ? null : (
    <IndicatorSeparator {...props} />
  );
};

const ClassSizeSelect = ({ lessonType }: { lessonType: string }) => {
  const allOptions = Array.from({ length: 101 }, (_, i) => ({
    value: i,
    label: String(i),
  }));
  const formMethods = useRecoilValue(hookForm);

  const [minStudent, setMinStudent] = useState({
    select: allOptions[0],
    option: allOptions,
  });
  const [maxStudent, setMaxStudent] = useState({
    select: allOptions[allOptions.length - 1],
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
  }, [minStudent.select, maxStudent.select]);

  const studentCounts = [
    { title: '최소', state: minStudent, setState: setMinStudent },
    { title: '최대', state: maxStudent, setState: setMaxStudent },
  ];

  const isDisabled = '그룹레슨' !== lessonType;

  if (!formMethods) {
    return null;
  }

  const { setValue } = formMethods;

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
    setValue('수강생제한', { min: minStudent.select, max: maxStudent.select });
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
          <Select
            defaultValue={state.select}
            onChange={(selected) =>
              selectClassSize(selected, title, setState, state.option)
            }
            isDisabled={isDisabled}
            options={state.option}
            components={{
              DropdownIndicator: CustomDropdownIndicator,
              IndicatorSeparator: CustomIndicatorSeparator,
            }}
            styles={{
              menuList: (base) => ({ ...base, maxHeight: '200px' }),
              control: (provided, state) => ({
                ...provided,
                borderRadius:
                  state.selectProps.menuIsOpen || state.menuIsOpen
                    ? '1.3rem 1.3rem 0 0'
                    : '1.875rem',
                boxShadow: 'none',
                borderColor: 'var(--sub-color4)',
                '&:hover': { borderColor: 'var(--sub-color4)' },
              }),
              valueContainer: (provided, state) => ({
                ...provided,
                width: state.selectProps.menuIsOpen
                  ? '4.275rem'
                  : provided.width,
                justifyContent: 'center',
                borderColor: 'none',
              }),
              menu: (provided) => ({
                ...provided,
                marginTop: '-10px',
                boxShadow: 'none',
                border: '1px solid var(--sub-color4)',
                borderTop: 'none',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? 'var(--sub-color4)'
                  : 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#eceaea',
                },
              }),
            }}
          />
          명
        </div>
      ))}
    </>
  );
};

export default ClassSizeSelect;
