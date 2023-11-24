import { useEffect } from 'react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import CouponOptionSection from './CouponOptionSection';
import { CouponData } from '@/types/coupon';

interface CouponOptionProps {
  register: UseFormRegister<CouponData>;
  getValues: UseFormGetValues<CouponData>;
  setValue: UseFormSetValue<CouponData>;
  watch: UseFormWatch<CouponData>;
  errors: FieldErrors<CouponData>;
  trigger: UseFormTrigger<CouponData>;
}

const DistributionCount = ({
  register,
  getValues,
  setValue,
  watch,
  errors,
  trigger,
}: CouponOptionProps) => {
  const maxUsageCount = watch('maxUsageCount');

  useEffect(() => {
    if (maxUsageCount === true) {
      trigger('couponDistributionCount');
    }
  }, [maxUsageCount]);

  return (
    <CouponOptionSection
      title="배부 개수"
      errors={errors}
      registerId="couponDistributionCount"
    >
      <div className="flex items-center">
        <input
          id="maxUsageCount"
          type="checkbox"
          className="peer peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
          defaultChecked={true}
          {...register('maxUsageCount')}
        />
        <label
          htmlFor="maxUsageCount"
          className="mr-3 cursor-pointer select-none font-semibold text-gray-500 peer-checked:text-black"
        >
          제한 없음
        </label>
        <p className={`mr-2 font-semibold ${maxUsageCount && 'text-gray-500'}`}>
          선착순
        </p>
        <input
          type="number"
          className="mr-1 h-7 w-12 rounded-md border border-solid border-gray-500 text-center focus:outline-none"
          {...register('couponDistributionCount', {
            validate: (value) => {
              return getValues('maxUsageCount') || value
                ? true
                : '배부 개수는 필수 값 입니다.';
            },
            pattern: {
              value: /^[0-9]*$/,
              message: '배부 개수는 숫자만 입력 가능합니다.',
            },
          })}
          onFocus={() => setValue('maxUsageCount', false)}
        />
        <p className={`mr-4 font-semibold ${maxUsageCount && 'text-gray-500'}`}>
          명
        </p>
      </div>
    </CouponOptionSection>
  );
};

export default DistributionCount;
