import { nanoid } from 'nanoid';
import { StarSVG } from '@/../public/icons/svg';

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

const Star = ({
  fill,
  className = '',
}: {
  fill: string;
  className?: string;
}) => (
  <StarSVG width={15} height={14} className={`fill-${fill} ${className}`} />
);

const Review = ({ average, count }: ReviewProps) => {
  const starArray = calculateStarArray(average);
  const key = nanoid();
  return (
    <div className="flex items-center">
      <div className="flex gap-1">
        {starArray.map((star, i) =>
          star === 1 ? (
            <Star key={key + i} fill="sub-color1" />
          ) : star > 0 ? (
            <div
              key={key + i}
              className="relative h-[14px] w-[15px] overflow-hidden"
            >
              <Star fill="[#D8D8D8]" className="absolute" />
              <div
                className="absolute overflow-hidden"
                style={{
                  width: `${star * 15}px`,
                }}
              >
                <Star fill="sub-color1" />
              </div>
            </div>
          ) : (
            <Star key={key + i} fill="[#D8D8D8]" />
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
