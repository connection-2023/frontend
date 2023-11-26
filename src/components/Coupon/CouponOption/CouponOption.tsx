import { ChangeEvent, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import NoborderSelect from '@/app/class/create/_components/ClassPrice/NoborderSelect';
import ClassRange from '@/app/class/create/_components/ClassSchedule/ClassRange/ClassRange';
import { COUPON_UNIT_LIST } from '@/constants/constants';
import { CloseSVG } from '@/icons/svg';
import { getMyLecture } from '@/lib/apis/classApi';
import CouponOptionSection from './CouponOptionSection';
import DistributionCount from './DistributionCount';
import SelectClass from './SelectClass';
import Tooltip from '@/components/Tooltip/Tooltip';
import {
  CouponDuplicationTooltip,
  MaxDiscountTooltip,
} from '@/components/Tooltip/TooltipMessages/TooltipMessages';
import { CouponData, SelectClassType } from '@/types/coupon';

const CouponOptionInputStyles =
  'h-7 px-3 rounded-md border border-solid border-gray-500 focus:outline-none';

interface CouponOptionProps {
  register: UseFormRegister<CouponData>;
  control: Control<CouponData>;
  getValues: UseFormGetValues<CouponData>;
  setValue: UseFormSetValue<CouponData>;
  watch: UseFormWatch<CouponData>;
  errors: FieldErrors<CouponData>;
  trigger: UseFormTrigger<CouponData>;
  clearErrors: UseFormClearErrors<CouponData>;
}

const CouponOption = ({
  register,
  control,
  getValues,
  errors,
  setValue,
  watch,
  trigger,
  clearErrors,
}: CouponOptionProps) => {
  const [options, setOptions] = useState<SelectClassType[]>([]);
  const [render, setRender] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const selectClass = watch('lectureIds');

  useEffect(() => {
    getMyLecture()
      .then((data) => {
        const options = data.data.lecture.map(({ id, title }) => ({
          label: title,
          value: id,
        }));
        setOptions(options);
        setRender(true);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setIsAllSelected(selectClass?.length === options.length);
  }, [selectClass, options]);

  return (
    <main className="flex flex-col gap-4 ">
      <CouponOptionSection title="쿠폰명" errors={errors} registerId="title">
        <input
          type="text"
          className={`${CouponOptionInputStyles} w-96`}
          {...register('title', {
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
          defaultValue={{ startDate: '', endDate: '' }}
          rules={{
            required: '사용기간은 필수 입력 사항입니다.',
            validate: ({ startDate, endDate }) => {
              const fromDate = new Date(startDate);
              const toDate = new Date(endDate);

              if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime()))
                return '날짜 형태가 아닙니다.';
            },
          }}
          render={({ field }) => (
            <div className="w-96">
              <ClassRange
                defaultValue={field.value}
                onChange={field.onChange}
                clearErrors={clearErrors}
              />
            </div>
          )}
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
            className={`${CouponOptionInputStyles} mr-[0.25rem] w-[5rem] text-right`}
            {...register('discountValue', {
              required: '쿠폰 상세는 필수 입력 사항입니다.',
              pattern: {
                value: /^[0-9]*$/,
                message: '쿠폰 상세는 숫자만 입력 가능합니다.',
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

      <DistributionCount
        register={register}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        errors={errors}
        trigger={trigger}
      />

      <section className="flex items-center gap-10">
        <div className="flex w-1/6 items-center gap-1">
          <h2 className="whitespace-nowrap font-semibold">중복할인 쿠폰</h2>
          <Tooltip>
            <CouponDuplicationTooltip />
          </Tooltip>
        </div>
        <div className="flex items-center">
          <input
            id="apply"
            type="checkbox"
            className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
            {...register('isStackable')}
          />
          <label
            htmlFor="apply"
            className="cursor-pointer select-none font-semibold text-gray-500 peer-checked:text-black"
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
            className={`${CouponOptionInputStyles} peer mr-1 w-20 text-right`}
            {...register('maxDiscountAmount', {
              pattern: {
                value: /^[0-9]*$/,
                message: '최대할인 금액은 숫자만 입력 가능합니다.',
              },
            })}
          />
          <p className="font-semibold text-gray-500 peer-focus:text-black">
            원
          </p>
        </div>
      </section>

      <section className="flex items-center gap-10">
        <div className="flex w-1/6 items-center gap-1">
          <h2 className="whitespace-nowrap font-semibold">일부공개</h2>
          <Tooltip>
            <CouponDuplicationTooltip />
          </Tooltip>
        </div>
        <div className="flex items-center">
          <input
            id="isPrivate"
            type="checkbox"
            className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
            {...register('isPrivate')}
          />
          <label
            htmlFor="isPrivate"
            className="cursor-pointer select-none font-semibold text-gray-500 peer-checked:text-black"
          >
            적용
          </label>
        </div>
      </section>

      <section className="flex items-stretch gap-10">
        <div className="h-full w-1/6 gap-1">
          <h2 className="whitespace-nowrap font-semibold ">적용할 클래스</h2>
        </div>

        <div className="flex w-96 flex-col gap-3">
          {(options.length > 0 || render) && (
            <Controller
              name="lectureIds"
              control={control}
              defaultValue={options}
              render={({ field }) => {
                const classSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setValue('lectureIds', options);
                    field.onChange(options);
                  } else {
                    setValue('lectureIds', []);
                    field.onChange([]);
                  }
                };

                return (
                  <>
                    <div className="flex">
                      <input
                        id="lectureIds"
                        type="checkbox"
                        className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
                        checked={isAllSelected}
                        onChange={(e) => classSelectAll(e)}
                      />
                      <label
                        htmlFor="lectureIds"
                        className="cursor-pointer select-none font-semibold text-gray-500 peer-checked:text-black"
                      >
                        전체 클래스 적용
                      </label>
                    </div>
                    <div className="w-full">
                      <SelectClass
                        options={options}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      {selectClass?.map(({ label = '', value = '' }, index) => (
                        <p
                          key={label + index}
                          className="flex items-center justify-between text-sm text-sub-color1"
                        >
                          #{label}
                          <button
                            type="button"
                            className="group"
                            onClick={() =>
                              field.onChange(
                                field.value.filter(
                                  ({ value: fieldValue }) =>
                                    fieldValue !== value,
                                ),
                              )
                            }
                          >
                            <CloseSVG className=" h-4 w-4 stroke-gray-500 group-hover:stroke-sub-color1" />
                          </button>
                        </p>
                      ))}
                    </div>
                  </>
                );
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default CouponOption;
