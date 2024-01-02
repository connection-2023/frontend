'use client';
import 'moment/locale/ko';
import { isSameDay, setHours, setMinutes, parseISO } from 'date-fns';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Calendar, Views, SlotInfo } from 'react-big-calendar';
import ResponsiveScheduleView from '@/app/dashboard/_components/ResponsiveScheduleView';
import ScheduleEventModal from '@/app/dashboard/_components/ScheduleEventModal';
import { dashboardStore } from '@/store';
import {
  localizer,
  formats,
  eventStyleGetter,
  messages,
} from '@/utils/fullCalendarUtils';
import DayToolBar from './DayToolBar';
import { IMonthlyClassSchedules } from '@/types/class';
import { IFullCalendarEvent } from '@/types/types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@/styles/fullCalendar.css';

const DayCalendar = ({
  scheduleData,
}: {
  scheduleData: IMonthlyClassSchedules[];
}) => {
  const [date, setDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IFullCalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const store = dashboardStore();

  const eventLists = useMemo(() => {
    if (!scheduleData) return [];
    return scheduleData.map((data) => ({
      id: data.id,
      title: data.lecture.title,
      lectureId: data.lectureId,
      start: parseISO(data.startDateTime),
      end: parseISO(data.endDateTime),
      numberOfParticipants: data.numberOfParticipants,
      maxCapacity: data.lecture.maxCapacity,
      isGroup: data.lecture.isGroup,
    }));
  }, [scheduleData]);

  const selectedEvents = useMemo(() => {
    if (!scheduleData) return [];
    return scheduleData.filter((event) =>
      isSameDay(date, parseISO(event.startDateTime)),
    );
  }, [scheduleData, date]);

  useEffect(() => {
    const storeSelectedDate = store.selectedDate;
    if (
      storeSelectedDate &&
      (!selectedDate || !isSameDay(selectedDate, storeSelectedDate))
    ) {
      setDate(storeSelectedDate);
    }
  }, [store.selectedDate]);

  const onNavigate = useCallback(
    (newDate: Date) => {
      setDate(newDate);
      store.setSelectedDate(newDate);
    },
    [setDate],
  );

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSelect = (slotInfo: IFullCalendarEvent | SlotInfo) => {
    setSelectedDate(slotInfo.start);
    const eventsOnSelectedDate = eventLists.filter((event) =>
      isSameDay(slotInfo.start, event.start),
    );

    setSelectedEvent(eventsOnSelectedDate);
    setModalIsOpen(true);
  };

  return (
    <div className="relative box-border h-[39.25rem] h-fit rounded-lg bg-white p-3.5 shadow-float md:p-4 md:shadow-none">
      <div className="h-full">
        <Calendar
          localizer={localizer}
          formats={formats}
          events={eventLists}
          onSelectSlot={handleSelect}
          onSelectEvent={handleSelect}
          selectable={true}
          defaultView={Views.DAY}
          date={date}
          onNavigate={onNavigate}
          messages={messages}
          min={setHours(setMinutes(new Date(), 0), 8)}
          drilldownView={null}
          showMultiDayTimes
          popup
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: DayToolBar,
          }}
        />
      </div>
      {modalIsOpen && selectedEvent && selectedDate && (
        <ScheduleEventModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          selectedEvent={selectedEvent}
          selectedDate={selectedDate}
        />
      )}

      <div className="mt-2 min-h-[4rem] overflow-y-auto xl:hidden">
        <ResponsiveScheduleView selectedEvent={selectedEvents} />
      </div>
    </div>
  );
};

export default DayCalendar;
