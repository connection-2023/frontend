import { useState, useEffect } from 'react';
import ClassTableList from './ClassTableList';
import EnrollmentModal from './EnrollmentModal';
import {
  filterSchedulesByDate,
  findFirstFutureScheduleIndex,
  processedScheduleData,
} from '../_utils/formatSchedule';
import { IRegularClassSchedule } from '@/types/class';
import { getRegularScheduleTime } from '@/utils/scheduleDateUtils';

const TableCellStyle = 'border border-solid border-gray-700 py-2';

interface ClassTableProps {
  regularSchedules: IRegularClassSchedule[];
  duration: number;
  maxCapacity: number;
  // eslint-disable-next-line no-unused-vars
  handleSelectClassId: (label: string, id: number) => void;
}

const RegularClassTable = (props: ClassTableProps) => {
  const { regularSchedules, duration, maxCapacity, handleSelectClassId } =
    props;
  const [selectedTime, setSelectedTime] = useState(0);
  const [showPastClasses, setShowPastClasses] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalClass = processedScheduleData(
    regularSchedules[selectedTime].regularLectureSchedule,
  );

  const regularSchedulesList = regularSchedules.map(
    ({ day, dateTime }) =>
      `${day.join(',')} ${dateTime}-${getRegularScheduleTime(
        dateTime,
        duration,
      )}`,
  );

  useEffect(() => {
    const scheduleId =
      regularSchedules[selectedTime].regularLectureSchedule[0].id;
    handleSelectClassId(regularSchedulesList[selectedTime], scheduleId);
  }, [selectedTime]);

  const tableSchedules = filterSchedulesByDate(showPastClasses, totalClass);
  const upcomingClassIndex = findFirstFutureScheduleIndex(totalClass);

  const handleTimeListClick = (index: number) => {
    setSelectedTime(index);
  };

  return (
    <>
      <ul className="flex flex-wrap gap-x-4">
        {regularSchedulesList.map((list, index) => (
          <li
            key={index}
            onClick={() => handleTimeListClick(index)}
            className={`
                cursor-pointer rounded-md border border-solid border-sub-color1 px-2 py-1 ${
                  selectedTime === index
                    ? 'bg-sub-color1 font-bold text-white'
                    : 'bg-white text-sub-color1 hover:bg-sub-color1-transparent active:bg-sub-color1 active:text-white'
                }`}
          >
            {list}
          </li>
        ))}
      </ul>

      <div className="flex w-full items-center justify-between">
        <label className="my-3 flex items-center gap-1.5 text-sm font-semibold text-gray-100">
          <input
            type="checkbox"
            checked={showPastClasses}
            onChange={() => setShowPastClasses(!showPastClasses)}
            className="h-[18px] w-[18px] accent-sub-color1"
          />
          지난 클래스도 함께 보기
        </label>

        <p className="text-sm font-medium">
          신청한 수강생
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="ml-1 text-base font-bold underline"
          >{`${regularSchedules[selectedTime].numberOfParticipants}/${maxCapacity}명`}</button>
        </p>
      </div>

      <div className="max-h-96 w-full border-collapse overflow-y-auto">
        <table className={`w-full border-collapse ${TableCellStyle} text-base`}>
          <thead>
            <tr className="break-keep font-bold text-gray-100">
              <th className={`${TableCellStyle}`}>클래스</th>
              <th className={`${TableCellStyle}`}>날짜 및 시간</th>
            </tr>
          </thead>
          <tbody>
            {tableSchedules?.map((item, idx) => (
              <ClassTableList
                key={idx}
                {...item}
                isPastClass={item.isPastClass}
                isFirstClass={
                  showPastClasses ? idx === upcomingClassIndex : idx === 0
                }
              />
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EnrollmentModal
          isOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
          }}
          selectedRegularClass={regularSchedules[selectedTime]}
          maxCapacity={maxCapacity}
          duration={duration}
        />
      )}
    </>
  );
};

export default RegularClassTable;
