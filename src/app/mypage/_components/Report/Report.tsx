'use client';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { NoteSVG } from '@/icons/svg';
import { getInstructorReport, getUserReport } from '@/lib/apis/reportApis';
import Spinner from '@/components/Spinner/Spinner';
import { IReportResponse } from '@/types/report';

const ReportModal = dynamic(() => import('./ReportModal'));

const Report = ({ type }: { type: 'instructor' | 'user' }) => {
  const fetchReportList = async () => {
    if (type === 'user') {
      return await getUserReport(100, 0, 0, 0, 0, 'ALL');
    } else {
      return await getInstructorReport(100, 0, 0, 0, 0, 'ALL');
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['report', type],
    queryFn: fetchReportList,
  });

  return (
    <>
      <h1 className="mb-7 text-2xl font-bold">신고내역</h1>

      {isLoading || !data ? (
        <div className="flex h-40 w-[40rem] items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <table className="w-full max-w-[40rem] border-collapse px-4 py-2">
          <thead>
            <tr className="flex items-center gap-4 border-y border-solid border-black px-4 py-2 text-left font-semibold md:gap-10">
              <th className="w-20 md:w-24">신고대상</th>
              <th className="w-32 flex-1 md:w-36">신고사유</th>
              <th className="w-12 whitespace-nowrap">상태</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <TableList key={item.id} {...item} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Report;

const TableList = (props: IReportResponse) => {
  const {
    targetUser,
    targetLecturer,
    reason,
    userReportType,
    isAnswered,
    userReportResponse,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const target = targetUser
    ? targetUser.nickname
    : targetLecturer
    ? targetLecturer.nickname
    : null;
  const status = isAnswered ? '처리완료' : '처리중';

  const reportTypes = userReportType.map((type) => type.reportType.description);
  const str = reportTypes.length > 1 ? ` 외 ${reportTypes.length - 1}` : '';

  const response = userReportResponse?.description;

  return (
    <tr className="flex items-start gap-4 border-b border-solid border-gray-700 px-4 text-left font-medium md:gap-10">
      <th className="h-full w-20 py-2 md:w-24">{target}</th>
      <th className="flex w-32 flex-1 flex-col items-center gap-1.5 py-2 md:w-36">
        <p className="flex w-full items-center">
          {reportTypes[0] + str}

          <NoteSVG
            width="16"
            height="16"
            onClick={openModal}
            className="ml-1.5 cursor-pointer stroke-gray-500 hover:stroke-black"
          />
        </p>
        <div>
          <ReportModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            target={target}
            reportTypes={reportTypes}
            reason={reason}
            status={status}
            response={response}
          />
        </div>
      </th>
      <th
        onClick={openModal}
        className={`w-12 cursor-pointer whitespace-nowrap py-2 ${
          status === '처리중' ? 'text-sub-color1' : 'text-gray-500'
        } underline`}
      >
        {status}
      </th>
    </tr>
  );
};
