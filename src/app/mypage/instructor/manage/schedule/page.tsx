'use client';
import { isBefore, isAfter, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';
import { INITIAL_SCHEDULE_PROGRESS } from '@/constants/constants';
import { getMonthlyClassPlan } from '@/lib/apis/instructorApi';
import FullCalendar from './_components/FullCalendar';
import ResponsiveEventCalendar from './_components/ResponsiveEventCalendar';
import { IMonthlyClassSchedules } from '@/types/class';

const SchedulePage = () => {
  const [date, setDate] = useState(new Date());
  const [progress, setProgress] = useState(INITIAL_SCHEDULE_PROGRESS);
  const [scheduleData, setScheduleData] = useState<IMonthlyClassSchedules[]>();

  useEffect(() => {
    const fetchData = async () => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const data = await getMonthlyClassPlan(year, month);
      const progress = getLectureProgress(data);

      setScheduleData(data);
      setProgress(progress);
    };

    fetchData();
  }, [date]);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const getLectureProgress = (data: IMonthlyClassSchedules[]) => {
    const today = new Date();

    const pastLectures = data.filter((item: IMonthlyClassSchedules) =>
      isBefore(parseISO(item.startDateTime), today),
    );

    const futureLectures = data.filter((item: IMonthlyClassSchedules) =>
      isAfter(parseISO(item.startDateTime), today),
    );

    return [
      {
        text: '수업 완료',
        count: pastLectures.length,
        color: 'text-main-color',
      },
      {
        text: '수업 예정',
        count: futureLectures.length,
        color: 'text-sub-color1',
      },
      {
        text: '총 수업',
        count: data.length,
        color: '',
      },
    ];
  };

  return (
    <section className="flex w-full flex-col gap-4 md:px-9 xl:px-0">
      <div className="hidden w-full rounded-lg bg-white px-5 shadow-float md:block">
        <FullCalendar
          date={date}
          handleDateChange={handleDateChange}
          scheduleData={scheduleData}
        />
      </div>

      <div className="md:hidden">
        <ResponsiveEventCalendar
          date={date}
          handleDateChange={handleDateChange}
          scheduleData={scheduleData}
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
          {progress.map((item, i) => (
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
