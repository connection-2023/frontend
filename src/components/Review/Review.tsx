import { nanoid } from 'nanoid';
import { StarSVG } from '@/../public/icons/svg';

interface ReviewProps {
  average: number;
  count?: number;
  size?: 'regular' | 'small';
}

const Review = ({ average, count, size = 'regular' }: ReviewProps) => {
  const starArray = calculateStarArray(average);
  const key = nanoid();
  const sizeStyles = {
    small: 'w-[11px] h-[10px]',
    regular: 'w-[15px] h-[14px]',
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-0.5">
        {starArray.map((star, i) =>
          star === 1 ? (
            <Star key={key + i} fill="sub-color1" size={size} />
          ) : star > 0 ? (
            <div
              key={key + i}
              className={`relative ${sizeStyles[size]} overflow-hidden`}
            >
              <Star fill="gray-700" className="absolute" size={size} />
              <div
                className="absolute overflow-hidden"
                style={{
                  width: `${star * (size === 'small' ? 11 : 15)}px`,
                }}
              >
                <Star fill="sub-color1" size={size} />
              </div>
            </div>
          ) : (
            <Star key={key + i} fill="gray-700" size={size} />
          ),
        )}
      </div>
      {count === undefined ? null : (
        <span className="ml-2 text-sm text-inherit">리뷰 {count}</span>
      )}
    </div>
  );
};

export default Review;

const Star = ({
  fill,
  className = '',
  size = 'regular',
}: {
  fill: string;
  className?: string;
  size: 'regular' | 'small';
}) => (
  <StarSVG
    width={size === 'small' ? 11 : 15}
    height={size === 'small' ? 10 : 14}
    className={`fill-${fill} ${className}`}
  />
);

export const calculateStarArray = (average: number) =>
  Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(average)) return 1;
    if (i === Math.floor(average)) return +(average % 1).toFixed(2);
    return 0;
  });
