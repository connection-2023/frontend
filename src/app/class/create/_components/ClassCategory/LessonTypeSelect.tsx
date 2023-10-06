import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { hookForm } from '@/recoil/hookForm/atom';
import RadioComponent from './RadioComponent';
import ClassSizeSelect from './ClassSizeSelect';
import { CATEGORY_LESSON_TYPE } from '@/constants/constants';

const LessonTypeSelect = () => {
  const [lessonType, setLessonType] = useState('');
  const formMethods = useRecoilValue(hookForm);

  if (!formMethods) {
    return null;
  }

  const { setValue } = formMethods;

  const selectClassSize = (e: ChangeEvent<HTMLInputElement>) => {
    setLessonType(e.target.value);

    if (e.target.value === '그룹레슨') {
      setValue('수강생제한', { min: 0, max: 100 });
    }
    setValue('인원', e.target.value);
  };

  return (
    <ul className="flex gap-4">
      <RadioComponent
        title="인원"
        checkList={CATEGORY_LESSON_TYPE}
        changFunction={selectClassSize}
      />
      <ClassSizeSelect lessonType={lessonType} />
    </ul>
  );
};

export default LessonTypeSelect;
