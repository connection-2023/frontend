import { CouponSVG, MusicalNoteSVG, NoticeSVG, PassSVG } from '@/icons/svg';
import {
  getClassPreview,
  getClassDetail,
  getClassSchedules,
} from '@/lib/apis/serverApis/classPostApis';
import { formatDate } from '@/utils/parseUtils';
import ApplySidebar from './_components/ApplySidebar';
import ClassApplicationInfo from './_components/ClassApplicationInfo';
import Coupon from './_components/Coupon';
import Pass from './_components/Pass';
import PaymentType from './_components/PaymentType';
import RegularClassApplicationInfo from './_components/RegularClassApplicationInfo';
import ReservationInfo from './_components/ReservationInfo';
import { IClassSchedule, IRegularClassSchedule } from '@/types/class';
import type { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;
  const classData = await getClassPreview(id);

  return {
    title: `${classData.title} 클래스 신청`,
    description: `${classData.title} 클래스 신청 페이지`,
  };
};

const ClassApplyPage = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const { lectureScheduleId, count } = searchParams;
  if (!lectureScheduleId || !count)
    throw Error('lectureScheduleId나 count가 설정되지 않았습니다');

  const classPreview = getClassPreview(id);
  const classDetailData = getClassDetail(id);
  const classSchedules = getClassSchedules(id);
  const [classPreviewData, classDetail, classSchedule] = await Promise.all([
    classPreview,
    classDetailData,
    classSchedules,
  ]);

  const { schedules, regularLectureStatus } = classSchedule;
  const { title } = classPreviewData;
  const {
    duration,
    maxCapacity,
    reservationComment,
    price,
    startDate,
    endDate,
  } = classDetail;

  const clickableDates =
    schedules?.map((item) => new Date(item.startDateTime)) || [];

  if (!schedules && !regularLectureStatus)
    throw Error('클래스 일정이 없습니다!');

  const findSelectedSchedule = (() => {
    if (schedules) {
      return schedules.find((item) => item.id === Number(lectureScheduleId));
    }

    if (regularLectureStatus) {
      return regularLectureStatus.find(
        (item) => item.id === Number(lectureScheduleId),
      );
    }
  })();

  const initialClickDate = (findSelectedSchedule as IClassSchedule)
    ?.startDateTime
    ? new Date((findSelectedSchedule as IClassSchedule).startDateTime)
    : undefined;

  return (
    <main className="mx-auto w-full flex-1">
      <h1 className="mb-6 w-full border-b border-solid border-gray-700 py-4 text-center text-2xl font-bold">
        클래스 신청하기
      </h1>
      <div className="border-box mb-20 flex grid w-full grid-cols-1 justify-items-center gap-x-12 px-4 md:px-[4.5rem] lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_2fr_1fr]">
        {/* 임시 빈 공간 */}
        <div className="hidden xl:block" />

        <section className="w-full md:w-[40rem]">
          <h2 className="flex w-full items-center gap-2 whitespace-pre-line break-keep border-b-[3px] border-solid border-black py-3.5 text-2xl font-bold">
            <MusicalNoteSVG
              width="21"
              height="21"
              className="mr-1 shrink-0 stroke-black"
            />
            {title}
          </h2>

          {reservationComment.trim() !== '' ? (
            <section>
              <h3 className="my-2 flex items-center gap-1 font-semibold text-main-color">
                <NoticeSVG
                  width="19"
                  height="14"
                  className="storke-main-color fill-main-color"
                />
                (강사의 말) 꼭 숙지해주세요!
              </h3>
              <div className="text-normal whitespace-pre-line break-keep border border-solid border-black p-2 text-sm">
                {reservationComment}
              </div>
            </section>
          ) : null}

          {/* 원데이 클래스 */}
          <section className="mt-4 rounded-md px-4 py-[1.31rem] shadow-vertical">
            <h3 className="text-lg font-semibold">신청한 클래스</h3>

            {schedules && (
              <ClassApplicationInfo
                lectureScheduleId={lectureScheduleId}
                clickableDates={clickableDates}
                findSelectedSchedule={findSelectedSchedule as IClassSchedule}
                lectureSchedule={schedules}
                maxCapacity={maxCapacity}
                duration={duration}
                applyCount={Number(count)}
                initialClickDate={initialClickDate}
              />
            )}

            {regularLectureStatus && findSelectedSchedule && (
              <RegularClassApplicationInfo
                schedule={regularLectureStatus}
                initSelectedSchedule={
                  findSelectedSchedule as IRegularClassSchedule
                }
                range={`${formatDate(startDate)}~${formatDate(endDate)}`}
                duration={duration}
                maxCapacity={maxCapacity}
              />
            )}

            {/* 정기 클래스 */}
          </section>
          <ReservationInfo />

          <section className="mt-4 px-4 py-[1.31rem] shadow-vertical">
            <h3 className="flex gap-1 text-lg font-semibold">
              <CouponSVG className="h-6 w-6 fill-sub-color1" />
              쿠폰 적용
            </h3>
            <Coupon id={id} price={price} />
          </section>

          {schedules && (
            <section className="mt-4 px-4 py-[1.31rem] shadow-vertical">
              <h3 className="flex gap-1 text-lg font-semibold">
                <PassSVG className="h-6 w-6 fill-sub-color1" />
                패스권
              </h3>
              <Pass id={Number(id)} />
            </section>
          )}

          <section className="mt-4 min-h-[447px] overflow-hidden rounded-md shadow-vertical">
            {/* <h3 className="text-lg font-semibold">결제 방법 선택</h3> */}
            {/* 페이 버튼 */}
            <PaymentType price={price} />
          </section>
        </section>

        <aside className="mt-3.5 h-full w-full rounded-md shadow-vertical lg:max-w-[17rem] lg:shadow-none">
          <ApplySidebar postId={id} title={title} price={price} />
        </aside>
      </div>
    </main>
  );
};

export default ClassApplyPage;
