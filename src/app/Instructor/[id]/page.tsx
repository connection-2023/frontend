import Link from 'next/link';
import ClassList from './_components/ClassList';
import InstructorCarousel from './_components/InstructorCarousel';
import ManagementButton from './_components/ManagementButton';
import ReviewSection from './_components/ReviewSection';
import Like from '@/components/Like/Like';
import Nav from '@/components/Nav/Nav';
import Review from '@/components/Review/Review';
import Sharing from '@/components/Sharing/Sharing';
import { INSTRUCTOR_SECTIONS } from '@/constants/constants';
import { OptionSVG, InstagramSVG, YoutubeSVG, LinkSVG } from '@/icons/svg';
import { getInstructorPost } from '@/lib/apis/instructorPostApis';
import { getInstructorClassLists } from '@/lib/apis/serverApis/instructorPostApis';
import { transformToCardData } from '@/utils/apiDataProcessor';
import {
  formatLocationToString,
  formatGenreToString,
} from '@/utils/parseUtils';
import { sanitizeHtmlString } from '@/utils/sanitizeHtmlString';

const h2Style = 'mb-2 text-lg font-bold';

const InstructorDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data = await getInstructorPost(id);
  const classListsResponse = await getInstructorClassLists(id);

  if (data instanceof Error || classListsResponse instanceof Error) {
    return null;
  }

  const {
    profileCardImageUrl,
    lecturerProfileImageUrl,
    lecturerInstagramPostUrl,
    introduction,
    experience,
    nickname,
    lecturerRegion,
    lecturerDanceGenre,
    youtubeUrl,
    instagramUrl,
    homepageUrl,
    affiliation,
    stars,
    reviewCount,
  } = data;

  const classList = transformToCardData(classListsResponse, {
    nickname,
    img: profileCardImageUrl,
  });

  return (
    <main className="flex w-screen flex-col items-center">
      {/* 강의 상세 헤더 섹션 */}
      <section className="flex w-full flex-col items-center ">
        <InstructorCarousel
          imgURL={lecturerProfileImageUrl.map((img) => img.url)}
        />

        <div className="flex flex-col items-center">
          {/* 강사 이름 및 이벤트 */}
          <div className=" relative flex w-full min-w-[23rem] items-center justify-center ">
            <h1 className="box-border flex items-center gap-1 pl-6 text-lg font-bold">
              {nickname}
              <Like type="instructor" id={id} />
            </h1>
            <div className="absolute right-0 flex gap-3">
              <Sharing header={nickname} mode="instructor" />
              <ManagementButton>
                <OptionSVG />
              </ManagementButton>
            </div>
          </div>

          {/* 리뷰 */}
          <div className="mb-4 mt-2 box-border flex h-4 gap-1 pl-4">
            <Review average={stars} />
            <span className="text-sm font-bold text-gray-500">
              ({reviewCount})
            </span>
          </div>

          {/* 강사 여러 정보 */}
          <dl className="inline-grid min-w-[40rem] grid-cols-2 gap-2 whitespace-nowrap border-t-2 border-solid border-gray-700 py-5">
            <div className="flex gap-3">
              <dt className="font-bold text-sub-color1">지역</dt>
              <dd>{formatLocationToString(lecturerRegion)}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-sub-color1">
                <InstagramSVG
                  className={`${
                    instagramUrl ? 'fill-sub-color1' : 'fill-gray-500'
                  }`}
                />
              </dt>
              <dd>{instagramUrl}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-bold text-sub-color1">장르</dt>
              {/* 추후 데이터 반환 타입 변경 시 변경 예정 */}
              <dd>{formatGenreToString(lecturerDanceGenre)}</dd>
            </div>
            <Link
              href={youtubeUrl || ''}
              target="_blank"
              className={`${youtubeUrl ?? 'pointer-events-none'} flex gap-3`}
            >
              <dt className="text-sub-color1">
                <YoutubeSVG
                  className={`${
                    youtubeUrl
                      ? 'stroke-sub-color1 [&>*:nth-child(1)]:fill-sub-color1'
                      : 'stroke-gray-500 [&>*:nth-child(1)]:fill-gray-500'
                  }`}
                />
              </dt>
              <dd className={`${youtubeUrl && 'underline'}`}>
                {youtubeUrl.replace('https://', '')}
              </dd>
            </Link>
            <div className="flex gap-3">
              <dt className="font-bold text-sub-color1">소속</dt>
              <dd>{affiliation}</dd>
            </div>
            <Link
              href={homepageUrl || ''}
              className={`${homepageUrl ?? 'pointer-events-none'} flex gap-3`}
              target="_blank"
            >
              <dt className="text-sub-color1">
                <LinkSVG
                  className={`${
                    homepageUrl ? 'fill-sub-color1' : 'fill-gray-500'
                  }`}
                />
              </dt>
              <dd className={`${homepageUrl && 'underline'}`}>
                {homepageUrl.replace('https://', '')}
              </dd>
            </Link>
          </dl>
        </div>
      </section>

      <hr className="mb-2 h-[1px] w-screen bg-gray-700 shadow-float" />

      <div className="sticky -top-[1px] z-20 flex w-full items-center justify-center bg-white">
        <div className="w-1/2 min-w-[23rem] max-w-5xl">
          <Nav sections={INSTRUCTOR_SECTIONS} />
        </div>
      </div>

      {/* 인스타그램 섹션 */}
      {lecturerInstagramPostUrl.length > 0 && (
        <section className="mb-20 flex h-[387px] w-full max-w-[51.1rem] justify-center gap-3">
          {lecturerInstagramPostUrl.map((insta, index) => (
            <InstagramIframe key={index} link={insta.url} />
          ))}
        </section>
      )}

      {/* 강사소개 섹션 */}
      <section id="introduction-section" className="w-full max-w-[51.1rem]">
        <h2 className={h2Style}>강사소개</h2>
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlString(introduction) }}
        />
      </section>

      {/* 강사 경력 섹션 */}
      <section
        id="work-experience-section"
        className=" w-full max-w-[51.1rem] pt-20"
      >
        <h2 className={h2Style}>강사 경력</h2>
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlString(experience) }}
        />
      </section>

      {/* 진행중인 강의 섹션 */}
      <section
        id="class-section"
        className="flex w-full flex-col items-center pt-20"
      >
        <div className="w-full max-w-[51.1rem] ">
          <h2 className={h2Style}>진행중인 강의 {classList.length}개</h2>
        </div>
        <ClassList classList={classList} />
      </section>

      <ReviewSection id={id} stars={stars} totalReviewCount={reviewCount} />
    </main>
  );
};

export default InstructorDetailPage;

const InstagramIframe = ({ link }: { link: string }) => {
  const urlObj = new URL(link);
  urlObj.search = '';
  urlObj.hash = '';

  return (
    <div className="h-[387px] w-[16.6875rem] overflow-hidden">
      <iframe
        height="387"
        width="363"
        src={`${urlObj.toString()}embed/`}
        scrolling="no"
        frameBorder="0"
        className="h-full w-full"
      />
    </div>
  );
};
