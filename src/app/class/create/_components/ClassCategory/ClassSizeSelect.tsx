import { useEffect, useState } from 'react';
import Select, {
  components,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
} from 'react-select';

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

  const [minStudent, setMinStudent] = useState({
    select: allOptions[0],
    option: allOptions,
  });
  const [maxStudent, setMaxStudent] = useState({
    select: allOptions[allOptions.length - 1],
    option: allOptions,
  });

  const isDisabled = '그룹레슨' !== lessonType;

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

  return (
    <>
      {studentCounts.map(({ title, state, setState }) => (
        <div key={title} className="flex items-center gap-1">
          <h3 className={(isDisabled && 'text-sub-color4') || ''}>{title}</h3>
          <Select
            defaultValue={state.select}
            onChange={(selected) =>
              setState({
                select:
                  selected ||
                  (title === '최소'
                    ? allOptions[0]
                    : allOptions[allOptions.length - 1]),
                option: state.option,
              })
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
                borderColor: '#D9D9D9',
                '&:hover': { borderColor: '#D9D9D9' },
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
                border: '1px solid #D9D9D9',
                borderTop: 'none',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#D9D9D9' : 'white',
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
