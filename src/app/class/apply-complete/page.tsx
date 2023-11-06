import Link from 'next/link';
import React from 'react';
import { ApplySuccessSVG, WavyLineSVG } from '@/icons/svg';

const applicationDetails = [
  {
    type: '클래스',
    content: `"원밀리언 댄스 스튜디오 with리아킴" 에게 배우는 댄스 입문`,
  },
  {
    type: '횟수',
    content: `(A반)10회`,
  },
  {
    type: '총 금액',
    content: `200,000원`,
  },
  {
    type: '결제일시',
    content: `2023.10.23 17:00:55`,
  },
  {
    type: '결제방식',
    content: `카드 결제`,
  },
  {
    type: '승인번호',
    content: `2203286`,
  },
  {
    type: '결제금액',
    content: `200,000원`,
  },
  {
    type: '영수증',
    content: (
      <Link
        href="/class/apply-complete/receipt"
        className="underline underline-offset-2"
      >
        영수증 보기
      </Link>
    ),
  },
];

const ApplyCompletePage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="flex w-full flex-col items-center whitespace-nowrap">
      <ApplySuccessSVG className="mb-5 mt-6" />
      <h1 className="mb-6 text-2xl font-bold">클래스 신청이 완료되었습니다</h1>
      <WavyLineSVG />
      <ul className="mb-6 mt-4 grid grid-cols-[min-content_minmax(max-content,_1fr)] gap-x-4 gap-y-3 text-sm font-normal">
        {applicationDetails.map((detail, index) => (
          <React.Fragment key={index}>
            <li className="flex w-fit font-semibold">{detail.type}</li>
            <li>{detail.content}</li>
            {index === 2 || index === 4 ? (
              <hr className="col-span-2 my-2 border-dashed border-gray-500" />
            ) : null}
          </React.Fragment>
        ))}
      </ul>
      <WavyLineSVG />

      <div className="mt-6 flex h-10 w-full gap-4 text-lg font-semibold">
        <Link
          href="" // 마이페이지 결제 내역으로 가기
          className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-500 text-white"
        >
          결제내역 보기
        </Link>
        <Link
          href={`/class/${searchParams.id}`}
          className="flex w-full cursor-pointer items-center justify-center rounded-md bg-black text-white"
        >
          확인
        </Link>
      </div>
    </div>
  );
};

export default ApplyCompletePage;
