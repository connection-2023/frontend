'use client';
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldValues,
} from 'react-hook-form';
import { BANK_LIST } from '@/constants/constants';

interface AccountInfoProps {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

const AccountInfo = ({ register, handleSubmit }: AccountInfoProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(() => {})();
      }}
    >
      <ul className="mt-4 flex flex-col gap-y-3.5 text-base">
        <li className="flex items-center gap-6">
          <p className="w-14 whitespace-nowrap">입금자명</p>
          <input
            {...register('depositor')}
            className="h-7 w-60 rounded-md border border-solid border-gray-500 px-2 focus:outline-sub-color1 md:w-80"
          />
        </li>

        <li className="flex items-center gap-6">
          <p className="w-14 whitespace-nowrap">입금계좌</p>
          <p>주문완료 페이지에서 입금 계좌번호를 확인하시기 바랍니다.</p>
        </li>
      </ul>

      <h3 className="mt-7 text-lg font-semibold">환불받을 계좌</h3>
      <ul className="mt-4 flex flex-col gap-y-2.5 text-base">
        <li className="flex items-center gap-6">
          <p className="w-14 whitespace-nowrap">예금주</p>
          <input
            {...register('accountHolder')}
            className="h-7 w-40 rounded-md border border-solid border-gray-500 px-1.5 focus:outline-sub-color1"
          />
        </li>

        <li className="flex items-center gap-6">
          <p className="w-14 whitespace-nowrap">은행</p>

          <select
            {...register('bank')}
            name="bank"
            id="bank"
            className="h-7 w-40 rounded-md border border-solid border-gray-500 px-1.5 focus:outline-sub-color1"
          >
            <option value="">은행 선택</option>
            {BANK_LIST.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </li>

        <li className="flex items-center gap-6">
          <p className="w-14 whitespace-nowrap">계좌번호</p>
          <input
            {...register('accountNumber')}
            className="h-7 w-60 rounded-md border border-solid border-gray-500 px-1.5 focus:outline-sub-color1 md:w-80"
            placeholder="계좌번호를 - 없이 입력해주세요"
            type="number"
          />
        </li>
      </ul>
    </form>
  );
};

export default AccountInfo;
