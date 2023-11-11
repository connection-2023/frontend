import RecentApply from './_components/RecentApply';
import RecentReview from './_components/RecentReview';
import DayCalendar from '../../components/Calendar/DayCalendar';
import Banner from '../_components/Banner';
import Sidebar from '../_components/Sidebar';
import DashboardCalendar from '@/components/Calendar/SingleCalendar';

const Home = () => {
  return (
    <>
      <div className="mb-4 flex w-full flex-col bg-white py-4 md:col-span-2 md:row-span-3 md:shadow-float lg:col-span-1 lg:row-span-2 lg:mb-0 lg:rounded-lg">
        <div className="mx-4 mb-4 flex md:hidden lg:block lg:rounded-[0.28rem] lg:shadow-float">
          <DashboardCalendar mode="dashboard" />
        </div>
        <div className="hidden md:order-1 md:block">
          <Sidebar view="dashboard" />
        </div>
      </div>
      {/* 태블릿 뷰에서만 */}
      <div className="col-span-3 flex hidden rounded-md bg-white px-4 shadow-float md:order-3 md:block lg:hidden">
        <DashboardCalendar mode="dashboard" />
      </div>
      <div className="order-first h-[13.5rem] overflow-hidden rounded-md md:order-2 md:col-span-6  lg:order-none lg:col-span-3 lg:rounded-md">
        <Banner />
      </div>

      <div className="mb-4 flex w-full px-4 md:order-4 md:col-span-3 md:mb-0 md:px-0 lg:col-span-1 lg:mb-0 lg:px-0">
        <DayCalendar />
      </div>
      <div className="mb-4 w-full px-4 md:order-5 md:col-span-3 md:px-0 lg:col-span-1 lg:mb-0 lg:px-0">
        <RecentApply />
      </div>
      <div className="w-full px-4 pr-4 md:order-6 md:col-span-3 md:px-0 lg:col-span-1 lg:px-0">
        <RecentReview />
      </div>
    </>
  );
};

export default Home;
