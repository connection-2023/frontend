import Link from 'next/link';
import { Suspense } from 'react';
import { MainPopularSVG, MainTopSVG } from '@/icons/svg';
import { searchBestInstructor } from '@/lib/apis/serverApis/searchApis';
import { useUserStore } from '@/store/userStore';
import Banner from './_components/Banner';
import BestClass from './_components/Home/BestClass';
import BestInstructor from './_components/Home/BestInstructor';
import BestClassLoading from './_components/Home/Loading/BestClassLoading';
import BestInstructorLoading from './_components/Home/Loading/BestInstructorLoading';
import RecentClassLoading from './_components/Home/Loading/RecentClassLoading';
import RecentClass from './_components/Home/RecentClass';

const Home = async () => {
  const { userType } = useUserStore.getState();
  const bestInstructorList = await searchBestInstructor(userType === 'user');

  return (
    <div className="relative mx-auto mb-20 w-full">
      <div className="h-[472px]">
        <Banner />
      </div>

      {/* 유저 로그인시에만 보여지는 맞춤 클래스 */}
      {/* <SuggestionClass /> */}

      {/* 인기 클래스 */}
      <section className="mt-4 w-full">
        <SectionHeader
          icon={<MainPopularSVG />}
          title="인기 클래스"
          link="/class"
        />

        <Suspense fallback={<BestClassLoading />}>
          <BestClass />
        </Suspense>
      </section>

      {/* 인기 강사 TOP 8 */}
      <section className="mt-3">
        <SectionHeader
          icon={<MainTopSVG />}
          title="인기 강사 TOP8"
          link="/instructor"
        />

        <Suspense fallback={<BestInstructorLoading />}>
          <BestInstructor bestInstructorList={bestInstructorList} />
        </Suspense>
      </section>

      {/* 최신 클래스 */}

      <section className="mt-3 px-4 sm:px-9">
        <h2 className="mb-4 flex w-full justify-start text-lg font-bold">
          최신 클래스
        </h2>

        <Suspense fallback={<RecentClassLoading />}>
          <RecentClass />
        </Suspense>
      </section>

      <div className="mt-10 flex w-screen justify-center">
        <Link
          href="/class"
          className="mx-auto rounded-[3.13rem] bg-main-color px-7 py-3 text-lg font-bold text-white"
        >
          더 많은 클래스 보러가기
        </Link>
      </div>
    </div>
  );
};

export default Home;
interface ISectionHeader {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const SectionHeader = ({ icon, title, link }: ISectionHeader) => (
  <h2 className="mb-3 flex w-full items-center justify-between px-4 sm:px-9">
    <span className="flex items-center gap-1 text-lg font-bold">
      {icon}
      {title}
    </span>
    <Link href={link} className="text-sm text-gray-500 underline">
      전체보기
    </Link>
  </h2>
);
