'use client';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { getMonthlyClassPlan } from '@/lib/apis/instructorApi';
import RecentApply from './_components/RecentApply';
import RecentReview from './_components/RecentReview';
import Banner from '../_components/Banner';
import Sidebar from '../_components/Sidebar';
import Spinner from '@/components/Loading/Spinner';

const DashboardCalendar = dynamic(
  () => import('@/components/Calendar/SingleCalendar'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-60 w-full items-center justify-center">
        <Spinner />
      </div>
    ),
  },
);

const DayCalendar = dynamic(
  () => import('../../components/Calendar/DayCalendar'),
  {
    ssr: false,
  },
);
const DashboardPage = () => {
  const [date, setDate] = useState(new Date());
  const { data, isLoading, error } = useQuery({
    queryKey: ['instructor', 'monthly-Plan'],
    queryFn: () => getMonthlyClassPlan(date.getFullYear(), date.getMonth() + 1),
    refetchOnWindowFocus: 'always',
  });

  const clickableDates = data?.map(
    (schedule) => new Date(schedule.startDateTime),
  );

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  return (
    <>
      <div className="mb-4 mt-4 hidden w-full flex-col overflow-hidden bg-white py-4 md:col-span-2 md:row-span-3 md:rounded-lg md:shadow-float lg:col-span-1 lg:row-span-2 lg:mb-0 xl:flex">
        <div className="mx-4 mb-4 flex overflow-hidden md:hidden lg:block lg:shadow-float xl:rounded-lg">
          <DashboardCalendar
            mode="dashboard"
            clickableDates={[...new Set(clickableDates)]}
            handleClickDate={handleDateChange}
          />
        </div>

        <div className="hidden md:order-1 md:block">
          <Sidebar view="dashboard" />
        </div>
      </div>
      {/* 태블릿 뷰에서만 */}
      <div className="col-span-1 flex rounded-lg bg-white px-4 md:order-3 md:block md:shadow-float xl:col-span-3 xl:hidden">
        <DashboardCalendar
          mode="dashboard"
          clickableDates={[...new Set(clickableDates)]}
          handleClickDate={handleDateChange}
        />
      </div>
      <div className="order-first h-[13.5rem] overflow-hidden md:order-2 md:col-span-2 md:mt-4 md:rounded-lg lg:order-none xl:col-span-3">
        <Banner />
      </div>

      <div className="col-span-1 mb-4 mt-4 box-border p-3.5 md:order-4 md:my-0 md:rounded-lg md:bg-white md:p-0 md:shadow-float lg:mb-0 lg:px-0">
        {/* <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div> */}

        <DayCalendar scheduleData={data || []} />
      </div>

      <div className="col-span-1 mb-4 w-full px-4 md:order-5 md:px-0 lg:mb-0 lg:px-0">
        <RecentApply />
        {/* <div className="flex h-full w-full items-center justify-center shadow-floatrounded-lg bg-white">
          <Spinner />
        </div> */}
      </div>
      <div className="col-span-1 w-full px-4 pr-4 md:order-6 md:px-0 lg:px-0">
        <RecentReview />
      </div>
    </>
  );
};

export default DashboardPage;
