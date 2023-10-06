import UploadImage from '@/components/UploadImage/UploadImage';
import GenreCheckboxGroup from '@/components/GenreCheckboxGroup/GenreCheckboxGroup';
import LessonTypeSelect from './ClassCategory/LessonTypeSelect';
import RadioComponent from './ClassCategory/RadioComponent';
import {
  CATEGORY_DIFFICULTY_LEVEL,
  CATEGORY_PROGRESS_METHOD,
} from '@/constants/constants';

const ClassCategory = () => {
  return (
    <>
      <section className="mb-5 border-b border-solid border-sub-color2 py-10">
        <UploadImage />
      </section>

      <input
        placeholder="클래스명"
        className="mb-6 h-10 border-b border-solid border-sub-color1 pb-2 text-2xl font-bold outline-0"
      />

      <GenreCheckboxGroup />

      <div className="mt-5 flex w-full">
        <h2 className="w-1/6 pt-1 text-lg font-bold">인원</h2>
        <LessonTypeSelect />
      </div>

      <div className="mt-5 flex w-full">
        <h2 className="w-1/6 pt-1 text-lg font-bold">진행방식</h2>
        <ul className="flex gap-4">
          <RadioComponent
            title="진행방식"
            checkList={CATEGORY_PROGRESS_METHOD}
          />
        </ul>
      </div>

      <div className="mt-5 flex w-full">
        <h2 className="w-1/6 pt-1.5 text-lg font-bold">난이도</h2>
        <ul className="flex gap-4">
          <RadioComponent
            title="난이도"
            checkList={CATEGORY_DIFFICULTY_LEVEL}
          />
        </ul>
      </div>
    </>
  );
};

export default ClassCategory;
