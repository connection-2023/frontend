import { BigArrowSVG, MoneySVG } from '@/icons/svg';

const data = {
  bank: '우리은행',
  accountNumber: '1002-123-456789',
};

interface AccountInfoProps {
  view: 'main' | 'payment';
  handleApply: () => void;
}
const AccountInfo = ({ view, handleApply }: AccountInfoProps) => {
  return view === 'main' ? (
    <aside className="flex max-h-[16.5rem] flex-col gap-3">
      <section className="flex h-fit w-full max-w-xs flex-col rounded-lg bg-white shadow-float shadow-float">
        <h2 className="flex h-12 w-full items-center justify-between border-b border-solid border-gray-700 pl-[1.19rem] text-lg font-semibold text-gray-100">
          계좌 정보
          <BigArrowSVG width="34" height="34" className="fill-gray-500" />
        </h2>
        <ul className="flex h-20 w-full flex-col justify-center gap-[0.81rem] px-[1.19rem] text-sm text-gray-100">
          <li className="flex gap-4">
            <p className="w-14 font-semibold">은행</p> <span>{data.bank}</span>
          </li>
          <li className="flex gap-4 whitespace-nowrap">
            <p className="w-14 font-semibold">계좌번호</p>
            <span>{data.accountNumber}</span>
          </li>
        </ul>
      </section>

      <section className="flex flex-col rounded-lg bg-white px-5 py-4 shadow-float shadow-float">
        <ul className="mb-3 flex w-full flex-col gap-1 whitespace-nowrap text-sm text-gray-100">
          <li className="flex items-center">
            <p className="w-10 font-semibold">총 수익</p>
            <span className="ml-[0.69rem] text-lg font-bold text-black">
              1,230,800원
            </span>
          </li>
          <li className="flex items-center ">
            <p className="w-10 font-semibold">이번 달</p>
            <span className="ml-[0.69rem] text-lg font-bold text-sub-color1">
              1,230,800원
            </span>
          </li>
        </ul>
        <button
          onClick={handleApply}
          className="flex h-7 w-full items-center justify-center rounded-md bg-main-color text-sm font-semibold text-white"
        >
          <MoneySVG width="18" height="18" fill="white" stroke="white" />
          정산신청
        </button>
      </section>
    </aside>
  ) : (
    <aside className="flex h-fit w-full max-w-xs flex-col rounded-lg bg-white p-4 shadow-float">
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
