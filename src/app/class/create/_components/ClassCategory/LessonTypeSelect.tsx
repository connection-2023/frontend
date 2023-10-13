import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { classCreateState } from '@/recoil/Create/atoms';
import { useFormContext } from 'react-hook-form';
import ClassSizeSelect from './ClassSizeSelect';
import RadioComponent from './RadioComponent';
import { CATEGORY_LESSON_TYPE } from '@/constants/constants';

const LessonTypeSelect = () => {
  const classData = useRecoilValue(classCreateState);

  const [lessonType, setLessonType] = useState(classData['인원']);
  const formMethods = useFormContext();
  const { setValue } = formMethods;

  const selectClassSize = (e: ChangeEvent<HTMLInputElement>) => {
    setLessonType(e.target.value);

    if (e.target.value === '그룹레슨') {
      setValue('수강생제한', {
        min: classData['수강생제한'].min,
        max: classData['수강생제한'].max,
      });
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