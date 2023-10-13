import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import NoborderSelect from '@/components/Select/NoborderSelect';
import ClassRange from '@/app/class/create/_components/ClassSchedule/ClassRange/ClassRange';
import Tooltip from '@/components/Tooltip/Tooltip';
import {
  CouponDuplicationTooltip,
  MaxDiscountTooltip,
} from '@/components/Tooltip/TooltipMessages/TooltipMessages';
import CouponOptionSection from './CouponOptionSection';
import { COUPON_UNIT_LIST } from '@/constants/constants';
import { useEffect } from 'react';

const CouponOptionInputStyles =
  'h-7 rounded-md border border-solid border-sub-color2 focus:outline-none';

interface CouponOptionProps {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
}

const CouponOption = ({
  register,
  control,
  getValues,
  setValue,
  watch,
  errors,
  trigger,
}: CouponOptionProps) => {
  const hasCouponLimit = watch('hasCouponLimit');

  useEffect(() => {
    if (hasCouponLimit === true) {
      trigger('couponDistributionCount');
    }
  }, [hasCouponLimit]);

  return (
    <main className="flex flex-col gap-4 ">
      <CouponOptionSection
        title="쿠폰명"
        errors={errors}
        registerId="couponName"
      >
        <input
          type="text"
          className={`${CouponOptionInputStyles} w-96`}
          {...register('couponName', {
            required: '쿠폰명은 필수 입력 사항입니다.',
          })}
        />
      </CouponOptionSection>

      <CouponOptionSection
        title="사용기간"
        errors={errors}
        registerId="validityPeriod"
      >
        <Controller
          name="validityPeriod"
          control={control}
          defaultValue={undefined}
          rules={{
            required: '사용기간은 필수 입력 사항입니다.',
          }}
          render={({ field }) => <ClassRange onChange={field.onChange} />}
        />
      </CouponOptionSection>

      <CouponOptionSection
        title="쿠폰 상세"
        errors={errors}
        registerId="discountValue"
      >
        <div className="flex items-center gap-1">
          <input
            type="number"
            className={`${CouponOptionInputStyles} mr-[0.25rem] w-[5rem]`}
            {...register('discountValue', {
              required: '할인률은 필수 입력 사항입니다.',
              pattern: {
                value: /^[0-9]*$/,
                message: '할인률은 숫자만 입력 가능합니다.',
              },
              validate: (value) => {
                if (getValues('couponQuantity') === '%' && value > 100) {
                  return '할인률은 100%를 초과할 수 없습니다.';
                }
              },
            })}
          />
          <Controller
            name="couponQuantity"
            control={control}
            defaultValue="원"
            render={({ field }) => (
              <NoborderSelect
                defaultValue="원"
                selectList={COUPON_UNIT_LIST}
                onChange={field.onChange}
              />
            )}
          />
          <p className="font-semibold">할인</p>
        </div>
      </CouponOptionSection>

      <CouponOptionSection
        title="배부 개수"
        errors={errors}
        registerId="couponDistributionCount"
      >
        <div className="flex items-center">
          <p
            className={`mr-2 font-semibold ${
              hasCouponLimit && 'text-sub-color2'
            }`}
          >
            선착순
          </p>
          <input
            type="number"
            className={`${CouponOptionInputStyles} mr-1 w-12 `}
            {...register('couponDistributionCount', {
              validate: (value) => {
                if (getValues('hasCouponLimit') || value) return true;
                return '배부 개수는 필수 값 입니다.';
              },
              pattern: {
                value: /^[0-9]*$/,
                message: '배부 개수는 숫자만 입력 가능합니다.',
              },
            })}
            onFocus={() => setValue('hasCouponLimit', false)}
          />
          <p
            className={`mr-4 font-semibold ${
              hasCouponLimit && 'text-sub-color2'
            }`}
          >
            명
          </p>
          <input
            id="hasCouponLimit"
            type="checkbox"
            className="peer peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
            {...register('hasCouponLimit')}
          />
          <label
            htmlFor="hasCouponLimit"
            className="cursor-pointer select-none font-semibold text-sub-color2 peer-checked:text-black"
          >
            제한 없음
          </label>
        </div>
      </CouponOptionSection>

      <section className="flex items-center gap-10">
        <div className="flex w-1/6 items-center gap-1">
          <h2 className="whitespace-nowrap font-semibold">중복 쿠폰</h2>
          <Tooltip>
            <CouponDuplicationTooltip />
          </Tooltip>
        </div>
        <div className="flex items-center">
          <input
            id="apply"
            type="checkbox"
            className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
            {...register('allowDuplicateCoupons')}
          />
          <label
            htmlFor="apply"
            className="cursor-pointer select-none font-semibold text-sub-color2 peer-checked:text-black"
          >
            적용
          </label>
        </div>
      </section>

      <section className="flex items-center gap-10">
        <div className="flex w-1/6 items-center gap-1">
          <h2
            className={`whitespace-nowrap font-semibold ${
              errors.maxDiscountAmount && 'animate-vibration text-main-color'
            }`}
          >
            최대할인 금액
          </h2>
          <Tooltip>
            <MaxDiscountTooltip />
          </Tooltip>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            className={`${CouponOptionInputStyles} peer mr-1 w-20`}
            {...register('maxDiscountAmount', {
              pattern: {
                value: /^[0-9]*$/,
                message: '최대할인 금액은 숫자만 입력 가능합니다.',
              },
            })}
          />
          <p className="font-semibold text-sub-color2 peer-focus:text-black">
            원
          </p>
        </div>
      </section>
    </main>
  );
};

export default CouponOption;
