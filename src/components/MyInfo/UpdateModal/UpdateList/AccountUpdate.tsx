'use client';
import { useEffect, useReducer } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import BankSelect from '@/app/instructor/apply/_components/InstructorAuth/BankSelect';
import { BANK_CODE_TO_NAME } from '@/constants/constants';
import { updateBankAccount } from '@/lib/apis/instructorApi';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { Button } from '@/components/Button';
import UpdateModalContainer from '@/components/MyInfo/UpdateModal/UpdateModalContainer';
import {
  accountCertificationAction,
  accountCertificationState,
  accountFormValues,
} from '@/types/info';
import { CommonBankAccount, bankAccount } from '@/types/instructor';
import { FetchError } from '@/types/types';

interface AccountUpdateProps {
  accountInfo: bankAccount;
  changeAccountInfo: (accountInfo: CommonBankAccount) => void;
  closeModalHandler?: () => void;
}

const AccountUpdate = ({
  closeModalHandler,
  accountInfo,
  changeAccountInfo,
}: AccountUpdateProps) => {
  const { handleSubmit, register, control, watch, getValues } = useForm({
    defaultValues: {
      name: '',
      bank: { value: '', label: '' },
      accountNumber: '',
    },
  });

  const initialState = {
    sendAuthenticationCode: false,
    certification: false,
  };

  const verificationReducer = (
    state: accountCertificationState,
    action: accountCertificationAction,
  ) => {
    switch (action.type) {
      case 'RESET':
        return initialState;
      case 'ENABLE_SEND_AUTHENTICATION_CODE':
        return { sendAuthenticationCode: true, certification: false };
      case 'CERTIFY':
        return { ...state, certification: true };
    }
  };

  const [state, dispatch] = useReducer(verificationReducer, initialState);

  useEffect(() => {
    const subscription = watch((value) => {
      const { name, bank, accountNumber } = value;

      if (name && bank && accountNumber) {
        dispatch({ type: 'ENABLE_SEND_AUTHENTICATION_CODE' });
      } else {
        dispatch({ type: 'RESET' });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const sendAuthenticationCode = (data: accountFormValues) => {
    const { name, bank, accountNumber } = data;
    const {
      accountNumber: currentAccountNumber,
      bankCode,
      holderName,
    } = accountInfo;
    const strippedAccountNumber = accountNumber.split('-').join('');

    if (
      name === holderName &&
      bank?.value === bankCode &&
      currentAccountNumber === strippedAccountNumber
    )
      return toast.error('현재 등록된 계좌와 같은 계좌 입니다.');

    //인증 코드 전송 성공 했을때
    dispatch({ type: 'CERTIFY' });
  };

  const invalid = (data: Record<string, any>) => {
    Object.values(data).forEach((value) => toast.error(value.message));
  };

  const updateAccountAction = async () => {
    const [name, bank, accountNumber] = getValues([
      'name',
      'bank',
      'accountNumber',
    ]);

    const data = {
      bankCode: bank.value,
      holderName: name,
      accountNumber: accountNumber,
    };

    await updateBankAccount(data);
    changeAccountInfo(data);
    if (closeModalHandler) {
      closeModalHandler();
    }
  };

  const updateAccount = async () => {
    try {
      await updateAccountAction();
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await updateAccountAction();
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  return (
    <UpdateModalContainer
      title="계좌정보 변경"
      closeEvent={closeModalHandler}
      disabled={!state.certification}
      updateEvent={updateAccount}
    >
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
              <input
                {...register('name', {
                  required: '예금주를 입력해 주세요.',
                  pattern: {
                    value: /^[가-힣]{1,30}$/,
                    message: '올바른 예금주를 입력해 주세요.',
                  },
                })}
                className="h-9 w-full rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7"
              />
            </div>
            <div className="row-start-2 grid grid-cols-[5.97rem_1fr]">
              <label className=" font-semibold">은행명</label>
              <Controller
                name="bank"
                control={control}
                rules={{
                  required: '계좌 은행을 선택해 주세요.',
                }}
                render={({ field: { onChange } }) => (
                  <BankSelect onChange={onChange} />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-[2fr_1fr] gap-2 sm:grid-cols-[5rem_1fr_10rem] sm:gap-4">
            <label className="font-semibold">계좌번호</label>
            <input
              {...register('accountNumber', {
                required: '계좌번호를 입력해 주세요.',
                pattern: {
                  value: /^[0-9-]*$/,
                  message: '올바른 계좌번호를 입력해 주세요.',
                },
              })}
              className="row-start-2 h-9 w-full rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:row-start-auto sm:h-7"
            />
            <form
              onSubmit={handleSubmit(sendAuthenticationCode, invalid)}
              className="row-start-2 w-full sm:row-start-auto"
            >
              <Button
                size="full"
                color="secondary"
                type="submit"
                disabled={!state.sendAuthenticationCode || state.certification}
              >
                인증코드 전송
              </Button>
            </form>
          </div>
        </div>
      </section>
    </UpdateModalContainer>
  );
};

export default AccountUpdate;
