'use client';
import { useState } from 'react';
import { CalendarSVG } from '@/icons/svg';
import BasicCalendar from '../Calendar/BasicCalendar';

const ClassDates = ({ selectedDates }: { selectedDates: Date[] }) => {
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
        className="ml-2 mr-1.5 cursor-pointer fill-gray-500 hover:fill-main-color "
      />
      {isHovered && (
        <div className="absolute z-10 bg-white ">
          <BasicCalendar mode="preview" selectedDates={selectedDates} />
        </div>
      )}
    </div>
  );
};

export default ClassDates;
