import Link from 'next/link';
import { ButtonStyles, CLASS_SECTIONS } from '@/constants/constants';
import { TimeSVG, BasicCalendarSVG, ChatSVG } from '@/icons/svg';
import {
  getClassPreview,
  getClassDetail,
  getClassSchedules,
  getUserReservation,
} from '@/lib/apis/serverApis/classPostApis';
import { formatDate } from '@/utils/parseUtils';
import { sanitizeHtmlString } from '@/utils/sanitizeHtmlString';
import ClassReviewSection from './ClassReviewSection';
import ReadMore from './ReadMore';
import Notice from '@/components/ClassNotice/Notice';
import Map from '@/components/Map/Map';
import Nav from '@/components/Nav/Nav';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import ScheduleView from '@/components/ScheduleView/ScheduleView';
import { CLASS_HSTYLE } from '@/constants/constants';

import Apply from './Apply';
const ClassDetail = async ({ id }: { id: string }) => {
  const classDetailData = getClassDetail(id);
  const classSchedules = getClassSchedules(id);

  const [classDetail, classSchedule] = await Promise.all([
    classDetailData,
    classSchedules,
  ]);

  if (classSchedule instanceof Error || classDetail instanceof Error) {
    return <></>;
  }
  const {
    lecturer,
    startDate,
    endDate,
    reservationDeadline,
    reservationComment,
    price,
    notification,
    introduction,
    curriculum,
    reviewCount,
    locationDescription,
    location,
    maxCapacity,
    duration,
    stars,
  } = classDetail;

  const { schedule } = classSchedule;

  return (
    <>
      <section className="flex flex-col px-4 md:px-10">
        <Nav sections={CLASS_SECTIONS} />

        <Notice
          content={notification.content}
          updateDate={notification.updatedAt}
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
          <h2 className={CLASS_HSTYLE.h2}>클래스 소개</h2>
          <p>{introduction}</p>
        </section>

        {/* 커리큘럼 */}
        <section id="curriculum-section" className="relative mb-14 text-sm ">
          <h2 className={CLASS_HSTYLE.h2}>커리큘럼</h2>

          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtmlString(curriculum),
            }}
            className="curriculum line-clamp-[18] peer-checked:line-clamp-none"
          />
          <ReadMore />
        </section>

        <section
          id="date-section"
          className="mb-14 scroll-mt-16 whitespace-nowrap"
        >
          <h2 className={CLASS_HSTYLE.h2}>일정 및 시간</h2>
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
            lectureSchedule={schedule}
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
          schedule={schedule}
          duration={duration}
          maxCapacity={maxCapacity}
          price={price}
        />
      </section>
    </>
  );
};

export default ClassDetail;
