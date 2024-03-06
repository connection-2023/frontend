'use client';
import { useState, useRef, useEffect, MouseEvent } from 'react';
import { useClickAway } from 'react-use';
import { CalendarSVG } from '@/icons/svg';
import { getClassSchedules } from '@/lib/apis/classApis';
import { getDatesFromSchedules } from '@/utils/scheduleDateUtils';
import BasicCalendar from '../Calendar/BasicCalendar';

const ClassDates = ({ id }: { id: string | number }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    const getSchedules = async () => {
      if (showCalendar) {
        const data = await getClassSchedules(id);
        const { schedules, regularLectureStatus } = data;
        const selectedDatesFromSchedule = getDatesFromSchedules(
          schedules || regularLectureStatus,
        );

        setSelectedDates(selectedDatesFromSchedule);
      }
    };

    getSchedules();
  }, [id, showCalendar]);

  useClickAway(calendarRef, () => {
    setShowCalendar(false);
  });

  const handleCalendarView = (event: MouseEvent) => {
    event.stopPropagation();
    setShowCalendar((prev) => !prev);
  };

  return (
    <div ref={calendarRef}>
      <CalendarSVG
        onClick={handleCalendarView}
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
