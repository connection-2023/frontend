'use client';
import Link from 'next/link';
import { useState } from 'react';
import formatDate from '@/utils/formatDate';
import { GetMyMemberData } from '@/types/instructor';

interface ClassAppliedProps {
  member: GetMyMemberData;
}

const ClassApplied = ({ member }: ClassAppliedProps) => {
  const [requestsView, setRequestsView] = useState(false);
  const { originalPrice, reservation } = member;

  const { lectureSchedule, regularLectureStatus, requests } = reservation;

  const { lecture } = lectureSchedule ? lectureSchedule : regularLectureStatus;

  const schedule = lectureSchedule
    ? [{ ...lectureSchedule }]
    : regularLectureStatus.regularLectureSchedule;

  if (!schedule) return null;

  return (
    <dl className="flex flex-col gap-3 rounded-md border border-gray-700 bg-white p-4 text-sm shadow-float sm:bg-none sm:shadow-none">
      <dd className="flex items-center gap-2">
        {lectureSchedule ? (
          <div className="rounded-md bg-main-color-transparent px-2 py-0.5 text-main-color">
            원데이
          </div>
        ) : (
          <div className="rounded-md bg-sub-color1-transparent px-2 py-0.5 text-sub-color1">
            정기
          </div>
        )}
        {regularLectureStatus && (
          <>
            <div className="flex gap-1 text-sub-color1">
              진행 <strong>0회</strong>
            </div>
            <div className="flex gap-1">
              전체 <strong>0회</strong>
            </div>
          </>
        )}
        <Link
          href="/mypage/instructor/income"
          className="underline underline-offset-4"
        >
          {originalPrice.toLocaleString()}원
        </Link>
      </dd>
      <dt className="flex justify-between">
        <Link href={`/class/${lecture.id}`}>{lecture.title}</Link>
        <div className="relative">
          <button
            className={`${
              requests
                ? 'underline underline-offset-4'
                : 'pointer-events-none text-gray-300'
            }`}
            onClick={(prev) => setRequestsView(!prev)}
          >
            요청사항
          </button>
          {/* {requestsView && } */}
        </div>
      </dt>
      <hr />
      <dd className="flex justify-between">
        <div className="flex gap-2">
          {formatEventTime(schedule[0].startDateTime, schedule[0].endDateTime)}
        </div>
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
