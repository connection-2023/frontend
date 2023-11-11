'use client';
import { useState, useEffect } from 'react';
import { StarSVG } from '@/icons/svg';

interface IRatingProps {
  rate: number;
  handleRate: (value: number) => void;
}

const Rating = ({ rate, handleRate }: IRatingProps) => {
  const [selectedStar, setSelectedStar] = useState(rate);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleClick = (index: number) => {
    if (selectedStar === index) {
      setSelectedStar(0);
      handleRate(0);
    } else {
      setSelectedStar(index);
      handleRate(index);
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
    <div className="flex px-[0.94rem] py-[1.12rem]">
      <div className="flex items-center">
        <div className="flex gap-1.5">
          {[...Array(5)].map((_, index) => (
            <StarSVG
              key={index}
              width={18}
              height={17}
              onClick={() => handleClick(index + 1)}
              onMouseEnter={() => handleMouseEnter(index + 1)}
              onMouseLeave={handleMouseLeave}
              className={`${
                Math.max(selectedStar, hoveredStar) >= index + 1
                  ? 'fill-sub-color1'
                  : 'fill-gray-700'
              } cursor-pointer`}
            />
          ))}
        </div>
      </div>
      <span className="ml-[0.94rem] h-5 w-6 text-sm font-bold">
        {selectedStar > 0 ? selectedStar + '.0' : null}
      </span>
    </div>
  );
};

export default Rating;
