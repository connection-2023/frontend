import { Controller, useFormContext } from 'react-hook-form';
import {
  CATEGORY_DIFFICULTY_LEVEL,
  CATEGORY_LESSON_TYPE,
  CATEGORY_PROGRESS_METHOD,
} from '@/constants/constants';
import { useClassCreateStore } from '@/store/classCreate';
import CategoryContainer from './ClassCategory/CategoryContainer';
import ClassSizeSelect from './ClassCategory/ClassSizeSelect';
import RadioComponent from './ClassCategory/RadioComponent';
import GenreCheckboxGroup from '@/components/GenreCheckboxGroup/GenreCheckboxGroup';
import UploadImage from '@/components/UploadImage/UploadImage';

const ClassCategory = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { classData } = useClassCreateStore((state) => ({
    classData: state.classData,
  }));

  return (
    <>
      <section
        id="images"
        className="mb-5 border-b border-solid border-sub-color2 py-10"
      >
        <Controller
          name="images"
          control={control}
          defaultValue={classData?.temporaryLectureImage || []}
          rules={{
            required: '이미지',
          }}
          render={({ field }) => (
            <UploadImage
              onChange={field.onChange}
              defaultImg={field.value}
              errors={errors.images}
            />
          )}
        />
      </section>

      <Controller
        name="title"
        control={control}
        rules={{ required: '클래스명' }}
        defaultValue={classData?.title || ''}
        render={({ field }) => (
          <input
            {...field}
            id="title"
            placeholder="클래스명"
            className={`mb-6 h-10 border-b border-solid border-sub-color1 pb-2 text-2xl font-bold outline-0 ${
              errors.title && 'animate-vibration placeholder:text-main-color'
            }`}
          />
        )}
      />

      <section className="flex">
        <h2
          id="genres"
          className={`w-1/6 font-bold ${
            errors.genres && 'animate-vibration text-main-color'
          }`}
        >
          장르
        </h2>
        <div className="w-5/6">
          <Controller
            name="genres"
            control={control}
            defaultValue={classData?.temporaryLectureToDanceGenre}
            rules={{
              required: '장르',
            }}
            render={({ field }) => (
              <GenreCheckboxGroup
                onChange={field.onChange}
                defaultValue={field.value}
              />
            )}
          />
        </div>
      </section>

      <CategoryContainer id="lessonType" title="인원">
        <Controller
          name="lessonType"
          control={control}
          defaultValue={classData?.lessonType}
          render={({ field }) => (
            <RadioComponent
              message="인원"
              title="lessonType"
              checkList={CATEGORY_LESSON_TYPE}
              select={field.value}
            />
          )}
        />

        <ClassSizeSelect
          defaultValue={{
            min: classData?.min ?? 1,
            max: classData?.max ?? 100,
          }}
        />
      </CategoryContainer>

      <CategoryContainer id="lectureMethod" title="진행방식">
        <Controller
          name="lectureMethod"
          control={control}
          defaultValue={classData?.lectureMethod}
          render={({ field }) => (
            <RadioComponent
              message="진행방식"
              title="lectureMethod"
              checkList={CATEGORY_PROGRESS_METHOD}
              select={field.value}
            />
          )}
        />
      </CategoryContainer>

      <CategoryContainer id="difficultyLevel" title="난이도">
        <Controller
          name="difficultyLevel"
          control={control}
          defaultValue={classData?.difficultyLevel}
          render={({ field }) => (
            <RadioComponent
              message="난이도"
              title="difficultyLevel"
              checkList={CATEGORY_DIFFICULTY_LEVEL}
              select={field.value}
            />
          )}
        />
      </CategoryContainer>
    </>
  );
};

export default ClassCategory;
