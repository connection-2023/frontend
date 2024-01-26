import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { MainPopularSVG, MainTopSVG } from '@/icons/svg';
import Banner from './_components/Banner';
import BestClassLoading from './_components/Home/Loading/BestClassLoading';
import BestInstructorLoading from './_components/Home/Loading/BestInstructorLoading';
import RecentClassLoading from './_components/Home/Loading/RecentClassLoading';

const BestClass = dynamic(() => import('./_components/Home/BestClass'), {
  loading: () => <BestClassLoading />,
});

const BestInstructor = dynamic(
  () => import('./_components/Home/BestInstructor'),
  { loading: () => <BestInstructorLoading /> },
);

const RecentClass = dynamic(() => import('./_components/Home/RecentClass'), {
  loading: () => <RecentClassLoading />,
});

const Home = async () => {
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

        <BestClass />
      </section>

      {/* 인기 강사 TOP 8 */}
      <section className="mt-3">
        <SectionHeader
          icon={<MainTopSVG />}
          title="인기 강사 TOP8"
          link="/instructor"
        />

        <BestInstructor />
      </section>

      {/* 최신 클래스 */}

      <section className="mt-3 px-4 sm:px-9">
        <h2 className="mb-4 flex w-full justify-start text-lg font-bold">
          최신 클래스
        </h2>

        <RecentClass />
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
