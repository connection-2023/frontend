import Link from 'next/link';
import ClassList from './_components/ClassList';
import InstructorCarousel from './_components/InstructorCarousel';
import ManagementButton from './_components/ManagementButton';
import Like from '@/components/Like/Like';
import Nav from '@/components/Nav/Nav';
import Review from '@/components/Review/Review';
import ReviewComment from '@/components/Review/ReviewComment';
import Sharing from '@/components/Sharing/Sharing';
import { INSTRUCTOR_SECTIONS } from '@/constants/constants';
import { dummyInstructor } from '@/constants/dummy';
import { OptionSVG, InstagramSVG, YoutubeSVG, LinkSVG } from '@/icons/svg';
import { getInstructorPost } from '@/lib/apis/instructorPostApis';
import { sanitizeHtmlString } from '@/utils/sanitizeHtmlString';
import {
  formatLocationToString,
  formatGenreToString,
} from '@/utils/parseUtils';

const h2Style = 'mb-2 text-lg font-bold';

const InstructorDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data = await getInstructorPost(id);

  if (data instanceof Error) {
    console.error(data.message);
    return <></>;
  }

  const {
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
  } = data;

  const { review, classList } = dummyInstructor;

  return (
    <main className="flex w-screen flex-col items-center">
      {/* 강의 상세 헤더 섹션 */}
      <section className="flex w-full max-w-[1440px] flex-col items-center ">
        <InstructorCarousel
          imgURL={lecturerProfileImageUrl.map((img) => img.url)}
        />

        <div className="flex flex-col items-center">
          {/* 강사 이름 및 이벤트 */}
          <div className=" relative flex w-full min-w-[23rem] items-center justify-center ">
            <h1 className="box-border flex items-center gap-1 pl-6 text-lg font-bold">
              {nickname}
              <Like />
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
            <Review average={review.average} />
            <span className="text-sm font-bold text-sub-color2">
              ({review.average})
            </span>
          </div>

          {/* 강사 여러 정보 */}
          <dl className="inline-grid min-w-[40rem] grid-cols-2 gap-2 whitespace-nowrap border-t-2 border-solid border-sub-color4 py-5">
            <div className="flex gap-3">
              <dt className="font-bold text-sub-color1">지역</dt>
              <dd>
                {/* 추후 데이터 반환 타입 변경 시 변경 예정 */}
                {formatLocationToString(lecturerRegion)}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-sub-color1">
                <InstagramSVG
                  className={`${
                    instagramUrl ? 'fill-sub-color1' : 'fill-sub-color2'
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
                      : 'stroke-sub-color2 [&>*:nth-child(1)]:fill-sub-color2'
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
                    homepageUrl ? 'fill-sub-color1' : 'fill-sub-color2'
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

      <hr className="mb-2 h-[1px] w-screen bg-sub-color4 shadow-float" />

      <div className="sticky -top-[1px] z-20 flex w-full items-center justify-center bg-white">
        <div className="w-1/2 min-w-[23rem] max-w-5xl">
          <Nav sections={INSTRUCTOR_SECTIONS} />
        </div>
      </div>

      {/* 인스타그램 섹션 */}
      <section className="flex h-[387px] w-full max-w-[51.1rem] justify-center gap-3">
        {lecturerInstagramPostUrl.map((insta, index) => (
          <InstagramIframe key={index} link={insta.url} />
        ))}
      </section>

      {/* 강사소개 섹션 */}
      <section
        id="introduction-section"
        className="w-full max-w-[51.1rem] pt-20"
      >
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
          <h2 className={h2Style}>진행중인 강의 </h2>
        </div>
        <ClassList classList={classList} />
      </section>

      {/* 강사 후기 */}
      <section id="review-section" className="w-full max-w-[51.1rem] py-20">
        <h2 className={`flex items-center ${h2Style}`}>
          강사 후기 {review.count}건 <span className="ml-3" />
          <Review average={review.average} />
          <span className="ml-1 text-sub-color2">({review.average})</span>
        </h2>
        <div className="flex flex-col gap-6">
          {review.reviewer.map((review) => (
            <ReviewComment
              key={review.nickname}
              src={review.src}
              nickname={review.nickname}
              average={review.average}
              content={review.content}
              date={review.date}
              title={review.title}
            />
          ))}
        </div>
      </section>
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
