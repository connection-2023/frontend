import Select, {
  ActionMeta,
  components,
  GroupBase,
  MultiValue,
  OptionProps,
  SingleValue,
  StylesConfig,
} from 'react-select';
import { couponGET, SelectCoupon } from '@/types/coupon';

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

const couponSelectStyle:
  | StylesConfig<
      {
        value: any;
        label: string;
      },
      false,
      GroupBase<{
        value: any;
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
