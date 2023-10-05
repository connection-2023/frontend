import UploadImage from '@/components/UploadImage/UploadImage';
import GenreCheckboxGroup from '@/components/GenreCheckboxGroup/GenreCheckboxGroup';

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

      <div className="flex w-full">
        <div className="w-[5.6rem]">전체</div>
        <div className="flex-grow">xptmxm</div>
      </div>

      <div className="flex w-full">
        <div className="w-[5.6rem]">장르</div>
        <div className="flex-grow">xptmxm</div>
      </div>
    </>
  );
};

export default ClassCategory;
