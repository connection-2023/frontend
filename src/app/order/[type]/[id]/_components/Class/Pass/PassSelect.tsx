import Select, {
  ActionMeta,
  MultiValue,
  SingleValue,
  SingleValueProps,
  StylesConfig,
  components,
} from 'react-select';
import formatDate from '@/utils/formatDate';
import { SelectPass } from '@/types/pass';
/* eslint-disable no-unused-vars */
interface PassSelectProps {
  options: SelectPass[];
  onChange: (
    selectedOptions: MultiValue<SelectPass> | SingleValue<SelectPass>,
    actionMeta: ActionMeta<SelectPass>,
  ) => void;
  selectValue: SelectPass[];
}
/* eslint-enable no-unused-vars */
const PassSelect = ({ options, onChange, selectValue }: PassSelectProps) => {
  const SingleValue = (props: SingleValueProps<SelectPass, boolean>) => (
    <components.SingleValue {...props}>
      <div>{props.data.label}</div>
    </components.SingleValue>
  );

  return (
    <Select
      instanceId="pass-select"
      placeholder="사용할 패스권 선택"
      noOptionsMessage={() => `적용 가능한 패스권이 없습니다`}
      formatOptionLabel={formatOptionLabel}
      onChange={onChange}
      options={options}
      styles={passSelectStyle}
      value={selectValue}
      components={{ SingleValue }}
    />
  );
};

export default PassSelect;

const formatOptionLabel = ({ value, label }: SelectPass) => {
  const { remainingUses, startAt, endAt } = value;

  return (
    <dl className="flex flex-col gap-1 px-3 py-1 text-sm">
      <div className="flex justify-between">
        <dt className="max-w-sm truncate text-black">{label}</dt>
        <dd className="font-semibold text-main-color">
          잔여횟수 {remainingUses}회
        </dd>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2 text-gray-300">
          {startAt && endAt ? (
            <dd>{`${formatDate(startAt)} - ${formatDate(endAt)}`}</dd>
          ) : (
            <dd>미사용</dd>
          )}
        </div>
      </div>
    </dl>
  );
};

const passSelectStyle: StylesConfig<SelectPass, true> = {
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
    padding: '0',
    backgroundColor: state.isSelected ? 'var(--gray5)' : 'white',
    borderTop: '1px solid var(--gray4)',
    color: 'black',
    height: '3.38rem',
    '&:hover': {
      backgroundColor: 'var(--sub-color1-transparent)',
    },
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '30px',
  }),
};
