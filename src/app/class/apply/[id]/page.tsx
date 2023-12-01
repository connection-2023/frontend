import { parseISO } from 'date-fns';
import { revalidateTag } from 'next/cache';
import ApplySidebar from './_components/ApplySidebar';
import PaymentType from './_components/PaymentType';
import ReservationInfo from './_components/ReservationInfo';
import { MusicalNoteSVG, NoticeSVG } from '@/icons/svg';
import {
  getClassInfo,
  getClassSchedules,
} from '@/lib/apis/serverApis/classPostApis';
import { formatDateTime } from '@/utils/parseUtils';

const ClassApplyPage = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] };
}) => {
  revalidateTag('schedules');
  const { count } = searchParams;
  const classData = getClassInfo(id);
  const classSchedules = getClassSchedules(id);

  const [classInfo, classSchedule] = await Promise.all([
    classData,
    classSchedules,
  ]);

  if (classInfo instanceof Error || classSchedule instanceof Error) {
    return <></>;
  }

  const { title, duration, maxCapacity, reservationComment, price } =
    classInfo.lecture;
  const { schedule } = classSchedule;

  // 쿼리 파싱
  const initialApplyData = Array.isArray(count)
    ? count.map((item) => {
        const [lectureScheduleId, participants] = item.split('-').map(Number);
        return {
          lectureScheduleId,
          participants,
        };
      })
    : (() => {
        const [lectureScheduleId, participants] = count.split('-').map(Number);
        return [
          {
            lectureScheduleId,
            participants,
          },
        ];
      })();

  const initialScheduleIds = initialApplyData.map(
    (selectedLecture) => selectedLecture.lectureScheduleId,
  );

  const selectedSchedule = schedule.filter((lecture) =>
    initialScheduleIds.includes(lecture.id),
  );

  const processedSchedules = selectedSchedule.map((lecture) => {
    const datetime = parseISO(lecture.startDateTime);
    const remain = maxCapacity - lecture.numberOfParticipants;
    const matchedSchedule = initialApplyData.find(
      (item) => item.lectureScheduleId === lecture.id,
    );
    const participants = matchedSchedule ? matchedSchedule.participants : 0;

    return {
      lectureScheduleId: lecture.id,
      dateTime: formatDateTime(datetime, duration),
      remain,
      participants,
    };
  });

  return (
    <div className="border-box mx-auto mb-20 flex grid w-full grid-cols-1 gap-x-12 px-4 md:px-[4.5rem] lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_2fr_1fr]">
      {/* 임시 빈 공간 */}
      <div className="hidden xl:block" />

      <section className="w-full lg:max-w-[40rem]">
        <h2 className="flex w-full items-center gap-2 whitespace-pre-line break-keep border-b-[3px] border-solid border-black py-[0.81rem] text-2xl font-bold">
          <MusicalNoteSVG
            width="21"
            height="21"
            className="mr-1 shrink-0 cursor-pointer stroke-black"
          />
          {title}
        </h2>

        {reservationComment && (
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
        )}

        <ReservationInfo
          initialApplyData={initialApplyData}
          processedSchedules={processedSchedules}
        />

        <section className="mt-4 rounded-md px-4 py-[1.31rem] shadow-vertical">
          <h3 className="text-lg font-semibold">쿠폰/패스권 적용</h3>
          {/* 쿠폰 선택 */}
        </section>

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
  );
};

export default ClassApplyPage;
