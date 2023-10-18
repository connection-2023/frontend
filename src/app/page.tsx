import { ReactNode } from 'react';
import Link from 'next/link';
import CarouselTemplate from './_components/CarouselTemplate';
import Banner from './_components/Banner';
import InstructorPreview from '@/components/Preview/InstructorPreview';
import ClassCard from '@/components/ClassCard/ClassCard';
import SuggestionPreview from '@/components/Preview/SuggestionPreview';
import { dummyInstructor, dummyMain } from '@/constants/dummy';
import { SmallLogoSVG, MainPopularSVG, MainTopSVG } from '@/icons/svg';

export default function Home() {
  const { classList } = dummyInstructor;
  const { recentClass, suggestionClass, topInstructorList } = dummyMain;
  return (
    <main className="relative mx-auto mb-20 max-w-[1440px]">
      <Banner />
      {/* 유저 로그인시에만 보여지는 맞춤 클래스 */}
      <section className="absolute top-[23rem] mt-3 w-full">
        <h2 className="mb-3 flex w-full items-center gap-1 px-[4.37rem] text-lg font-bold text-white">
          <SmallLogoSVG />
          AI가 추천하는 맞춤 클래스
        </h2>

        <div className="flex gap-4 px-[4.37rem]">
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
          link="/"
        />

        <CarouselTemplate mode="class">
          {classList.map((state, index) => (
            <ClassCard key={state.title + index} {...state} />
          ))}
        </CarouselTemplate>
      </section>
      {/* 인기 강사 TOP 8 */}
      <section className="mt-3">
        <SectionHeader
          icon={<MainTopSVG />}
          title="오늘의 인기 강사 TOP8"
          link="/"
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
      <section className="mt-3 px-[4.37rem]">
        <h2 className="flex w-full items-center text-lg font-bold">
          최신 클래스
        </h2>
        <div className="grid auto-cols-auto grid-cols-1 gap-4 lg:grid-cols-2">
          {recentClass.map((item, i) => (
            <div
              className="w-full min-w-[543px] max-w-[639px] flex-shrink flex-grow"
              key={i}
            >
              <ClassCard {...item} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

interface ISectionHeader {
  icon: ReactNode;
  title: string;
  link: string;
}

const SectionHeader = ({ icon, title, link }: ISectionHeader) => (
  <h2 className="mb-3 flex w-full items-center justify-between px-[4.37rem]">
    <span className="flex items-center gap-1 text-lg font-bold">
      {icon}
      {title}
    </span>
    <Link href={link} className="text-sm text-sub-color2 underline">
      전체보기
    </Link>
  </h2>
);
