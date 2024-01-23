import { BANK_CODE_TO_NAME } from '@/constants/constants';
import { BigArrowSVG } from '@/icons/svg';
import { getBankAccount } from '@/lib/apis/serverApis/instructorPostApis';

const Account = async () => {
  let accountInfo;

  try {
    accountInfo = await getBankAccount();
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col rounded-md bg-white py-4 text-[#414141] shadow-vertical">
      <header className="flex items-center justify-between border-b border-solid border-gray-500 px-5 pb-3">
        <h1 className="text-lg font-semibold">계좌 정보</h1>
        <button>
          <BigArrowSVG
            width="34"
            height="34"
            className="fill-gray-500 hover:fill-black"
          />
        </button>
      </header>
      <div className="mt-4 flex flex-col gap-2">
        <dl className="flex px-5 text-sm">
          <dt className="w-[4.5rem] font-semibold">은행</dt>
          <dd>
            {(accountInfo && BANK_CODE_TO_NAME[accountInfo.bankCode]) || ''}
          </dd>
        </dl>
        <dl className="flex px-5 text-sm">
          <dt className="w-[4.5rem] font-semibold">계좌번호</dt>
          <dd>{accountInfo?.accountNumber}</dd>
        </dl>
      </div>
    </section>
  );
};

export default Account;
