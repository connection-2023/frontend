import ScheduleCalendar from '@/components/Calendar/ScheduleCalendar';

const textStyle = {
  normal: 'text-sub-color3',
  full: 'text-sub-color2',
};

interface IScheduleProps {
  clickableDates: Date[];
  lectureSchedule: IScheduleListProps[];
}

const ScheduleView = ({ clickableDates, lectureSchedule }: IScheduleProps) => {
  return (
    <div className="flex w-full justify-between whitespace-nowrap">
      <ScheduleCalendar clickableDates={clickableDates} />

      <ul className="flex flex-col gap-[0.37rem] pl-3">
        {lectureSchedule.map((s) => (
          <ScheduleList key={s.date} date={s.date} space={s.space} />
        ))}
      </ul>
    </div>
  );
};

export default ScheduleView;

interface IScheduleListProps {
  date: string;
  space: {
    current: number;
    total: number;
  };
}

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
