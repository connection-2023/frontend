import UploadImage from '@/components/UploadImage/UploadImage';
import GenreCheckboxGroup from '@/components/GenreCheckboxGroup/GenreCheckboxGroup';
import LessonTypeSelect from './ClassCategory/LessonTypeSelect';

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
        <h2 className="min-w-[5.269rem] pt-1.5 text-lg font-bold">인원</h2>
        <LessonTypeSelect />
      </div>

      <div className="mb-96 flex w-full">
        <div className="w-[5.269rem]">장르</div>
        <div className="flex-grow">xptmxm</div>
      </div>
    </>
  );
};

export default ClassCategory;
