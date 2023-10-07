import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import RadioComponent from './RadioComponent';
import ClassSizeSelect from './ClassSizeSelect';
import { CATEGORY_LESSON_TYPE } from '@/constants/constants';

const LessonTypeSelect = () => {
  const [lessonType, setLessonType] = useState('');
  const formMethods = useFormContext();
  const { setValue } = formMethods;

  const selectClassSize = (e: ChangeEvent<HTMLInputElement>) => {
    setLessonType(e.target.value);

    if (e.target.value === '그룹레슨') {
      setValue('수강생제한', { min: 0, max: 100 });
    }
    setValue('인원', e.target.value);
  };

  return (
    <>
      <RadioComponent
        title="인원"
        checkList={CATEGORY_LESSON_TYPE}
        changFunction={selectClassSize}
      />
      <ClassSizeSelect lessonType={lessonType} />
    </>
  );
};

export default LessonTypeSelect;
