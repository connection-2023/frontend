import ReservationItem from './ReservationItem';
import SelectBox from './SelectBox';
import { IDateTime } from '@/types/class';

/* eslint-disable no-unused-vars */
interface ApplyList {
  lists: string[];
  selectedDateTime: string;
  onSelect: (list: string) => void;
  selectedSchedules: IDateTime;
  removeReservationItem: (id: number) => void;
  updateCount: (newVal: number) => void;
}

/* eslint-enable no-unused-vars */
const ApplyList = (props: ApplyList) => {
  const {
    lists,
    selectedDateTime,
    onSelect,
    selectedSchedules,
    removeReservationItem,
    updateCount,
  } = props;

  return (
    <>
      <div className="mb-3 flex w-full flex-col gap-2 md:hidden">
        <SelectBox
          lists={lists}
          onSelect={onSelect}
          selected={selectedDateTime}
        />
      </div>
      <div className="mb-11 flex w-full flex-col gap-2 md:hidden">
        <ReservationItem
          key={selectedSchedules.lectureScheduleId}
          lectureScheduleId={selectedSchedules.lectureScheduleId}
          dateTime={selectedSchedules.dateTime}
          space={selectedSchedules.space}
          count={selectedSchedules.count}
          onRemove={() =>
            removeReservationItem(selectedSchedules.lectureScheduleId)
          }
          countUpdate={updateCount}
        />
      </div>
    </>
  );
};

export default ApplyList;
