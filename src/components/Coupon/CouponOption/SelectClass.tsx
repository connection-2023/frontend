import { useEffect, useState } from 'react';
import Select, {
  ActionMeta,
  MultiValue,
  SingleValue,
  StylesConfig,
} from 'react-select';
import { getMyLecture } from '@/lib/apis/classApi';
import { SelectClass } from '@/types/coupon';

interface SelectClassProps {
  onChange: (
    selectedOptions: MultiValue<SelectClass> | SingleValue<SelectClass>,
    actionMeta: ActionMeta<SelectClass>,
  ) => void;
}

const SelectClass = ({ onChange }: SelectClassProps) => {
  const [options, setOptions] = useState<SelectClass[]>([]);

  useEffect(() => {
    getMyLecture()
      .then((data) => {
        const options = data.data.lecture.map(({ id, title }) => ({
          label: title,
          value: id,
        }));
        setOptions(options);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Select
      instanceId="select-class"
      placeholder="적용할 클래스를 선택해주세요."
      noOptionsMessage={() => '적용 가능한 클래스가 없습니다.'}
      isMulti={true}
      onChange={onChange}
      options={options}
      styles={couponSelectStyle}
      controlShouldRenderValue={false}
    />
  );
};

export default SelectClass;

const couponSelectStyle: StylesConfig<SelectClass, true> = {
  control: (provided) => ({
    ...provided,
    boxShadow: 'none',
    borderColor: 'var(--gray3)',
    height: '30px',
    minHeight: '30px',
    width: '100%',
    '&:hover': { borderColor: 'var(--gray3)' },
  }),
  valueContainer: (provided) => ({
    ...provided,
    justifyContent: 'center',
    borderColor: 'none',
    height: '30px',
    paddingTop: '0',
  }),
  menu: (provided, state) => {
    const optionIsNotExists = state.options && state.options.length === 0;
    return {
      ...provided,
      marginTop: '-3px',
      boxShadow: 'none',
      border: '1px solid var(--gray3)',
      borderTop: optionIsNotExists ? '' : 'none',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    };
  },
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'var(--gray5)' : 'white',
    borderTop: '1px solid var(--gray4)',
    color: 'black',
    '&:hover': {
      backgroundColor: 'var(--sub-color1-transparent)',
    },
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '30px',
  }),
};
