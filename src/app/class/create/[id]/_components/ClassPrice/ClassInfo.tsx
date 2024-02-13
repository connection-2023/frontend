import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useClassScheduleStore } from '@/store';
import { useClassCreateStore } from '@/store/classCreate';
import createOptions from '@/utils/generateStudentCountOptions';
import NumberSelect from '../NumberSelect';

const ClassInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { classData } = useClassCreateStore((state) => ({
    classData: state.classData,
  }));

  const classDates = useClassScheduleStore((state) => state.filteredDates);

  const isGroup = classData?.lessonType === '그룹레슨';

  const maxStudentDefaultValue = {
    value: classData?.max,
    label: String(classData?.max),
  };

  const options = createOptions(classData?.min ?? 1, 100);

  return (
    <section className="mt-3 flex flex-col text-lg font-semibold">
      <div className="flex h-16 items-center border-b border-solid border-gray-500">
        <h2 className="w-36 sm:w-1/4">총 클래스 횟수</h2>
        <div>{classDates?.length ?? classData?.totalClasses}회</div>
      </div>

      <div className="flex h-16 items-center border-b border-solid border-gray-500">
        <h2 className="w-36 sm:w-1/4">1회 최대 수강생</h2>
        <Controller
          name="max"
          control={control}
          defaultValue={maxStudentDefaultValue}
          render={({ field }) => {
            return (
              <NumberSelect
                instanceId="select-max"
                value={
                  isGroup
                    ? field.value
                    : {
                        value: 1,
                        label: 1,
                      }
                }
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
              } w-36 sm:w-1/4`}
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
