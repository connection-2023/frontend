import { MY_COUPON_FILTER_OPTIONS } from '@/constants/constants';
import useCouponStore from '@/store/my-coupon';

const FilterOptions = () => {
  const { selectedOption, changeSelectedOption } = useCouponStore();

  return (
    <>
      {MY_COUPON_FILTER_OPTIONS.map((option) => (
        <button key={option} className="flex items-center gap-1">
          <input
            id={option}
            type="checkbox"
            className="peer h-[18px] w-[18px] accent-sub-color1"
            checked={selectedOption === option}
            onChange={() => changeSelectedOption(option)}
          />
          <label
            htmlFor={option}
            className="flex cursor-pointer text-sub-color2
              peer-checked:text-black
                "
          >
            {option}
          </label>
        </button>
      ))}
    </>
  );
};

export default FilterOptions;
