'use client';
import isSameDay from 'date-fns/isSameDay';
import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import { Calendar, View, Views, SlotInfo } from 'react-big-calendar';
import ToolBar from '@/utils/calendarUtils/BigCalendarToolBar';
import {
  localizer,
  formats,
  eventStyleGetter,
  messages,
} from '@/utils/fullCalendarUtils';
import { IMonthlyClassSchedules } from '@/types/class';
import { IFullCalendarEvent } from '@/types/types';
import '@/styles/fullCalendar.css';

const ScheduleEventModal = dynamic(
  () => import('@/app/dashboard/_components/ScheduleEventModal'),
  {
    ssr: false,
  },
);

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IFullCalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSelectSlotEvent = (slotInfo: SlotInfo | IFullCalendarEvent) => {
    setSelectedDate(slotInfo.start);
    const eventsOnSelectedDate = eventLists.filter((event) =>
      isSameDay(slotInfo.start, event.start),
    );
    setSelectedEvent(eventsOnSelectedDate);
    setModalIsOpen(true);
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        formats={formats}
        events={eventLists}
        onSelectSlot={handleSelectSlotEvent}
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
        className="relative mx-auto mb-3.5 mt-6 w-full pr-8"
      />

      {modalIsOpen && selectedEvent && selectedDate && (
        <ScheduleEventModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
        />
      )}
    </>
  );
};

export default FullCalendar;
