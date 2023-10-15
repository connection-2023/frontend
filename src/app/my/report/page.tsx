'use client';
import { useState } from 'react';
import ReportModal from './ReportModal';
import { IReportList } from '@/types/types';
import { NoteSVG } from '../../../../public/icons/svg';

const data: IReportList[] = [
  {
    id: 1,
    target: '벅키',
    reason: '혐오 발언 또는 상징',
    detail: `제가 진행한 수업 후기에 욕설을 기재하였습니다.
    또한 금품갈취라는 허위 사실까지 작성하여 저의 이미지에 큰 타격을 입혔습
    니다.`,
    status: '처리중',
  },
  {
    id: 2,
    target: '벅키',
    reason: '혐오 발언 또는 상징',
    detail: `제가 진행한 수업 후기에 욕설을 기재하였습니다.
    또한 금품갈취라는 허위 사실까지 작성하여 저의 이미지에 큰 타격을 입혔습
    니다.`,
    status: '처리완료',
  },
  {
    id: 3,
    target: '벅키',
    reason: '혐오 발언 또는 상징',
    detail: `제가 진행한 수업 후기에 욕설을 기재하였습니다.
    또한 금품갈취라는 허위 사실까지 작성하여 저의 이미지에 큰 타격을 입혔습니다.`,
    status: '처리완료',
  },
];

enum filterOptions {
  All = '전체',
  Class = '클래스',
  User = '사용자',
}

const ReportHistoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(filterOptions.All);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.id as filterOptions;

    if (Object.values(filterOptions).includes(option)) {
      setSelectedOption(option);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="flex w-full flex-col text-sm text-sub-color3">
      <h1 className="mb-[1.81rem] mt-7 text-2xl font-bold">신고내역</h1>

      <ul className="mb-4 flex gap-4 font-medium">
        {Object.values(filterOptions).map((option) => (
          <li key={option} className="flex items-center gap-[0.31rem]">
            <input
              type="checkbox"
              id={option}
              checked={selectedOption === option}
              onChange={handleCheckboxChange}
              className="h-[18px] w-[18px] accent-sub-color1"
            />
            <label htmlFor={option}> {option}</label>
          </li>
        ))}
      </ul>

      <table className="w-full max-w-[40rem] border-collapse px-4 py-2">
        <thead>
          <tr className="flex items-center gap-10 border-y border-solid border-black px-4 py-2 text-left font-semibold">
            <th className="w-24">신고대상</th>
            <th className="w-36 flex-1">신고사유</th>
            <th className="w-12 whitespace-nowrap">상태</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <TableList
              key={item.id}
              id={item.id}
              target={item.target}
              reason={item.reason}
              detail={item.detail}
              status={item.status}
              onClick={openModal}
            />
          ))}
        </tbody>
      </table>
      <ReportModal isOpen={isModalOpen} closeModal={closeModal} />
    </section>
  );
};

export default ReportHistoryPage;

interface ITableList {
  id: number;
  target: string;
  reason: string;
  detail: string;
  status: '처리중' | '처리완료';
  onClick: () => void;
}

const TableList = ({
  id,
  target,
  reason,
  detail,
  status,
  onClick,
}: ITableList) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <tr className="flex items-start gap-10 border-b border-solid border-[#D9D9D9] px-4 text-left font-medium">
      <th className="h-full w-24 py-2">{target}</th>
      <th className="flex w-36 flex-1 flex-col items-center gap-[0.31rem] py-2">
        <p className="flex w-full items-center">
          {reason}

          <NoteSVG
            width="16"
            height="16"
            onClick={() => setIsOpened(!isOpened)}
            className={`cursor-pointer ${
              isOpened ? 'stroke-black' : 'stroke-sub-color2'
            }  hover:stroke-black`}
          />
        </p>
        {isOpened && <p className="mt-3 w-full text-sub-color2">{detail}</p>}
      </th>
      <th
        onClick={onClick}
        className={`w-12 cursor-pointer whitespace-nowrap py-2 ${
          status === '처리중' ? 'text-sub-color1' : 'text-sub-color2'
        } underline`}
      >
        {status}
      </th>
    </tr>
  );
};
