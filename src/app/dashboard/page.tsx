'use client';
import { useState, useEffect } from 'react';
import { getMonthlyClassPlan } from '@/lib/apis/instructorApi';
import RecentApply from './_components/RecentApply';
import RecentReview from './_components/RecentReview';
import DayCalendar from '../../components/Calendar/DayCalendar';
import Banner from '../_components/Banner';
import Sidebar from '../_components/Sidebar';
import DashboardCalendar from '@/components/Calendar/SingleCalendar';
import { IMonthlyClassSchedules } from '@/types/class';

const DashboardPage = () => {
  const [date, setDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState<IMonthlyClassSchedules[]>();
  const clickableDates = scheduleData?.map(
    (schedule) => new Date(schedule.startDateTime),
  );

  useEffect(() => {
    const fetchData = async () => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const data = await getMonthlyClassPlan(year, month);
      setScheduleData(data);
    };

    fetchData();
  }, [date]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  return (
    <>
      <div className="mb-4 mt-4 hidden w-full flex-col overflow-hidden bg-white py-4 md:col-span-2 md:row-span-3 md:rounded-lg md:shadow-float lg:col-span-1 lg:row-span-2 lg:mb-0 xl:flex">
        <div className="mx-4 mb-4 flex md:hidden lg:block lg:shadow-float xl:rounded-lg">
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
        <DayCalendar scheduleData={scheduleData || []} />
      </div>

      <div className="col-span-1 mb-4 w-full px-4 md:order-5 md:px-0 lg:mb-0 lg:px-0">
        <RecentApply />
      </div>
      <div className="col-span-1 w-full px-4 pr-4 md:order-6 md:px-0 lg:px-0">
        <RecentReview />
      </div>
    </>
  );
};

export default DashboardPage;
