import { useFormContext, useFormState } from 'react-hook-form';
import UploadImage from '@/components/UploadImage/UploadImage';
import GenreCheckboxGroup from '@/components/GenreCheckboxGroup/GenreCheckboxGroup';
import LessonTypeSelect from './ClassCategory/LessonTypeSelect';
import RadioComponent from './ClassCategory/RadioComponent';
import {
  CATEGORY_DIFFICULTY_LEVEL,
  CATEGORY_PROGRESS_METHOD,
} from '@/constants/constants';
import RadioContainer from './ClassCategory/RadioContainer';

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
        className="mb-6 h-10 border-b border-solid border-sub-color1 pb-2 text-2xl font-bold outline-0"
        {...register('클래스명', {
          required: '필수 입력 사항',
        })}
      />

      <GenreCheckboxGroup />

      <RadioContainer title="인원">
        <LessonTypeSelect />
      </RadioContainer>

      <RadioContainer title="진행방식">
        <RadioComponent title="진행방식" checkList={CATEGORY_PROGRESS_METHOD} />
      </RadioContainer>

      <RadioContainer title="난이도">
        <RadioComponent title="난이도" checkList={CATEGORY_DIFFICULTY_LEVEL} />
      </RadioContainer>
    </>
  );
};

export default ClassCategory;
