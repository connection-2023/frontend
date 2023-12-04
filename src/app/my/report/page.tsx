'use client';
import { useEffect, useState } from 'react';
import { NoteSVG } from '@/icons/svg';
import { getUserReport } from '@/lib/apis/reportApis';
import ReportModal from './ReportModal';
import { IUserReportResponse } from '@/types/report';

const ReportHistoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userReportData, setUserReportData] = useState<IUserReportResponse[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      const reportData = await getUserReport(100, 0, 0, 0, 0, 'ALL');

      setUserReportData(reportData.reportList);
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="col-span-2 flex w-full flex-col rounded-lg bg-white p-5 text-sm text-gray-100 shadow-float">
      <h1 className="mb-[1.81rem] text-2xl font-bold">신고내역</h1>

      <table className="w-full border-collapse px-4 py-2">
        <thead>
          <tr className="flex items-center gap-10 border-y border-solid border-black px-4 py-2 text-left font-semibold">
            <th className="w-24">신고대상</th>
            <th className="w-36 flex-1">신고사유</th>
            <th className="w-12 whitespace-nowrap">상태</th>
          </tr>
        </thead>
        <tbody>
          {userReportData.map((item) => (
            <TableList
              key={item.id}
              {...item}
              isModalOpen={isModalOpen}
              onClick={openModal}
              closeModal={closeModal}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ReportHistoryPage;

interface TableListProps extends IUserReportResponse {
  closeModal: () => void;
  onClick: () => void;
  isModalOpen: boolean;
}

const TableList = ({
  targetUser,
  targetLecturer,
  reason,
  userReportType,
  isAnswered,
  isModalOpen,
  onClick,
  closeModal,
}: TableListProps) => {
  const target = targetUser
    ? targetUser.nickname
    : targetLecturer
    ? targetLecturer.nickname
    : null;
  const status = isAnswered ? '처리완료' : '처리중';

  const reportTypes = userReportType.map((type) => type.reportType.description);
  const str = reportTypes.length > 1 ? `외 ${reportTypes.length - 1}` : '';

  return (
    <tr className="flex items-start gap-10 border-b border-solid border-gray-700 px-4 text-left font-medium">
      <th className="h-full w-24 py-2">{target}</th>
      <th className="flex w-36 flex-1 flex-col items-center gap-[0.31rem] py-2">
        <p className="flex w-full items-center">
          {reportTypes[0] + str}

          <NoteSVG
            width="16"
            height="16"
            onClick={onClick}
            className={`ml-1.5 cursor-pointer ${
              isModalOpen ? 'stroke-black' : 'stroke-gray-500'
            }  hover:stroke-black`}
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
          />
        </div>
      </th>
      <th
        onClick={onClick}
        className={`w-12 cursor-pointer whitespace-nowrap py-2 ${
          status === '처리중' ? 'text-sub-color1' : 'text-gray-500'
        } underline`}
      >
        {status}
      </th>
    </tr>
  );
};
