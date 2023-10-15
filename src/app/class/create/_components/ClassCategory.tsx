import { Controller, useFormContext } from 'react-hook-form';
import UploadImage from '@/components/UploadImage/UploadImage';
import GenreCheckboxGroup from '@/components/GenreCheckboxGroup/GenreCheckboxGroup';
import CategoryContainer from './ClassCategory/CategoryContainer';
import RadioComponent from './ClassCategory/RadioComponent';
import ClassSizeSelect from './ClassCategory/ClassSizeSelect';
import {
  CATEGORY_DIFFICULTY_LEVEL,
  CATEGORY_LESSON_TYPE,
  CATEGORY_PROGRESS_METHOD,
} from '@/constants/constants';

const ClassCategory = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <section className="mb-5 border-b border-solid border-sub-color2 py-10">
        <Controller
          name="classImg"
          control={control}
          defaultValue={[]}
          rules={{
            required: '이미지',
          }}
          render={({ field }) => <UploadImage onChange={field.onChange} />}
        />
      </section>

      <input
        id="className"
        placeholder="클래스명"
        className={`mb-6 h-10 border-b border-solid border-sub-color1 pb-2 text-2xl font-bold outline-0
        ${errors.className && 'animate-vibration placeholder:text-main-color'}`}
        {...register('className', {
          required: '클래스명',
        })}
      />

      <Controller
        name="classGenre"
        control={control}
        defaultValue={[]}
        rules={{
          required: '장르',
        }}
        render={({ field }) => <GenreCheckboxGroup onChange={field.onChange} />}
      />

      <CategoryContainer id="classLessonType" title="인원">
        <RadioComponent
          message="인원"
          title="classLessonType"
          checkList={CATEGORY_LESSON_TYPE}
        />
        <ClassSizeSelect />
      </CategoryContainer>

      <CategoryContainer id="classProgressMethod" title="진행방식">
        <RadioComponent
          message="진행방식"
          title="classProgressMethod"
          checkList={CATEGORY_PROGRESS_METHOD}
        />
      </CategoryContainer>

      <CategoryContainer id="classDifficultyLevel" title="난이도">
        <RadioComponent
          message="난이도"
          title="classDifficultyLevel"
          checkList={CATEGORY_DIFFICULTY_LEVEL}
        />
      </CategoryContainer>
    </>
  );
};

export default ClassCategory;
