'use client';
import BankSelect from '@/app/instructor/apply/_components/InstructorAuth/BankSelect';
import Button from '@/components/Button/Button';
import UpdateModalContainer from '@/components/MyInfo/UpdateModal/UpdateModalContainer';
import { BANK_CODE_TO_NAME } from '@/constants/constants';
import { bankAccount } from '@/types/instructor';

interface AccountUpdateProps {
  accountInfo: bankAccount;
  closeModalHandler?: () => void;
}

const AccountUpdate = ({
  closeModalHandler,
  accountInfo,
}: AccountUpdateProps) => {
  return (
    <UpdateModalContainer title="계좌정보 변경" closeEvent={closeModalHandler}>
      <section className="flex flex-grow flex-col gap-4 sm:justify-center">
        <dl className="mt-5 grid grid-cols-[5.3rem_1fr] grid-rows-2 items-center gap-y-2 px-4">
          <dt className="font-semibold">은행</dt>
          <dd>{BANK_CODE_TO_NAME[accountInfo.bankCode]}</dd>
          <dt className="font-semibold">계좌번호</dt>
          <dd>{accountInfo.accountNumber}</dd>
        </dl>
        <hr className="border-gray-700" />
        <div className="flex flex-col px-8">
          <dl className="flex flex-col gap-1">
            <dt className="font-semibold">계좌 변경</dt>
            <dd className="text-sm text-main-color">
              *계좌변경을 완료한 시점으로 새롭게 개설한 클래스 신청자에게만 바뀐
              계좌가 안내됩니다.
            </dd>
          </dl>
          <div className="mb-3 mt-5 grid items-center gap-y-3 sm:grid-cols-2 ">
            <div className="grid grid-cols-[6rem_1fr]">
              <label className="font-semibold">예금주</label>
              <input className="h-9 w-full rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7" />
            </div>
            <div className="row-start-2 grid grid-cols-[5.97rem_1fr]">
              <label className=" font-semibold">입금 은행</label>
              <BankSelect />
            </div>
          </div>
          <div className="grid grid-cols-[2fr_1fr] gap-2 sm:grid-cols-[5rem_1fr_10rem] sm:gap-4">
            <label className="font-semibold">계좌번호</label>
            <input className="row-start-2 h-9 w-full rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:row-start-auto sm:h-7" />
            <form className="row-start-2 w-full sm:row-start-auto">
              <Button size="full" color="secondary" type="submit">
                인증하기
              </Button>
            </form>
          </div>
        </div>
      </section>
    </UpdateModalContainer>
  );
};

export default AccountUpdate;
