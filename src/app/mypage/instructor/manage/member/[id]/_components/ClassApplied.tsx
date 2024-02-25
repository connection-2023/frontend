'use client';
import Link from 'next/link';
import { useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import formatDate from '@/utils/formatDate';
import Button from '@/components/Button/Button';
import MobileModal from '@/components/Modal/MobileModal';
import { GetMyMemberData } from '@/types/instructor';

interface ClassAppliedProps {
  member: GetMyMemberData;
}

const ClassApplied = ({ member }: ClassAppliedProps) => {
  const isSm = useMediaQuery('(min-width: 640px)');
  const [requestsView, setRequestsView] = useState(false);
  const { originalPrice, reservation } = member;

  const { lectureSchedule, regularLectureStatus, requests } = reservation;

  const { lecture } = lectureSchedule ? lectureSchedule : regularLectureStatus;

  const schedule = lectureSchedule
    ? [{ ...lectureSchedule }]
    : regularLectureStatus.regularLectureSchedule;

  if (!schedule) return null;

  const requestsViewClosed = () => {
    setRequestsView(false);
  };

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
            onClick={() => setRequestsView((prev) => !prev)}
          >
            {requestsView ? '요청사항 닫기' : '요청사항'}
          </button>
          {requestsView &&
            (isSm ? (
              <div className="absolute right-0 mt-2 hidden max-w-md break-words rounded-md border border-sub-color1 bg-white p-2 sm:block">
                {requests}
              </div>
            ) : (
              <MobileModal
                isOpened={requestsView}
                handleClosed={requestsViewClosed}
              >
                <div className="flex h-3/5 flex-col gap-2 px-2">
                  <h2 className="font-bold">요청사항</h2>
                  <div className="flex-grow break-words rounded-md border border-gray-500 p-3">
                    {requests}
                  </div>
                  <Button color="secondary" onClick={requestsViewClosed}>
                    닫기
                  </Button>
                </div>
              </MobileModal>
            ))}
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
