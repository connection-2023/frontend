'use client';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Calendar, View, Views } from 'react-big-calendar';
import {
  localizer,
  formats,
  eventStyleGetter,
  messages,
} from '@/utils/fullCalendarUtils';
import ToolBar from './ToolBar';
import { IMonthlyClassSchedules } from '@/types/class';
import { IFullCalendarEvent } from '@/types/types';
import '@/styles/fullCalendar.css';

interface FullCalendarProps {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  handleDateChange: (newDate: Date) => void;
  scheduleData: IMonthlyClassSchedules[] | undefined;
}

const FullCalendar = ({
  date,
  handleDateChange,
  scheduleData,
}: FullCalendarProps) => {
  const [view, setView] = useState<View>(Views.MONTH);
  const router = useRouter();

  const eventLists = useMemo(() => {
    if (!scheduleData) return [];
    return scheduleData.map((data) => ({
      id: data.id,
      title: data.lecture.title,
      lectureId: data.lectureId,
      start: new Date(data.startDateTime),
      end: new Date(data.endDateTime),
      numberOfParticipants: data.numberOfParticipants,
      maxCapacity: data.lecture.maxCapacity,
      isGroup: data.lecture.isGroup,
    }));
  }, [scheduleData]);

  const onNavigate = (newDate: Date) => handleDateChange(newDate);

  const onView = (newView: View) => {
    setView(newView);
  };

  const handleSelectSlotEvent = (slotInfo: IFullCalendarEvent) => {
    router.push(`/mypage/user/myclass/apply/${slotInfo.id}`);
  };

  return (
    <Calendar
      localizer={localizer}
      formats={formats}
      events={eventLists}
      onSelectEvent={handleSelectSlotEvent}
      selectable={true}
      views={['month', 'week', 'day']}
      defaultView={Views.MONTH}
      date={date}
      view={view}
      onView={onView}
      onNavigate={onNavigate}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      drilldownView={null}
      showMultiDayTimes
      popup
      eventPropGetter={eventStyleGetter}
      components={{
        toolbar: ToolBar,
      }}
      style={{ minHeight: '375px', minWidth: '425px', height: 637 }}
      className="relative mb-3.5 mt-6 w-full"
    />
  );
};

export default FullCalendar;
