import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { hookForm } from '@/recoil/hookForm/atom';
import ClassSizeSelect from './ClassSizeSelect';
import { CATEGORY_CLASSSIZE } from '@/constants/constants';
import { CheckMarkSVG } from '../../../../../../public/icons/svg';

const LessonTypeSelect = () => {
  const [lessonType, setLessonType] = useState('');
  const formMethods = useRecoilValue(hookForm);

  if (!formMethods) {
    return null;
  }

  const { register, setValue } = formMethods;

  const selectClassSize = (e: ChangeEvent<HTMLInputElement>) => {
    setLessonType(e.target.value);

    if (e.target.value === '그룹레슨') {
      setValue('수강생제한', { min: 0, max: 100 });
    }
    setValue('인원', e.target.value);
  };

  return (
    <ul className="flex flex-grow gap-4">
      {CATEGORY_CLASSSIZE.map((lessonType) => (
        <li key={lessonType} className="flex items-center gap-1">
          <input
            {...register('인원', {
              validate: (value) => !!value,
            })}
            id={lessonType}
            type="radio"
            name="lessonTypeGroup"
            value={lessonType}
            className="peer hidden"
            onChange={(e) => selectClassSize(e)}
          />
          <div className="relative h-[1.125rem] w-[1.125rem] cursor-pointer rounded-sm border border-solid border-gray-500 fill-none peer-checked:bg-sub-color1 peer-checked:fill-white">
            <CheckMarkSVG />
          </div>
          <label
            htmlFor={lessonType}
            className="flex cursor-pointer justify-center text-center
            peer-checked:font-bold peer-checked:text-sub-color1
            "
          >
            {lessonType}
          </label>
        </li>
      ))}

      <ClassSizeSelect lessonType={lessonType} />
    </ul>
  );
};

export default LessonTypeSelect;
