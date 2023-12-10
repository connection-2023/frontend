'use client';
import ClassSelect from './ClassSelect';
import Button from '@/components/Button/Button';
import Rating from '@/components/Review/Rating';
import TextAreaSection from '@/components/TextArea/TextAreaSection';
import { SelectClassType } from '@/types/review';

interface WriteReview {
  options: SelectClassType[];
}

const WriteReview = ({ options }: WriteReview) => {
  return (
    <section className="flex flex-col gap-7 px-7 py-6">
      <div className="flex flex-col">
        <label className="flex font-semibold" aria-required="true">
          클래스 선택
          <span className="align-top text-sub-color1">*</span>
        </label>
        <ClassSelect options={options} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex font-semibold" aria-required="true">
          클래스 만족도
          <span className="align-top text-sub-color1">*</span>
        </label>
        <Rating
          rate={0}
          bigStar={true}
          viewRate={false}
          viewSelectRate={true}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex font-semibold" aria-required="true">
          수강후기
          <span className="align-top text-sub-color1">*</span>
        </label>
        <textarea className="h-44 resize-none rounded-md border border-gray-500 p-3 focus:outline-sub-color1" />
      </div>

      <div className="ml-auto w-24">
        <Button>
          <p className="px-2">리뷰등록</p>
        </Button>
      </div>
    </section>
  );
};

export default WriteReview;
