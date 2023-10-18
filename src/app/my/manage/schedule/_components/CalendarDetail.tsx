import { useClickAway } from 'react-use';
import { CloseSVG, CalendarDetailSVG } from '@/../public/icons/svg';
import { IFullCalendarEvent } from '@/types/types';
import { useRef } from 'react';

interface CalendarDetailProps {
  events: IFullCalendarEvent[];
  selectedDate: string;
  closeModal: () => void;
}

const CalendarDetail = ({
  events,
  selectedDate,
  closeModal,
}: CalendarDetailProps) => {
  const modalRef = useRef(null);

  useClickAway(modalRef, () => {
    closeModal();
  });

  return (
    <div
      ref={modalRef}
      className="absolute left-1/4 top-20 z-10 flex h-[20.3125rem] w-[26rem] flex-col overflow-y-auto rounded-[0.3125rem]  bg-white px-4 py-[1.19rem] shadow-[0px_2px_5px_1px_rgba(0,0,0,0.25)]"
    >
      <h1 className="mb-3 flex w-full items-center justify-center border-b border-solid border-sub-color4 bg-white pb-[0.69rem]">
        {selectedDate}
      </h1>

      <CloseSVG
        width={18}
        height={18}
        onClick={closeModal}
        className="absolute right-4 top-5 cursor-pointer stroke-sub-color2 stroke-2"
      />

      <ul className="flex w-full flex-col gap-3">
        {events.map((event) => (
          <EventList key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
};

export default CalendarDetail;

const getEventColor = (id: number) => {
  const colors = ['#8338EC', '#FF3E9A', '#FF961B'];
  return colors[id % colors.length];
};

const EventList = ({ event }: { event: IFullCalendarEvent }) => {
  const color = getEventColor(event.id);
  const transparency = '2A';
  // SVG 누르면 해당 글로 이동 구현 예정
  return (
    <li
      className="flex h-[2.8125rem] items-center justify-between rounded-[0.19rem]  px-[0.62rem] py-[0.41rem] text-sm text-white"
      style={{
        background: color + transparency,
      }}
    >
      <span className="w-full max-w-[20rem]" style={{ color: color }}>
        09:00-10:00 (2/6) <br /> 리아킴과 함께하는 댄스클래스
        {/* {event.title} */}
      </span>

      <CalendarDetailSVG fill={color} />
    </li>
  );
};
