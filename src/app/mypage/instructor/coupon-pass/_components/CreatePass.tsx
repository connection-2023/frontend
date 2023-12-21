import React, { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CloseSVG } from '@/icons/svg';
import { getMyLecture } from '@/lib/apis/classApi';
import SelectClass from '@/components/Coupon/CouponOption/SelectClass';
import { SelectClassType } from '@/types/coupon';

const CreatePass = () => {
  const [options, setOptions] = useState<SelectClassType[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const {
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const selectClass = watch('lectureIds');

  useEffect(() => {
    getMyLecture()
      .then((resData) => {
        const options = resData.data.lecture.map(({ id, title }) => ({
          label: title,
          value: id,
        }));
        setOptions(options);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setIsAllSelected(selectClass?.length === options.length);
  }, [selectClass, options]);

  return (
    <section className="grid w-screen grid-cols-[1fr,5fr] gap-x-7 gap-y-4 border-b border-solid border-sub-color1 px-5 pb-4 sm:w-[40rem] sm:gap-x-11 sm:gap-y-5">
      <label
        className={`${
          errors.title && 'animate-vibration text-main-color'
        } col-span-2 whitespace-nowrap font-semibold sm:col-auto`}
      >
        패스권 이름
      </label>

      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{
          required: '패스권 이름은 필수 값 입니다.',
        }}
        render={({ field }) => (
          <input
            type="text"
            className="col-span-2 h-7 rounded-md border border-solid border-gray-500 px-3 focus:outline-none sm:col-auto sm:w-96"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <hr className="col-span-2 border-t border-solid border-gray-500 sm:hidden" />

      <Controller
        name="lectureIds"
        control={control}
        defaultValue={[]}
        rules={{
          required: '적용할 클래스를 선택 해주세요.',
        }}
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
            <div className="col-span-2 grid grid-cols-[1fr,5fr] items-center gap-x-11 gap-y-1 sm:gap-x-14 sm:gap-y-2">
              <label
                className={`${
                  errors.lectureIds && 'animate-vibration text-main-color'
                } whitespace-nowrap font-semibold`}
              >
                클래스 선택
              </label>

              <div className="flex items-center gap-1">
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
                  전체 클래스
                </label>
              </div>
              <div className="col-span-2 mb-1 h-7 sm:col-auto sm:col-start-2 sm:mb-0 sm:w-96">
                <SelectClass
                  options={options}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
              <div className="col-span-2 flex max-h-48 flex-col gap-1 overflow-y-auto sm:col-auto sm:col-start-2 sm:w-96">
                {selectClass &&
                  selectClass.map((classInfo: SelectClassType) => (
                    <p
                      key={classInfo.value}
                      className="flex items-center justify-between text-sm text-sub-color1"
                    >
                      {classInfo.label}
                      <CloseSVG className="h-4 w-4 stroke-gray-500 group-hover:stroke-sub-color1" />
                    </p>
                  ))}
              </div>
            </div>
          );
        }}
      />
      <hr className="col-span-2 border-t border-solid border-gray-500 sm:hidden" />

      <label
        className={`${
          errors.availableMonths && 'animate-vibration text-main-color'
        } whitespace-nowrap font-semibold`}
      >
        사용가능 기간
      </label>
      <div className="flex items-center gap-1">
        <Controller
          name="availableMonths"
          control={control}
          defaultValue=""
          rules={{
            required: '사용가능 기간을 입력해주세요.',
          }}
          render={({ field }) => (
            <input
              type="number"
              className="h-7 w-14 rounded-md border border-solid border-gray-500 text-center focus:outline-none"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        개월
      </div>

      <hr className="col-span-2 border-t border-solid border-gray-500 sm:hidden" />

      <label
        className={`${
          errors.availableMonths && 'animate-vibration text-main-color'
        } whitespace-nowrap font-semibold`}
      >
        횟수
      </label>
      <div className="flex items-center gap-1">
        <Controller
          name="maxUsageCount"
          control={control}
          defaultValue=""
          rules={{
            required: '사용가능 횟수를 입력해주세요.',
          }}
          render={({ field }) => (
            <input
              type="number"
              className="h-7 w-14 rounded-md border border-solid border-gray-500 text-center focus:outline-none"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        회
      </div>

      <hr className="col-span-2 border-t border-solid border-gray-500 sm:hidden" />

      <label
        className={`${
          errors.availableMonths && 'animate-vibration text-main-color'
        } whitespace-nowrap font-semibold`}
      >
        판매 가격
      </label>
      <div className="flex items-center gap-1">
        <Controller
          name="price"
          control={control}
          defaultValue=""
          rules={{
            required: '판매가격을 입력 해주세요.',
          }}
          render={({ field }) => (
            <input
              type="number"
              className="h-7 w-20 rounded-md border border-solid border-gray-500 text-center focus:outline-none"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        원
      </div>
    </section>
  );
};

export default CreatePass;
