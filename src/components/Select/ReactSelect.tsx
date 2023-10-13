import Select, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorSeparatorProps,
  StylesConfig,
} from 'react-select';

const { DropdownIndicator, IndicatorSeparator } = components;

const CustomDropdownIndicator = <T extends { value: any; label: string }>(
  props: DropdownIndicatorProps<T, false>,
) => {
  return props.selectProps.menuIsOpen ? null : <DropdownIndicator {...props} />;
};

const CustomIndicatorSeparator = <T extends { value: any; label: string }>(
  props: IndicatorSeparatorProps<T, false>,
) => {
  return props.selectProps.menuIsOpen ? null : (
    <IndicatorSeparator {...props} />
  );
};

interface SelectComponentProps<T> {
  instanceId?: string;
  defaultValue?: T;
  onChange?: (selectedOption: T | null) => void;
  isDisabled?: boolean;
  options?: T[];
  styleType?: 'normal' | 'number';
  placeholder?: string;
  noOptionsMessage?: string;
  multiLimit?: number;
  selectedOptionsLength?: number;
}

const ReactSelect = <T extends { value: any; label: string }>({
  instanceId,
  defaultValue,
  onChange,
  isDisabled = false,
  options = [],
  styleType = 'normal',
  placeholder = '선택해주세요',
  noOptionsMessage = '사용 가능한 옵션이 없습니다',
  multiLimit = 2,
  selectedOptionsLength = 0,
}: SelectComponentProps<T>) => {
  const customComponents =
    styleType === 'number'
      ? {
          DropdownIndicator: CustomDropdownIndicator as any,
          IndicatorSeparator: CustomIndicatorSeparator as any,
        }
      : {};

  const styles =
    styleType === 'number' ? selectStylesNumber : selectStylesNormal;

  return (
    <Select
      instanceId={instanceId}
      defaultValue={defaultValue}
      onChange={onChange}
      isDisabled={isDisabled}
      options={options}
      components={customComponents}
      styles={styles as StylesConfig<any>}
      noOptionsMessage={() => noOptionsMessage}
      isOptionDisabled={() => selectedOptionsLength >= multiLimit}
      placeholder={placeholder}
      isMulti={styleType === 'normal'}
    />
  );
};

export default ReactSelect;

const selectStylesNumber:
  | StylesConfig<
      {
        value: number;
        label: string;
      },
      false,
      GroupBase<{
        value: number;
        label: string;
      }>
    >
  | undefined = {
  menuList: (base) => ({ ...base, maxHeight: '200px' }),
  control: (provided, state) => ({
    ...provided,
    borderRadius:
      state.selectProps.menuIsOpen || state.menuIsOpen
        ? '1.3rem 1.3rem 0 0'
        : '1.875rem',
    boxShadow: 'none',
    borderColor: 'var(--sub-color4)',
    height: '100%',
    width: '100%',
    '&:hover': { borderColor: 'var(--sub-color4)' },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    width: state.selectProps.menuIsOpen ? '4.275rem' : provided.width,
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
    backgroundColor: state.isSelected ? 'var(--sub-color4)' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#eceaea',
    },
  }),
};

const selectStylesNormal:
  | StylesConfig<
      {
        value: number;
        label: string;
      },
      false,
      GroupBase<{
        value: number;
        label: string;
      }>
    >
  | undefined = {
  control: (provided) => ({
    ...provided,
    boxShadow: 'none',
    borderColor: 'var(--sub-color2)',
    width: '100%',
    '&:hover': { borderColor: 'var(--sub-color2)' },
  }),
  valueContainer: (provided) => ({
    ...provided,
    justifyContent: 'center',
    borderColor: 'none',
    height: '100%',
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '-3px',
    boxShadow: 'none',
    border: '1px solid var(--sub-color2)',
    borderTop: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'var(--sub-color4)' : 'white',
    borderTop: '1px solid var(--sub-color2)',
    color: 'black',
    '&:hover': {
      backgroundColor: '#eceaea',
    },
  }),
};
