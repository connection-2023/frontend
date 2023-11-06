import { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { classCreateState } from '@/recoil/Create/atoms';
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

  const classData = useRecoilValue(classCreateState);
  const isIndividualLesson = classData.classLessonType === '개인(1:1)레슨';

  const MaxStudent = isIndividualLesson ? 1 : classData.classSize.max;

  const defaultValue = { value: MaxStudent, label: String(MaxStudent) };

  const options = createOptions(
    classData.classSize.min,
    isIndividualLesson ? 1 : 100,
  );

  return (
    <section className="mt-3 flex flex-col text-lg font-semibold">
      <div className="flex h-16 items-center border-b border-solid border-gray-500">
        <h2 className="w-1/4">총 클래스 횟수</h2>
        <div>20회</div>
      </div>
      {/* recoil에서 값 가져오기 */}

      <div className="flex h-16 items-center border-b border-solid border-gray-500">
        <h2 className="w-1/4">1회 최대 수강생</h2>
        <Controller
          name="classSize"
          control={control}
          defaultValue={classData.classSize}
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
          className="ml-7 mr-1 h-8 w-24 rounded-md border border-solid border-gray-700 text-right focus:outline-none"
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
