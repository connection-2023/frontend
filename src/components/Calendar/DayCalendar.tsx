'use client';
import 'moment/locale/ko';
import { isSameDay, setHours, setMinutes } from 'date-fns';
import format from 'date-fns/format';
import koLocale from 'date-fns/locale/ko';
import { useState, useCallback, useEffect } from 'react';
import {
  Calendar,
  View,
  Views,
  SlotInfo,
  ToolbarProps,
} from 'react-big-calendar';
import ResponsiveScheduleView from '@/app/dashboard/_components/ResponsiveScheduleView';
import CalendarDetail from '@/app/my/manage/schedule/_components/CalendarDetail';
import eventList from '@/app/my/manage/schedule/_components/Event';
import { ArrowRightSVG } from '@/icons/svg';
import { dashboardStore } from '@/store';
import {
  localizer,
  formats,
  eventStyleGetter,
  messages,
} from '@/utils/fullCalendarUtils';
import { IFullCalendarEvent } from '@/types/types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@/styles/fullCalendar.css';

const DayCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IFullCalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const store = dashboardStore();

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

  const handleSelect = (eventOrSlotInfo: IFullCalendarEvent | SlotInfo) => {
    const date =
      (eventOrSlotInfo as IFullCalendarEvent).id !== undefined
        ? eventOrSlotInfo.start
        : eventOrSlotInfo.start;

    setSelectedDate(date);

    const eventsOnSelectedDate = eventList.filter((event) =>
      isSameDay(date, event.start),
    );

    setSelectedEvent(eventsOnSelectedDate);
    setModalIsOpen(true);
  };

  return (
    <div className="relative box-border h-[39.25rem] h-fit w-full rounded-[0.31rem] bg-white p-4 shadow-float lg:h-auto">
      <Calendar
        localizer={localizer}
        formats={formats}
        events={eventList}
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

      {modalIsOpen && selectedEvent && selectedDate && (
        <CalendarDetail
          closeModal={closeModal}
          events={selectedEvent}
          selectedDate={format(selectedDate, 'yyyy년 MM월 dd일 eeee', {
            locale: koLocale,
          })}
        />
      )}

      <div className="lg:hidden">
        <ResponsiveScheduleView />
      </div>
    </div>
  );
};

export default DayCalendar;

interface IToolbarProps extends Partial<ToolbarProps> {
  label: string;
  view: View;
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY' | 'DATE') => void;
}

const DayToolBar = ({ label, onNavigate }: IToolbarProps) => (
  <div className="mb-[0.69rem] flex items-center justify-between gap-4 whitespace-nowrap">
    <h2 className="text-lg font-semibold text-sub-color3">{label}</h2>
    <div className="flex h-[1.875rem] w-32 divide-x divide-solid overflow-hidden rounded-[0.4rem] border border-solid border-sub-color2">
      <button
        onClick={() => onNavigate('PREV')}
        className={`h-7 origin-center rotate-180 ${NavButtonStyle}`}
      >
        <ArrowRightSVG className="h-[5px] w-[9px] stroke-black" />
      </button>
      <button
        onClick={() => onNavigate('TODAY')}
        className="flex-1 hover:bg-[#E8E8E8] "
      >
        Today
      </button>
      <button
        onClick={() => onNavigate('NEXT')}
        className={`h-7 ${NavButtonStyle}`}
      >
        <ArrowRightSVG className="h-[5px] w-[9px] stroke-black" />
      </button>
    </div>
  </div>
);

const NavButtonStyle =
  'flex w-[1.875rem] items-center justify-center hover:bg-[#E8E8E8]';
