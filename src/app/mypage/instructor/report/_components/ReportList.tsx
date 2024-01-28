import dynamic from 'next/dynamic';
import { useState } from 'react';
import { NoteSVG } from '@/icons/svg';
import { IReportResponse } from '@/types/report';

const ReportModal = dynamic(() => import('./ReportModal'));

const ReportList = ({
  targetUser,
  targetLecturer,
  reason,
  userReportType,
  isAnswered,
  userReportResponse,
}: IReportResponse) => {
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
      <th className="flex w-32 flex-1 flex-col items-center gap-[0.31rem] py-2 md:w-36">
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
          {isModalOpen && (
            <ReportModal
              isOpen={isModalOpen}
              closeModal={closeModal}
              target={target}
              reportTypes={reportTypes}
              reason={reason}
              status={status}
              response={response}
            />
          )}
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

export default ReportList;
