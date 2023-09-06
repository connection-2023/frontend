import { StarSVG } from '../../../public/icons/svg';

interface ReviewProps {
  average: number;
  count?: number;
}

export const calculateStarArray = (average: number) =>
  Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(average)) return 1;
    if (i === Math.floor(average)) return +(average % 1).toFixed(2);
    return 0;
  });

const Review = ({ average, count }: ReviewProps) => {
  const starArray = calculateStarArray(average);
  return (
    <div className="flex items-center">
      <div className="flex gap-1">
        {starArray.map((star, i) =>
          star === 1 ? (
            <StarSVG key={i} className="fill-sub-color1" />
          ) : star > 0 ? (
            <div className="relative h-5 w-5 overflow-hidden">
              <StarSVG className="absolute fill-[#D8D8D8]" />
              <div
                className="absolute overflow-hidden"
                style={{
                  width: `${star * 100}%`,
                }}
              >
                <StarSVG key={i} className="fill-sub-color1" />
              </div>
            </div>
          ) : (
            <StarSVG key={i} className="fill-[#D8D8D8]" />
          ),
        )}
      </div>
      {count && (
        <span className="ml-[9px] text-sm text-inherit">후기 {count}</span>
      )}
    </div>
  );
};

export default Review;
