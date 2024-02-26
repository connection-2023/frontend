import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';
import { BANK_CODE_TO_NAME } from '@/constants/constants';
import { BigArrowSVG, MoneySVG } from '@/icons/svg';
import { getRecentAccount, getTotalIncome } from '@/lib/apis/incomeApis';
import { initialDateObject } from '../_lib/initialDate';
import Button from '@/components/Button/Button';

interface AccountInfoProps {
  view: 'main' | 'payment';
  handleApply: () => void;
}

const INITIAL_START_DATE = new Date(2024, 1, 1);

const AccountInfo = ({ view, handleApply }: AccountInfoProps) => {
  const initialDate = initialDateObject();
  const [{ data: account }, { data: totalAmount }, { data: monthAmount }] =
    useQueries({
      queries: [
        { queryKey: ['recent', 'account'], queryFn: () => getRecentAccount() },
        {
          queryKey: ['income', 'total'],
          queryFn: () =>
            getTotalIncome(INITIAL_START_DATE, initialDate.to, '전체'),
        },
        {
          queryKey: ['income', 'month'],
          queryFn: () =>
            getTotalIncome(initialDate.from, initialDate.to, '전체'),
        },
      ],
    });

  return view === 'main' ? (
    <aside className="grid w-full grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-1">
      <section className="flex flex-col rounded-lg bg-white px-5 py-4 shadow-float">
        <ul className="mb-3 flex w-full flex-col gap-1 whitespace-nowrap text-sm text-gray-100">
          <li className="flex items-center">
            <p className="w-10 font-semibold">총 수익</p>
            <span className="ml-[0.69rem] text-lg font-bold text-black">
              {totalAmount?.toLocaleString()}원
            </span>
          </li>
          <li className="flex items-center">
            <p className="w-10 font-semibold">이번 달</p>
            <span className="ml-2.5 text-lg font-bold text-sub-color1">
              {monthAmount?.toLocaleString()}원
            </span>
          </li>
        </ul>
        <Button color="primary" onClick={handleApply}>
          <MoneySVG
            width="19"
            height="19"
            className="mb-0.5 mr-1.5 fill-main-color"
          />
          정산신청
        </Button>
      </section>

      <section className="flex h-fit w-full flex-col rounded-lg bg-white shadow-float shadow-float">
        <h2 className="flex h-12 w-full items-center justify-between border-b border-solid border-gray-700 pl-[1.19rem] text-lg font-semibold text-gray-100">
          계좌 정보
          <Link
            href="/mypage/instructor/info"
            prefetch={false}
            aria-label="계좌 정보 더보기"
          >
            <BigArrowSVG width="34" height="34" className="fill-gray-500" />
          </Link>
        </h2>
        <ul className="flex h-20 w-full flex-col justify-center gap-[0.81rem] px-[1.19rem] text-sm text-gray-100">
          <li className="flex gap-4">
            <p className="w-14 font-semibold">은행</p>
            <span>{BANK_CODE_TO_NAME[account?.bankCode]}</span>
          </li>
          <li className="flex gap-4 whitespace-nowrap">
            <p className="w-14 font-semibold">계좌번호</p>
            <span>{account?.accountNumber}</span>
          </li>
        </ul>
      </section>
    </aside>
  ) : (
    <aside className="flex h-fit w-full flex-col rounded-lg bg-white p-4 shadow-float">
      <h2 className="mb-2 text-sm font-semibold text-main-color">
        *정산금 지급 기준
      </h2>

      <p className="whitespace-pre-line break-keep text-sm text-gray-100">
        정산신청 날짜를 기준으로 가장 가까운 달의 <Highlight>1일</Highlight>{' '}
        혹은 <Highlight>15일</Highlight>에 신청 금액이 입금됩니다. 신청 후 해당
        날짜가 지났음에도 입금이 되지 않은 경우{' '}
        <Highlight>카카오톡 @connecntion_team</Highlight> 혹은 관리자 이메일{' '}
        <Highlight>connecntion_team@gmail.com</Highlight>으로 문의 주시면 빠른
        확인 도와드리겠습니다.
      </p>
    </aside>
  );
};

export default AccountInfo;

const Highlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-sm font-semibold text-gray-100">{children}</span>
  );
};
