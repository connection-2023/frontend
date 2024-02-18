'use client';
import Link from 'next/link';
import formatDate from '@/utils/formatDate';
import { GetMyMemberData } from '@/types/instructor';

interface ClassAppliedProps {
  member: GetMyMemberData;
}

const ClassApplied = ({ member }: ClassAppliedProps) => {
  const { originalPrice, reservation } = member;

  const { lectureSchedule, regularLectureStatus, requests } = reservation;

  const { lecture } = lectureSchedule ? lectureSchedule : regularLectureStatus;

  const schedule = lectureSchedule
    ? [{ ...lectureSchedule }]
    : regularLectureStatus.regularLectureSchedule;

  if (!schedule) return null;

  return (
    <dl className="flex flex-col gap-3 rounded-md border border-gray-700 p-4 text-sm">
      <dd className="text-gray-300">
        {formatEventTime(schedule[0].startDateTime, schedule[0].endDateTime)}
      </dd>
      <dt>
        <Link href={`/class/${lecture.id}`}>{lecture.title}</Link>
      </dt>
      <hr />
      <dd className="flex justify-between">
        <div className="flex gap-2">
          <div className="flex gap-1 text-sub-color1">
            진행 <strong>0회</strong>
          </div>
          <div className="flex gap-1">
            전체 <strong>0회</strong>
          </div>
          <Link
            href="/mypage/instructor/income"
            className="underline underline-offset-4"
          >
            {originalPrice.toLocaleString()}원
          </Link>
        </div>
        <button
          className={`${
            requests
              ? 'underline underline-offset-4'
              : 'pointer-events-none text-gray-300'
          }`}
          onClick={() => console.log('aaa')}
        >
          요청사항
        </button>
      </dd>
    </dl>
  );
};

export default ClassApplied;

const formatEventTime = (startDateString: string, endDateString: string) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const formattedStartDate = formatDate(startDateString, true);
  const formattedEndDate = formatDate(endDateString, true);

  if (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate()
  ) {
    return `${formattedStartDate} ~ ${formattedEndDate.split(' ')[1]}`;
  } else {
    return `${formattedStartDate} ~ ${formattedEndDate}`;
  }
};
