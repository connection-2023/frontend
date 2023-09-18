'use client';
import { useState } from 'react';
import BasicCalendar from '../Calendar/BasicCalendar';
import { CalendarSVG } from '../../../public/icons/svg';

const Date = ({ selectedDates }: { selectedDates: Date[] }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="relative ">
      <CalendarSVG
        width="1.875rem"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="ml-2 mr-1.5 cursor-pointer fill-[#B6B6B6] hover:fill-main-color "
      />
      {isHovered && (
        <div className="absolute z-10 bg-white ">
          <BasicCalendar mode="preview" selectedDates={selectedDates} />
        </div>
      )}
    </div>
  );
};

export default Date;
