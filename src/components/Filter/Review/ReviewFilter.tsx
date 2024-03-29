import { Rating } from '@/components/Review';

interface ReviewFilter {
  rate: number;
  // eslint-disable-next-line no-unused-vars
  handleRate: (value: number) => void;
}

const ReviewFilter = ({ rate, handleRate }: ReviewFilter) => {
  return (
    <>
      <div className="p-4">
        <Rating rate={rate} handleRate={handleRate} bigStar={true} />
      </div>
      <div className="px-4 text-sm sm:hidden">
        드래그해서 별점을 설정해주세요
      </div>
    </>
  );
};

export default ReviewFilter;
