import { BigArrowSVG } from '../../../../../public/icons/svg';

const data = {
  bank: '우리은행',
  accountNumber: '1002-123-456789',
};

const AccountInfo = ({ view }: { view: 'main' | 'payment' }) => {
  return view === 'main' ? (
    <aside className="mt-14 flex h-fit w-full max-w-xs flex-col rounded-[0.31rem] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
      <h2 className="flex h-12 w-full items-center justify-between border-b border-solid border-[#D9D9D9] pl-[1.19rem] text-lg font-semibold text-sub-color3">
        계좌 정보
        <BigArrowSVG width="34" height="34" className="fill-sub-color2" />
      </h2>
      <ul className="flex h-20 w-full flex-col justify-center gap-[0.81rem] px-[1.19rem] text-sm text-sub-color3">
        <li className="flex gap-4">
          <p className="w-14 font-semibold">은행</p> <span>{data.bank}</span>
        </li>
        <li className="flex gap-4">
          <p className="w-14 font-semibold">계좌번호</p>
          <span>{data.accountNumber}</span>
        </li>
      </ul>
    </aside>
  ) : (
    <aside className="mt-14 flex h-fit w-full max-w-xs flex-col rounded-[0.31rem] p-4 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
      <h2 className="mb-2 text-sm font-semibold text-main-color">
        *정산금 지급 기준
      </h2>

      <p className="whitespace-pre-line break-keep text-sm text-sub-color3">
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
    <span className="text-sm font-semibold text-sub-color3">{children}</span>
  );
};
