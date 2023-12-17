import Link from 'next/link';
import { INSTRUCTOR_SECTIONS } from '@/constants/constants';
import { OptionSVG, InstagramSVG, YoutubeSVG, LinkSVG } from '@/icons/svg';
import { getInstructorPost } from '@/lib/apis/instructorPostApis';
import { getInstructorClassLists } from '@/lib/apis/serverApis/instructorPostApis';
import { getLecturerPassList } from '@/lib/apis/serverApis/passApis';
import { transformToCardData } from '@/utils/apiDataProcessor';
import {
  formatLocationToString,
  formatGenreToString,
} from '@/utils/parseUtils';
import { sanitizeHtmlString } from '@/utils/sanitizeHtmlString';
import ClassList from './_components/ClassList';
import InstructorCarousel from './_components/InstructorCarousel';
import ManagementButton from './_components/ManagementButton';
import ReviewSection from './_components/ReviewSection';
import Like from '@/components/Like/Like';
import Nav from '@/components/Nav/Nav';
import Review from '@/components/Review/Review';
import Sharing from '@/components/Sharing/Sharing';

const h2Style = 'mb-2 text-lg font-bold';

const InstructorDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const profile = getInstructorPost(id);
  const classLists = getInstructorClassLists(id);
  const passLists = getLecturerPassList(id);

  const [profileData, classListsResponse, passListData] = await Promise.all([
    profile,
    classLists,
    passLists,
  ]);

  if (profileData instanceof Error || classListsResponse instanceof Error) {
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
  } = profileData;

  const classList = transformToCardData(classListsResponse, {
    nickname,
    img: profileCardImageUrl,
  });

  return (
    <main className="flex w-full flex-col items-center">
      {/* 강의 상세 헤더 섹션 */}
      <section className="flex w-full flex-col items-center">
        <InstructorCarousel
          imgURL={lecturerProfileImageUrl.map((img) => img.url)}
        />

        <div className="flex flex-col px-5 sm:items-center sm:px-0">
          {/* 강사 이름 및 이벤트 */}
          <div className=" relative flex w-full min-w-[23rem] items-center sm:justify-center">
            <h1 className="box-border flex items-center gap-1 text-lg font-bold sm:pl-6">
              {nickname}
              <Like type="instructor" id={id} />
            </h1>
            {/* <div className="absolute right-0 flex gap-3">
              <Sharing header={nickname} mode="instructor" />
              <ManagementButton>
                <OptionSVG />
              </ManagementButton>
            </div> */}
          </div>
          {/* 리뷰 */}
          <div className="mb-4 mt-2 box-border flex h-4 gap-1 sm:pl-4">
            <Review average={stars} />
            <span className="text-sm font-bold text-gray-500">
              ({reviewCount})
            </span>
          </div>
          {/* 강사 여러 정보 */}
          <dl className="inline-grid grid-rows-6 gap-2 whitespace-nowrap border-t-2 border-solid border-gray-700 py-5 sm:min-w-[40rem] sm:grid-cols-2 sm:grid-rows-none">
            <div className="flex gap-3">
              <dt className="font-bold text-sub-color1">지역</dt>
              <dd className="max-w-xs truncate">
                {formatLocationToString(lecturerRegion)}
              </dd>
            </div>
            <div className="row-start-4 flex gap-3 sm:row-start-auto">
              <dt className="text-sub-color1">
                <InstagramSVG
                  className={`${
                    instagramUrl ? 'fill-sub-color1' : 'fill-gray-500'
                  }`}
                />
              </dt>
              <dd className="max-w-xs truncate">{instagramUrl}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-bold text-sub-color1">장르</dt>
              {/* 추후 데이터 반환 타입 변경 시 변경 예정 */}
              <dd className="max-w-xs truncate">
                {formatGenreToString(lecturerDanceGenre)}
              </dd>
            </div>
            <Link
              href={youtubeUrl || ''}
              target="_blank"
              className={`${
                youtubeUrl ?? 'pointer-events-none'
              } row-start-5 flex gap-3 sm:row-start-auto`}
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
              <dd className={`${youtubeUrl && 'underline'} max-w-xs truncate`}>
                {youtubeUrl.replace('https://', '')}
              </dd>
            </Link>
            <div className="flex gap-3">
              <dt className="font-bold text-sub-color1">소속</dt>
              <dd className="max-w-xs truncate">{affiliation}</dd>
            </div>
            <Link
              href={homepageUrl || ''}
              className={`${
                homepageUrl ?? 'pointer-events-none'
              } row-start-6 flex gap-3 sm:row-start-auto`}
              target="_blank"
            >
              <dt className="text-sub-color1">
                <LinkSVG
                  className={`${
                    homepageUrl ? 'fill-sub-color1' : 'fill-gray-500'
                  }`}
                />
              </dt>
              <dd className={`${homepageUrl && 'underline'} max-w-xs truncate`}>
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
      {lecturerInstagramPostUrl.length > 0 &&
        lecturerInstagramPostUrl.some(({ url }) => url) && (
          <div className="flex w-full overflow-x-auto px-5 sm:justify-center">
            <section className="inline-flex flex-nowrap gap-3 ">
              {lecturerInstagramPostUrl
                .filter(({ url }) => url)
                .map((insta, index) => (
                  <InstagramIframe key={index} link={insta.url} />
                ))}
            </section>
          </div>
        )}
      {/* 강사소개 섹션 */}
      <section
        id="introduction-section"
        className="w-full max-w-[51.1rem] px-5 pt-10 sm:px-0"
      >
        <h2 className={h2Style}>강사소개</h2>
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlString(introduction) }}
        />
      </section>
      {/* 강사 경력 섹션 */}
      <section
        id="work-experience-section"
        className=" w-full max-w-[51.1rem] px-5 pt-20 sm:px-0"
      >
        <h2 className={h2Style}>강사 경력</h2>
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlString(experience) }}
        />
      </section>
      {/* 진행중인 강의 섹션 */}
      <section
        id="class-section"
        className="flex w-full flex-col items-center pt-20 "
      >
        <div className="w-full max-w-[51.1rem] ">
          <h2 className={h2Style}>진행중인 강의 {classList.length}개</h2>
        </div>
        {classList.length > 0 && <ClassList classList={classList} />}
      </section>

      <section className="flex w-full flex-col items-center pt-20 ">
        <div className="w-full max-w-[51.1rem] ">
          <h2 className={h2Style}>패스권 {passListData.length}개</h2>
        </div>
        {passListData.length > 0 && <div>asdasd</div>}
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
    <div className="h-[535px] w-[16.6875rem] overflow-hidden">
      <iframe
        height="535"
        width="363"
        src={`${urlObj.toString()}embed/`}
        scrolling="no"
        frameBorder="0"
        className="h-full w-full"
      />
    </div>
  );
};
