'use client';
import dynamic from 'next/dynamic';
import { formatKoreanFullDate } from '@/utils/dateTimeUtils';
import Modal from '@/components/Modal/Modal';
import { IFullCalendarEvent } from '@/types/types';

const EventList = dynamic(() => import('./EventList'), {
  ssr: false,
});
interface ScheduleEventModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  selectedDate: Date;
  selectedEvent: IFullCalendarEvent[];
}

const ScheduleEventModal = ({
  modalIsOpen,
  closeModal,
  selectedDate,
  selectedEvent,
}: ScheduleEventModalProps) => (
  <Modal isOpened={modalIsOpen} handleClosed={closeModal}>
    <div className="flex h-80 w-[26rem] flex-col rounded-md bg-white px-4 py-[1.19rem] shadow-float">
      <h2 className="mb-3 flex w-full items-center justify-center border-b border-solid border-gray-700 bg-white pb-2.5">
        {formatKoreanFullDate(selectedDate)}
      </h2>

      <ul className="flex w-full flex-col gap-3 overflow-y-auto">
        {selectedEvent.map((event) => (
          <EventList key={event.id} event={event} />
        ))}
      </ul>
    </div>
  </Modal>
);

export default ScheduleEventModal;
