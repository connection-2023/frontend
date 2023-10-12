import Select, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorSeparatorProps,
  StylesConfig,
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

interface SelectComponentProps {
  instanceId?: string;
  defaultValue?: { value: number; label: string };
  onChange?: (selectedOption: { value: number; label: string } | null) => void;
  isDisabled?: boolean;
  options?: { value: number; label: string }[];
}

const SelectComponent = ({
  instanceId,
  defaultValue,
  onChange,
  isDisabled = false,
  options = [],
}: SelectComponentProps) => {
  return (
    <Select
      instanceId={instanceId}
      defaultValue={defaultValue}
      onChange={onChange}
      isDisabled={isDisabled}
      options={options}
      components={{
        DropdownIndicator: CustomDropdownIndicator,
        IndicatorSeparator: CustomIndicatorSeparator,
      }}
      styles={selectStyles}
    />
  );
};

export default SelectComponent;

const selectStyles:
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
