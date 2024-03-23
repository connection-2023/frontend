import { NoticeSVG } from '@/icons/svg';
import { getClassSchedules } from '@/lib/apis/serverApis/classPostApis';
import { formatDate } from '@/utils/parseUtils';
import ClassApplicationInfo from './ClassApplicationInfo';
import RegularClassApplicationInfo from './RegularClassApplicationInfo';
import {
  IClassSchedule,
  IRegularClassSchedule,
  IClassDetailResponse,
} from '@/types/class';

const ClassInfo = async ({
  id,
  searchParams,
  classDetailData,
}: {
  id: string;
  searchParams: { [key: string]: string };
  classDetailData: IClassDetailResponse;
}) => {
  const { lectureScheduleId, count } = searchParams;
  if (!lectureScheduleId || !count)
    throw Error('lectureScheduleId나 count가 설정되지 않았습니다');

  const classSchedules = await getClassSchedules(id);

  const { schedules, regularLectureStatus } = classSchedules;
  const { duration, maxCapacity, reservationComment, startDate, endDate } =
    classDetailData;

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
    <>
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
        {/* 정기 클래스 */}
        {regularLectureStatus && findSelectedSchedule && (
          <RegularClassApplicationInfo
            schedule={regularLectureStatus}
            initSelectedSchedule={findSelectedSchedule as IRegularClassSchedule}
            range={`${formatDate(startDate)}~${formatDate(endDate)}`}
            duration={duration}
            maxCapacity={maxCapacity}
            applyCount={Number(count)}
          />
        )}
      </section>
    </>
  );
};

export default ClassInfo;
