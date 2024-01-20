import Nav from '@/components/Nav/Nav';
import { CLASS_SECTIONS } from '@/constants/constants';
import { NoticeSVG } from '@/icons/svg';

const ClassDetailLoading = () => (
  <>
    <section className="flex flex-col px-4 md:px-10">
      <Nav sections={CLASS_SECTIONS} />
      {/* 공지 */}
      <div className="h-20 w-full rounded-lg border border-solid border-sub-color1 p-4 text-sm">
        <div className="mb-2 flex items-center">
          <NoticeSVG
            width="20"
            height="15"
            className="mr-1.5 shrink-0 fill-sub-color1 stroke-sub-color1"
          />
          <h2>공지사항</h2>
        </div>
        <div className="h-5 w-full animate-pulse bg-gray-700" />
      </div>

      {/* 프로필 */}
      <div className="mb-10 mt-[1.81rem] flex w-full items-center">
        <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-gray-700" />

        <div className="ml-2 h-7 w-full animate-pulse items-center bg-gray-700" />
      </div>

      {/* 클래스 소개 */}
      <section id="intro-section" className="mb-14 scroll-mt-16">
        <h2 className="mb-2 h-7 text-lg font-bold">클래스 소개</h2>
        <div className="h-16 animate-pulse bg-gray-700" />
      </section>

      {/* 커리큘럼 */}
      <section id="curriculum-section" className="relative mb-14">
        <h2 className="mb-2 h-7 text-lg font-bold">커리큘럼</h2>
        <div className="h-96 animate-pulse bg-gray-700" />
      </section>

      <section
        id="date-section"
        className="mb-14 scroll-mt-16 whitespace-nowrap"
      >
        <h2 className="mb-2 h-7 text-lg font-bold">일정 및 시간</h2>
        <div className="my-4 h-6 w-60 animate-pulse bg-gray-700" />
        <div className="mb-2 h-5 w-48 animate-pulse bg-gray-700" />
        <div className="h-60 w-72 animate-pulse rounded-md bg-gray-700" />
      </section>

      <section id="location-section" className="mb-14 scroll-mt-16">
        <h2 className="mb-2 h-7 text-lg font-bold">진행 장소</h2>
        <div className="mb-2.5 mt-2 flex h-6 w-40 animate-pulse bg-gray-700" />
        <div className="mb-2 h-[18.25rem] w-full animate-pulse bg-gray-700 bg-slate-100" />
        <div className="h-14 animate-pulse bg-gray-700" />
      </section>

      {/* 클래스 후기 */}
      <section id="review-section" className="mb-14 scroll-mt-16">
        <div className="mb-2 flex text-lg font-bold">클래스 리뷰</div>
        <div className="h-40 w-full animate-pulse rounded-md bg-gray-700" />
        <div className="mt-4 h-40 w-full animate-pulse rounded-md bg-gray-700" />
        <div className="mt-4 h-40 w-full animate-pulse rounded-md bg-gray-700" />
      </section>
    </section>
    {/* 신청 사이드바 */}
    <section className="fixed bottom-0 hidden w-full md:static md:block md:w-auto md:max-w-[17rem]">
      <div className="sticky top-20 mt-5 h-40 w-full animate-pulse bg-gray-700 pr-2" />
    </section>
    <span className="sr-only">Loading...</span>
  </>
);

export default ClassDetailLoading;
