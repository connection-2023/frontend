import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { INITIAL_SCHEDULE_PROGRESS } from '@/constants/constants';
import { getUserSchedulesCalendar } from '@/lib/apis/classApis';
import { getLectureProgress } from '@/utils/parseUtils';
import Spinner from '@/components/Spinner/Spinner';

const FullCalendar = dynamic(() => import('./Calendar/FullCalendar'), {
  ssr: false,
});

const ResponsiveEventCalendar = dynamic(
  () => import('./Calendar/ResponsiveEventCalendar'),
  {
    ssr: false,
  },
);

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const { data, isLoading } = useQuery({
    queryKey: ['user', 'apply', 'schedules', date.getMonth() + 1],
    queryFn: () =>
      getUserSchedulesCalendar(date.getFullYear(), date.getMonth() + 1),
  });

  let progress;
  if (!isLoading && data) {
    progress = getLectureProgress(data);
  }

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-[60rem] flex-col gap-4">
      {isLoading ? (
        <div className="mt-20 flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="hidden w-full rounded-lg bg-white px-5 shadow-float md:block">
            <FullCalendar
              date={date}
              handleDateChange={handleDateChange}
              scheduleData={data}
            />
          </div>
          <div className="md:hidden">
            <ResponsiveEventCalendar
              date={date}
              handleDateChange={handleDateChange}
              scheduleData={data}
            />
          </div>

          <div className="mx-4 flex flex-col gap-y-2.5 whitespace-nowrap rounded-lg bg-white p-4 text-gray-100 shadow-float md:mx-auto md:w-full md:flex-row md:items-center md:px-0 md:px-5 md:py-6">
            <h1 className="mr-12 text-lg font-bold">
              {date.getMonth() + 1}월 진행 현황
            </h1>

            <ul
              role="list"
              className="flex list-inside list-disc gap-4 text-sm font-semibold marker:mr-1 md:list-outside md:gap-11 md:text-base"
            >
              {(progress ? progress : INITIAL_SCHEDULE_PROGRESS).map(
                (item, i) => (
                  <ListItem
                    key={i}
                    text={item.text}
                    count={item.count}
                    color={item.color}
                  />
                ),
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarView;

interface IListItem {
  text: string;
  count: number;
  color?: string;
}

const ListItem = ({ text, count, color }: IListItem) => (
  <li className={color}>
    <span className="relative -left-3 md:static"> {text}</span>
    <span className="-ml-1 text-gray-100 md:ml-2">{count}회</span>
  </li>
);
