import Select, {
  ActionMeta,
  FormatOptionLabelMeta,
  MultiValue,
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
  selectValue: SelectCoupon[];
}

const CouponSelect = ({
  options,
  onChange,
  selectValue,
}: CouponSelectProps) => {
  const selectedOptions = options.filter(
    (option) => selectValue?.some((val) => val.value.id === option.value.id),
  );

  return (
    <Select
      instanceId="select-coupon"
      placeholder="적용할 쿠폰 선택"
      noOptionsMessage={() => '적용 가능한 쿠폰이 없습니다'}
      formatOptionLabel={formatOptionLabel}
      isMulti={true}
      onChange={onChange}
      options={options}
      styles={couponSelectStyle}
      controlShouldRenderValue={false}
      value={selectedOptions}
    />
  );
};

export default CouponSelect;

const formatOptionLabel = (
  { value, label }: SelectCoupon,
  formatOptionLabelMeta: FormatOptionLabelMeta<SelectCoupon>,
) => {
  const {
    startAt,
    endAt,
    percentage,
    discountPrice,
    maxDiscountPrice,
    isStackable,
  } = value;

  return (
    <dl className="flex flex-col gap-1 px-3 py-1 text-sm">
      <div className="flex justify-between">
        <dt className="max-w-sm truncate text-black">{label}</dt>
        <dd className="font-semibold text-main-color">
          {percentage
            ? percentage + '%'
            : discountPrice.toLocaleString() + '원'}
        </dd>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 text-gray-300">
          <dd>{startAt + '-' + endAt}</dd>
          {maxDiscountPrice && maxDiscountPrice !== 0 && (
            <dd>(최대할인 {maxDiscountPrice.toLocaleString()}원)</dd>
          )}
        </div>
        <dd
          className={` font-semibold ${
            isStackable ? 'text-main-color' : 'text-gray-300'
          }`}
        >
          {isStackable ? '중복' : '일반'}쿠폰
        </dd>
      </div>
    </dl>
  );
};

const couponSelectStyle: StylesConfig<SelectCoupon, true> = {
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
