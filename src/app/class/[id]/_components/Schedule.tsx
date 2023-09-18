import ScheduleCalendar from '@/components/Calendar/ScheduleCalendar';

interface IScheduleListProps {
  date: string;
  space: {
    current: number;
    total: number;
  };
}

const textStyle = {
  normal: 'text-sub-color3',
  full: 'text-sub-color2',
};
const ScheduleList = ({ date, space }: IScheduleListProps) => {
  const mode = space.current === space.total ? 'full' : 'normal';

  return (
    <li
      className={`border-box flex h-[2.8125rem] w-full max-w-[16.8125rem] items-center justify-between rounded-[0.31rem] border
    border-solid border-[#D8D8D8] px-[1.62rem] ${textStyle[mode]} text-sm font-medium`}
    >
      <p>{date}</p>
      <p>
        {mode === 'normal'
          ? `(${space.current}/${space.total}명)`
          : '(인원마감)'}
      </p>
    </li>
  );
};

const lectureSchedule = [
  { date: '09.06(수) 13:00-15:00', space: { current: 0, total: 8 } },
  { date: '09.06(수) 16:00-17:00', space: { current: 2, total: 8 } },
  { date: '09.06(수) 17:00-18:00', space: { current: 8, total: 8 } },
];

const Schedule = () => {
  return (
    <div className="flex w-full whitespace-nowrap">
      <div className="rounded-[0.625rem] shadow-[1px_1px_6px_1px_rgba(0,0,0,0.25)]">
        <ScheduleCalendar
          clickableDates={[
            new Date(2023, 8, 6),
            new Date(2023, 8, 20),
            new Date(2023, 8, 22),
          ]}
        />
      </div>
      <ul className="flex flex-col gap-[0.37rem] pl-3">
        {lectureSchedule.map((s) => ScheduleList(s))}
      </ul>
    </div>
  );
};

export default Schedule;
