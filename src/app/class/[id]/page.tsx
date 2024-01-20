import Image from 'next/image';
import Link from 'next/link';
import { ButtonStyles, CLASS_SECTIONS } from '@/constants/constants';
import { dummyClass } from '@/constants/dummy';
import {
  LocationSVG,
  TimeSVG,
  GroupSVG,
  LevelSVG,
  BasicCalendarSVG,
  ChatSVG,
  GenreSVG,
} from '@/icons/svg';
import {
  getClassInfo,
  getClassSchedules,
  getUserReservation,
} from '@/lib/apis/serverApis/classPostApis';
import { getClassCouponList } from '@/lib/apis/serverApis/couponApis';
import { useUserStore } from '@/store';
import {
  formatLocationToString,
  formatGenreToString,
  formatDate,
} from '@/utils/parseUtils';
import { sanitizeHtmlString } from '@/utils/sanitizeHtmlString';
import Apply from './_components/Apply';
import ClassReviewSection from './_components/ClassReviewSection';
import DiscountCouponBanner from './_components/DiscountCouponBanner';
import OptionButton from './_components/OptionButton';
import ReadMore from './_components/ReadMore';
import UserReservation from './_components/UserReservation';
import Carousel from '@/components/Carousel/Carousel';
import Notice from '@/components/ClassNotice/Notice';
import Map from '@/components/Map/Map';
import Nav from '@/components/Nav/Nav';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import Review from '@/components/Review/Review';
import ScheduleView from '@/components/ScheduleView/ScheduleView';

export const dynamic = 'force-dynamic';

const h2Style = 'mb-2 text-lg font-bold';
const h3Style = 'flex gap-[0.38rem] text-sm';

const ClassDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  // parallel requests
  const { userType } = useUserStore.getState();
  const classData = getClassInfo(id);
  const classSchedules = getClassSchedules(id);
  const userReservationData = getUserReservation(id);
  const couponLists = getClassCouponList(id, userType === 'user');

  const [classInfo, classSchedule, userReservation, couponList] =
    await Promise.all([
      classData,
      classSchedules,
      userReservationData,
      couponLists,
    ]);

  if (classInfo instanceof Error || classSchedule instanceof Error) {
    return <></>;
  }
  const { lecturer, lecture } = classInfo;
  const {
    title,
    difficultyLevel,
    isGroup,
    duration,
    lecturerId,
    price,
    stars,
    maxCapacity,
    introduction,
    curriculum,
    startDate,
    endDate,
    lectureMethod,
    locationDescription,
    lectureToRegion,
    detailAddress,
    reservationDeadline,
    lectureToDanceGenre,
    lectureNotification,
    lectureImage,
    reviewCount,
    isLike,
  } = lecture;

  const { schedule, holidayArr } = classSchedule;

  const { locationDetail, studioName } = dummyClass;

  const filteredSchedule = schedule.filter((schedule) => {
    const isHoliday = holidayArr.some(
      (holiday) => holiday === schedule.startDateTime,
    );
    return !isHoliday;
  });

  return (
    <main className="border-box mx-auto mt-[1.38rem] box-border grid grid-cols-1 gap-x-12 md:grid-cols-[3fr_1fr] md:gap-x-5 xl:grid-cols-[1fr_2fr_1fr]">
      <section className="mb-4 flex w-full flex-col items-center border-b border-solid border-gray-500 md:col-span-2 xl:col-span-3">
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

        <div className="relative flex w-full max-w-[40rem] px-4 text-lg font-bold md:justify-center">
          <h1 className="w-11/12 md:text-center">{title}</h1>
          <div className="absolute right-4 flex flex-col-reverse items-center gap-2 md:right-0 md:flex-row">
            <OptionButton
              lecturerId={lecturerId}
              title={title}
              postId={id}
              isLike={isLike}
            />
          </div>
        </div>

        {/* Review */}
        <div className="mb-4 mt-2 flex w-full max-w-[40rem] gap-1 px-4 md:mb-6 md:justify-center">
          <Review average={stars} />
          <span className="text-sm font-bold text-gray-500">({stars})</span>
        </div>

        {/* 쿠폰 배너 */}
        {couponList && (
          <div className="w-full max-w-[40rem] border-b border-solid border-gray-700 px-4 pb-3">
            <DiscountCouponBanner couponList={couponList} price={price} />
          </div>
        )}

        <hr className="mb-4 h-1 w-full max-w-[40rem] md:mb-6" />
        {/* Class Info */}
        <ul className="mb-4 grid w-full max-w-[40rem] grid-cols-2 gap-y-3.5 px-4 md:mb-7 md:flex md:flex-wrap md:justify-items-center md:gap-x-10 md:whitespace-nowrap">
          <li className={h3Style}>
            <LocationSVG />
            <span className="w-fit break-keep">
              {formatLocationToString(lectureToRegion)}
            </span>
          </li>
          <li className={h3Style}>
            <GenreSVG />
            <span className="w-fit break-keep">
              {formatGenreToString(lectureToDanceGenre)}
            </span>
          </li>

          <li className={h3Style}>
            <TimeSVG /> {duration}분
          </li>
          <li className={h3Style}>
            <GroupSVG />
            {isGroup ? `그룹레슨 (${maxCapacity}인)` : '개인레슨'}
          </li>
          <li className={h3Style}>
            <LevelSVG /> {difficultyLevel}
          </li>
        </ul>
      </section>
      <div className="fixed bottom-[6rem] z-modal flex w-full justify-center px-4 xl:bottom-6 ">
        <UserReservation userReservation={userReservation} />
      </div>

      {/* 임시 빈 공간 */}
      <div className="hidden xl:block" />

      <section className="flex flex-col px-4 md:px-10">
        <Nav sections={CLASS_SECTIONS} />

        <Notice
          content={lectureNotification.notification}
          updateDate={lectureNotification.updatedAt}
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
          <div className="flex h-[1.8rem] w-[12.5rem] items-center gap-[0.81rem] whitespace-nowrap text-sm font-normal">
            <Link
              href={`/instructor/${lecturer.id}`}
              className={`h-[28px] ${ButtonStyles.secondary}`}
            >
              강사 프로필
            </Link>
            {/* 채팅으로 링크 연결하기 */}
            <Link
              href={`/chat/${lecturer.id}`}
              className={`h-[28px] ${ButtonStyles.secondary}`}
            >
              <ChatSVG className="mr-[3px] stroke-black" />
              문의하기
            </Link>
          </div>
        </div>

        {/* 클래스 소개 */}
        <section id="intro-section" className="mb-14 scroll-mt-16 text-sm">
          <h2 className={h2Style}>클래스 소개</h2>
          <p>{introduction}</p>
        </section>

        {/* 커리큘럼 */}
        <section id="curriculum-section" className="relative mb-14 text-sm ">
          <h2 className={h2Style}>커리큘럼</h2>

          <div
            dangerouslySetInnerHTML={{ __html: sanitizeHtmlString(curriculum) }}
            className="curriculum line-clamp-[18] peer-checked:line-clamp-none"
          />
          <ReadMore />
        </section>

        <section
          id="date-section"
          className="mb-14 scroll-mt-16 whitespace-nowrap"
        >
          <h2 className={h2Style}>일정 및 시간</h2>
          <div className="my-4 flex gap-7">
            <span className="flex items-center gap-2">
              <BasicCalendarSVG className="w-[19px] fill-sub-color1" />
              {`${formatDate(startDate)}~${formatDate(endDate)}`}
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

        {/* <section id="location-section" className="mb-14 scroll-mt-16">
          <h2 className={h2Style}>진행 장소</h2>
          <span className="mb-[0.62rem] mt-2 flex items-center gap-[0.13rem]">
            <LocationSVG /> {detailAddress}
          </span>
          <div className="h-[18.25rem] max-w-[40rem] bg-slate-100">
            <Map address={locationDetail} studioName={studioName} />
          </div>
          <p className="text-sm font-normal">{locationDescription}</p>
        </section> */}

        {/* 클래스 후기 */}
        <ClassReviewSection id={id} stars={stars} />
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
