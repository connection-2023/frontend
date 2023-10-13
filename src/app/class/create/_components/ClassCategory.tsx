import { useFormContext, useFormState } from 'react-hook-form';
import UploadImage from '@/components/UploadImage/UploadImage';
import GenreCheckboxGroup from '@/components/GenreCheckboxGroup/GenreCheckboxGroup';
import LessonTypeSelect from './ClassCategory/LessonTypeSelect';
import CategoryContainer from './ClassCategory/CategoryContainer';
import {
  CATEGORY_DIFFICULTY_LEVEL,
  CATEGORY_PROGRESS_METHOD,
} from '@/constants/constants';
import RadioComponent from './ClassCategory/RadioComponent';

const ClassCategory = () => {
  const formMethods = useFormContext();
  const { errors } = useFormState({ control: formMethods.control });
  const { register } = formMethods;

  return (
    <>
      <section className="mb-5 border-b border-solid border-sub-color2 py-10">
        <UploadImage />
      </section>

      <input
        id="클래스명"
        placeholder="클래스명"
        className={`mb-6 h-10 border-b border-solid border-sub-color1 pb-2 text-2xl font-bold outline-0
        ${errors.클래스명 && 'animate-vibration placeholder:text-main-color'}`}
        {...register('클래스명', {
          required: '필수 입력 사항',
        })}
      />

      <GenreCheckboxGroup />

      <CategoryContainer title="인원">
        <LessonTypeSelect />
      </CategoryContainer>

      <CategoryContainer title="진행방식">
        <RadioComponent title="진행방식" checkList={CATEGORY_PROGRESS_METHOD} />
      </CategoryContainer>

      <CategoryContainer title="난이도">
        <RadioComponent title="난이도" checkList={CATEGORY_DIFFICULTY_LEVEL} />
      </CategoryContainer>
    </>
  );
};

export default ClassCategory;
