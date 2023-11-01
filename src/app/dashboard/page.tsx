import RecentApply from './_components/RecentApply';
import RecentReview from './_components/RecentReview';
import DayCalendar from '../../components/Calendar/DayCalendar';
import Banner from '../_components/Banner';
import Sidebar from '../_components/Sidebar';
import DashboardCalendar from '@/components/Calendar/DashboardCalendar';

const Home = () => {
  return (
    <>
      <div className="row-span-2 flex w-full flex-col rounded-[0.63rem] bg-white py-4 shadow-float">
        <div className="mx-4 mb-4 flex rounded-[0.28rem] shadow-[0px_0.90294px_3.61175px_0px_rgba(0,0,0,0.25)]">
          <DashboardCalendar />
        </div>
        <Sidebar view="dashboard" />
      </div>

      <div className="col-span-3 h-[13.5rem] overflow-hidden rounded-[0.31rem]">
        <Banner />
      </div>

      <div className="flex w-full">
        <DayCalendar />
      </div>
      <div className="w-full">
        <RecentApply />
      </div>
      <div>
        <RecentReview />
      </div>
    </>
  );
};

export default Home;
