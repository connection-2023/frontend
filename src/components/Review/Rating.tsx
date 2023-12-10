'use client';
import { useState, useEffect } from 'react';
import { StarSVG } from '@/icons/svg';

interface ReadonlyProps {
  rate: number;
  readonly: true;
  reviewCount?: number;
  viewRate?: boolean;
}

interface EditableProps {
  rate: number;
  handleRate: (value: number) => void;
  reviewCount?: number;
  readonly?: false;
  viewRate?: boolean;
}

const Rating = (props: ReadonlyProps | EditableProps) => {
  const {
    rate,
    readonly = false,
    viewRate = true,
    reviewCount = false,
  } = props;
  const handleRate = 'handleRate' in props ? props.handleRate : undefined;

  const [selectedStar, setSelectedStar] = useState(rate);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleClick = (index: number) => {
    if (selectedStar === index) {
      setSelectedStar(0);
      if (handleRate) {
        handleRate(0);
      }
    } else {
      setSelectedStar(index);
      if (handleRate) {
        handleRate(index);
      }
    }
  };

  useEffect(() => {
    setSelectedStar(rate);
  }, [rate]);

  const handleMouseEnter = (index: number) => {
    setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  return (
    <div className="flex items-center px-[0.94rem] py-[1.12rem]">
      <div className="flex items-center">
        <div className="flex gap-1.5">
          {[...Array(5)].map((_, index) => (
            <StarSVG
              key={index}
              width={18}
              height={17}
              onClick={readonly ? undefined : () => handleClick(index + 1)}
              onMouseEnter={
                readonly ? undefined : () => handleMouseEnter(index + 1)
              }
              onMouseLeave={readonly ? undefined : handleMouseLeave}
              className={`${
                Math.max(selectedStar, hoveredStar) >= index + 1
                  ? 'fill-sub-color1'
                  : 'fill-gray-700'
              } ${!readonly && 'cursor-pointer'}`}
            />
          ))}
        </div>
      </div>
      {viewRate && (
        <span className="ml-[0.94rem] h-5 w-6 text-sm font-bold">
          {selectedStar > 0 ? selectedStar + '.0' : null}
        </span>
      )}
      {reviewCount && (
        <span className="ml-[0.94rem] text-lg font-semibold">
          {reviewCount}개의 리뷰
        </span>
      )}
    </div>
  );
};

export default Rating;
