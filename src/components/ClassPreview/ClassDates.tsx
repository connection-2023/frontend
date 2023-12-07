'use client';
import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import { CalendarSVG } from '@/icons/svg';
import BasicCalendar from '../Calendar/BasicCalendar';

const ClassDates = ({ selectedDates }: { selectedDates: Date[] }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useClickAway(calendarRef, () => {
    setShowCalendar(false);
  });

  return (
    <div ref={calendarRef}>
      <CalendarSVG
        onClick={() => setShowCalendar((prev) => !prev)}
        width="1.875rem"
        className={`ml-2 mr-1.5 cursor-pointer ${
          showCalendar ? 'fill-main-color' : 'fill-gray-500'
        } hover:fill-main-color`}
      />

      {showCalendar && (
        <div className="absolute z-10 overflow-hidden rounded-lg bg-white p-3.5 shadow-horizontal">
          <BasicCalendar mode="preview" selectableDates={selectedDates} />
        </div>
      )}
    </div>
  );
};

export default ClassDates;
