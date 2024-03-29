import { subHours } from 'date-fns';
import { MouseEvent } from 'react';
import { IClassSchedule, IRegularSchedule } from '@/types/class';
import {
  formatShortDate,
  formatTimeNoSec,
  formatDateTimeNoSec,
} from '@/utils/dateTimeUtils';

const TableCellStyle = 'border border-solid border-gray-700 py-2';

interface ClassTableListBaseProps {
  index: number;
  isPastClass: boolean;
  isFirstClass: boolean;
  maxCapacity?: number;
  reservationDeadline?: number;
  numberOfParticipants?: number;
  handleModal?: () => void;
  handleSelectClassId?: () => void;
}

type ClassTableListProps = ClassTableListBaseProps &
  (IClassSchedule | IRegularSchedule);

const ClassTableList = (props: ClassTableListProps) => {
  const {
    index,
    endDateTime,
    startDateTime,
    isPastClass,
    isFirstClass,
    maxCapacity,
    reservationDeadline,
    numberOfParticipants,
    handleModal,
    handleSelectClassId,
  } = props;
  const dateTime = formatDateTime(startDateTime, endDateTime).split(' ');
  const deadlineTime =
    reservationDeadline &&
    subHours(new Date(startDateTime), reservationDeadline);

  const textColor = (() => {
    if (isFirstClass) {
      return 'text-sub-color1';
    } else if (isPastClass) {
      return 'text-gray-500';
    } else {
      return 'text-black';
    }
  })();

  const textBold = isPastClass ? 'font-normal' : 'font-bold';

  const handleModalOpened = (e: MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    handleModal?.();
  };

  return (
    <tr
      onClick={() => handleSelectClassId?.()}
      className={`${textColor} cursor-default font-normal`}
    >
      <th className={`${TableCellStyle} ${textBold}`}>{index}회차</th>
      <th className={`${TableCellStyle} break-keep font-normal`}>
        <p className="mx-auto flex w-fit gap-x-1">
          <span className="block w-16 text-right">{dateTime[0]}</span>
          <span className="block w-28 text-left">{dateTime[1]}</span>
        </p>
      </th>
      {maxCapacity && (
        <th
          onClick={handleModalOpened}
          className={`cursor-pointer ${TableCellStyle} font-normal underline`}
        >
          {numberOfParticipants}/{maxCapacity}명
        </th>
      )}
      {deadlineTime && (
        <th className={`${TableCellStyle} font-normal`}>
          {formatDateTimeNoSec(deadlineTime)}
        </th>
      )}
    </tr>
  );
};

export default ClassTableList;

const formatDateTime = (startDateTime: string, endDateTime: string) => {
  const startDate =
    formatShortDate(startDateTime) + ' ' + formatTimeNoSec(startDateTime);
  const endDate = formatTimeNoSec(endDateTime);

  return `${startDate}-${endDate}`;
};
