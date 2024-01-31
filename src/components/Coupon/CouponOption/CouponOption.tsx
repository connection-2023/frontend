'use client';
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
import SelectClassModal from './SelectClassModal';
import Tooltip from '@/components/Tooltip/Tooltip';
import {
  CouponDuplicationTooltip,
  MaxDiscountTooltip,
  PrivateTooltip,
} from '@/components/Tooltip/TooltipMessages/TooltipMessages';
import { CouponData, SelectClassType, couponGET } from '@/types/coupon';

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
  defaultValue?: couponGET;
  type?: 'CREATE' | 'UPDATE';
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
  defaultValue,
  type = 'CREATE',
}: CouponOptionProps) => {
  const [options, setOptions] = useState<SelectClassType[]>([]);
  const [render, setRender] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const selectClass = watch('lectureIds');

  useEffect(() => {
    getMyLecture()
      .then((resData) => {
        const options = resData.data.lecture.map(({ id, title }) => ({
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
          defaultValue={defaultValue?.title ?? ''}
          {...register('title', {
            required: '쿠폰명은 필수 값 입니다.',
            validate: (title) => {
              const regex = /^[ㄱ-ㅎㅏ-ㅣ]*$/;
              return !regex.test(title) || '쿠폰명이 올바르지 않습니다.';
            },
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
          defaultValue={{
            startDate: defaultValue?.startAt
              ? new Date(defaultValue.startAt).toISOString().split('T')[0]
              : '',
            endDate: defaultValue?.endAt
              ? new Date(defaultValue.endAt).toISOString().split('T')[0]
              : '',
          }}
          rules={{
            required: '사용기간은 필수 값 입니다.',
            validate: ({ startDate, endDate }) => {
              const fromDate = new Date(startDate);
              const toDate = new Date(endDate);

              if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime()))
                return '사용기간이 올바른 날짜 형태가 아닙니다.';
            },
          }}
          render={({ field }) => (
            <div className="w-96 border-b border-solid border-gray-700 pb-5 sm:border-none sm:pb-0">
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
            defaultValue={
              defaultValue?.discountPrice ?? defaultValue?.percentage ?? ''
            }
            {...register('discountValue', {
              required: '쿠폰 상세는 필수 값 입니다.',
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
            defaultValue={defaultValue?.percentage ? '%' : '원'}
            render={({ field }) => (
              <NoborderSelect
                defaultValue={field.value}
                selectList={COUPON_UNIT_LIST}
                onChange={field.onChange}
              />
            )}
          />
          <p className="font-semibold">할인</p>
        </div>
      </CouponOptionSection>

      <hr className="border-gray-700 sm:hidden" />

      <DistributionCount
        register={register}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        errors={errors}
        trigger={trigger}
        defaultValue={defaultValue?.maxUsageCount}
      />

      <hr className="border-gray-700 sm:hidden" />

      <section className="flex items-center sm:gap-10">
        <div className="flex w-36 items-center gap-1 sm:w-1/6">
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
            defaultChecked={defaultValue?.isPrivate ?? false}
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

      <hr className="border-gray-700 sm:hidden" />

      <section className="flex items-center sm:gap-10">
        <div className="flex w-36 items-center gap-1 sm:w-1/6">
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
            defaultValue={defaultValue?.maxDiscountPrice ?? ''}
            {...register('maxDiscountAmount', {
              pattern: {
                value: /^[0-9]*$/,
                message: '최대할인 금액은 숫자만 입력 가능합니다.',
              },
              validate: (discountAmount) => {
                if (getValues('couponQuantity') === '원' && discountAmount) {
                  return discountAmount <= getValues('discountValue')
                    ? true
                    : '최대할인금액은 할인금액보다 높을 수 없습니다.';
                }
                return true;
              },
            })}
          />
          <p className="font-semibold text-gray-500 peer-focus:text-black">
            원
          </p>
        </div>
      </section>

      <hr className="border-gray-700 sm:hidden" />

      <section className="flex items-center sm:gap-10">
        <div className="flex w-36 items-center gap-1 sm:w-1/6">
          <h2 className="whitespace-nowrap font-semibold">일부공개</h2>
          <Tooltip>
            <PrivateTooltip />
          </Tooltip>
        </div>
        <div className="flex items-center">
          <input
            id="isPrivate"
            type="checkbox"
            className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
            defaultChecked={defaultValue?.isPrivate ?? false}
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

      <hr className="border-gray-700 sm:hidden" />

      <section className="grid grid-cols-[1fr,5fr] items-stretch">
        <h2 className="mr-10 whitespace-nowrap font-semibold">적용할 클래스</h2>

        {(options.length > 0 || render) && (
          <Controller
            name="lectureIds"
            control={control}
            defaultValue={
              type === 'CREATE'
                ? options
                : defaultValue?.lectureCouponTarget.map(({ lecture }) => ({
                    value: lecture.id,
                    label: lecture.title,
                  }))
            }
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
                  <div className="mb-2 flex">
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
                  <div className="col-span-2 mb-2 w-full sm:col-start-2">
                    <div className="hidden sm:block">
                      <SelectClass
                        options={options}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </div>
                    <div className="sm:hidden">
                      <SelectClassModal />
                    </div>
                  </div>
                  <div className="col-span-2 flex max-h-48 flex-col gap-1 overflow-y-auto sm:col-start-2">
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
                                ({ value: fieldValue }) => fieldValue !== value,
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
      </section>
    </main>
  );
};

export default CouponOption;
