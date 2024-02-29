import Link from 'next/link';
import { Suspense } from 'react';
import { RecentSVG, ReviewSVG, ArrowUpSVG } from '@/icons/svg';
import { format12HourTime } from '@/utils/dateTimeUtils';
import DashboardCalendar from './_components/DashboardCalendar';
import RecentApply from './_components/RecentApply';
import RecentReview from './_components/RecentReview';
import Banner from '../_components/Banner';
import Spinner from '@/components/Spinner/Spinner';

const DashboardPage = () => {
  return (
    <>
      <DashboardCalendar />

      <div className="order-first h-[13.5rem] overflow-hidden md:order-2 md:col-span-2 md:mt-4 md:rounded-lg lg:order-none xl:col-span-3">
        <Banner />
      </div>

      <div className="col-span-1 mb-4 w-full px-4 md:order-5 md:mb-0 md:px-0">
        <section className="min-h-44 flex max-h-[40rem] flex-col divide-y divide-solid divide-gray-700 rounded-lg bg-white shadow-float md:h-full">
          <h1 className="flex h-12 w-full items-center justify-between px-3.5 text-base font-bold text-gray-100">
            <span className="flex items-center gap-1.5">
              <RecentSVG width="24" height="24" className="fill-sub-color1" />
              최근 신청한 수강생
            </span>

            <span className="text-sm font-medium text-gray-500">
              {`${format12HourTime(new Date())} 업데이트`}
            </span>
          </h1>

          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <RecentApply />
          </Suspense>
        </section>
      </div>

      <div className="col-span-1 w-full px-4 pr-4 md:order-6 md:px-0">
        <section className="min-h-44 flex h-full flex-col divide-y divide-solid divide-gray-700 rounded-lg bg-white shadow-float">
          <h1 className="flex h-12 w-full items-center justify-between px-3.5 text-base font-bold text-gray-100">
            <span className="flex items-center gap-1.5">
              <ReviewSVG width="22" height="22" className="fill-sub-color1" />
              클래스 리뷰
            </span>

            <Link
              href="/mypage/instructor/review"
              className="group flex cursor-pointer items-center text-sm font-medium text-gray-500 hover:text-black"
            >
              더 보러가기
              <ArrowUpSVG
                width="24"
                height="24"
                className="rotate-90 fill-gray-500 group-[:hover]:fill-black"
              />
            </Link>
          </h1>

          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <RecentReview />
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
