import Select, {
  ActionMeta,
  components,
  MultiValue,
  OptionProps,
  SingleValue,
  StylesConfig,
} from 'react-select';
import { SelectCoupon } from '@/types/coupon';

interface CouponSelectProps {
  options: SelectCoupon[];
  onChange: (
    selectedOptions: MultiValue<SelectCoupon> | SingleValue<SelectCoupon>,
    actionMeta: ActionMeta<SelectCoupon>,
  ) => void;
  selectedOptionsLength: number;
}

const CouponSelect = ({
  options,
  onChange,
  selectedOptionsLength,
}: CouponSelectProps) => {
  return (
    <Select
      instanceId="select-coupon"
      placeholder="적용할 쿠폰 선택"
      noOptionsMessage={() => '적용 가능한 쿠폰이 없습니다'}
      isOptionDisabled={() => selectedOptionsLength >= 2}
      components={{
        Option: CustomOption,
      }}
      isMulti={true}
      onChange={onChange}
      options={options}
      styles={couponSelectStyle}
    />
  );
};

export default CouponSelect;

const CustomOption = (props: OptionProps<SelectCoupon>) => {
  const { data, innerProps } = props;

  const label = data.value.isStackable ? '중복' : '일반';

  return (
    <div {...innerProps} className="relative">
      <div
        className={`absolute right-0 ${
          label === '중복' ? 'text-sub-color1' : 'text-main-color'
        }`}
      >
        {label}
      </div>
      <components.Option {...props} />
    </div>
  );
};

const couponSelectStyle: StylesConfig<SelectCoupon, true> = {
  control: (provided) => ({
    ...provided,
    boxShadow: 'none',
    borderColor: 'var(--gray-500)',
    width: '100%',
    '&:hover': { borderColor: 'var(--gray-500)' },
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
    border: '1px solid var(--gray-500)',
    borderTop: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'var(--gray-700)' : 'white',
    borderTop: '1px solid var(--gray-500)',
    color: 'black',
    '&:hover': {
      backgroundColor: 'var(----gray4)',
    },
  }),
};
