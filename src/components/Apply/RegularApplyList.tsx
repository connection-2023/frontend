import { BasicCalendarSVG } from '@/icons/svg';
import { getRegularScheduleTime } from '@/utils/scheduleDateUtils';
import { IRegularClassSchedule, ISelectedSchedule } from '@/types/class';

interface RegularApplyListProps {
  isApply?: boolean;
  schedule: IRegularClassSchedule[];
  duration: number;
  maxCapacity: number;
  selectedSchedule?: ISelectedSchedule;
  // eslint-disable-next-line no-unused-vars
  onSelect: (newValue: IRegularClassSchedule) => void;
}

const RegularApplyList = (props: RegularApplyListProps) => {
  const {
    isApply = false,
    schedule,
    duration,
    maxCapacity,
    selectedSchedule,
    onSelect,
  } = props;

  const ulStyle = isApply
    ? 'grid max-h-[275px] grid-cols-1 gap-x-2 gap-y-1 overflow-y-auto p-1 md:grid-cols-2'
    : 'max-h-[275px] space-y-2.5 overflow-y-auto border border-solid border-gray-900 px-2 py-1.5';

  return (
    <ul className={ulStyle}>
      {schedule.map((item) => {
        const {
          id,
          day,
          dateTime,

          numberOfParticipants,
          regularLectureSchedule,
        } = item;

        const time = getRegularScheduleTime(dateTime, duration);
        const isChecked = selectedSchedule?.id === id;
        return (
          <li
            key={item.id}
            className={`h-[90px] cursor-pointer rounded-md ${
              isChecked && 'border-2 border-solid border-main-color'
            } px-4 py-3 text-sm text-gray-100 shadow-float`}
            onClick={() =>
              onSelect({
                id,
                day,
                dateTime,
                numberOfParticipants,
                regularLectureSchedule,
              })
            }
          >
            <p className="mb-3 flex items-center font-bold">
              <BasicCalendarSVG
                width="21"
                height="21"
                className="mr-2 fill-gray-100"
              />
              {`${day.join(',')} ${dateTime}-${time}`}
            </p>

            <div className="flex items-center gap-x-2">
              <input
                type="radio"
                checked={isChecked}
                className="w-4 accent-main-color"
                readOnly
              />
              <span className="text-base font-bold">
                {regularLectureSchedule.length}회
              </span>
              <span>{`(${numberOfParticipants}/${maxCapacity}명)`}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RegularApplyList;
