import { useState } from 'react';
import ClassTableList from './ClassTableList';
import EnrollmentModal from './EnrollmentModal';
import {
  filterSchedulesByDate,
  findFirstFutureScheduleIndex,
} from '../_utils/formatSchedule';
import { IProcessedSchedules } from '@/types/class';

const TableCellStyle = 'border border-solid border-gray-700 py-2';
interface ClassTableProps {
  schedules: IProcessedSchedules[];
  maxCapacity: number;
  reservationDeadline: number;
  // eslint-disable-next-line no-unused-vars
  handleSelectClassId: (label: string, id: number) => void;
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

  const tableSchedules = filterSchedulesByDate(showPastClasses, schedules);
  const upcomingClassIndex = findFirstFutureScheduleIndex(schedules);

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
      <div className="max-h-96 w-full border-collapse overflow-y-auto">
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
            {tableSchedules.map((item, idx) => (
              <ClassTableList
                key={idx}
                {...item}
                reservationDeadline={reservationDeadline}
                isPastClass={item.isPastClass}
                isFirstClass={
                  showPastClasses ? idx === upcomingClassIndex : idx === 0
                }
                maxCapacity={maxCapacity}
                handleSelectClassId={() =>
                  handleSelectClassId(`${item.index}회차`, item.id)
                }
                handleModal={() => openModal(item)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selectedItem && (
        <EnrollmentModal
          isOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
          }}
          selectedClass={selectedItem}
          maxCapacity={maxCapacity}
          reservationDeadline={reservationDeadline}
        />
      )}
    </>
  );
};

export default ClassTable;
