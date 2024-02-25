import React, { useMemo } from 'react';
import { CSVLink } from 'react-csv';
import { ExcelSVG } from '@/icons/svg';
import formatDate from '@/utils/formatDate';
import { formatPhoneNumber } from '@/utils/parseUtils';
import { MemberData } from '@/types/instructor';

interface ExcelDownloadProps {
  memberList: MemberData[];
}

const ExcelDownload = ({ memberList }: ExcelDownloadProps) => {
  const memberData = useMemo(() => {
    return memberList.map(({ memo, user, reservation }) => {
      const { lectureSchedule, regularLectureStatus } = reservation;

      let schedule, title;

      if (lectureSchedule) {
        const { startDateTime, endDateTime, lecture } = lectureSchedule;

        title = lecture.title;

        schedule = `${formatDate(startDateTime, true)} ~ ${formatDate(
          endDateTime,
          true,
        )}`;
      } else if (regularLectureStatus) {
        const { regularLectureSchedule, lecture } = regularLectureStatus;

        title = lecture.title;

        schedule = regularLectureSchedule
          .reduce(
            (acc, { startDateTime, endDateTime }) =>
              (acc += `${formatDate(startDateTime, true)} ~ ${formatDate(
                endDateTime,
                true,
              )}, `),
            '',
          )
          .trim()
          .slice(0, -1);
      }

      return {
        수강생: user.nickname,
        연락처: formatPhoneNumber(user.phoneNumber),
        '최근 신청한 클래스': title,
        '수업 일정': schedule,
        메모: memo,
      };
    });
  }, [memberList]);

  return (
    <CSVLink data={memberData} filename="connection_회원관리.csv">
      <button className="flex h-7 items-center justify-center whitespace-nowrap rounded-md bg-gray-100 px-2 text-sm text-white">
        <ExcelSVG width="20" height="20" />
        엑셀
        <p className="hidden sm:block">다운로드</p>
      </button>
    </CSVLink>
  );
};

export default ExcelDownload;
