import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useClassCreateStore } from '@/store/classCreate';
import createOptions from '@/utils/generateStudentCountOptions';
import NumberSelect from '../NumberSelect';

const ClassInfo = ({
  changeClassPrice,
}: {
  changeClassPrice: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { classData } = useClassCreateStore();
  const [defaultValue, setDefaultValue] = useState({
    value: classData?.classSize?.max ?? 1,
    label: String(classData?.classSize?.max ?? 1),
  });

  useEffect(() => {
    setDefaultValue({
      value: classData?.classSize?.max ?? 1,
      label: String(classData?.classSize?.max ?? 1),
    });
  }, [classData?.classSize?.max]);

  const options = createOptions(
    classData?.classSize?.min ?? 1,
    classData?.classSize?.max ?? 100,
  );

  return (
    <section className="mt-3 flex flex-col text-lg font-semibold">
      <div className="flex h-16 items-center border-b border-solid border-sub-color2">
        <h2 className="w-1/4">총 클래스 횟수</h2>
        <div>{classData?.totalClasses}회</div>
      </div>

      <div className="flex h-16 items-center border-b border-solid border-sub-color2">
        <h2 className="w-1/4">1회 최대 수강생</h2>
        <Controller
          name="classSize"
          control={control}
          render={({ field }) => (
            <NumberSelect
              instanceId="StudentCountSelect"
              defaultValue={defaultValue}
              options={options}
              onChange={(selected) => {
                field.onChange({
                  ...getValues('classSize'),
                  max: selected?.value,
                });
              }}
            />
          )}
        />

        <p className="ml-1">명</p>
      </div>

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
          {...register('classPrice', {
            required: '가격',
          })}
          onChange={changeClassPrice}
        />
        원
      </div>
    </section>
  );
};

export default ClassInfo;
