import { BigArrowSVG } from '../../../../../public/icons/svg';

const data = {
  bank: '우리은행',
  accountNumber: '1002-123-456789',
};

const AccountInfo = () => {
  return (
    <aside className="flex w-full max-w-xs flex-col rounded-[0.31rem] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
      <h2 className="flex flex h-12 w-full items-center justify-between border-b border-solid border-[#D9D9D9] pl-[1.19rem] text-lg font-semibold text-sub-color3">
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
  );
};

export default AccountInfo;
