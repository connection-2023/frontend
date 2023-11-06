import Image from 'next/image';
import { CLASS_SECTIONS } from '@/constants/constants';
import { dummyClass } from '@/constants/dummy';
import {
  LocationSVG,
  TimeSVG,
  GroupSVG,
  LevelSVG,
  BasicCalendarSVG,
} from '@/icons/svg';
import { getClassPost } from '@/lib/apis/classApis';
import {
  formatLocationToString,
  formatGenreToString,
} from '@/utils/parseUtils';
import { sanitizeHtmlString } from '@/utils/sanitizeHtmlString';
import Apply from './_components/Apply';
import ClassReviewSection from './_components/ClassReviewSection';
import DiscountCouponBanner from './_components/DiscountCouponBanner';
import ProfileButtons from './_components/ProfileButtons';
import Carousel from '@/components/Carousel/Carousel';
import Notice from '@/components/ClassNotice/Notice';
import Like from '@/components/Like/Like';
import Map from '@/components/Map/Map';
import Nav from '@/components/Nav/Nav';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import Review from '@/components/Review/Review';
import ScheduleView from '@/components/ScheduleView/ScheduleView';
import Sharing from '@/components/Sharing/Sharing';

const h2Style = 'mb-2 text-lg font-bold';
const h3Style = 'flex gap-[0.38rem] text-sm';

const ClassDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const classData = await getClassPost(id);

  if (classData instanceof Error) {
    console.error(classData.message);
    return <></>;
  }

  const {
    title,
    difficultyLevel,
    isGroup,
    duration,
    price,
    stars,
    lectureSchedule,
    lectureHoliday,
    maxCapacity,
    introduction,
    curriculum,
    lectureMethod,
    lecturer,
    lectureToRegion,
    detailAddress,
    reservationDeadline,
    lectureNotification,
    lectureImage,
    reviewCount,
    lectureReview,
  } = classData;
  const { notice, schedule, locationDetail, studioName } = dummyClass;

  const filteredSchedule = lectureSchedule.filter((schedule) => {
    const isHoliday = lectureHoliday.some(
      (holiday) => holiday.holiday === schedule.startDateTime,
    );
    return !isHoliday;
  });

  return (
    <main className="grid-auto-rows-2 border-box mx-auto mt-[1.38rem] box-border grid grid-cols-1 gap-x-12 md:grid-cols-[1fr_1.37fr_1fr]">
      <section className="mb-4 flex w-full flex-col items-center shadow-float md:col-span-3">
        {/* 클래스 이미지 */}
        <div className="mb-5 flex h-[18rem] w-full justify-center px-10">
          {lectureImage.length > 2 ? (
            <div className="relative h-full w-full overflow-hidden">
              <div className="h-full w-1/3">
                <Carousel
                  imgURL={lectureImage.map((image) => image.imageUrl)}
                  move={true}
                  priority={3}
                  showCurrentElementBackGround={false}
                />
              </div>
            </div>
          ) : (
            lectureImage.map((img, index) => (
              <div key={img.imageUrl + index} className="relative h-full w-1/3">
                <Image
                  src={img.imageUrl}
                  alt="Connection 댄스 춤 이미지"
                  fill
                  sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
                />
              </div>
            ))
          )}
        </div>

        <h1 className="relative flex w-full max-w-[40rem] px-4 text-lg font-bold md:justify-center">
          <p className="w-11/12 md:text-center">{title}</p>
          <div className="absolute right-4 flex flex-col-reverse items-center gap-2 md:right-0 md:flex-row">
            <Sharing mode="class" header={title} />
            <Like />
          </div>
        </h1>
        {/* Review */}
        <div className="mb-4 mt-2 flex w-full max-w-[40rem] gap-1 px-4 md:mb-6 md:justify-center">
          <Review average={stars} />
          <span className="text-sm font-bold text-gray-500">({stars})</span>
        </div>
        {/* 쿠폰 배너 */}
        <div className="w-full max-w-[40rem] border-b border-solid border-gray-700 px-4 pb-3">
          <DiscountCouponBanner discountPrice="10,000" />
        </div>

        <hr className="mb-4 h-1 w-full max-w-[40rem] md:mb-6" />
        {/* Class Info */}
        <div className="mb-4 grid w-full max-w-[40rem] grid-cols-2 gap-y-3.5 md:mb-7 md:grid-cols-4 md:justify-items-center">
          <h3 className={h3Style}>
            <LocationSVG />
            <span className="w-fit break-keep">
              {formatLocationToString(lectureToRegion)}
            </span>
          </h3>
          <h3 className={h3Style}>
            <TimeSVG /> {duration}분
          </h3>
          <h3 className={h3Style}>
            <GroupSVG />
            {isGroup ? `그룹레슨 (최대 ${maxCapacity}인)` : '개인레슨'}
          </h3>
          <h3 className={h3Style}>
            <LevelSVG /> {difficultyLevel}
          </h3>
        </div>
      </section>
      {/* 임시 빈 공간 */}
      <div className="" />

      <section className="flex flex-col px-4">
        <Nav sections={CLASS_SECTIONS} />

        <Notice
          content={lectureNotification.notification}
          updateDate={notice.lastDate}
        />
        {/* 프로필 */}
        <div className="mb-10 mt-[1.81rem] flex w-full items-center justify-between">
          <div className="text-lg font-bold">
            <ProfileImage
              src={lecturer.profileCardImageUrl}
              nickname={lecturer.nickname}
              size="medium"
            />
          </div>
          <div className="flex gap-[0.81rem] text-sm font-normal">
            <ProfileButtons id={lecturer.id} />
          </div>
        </div>

        {/* 클래스 소개 */}
        <section id="intro-section" className="mb-14 scroll-mt-16 text-sm">
          <h2 className={h2Style}>클래스 소개</h2>
          <p>{introduction}</p>
        </section>

        {/* 커리큘럼 */}
        <section id="curriculum-section" className="mb-14 text-sm">
          <h2 className={h2Style}>커리큘럼</h2>
          <div
            dangerouslySetInnerHTML={{ __html: sanitizeHtmlString(curriculum) }}
          />
        </section>

        <section
          id="date-section"
          className="mb-14 scroll-mt-16 whitespace-nowrap"
        >
          <h2 className={h2Style}>일정 및 시간</h2>
          <div className="my-4 flex gap-7">
            <span className="flex items-center gap-2">
              <BasicCalendarSVG className="w-[19px] fill-sub-color1" />
              {schedule.date}
            </span>
            <span className="flex items-center gap-2">
              <TimeSVG /> {duration}분 수업
            </span>
          </div>

          <p className="mb-2 text-sm font-medium text-main-color">
            *{reservationDeadline}시간 전까지 예약이 가능합니다
          </p>
          <ScheduleView
            duration={duration}
            lectureSchedule={filteredSchedule}
            maxCapacity={maxCapacity}
          />
        </section>

        <section id="location-section" className="mb-14 scroll-mt-16">
          <h2 className={h2Style}>진행 장소</h2>
          <span className="mb-[0.62rem] mt-2 flex items-center gap-[0.13rem]">
            <LocationSVG /> {detailAddress}
          </span>
          <div className="h-[18.25rem] max-w-[40rem] bg-slate-100">
            <Map address={locationDetail} studioName={studioName} />
          </div>
        </section>

        {/* 클래스 후기 */}
        <ClassReviewSection
          classTitle={title}
          reviewCount={reviewCount}
          stars={stars}
          userReviews={lectureReview}
        />
      </section>

      <section className="fixed bottom-0 w-full md:static md:w-auto md:max-w-[17rem]">
        <Apply
          schedule={filteredSchedule}
          duration={duration}
          maxCapacity={maxCapacity}
          price={price}
        />
      </section>
    </main>
  );
};

export default ClassDetailPage;
