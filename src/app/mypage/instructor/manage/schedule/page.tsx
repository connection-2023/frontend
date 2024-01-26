'use client';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { INITIAL_SCHEDULE_PROGRESS } from '@/constants/constants';
import { getMonthlyClassPlan } from '@/lib/apis/instructorApi';
import { getLectureProgress } from '@/utils/parseUtils';

const FullCalendar = dynamic(() => import('./_components/FullCalendar'), {
  ssr: false,
});

const ResponsiveEventCalendar = dynamic(
  () => import('./_components/ResponsiveEventCalendar'),
  {
    ssr: false,
  },
);

const SchedulePage = () => {
  const [date, setDate] = useState(new Date());

  const { data, isLoading, error } = useQuery({
    queryKey: ['instructor', 'monthly-Plan'],
    queryFn: () => getMonthlyClassPlan(date.getFullYear(), date.getMonth() + 1),
    refetchOnWindowFocus: 'always',
  });

  if (!data || error) return null;

  const progress = getLectureProgress(data);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <section className="flex w-full flex-col gap-4 md:px-9 xl:px-0">
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
          {(progress ? progress : INITIAL_SCHEDULE_PROGRESS).map((item, i) => (
            <ListItem
              key={i}
              text={item.text}
              count={item.count}
              color={item.color}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SchedulePage;

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
