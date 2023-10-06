import { ChangeEvent, useState } from 'react';
import { CATEGORY_CLASSSIZE } from '@/constants/constants';
import ClassSizeSelect from './ClassSizeSelect';
import { CheckMarkSVG } from '../../../../../../public/icons/svg';

const LessonTypeSelect = () => {
  const [lessonType, setLessonType] = useState('');

  const selectClassSize = (e: ChangeEvent<HTMLInputElement>) => {
    setLessonType(e.target.value);
  };

  return (
    <ul className="flex flex-grow gap-4">
      {CATEGORY_CLASSSIZE.map((lessonType) => (
        <li key={lessonType} className="flex items-center gap-1">
          <input
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
