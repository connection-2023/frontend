import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useClassCreateStore } from '@/store/classCreate';
import createOptions from '@/utils/generateStudentCountOptions';
import NumberSelect from '../NumberSelect';

const ClassInfo = () => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const { classData } = useClassCreateStore((state) => ({
    classData: state.classData,
  }));

  const lessonType = getValues('lessonType');
  const lessonTypeMin = getValues('min');
  const lessonTypeMax = getValues('max');

  const isGroup = lessonType ? lessonType === '그룹레슨' : classData?.isGroup;
  const selectedMin = lessonTypeMin ? lessonTypeMin.value : classData?.min;
  const selectedMax = lessonTypeMax ? lessonTypeMax.value : classData?.max;

  const maxStudentDefaultValue = {
    value: isGroup ? selectedMax : 1,
    label: String(isGroup ? selectedMax : 1),
  };

  useEffect(() => {
    setValue('max', maxStudentDefaultValue);
  }, []);

  const options = createOptions(selectedMin, isGroup ? 100 : 1);

  return (
    <section className="mt-3 flex flex-col text-lg font-semibold">
      <div className="flex h-16 items-center border-b border-solid border-gray-500">
        <h2 className="w-1/4">총 클래스 횟수</h2>
        <div>{classData?.totalClasses}회</div>
      </div>

      <div className="flex h-16 items-center border-b border-solid border-gray-500">
        <h2 className="w-1/4">1회 최대 수강생</h2>
        <Controller
          name="max"
          control={control}
          defaultValue={maxStudentDefaultValue}
          render={({ field }) => {
            return (
              <NumberSelect
                instanceId="select-max"
                value={field.value}
                onChange={(selected) => {
                  field.onChange(selected);
                }}
                options={options}
                isDisabled={!isGroup}
              />
            );
          }}
        />

        <p className="ml-1">명</p>
      </div>

      <Controller
        name="classPrice"
        control={control}
        defaultValue={classData?.price}
        rules={{
          required: '가격',
        }}
        render={({ field }) => (
          <div className="flex h-16 items-center ">
            <h2
              id="classPrice"
              className={`${
                errors.classPrice && 'animate-vibration text-main-color'
              } w-1/4`}
            >
              가격 설정
            </h2>
            <div>1회당</div>
            <input
              type="number"
              className="ml-7 mr-1 h-8 w-24 rounded-md border border-solid border-sub-color4 text-right focus:outline-none"
              defaultValue={field.value}
              onChange={field.onChange}
            />
            원
          </div>
        )}
      />
    </section>
  );
};

export default ClassInfo;
