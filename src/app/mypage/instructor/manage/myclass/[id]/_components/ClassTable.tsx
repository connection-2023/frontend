import { isFuture, subHours } from 'date-fns';
import { useState, MouseEvent } from 'react';
import {
  formatShortDate,
  formatTimeNoSec,
  formatDateTimeNoSec,
} from '@/utils/dateTimeUtils';
import EnrollmentModal from './EnrollmentModal';
import { IClassSchedule, IProcessedSchedules } from '@/types/class';

const TableCellStyle = 'border border-solid border-gray-700 py-2';
interface ClassTableProps {
  schedules: IProcessedSchedules[];
  maxCapacity: number;
  reservationDeadline: number;
  // eslint-disable-next-line no-unused-vars
  handleSelectClassId: (index: number, id: number) => void;
}

const ClassTable = ({
  schedules,
  maxCapacity,
  reservationDeadline,
  handleSelectClassId,
}: ClassTableProps) => {
  const [showPastClasses, setShowPastClasses] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProcessedSchedules | null>(
    null,
  );

  if (!schedules) return null;

  const openModal = (item: IProcessedSchedules) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredTableData = showPastClasses
    ? schedules
    : schedules.filter((item) => isFuture(item.date));

  const firstFutureClassIndex = schedules.findIndex((item) =>
    isFuture(item.date),
  );

  return (
    <>
      <label className="mb-3.5 flex items-center gap-[0.38rem] text-sm font-semibold text-gray-100">
        <input
          type="checkbox"
          checked={showPastClasses}
          onChange={() => setShowPastClasses(!showPastClasses)}
          className="h-[18px] w-[18px] accent-sub-color1"
        />
        지난 클래스도 함께 보기
      </label>
      <table className={`w-full border-collapse ${TableCellStyle} text-base`}>
        <thead>
          <tr className="break-keep font-bold text-gray-100">
            <th className={`${TableCellStyle}`}>클래스</th>
            <th className={`${TableCellStyle}`}>날짜 및 시간</th>
            <th className={`${TableCellStyle}`}>신청한 수강생</th>
            <th className={`${TableCellStyle}`}>예약 마감일</th>
          </tr>
        </thead>
        <tbody>
          {filteredTableData.map((item, idx) => (
            <TableList
              key={idx}
              {...item}
              reservationDeadline={reservationDeadline}
              isPastClass={item.isPastClass}
              isFirstClass={
                showPastClasses ? idx === firstFutureClassIndex : idx === 0
              }
              maxCapacity={maxCapacity}
              handleSelectClassId={() =>
                handleSelectClassId(item.index, item.id)
              }
              handleModal={() => openModal(item)}
            />
          ))}
        </tbody>
      </table>
      <EnrollmentModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        selectedClass={selectedItem}
        maxCapacity={maxCapacity}
        reservationDeadline={reservationDeadline}
      />
    </>
  );
};

export default ClassTable;

const formatDateTime = (startDateTime: string, endDateTime: string) => {
  const startDate =
    formatShortDate(startDateTime) + ' ' + formatTimeNoSec(startDateTime);
  const endDate = formatTimeNoSec(endDateTime);

  return `${startDate}-${endDate}`;
};

interface TableListProps extends IClassSchedule {
  index: number;
  maxCapacity: number;
  reservationDeadline: number;
  isPastClass: boolean;
  isFirstClass: boolean;
  handleModal: () => void;
  handleSelectClassId: () => void;
}

const TableList = ({
  index,
  endDateTime,
  startDateTime,
  numberOfParticipants,
  isPastClass,
  isFirstClass,
  maxCapacity,
  reservationDeadline,
  handleModal,
  handleSelectClassId,
}: TableListProps) => {
  const dateTime = formatDateTime(startDateTime, endDateTime).split(' ');
  const deadlineTime = subHours(new Date(startDateTime), reservationDeadline);
  const textColor = isFirstClass
    ? 'text-sub-color1'
    : isPastClass
    ? 'text-gray-500'
    : 'text-black';
  const textBold = isPastClass ? '' : 'font-bold';

  const handleModalOpened = (e: MouseEvent) => {
    e.stopPropagation();
    handleModal();
  };

  return (
    <tr
      onClick={() => handleSelectClassId()}
      className={`${textColor} cursor-default font-normal`}
    >
      <th className={`${TableCellStyle} ${textBold}`}>{index}회차</th>
      <th className={`${TableCellStyle} break-keep font-normal`}>
        <p className="flex w-full flex-wrap justify-center gap-1">
          <span>{dateTime[0]}</span>
          <span>{dateTime[1]}</span>
        </p>
      </th>
      <th
        onClick={handleModalOpened}
        className={`cursor-pointer ${TableCellStyle} font-normal underline`}
      >
        {numberOfParticipants}/{maxCapacity}명
      </th>
      <th className={`${TableCellStyle} font-normal`}>
        {formatDateTimeNoSec(deadlineTime)}
      </th>
    </tr>
  );
};
