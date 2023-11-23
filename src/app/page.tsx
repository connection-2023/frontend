import Link from 'next/link';
import { dummyInstructor, dummyMain } from '@/constants/dummy';
import { SmallLogoSVG, MainPopularSVG, MainTopSVG } from '@/icons/svg';
import Banner from './_components/Banner';
import CarouselTemplate from './_components/CarouselTemplate';
import ClassCard from '@/components/ClassPreview/ClassPreview';
import InstructorPreview from '@/components/Preview/InstructorPreview';
import SuggestionPreview from '@/components/Preview/SuggestionPreview';

const Home = () => {
  const { classList } = dummyInstructor;
  const { recentClass, suggestionClass, topInstructorList } = dummyMain;
  return (
    <main className="relative mx-auto mb-20">
      <div className="h-[472px]">
        <Banner />
      </div>

      {/* 유저 로그인시에만 보여지는 맞춤 클래스 */}
      <section className="absolute top-[23rem] mt-3 w-full">
        <h2 className="mb-3 flex w-full items-center gap-1 px-4 text-lg font-bold text-white sm:px-9">
          <SmallLogoSVG />
          AI가 추천하는 맞춤 클래스
        </h2>

        <div className="flex gap-4 overflow-x-auto px-4 sm:px-9">
          {suggestionClass.map((item) => (
            <SuggestionPreview
              key={item.title}
              title={item.title}
              range={item.range}
              review={item.review}
              image={item.image}
            />
          ))}
        </div>
      </section>
      {/* 인기 클래스 */}
      <section className="mt-20 w-full">
        <SectionHeader
          icon={<MainPopularSVG />}
          title="오늘의 인기 클래스"
          link="/class"
        />

        <CarouselTemplate mode="class">
          {classList.map((state, index) => (
            <div
              key={state.title + index}
              className="w-full max-w-[13rem] xl:max-w-[33.7rem]"
            >
              <ClassCard key={state.title + index} {...state} />
            </div>
          ))}
        </CarouselTemplate>
      </section>
      {/* 인기 강사 TOP 8 */}
      <section className="mt-3">
        <SectionHeader
          icon={<MainTopSVG />}
          title="오늘의 인기 강사 TOP8"
          link="/instructor"
        />

        <CarouselTemplate mode="instructor">
          {topInstructorList.map((list) => (
            <InstructorPreview
              key={list.id}
              image={list.image}
              nickname={list.nickname}
            />
          ))}
        </CarouselTemplate>
      </section>
      {/* 최신 클래스 - 무한 스크롤 (예정) */}
      <section className="mt-3 px-4 sm:px-9">
        <h2 className="mb-4 flex w-full justify-start text-lg font-bold">
          최신 클래스
        </h2>
        <div className="grid auto-cols-auto grid-cols-1 justify-items-center gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 xl:gap-y-4">
          {recentClass.map((item, i) => (
            <div className="w-full flex-shrink flex-grow" key={i}>
              <ClassCard {...item} />
            </div>
          ))}
        </div>
      </section>
    </main>
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
