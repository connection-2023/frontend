import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import useStore from '@/store';
import AccountList from './InstructorAuth/AccountList';
import Email from './InstructorAuth/Email';
import Nickname from './InstructorAuth/Nickname';
import PhoneNumber from './InstructorAuth/PhoneNumber';
import { Verification } from '@/types/types';

const InstructorAuth = () => {
  const { watch } = useFormContext();

  const authUser = useStore((state) => state.authUser);
  const { email, phoneNumber } = authUser || {};

  const [verification, setVerification] = useState({
    nickname: false,
    email: false,
    phoneNumber: false,
    accountNumber: false,
  });
  // phoneNumber, accountNumber 추후 api 생기면 false 로 변경 및 인증 로직 추가 예정

  useEffect(() => {
    setVerification((prev) => ({
      ...prev,
      email: !!email,
      phoneNumber: !!phoneNumber,
    }));
  }, [email, phoneNumber]);

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      const key = name?.split('-')[0];
      if (key && key in verification) {
        setVerification((prev) => ({ ...prev, [key]: false }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]); // 추후 계좌 등록 로직 변경 예정

  const changeVerification = (key: keyof Verification, value: boolean) => {
    setVerification((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="mt-2 flex w-full max-w-[40rem] flex-col text-base">
      <ul className="flex flex-col gap-[1.69rem] border-b border-solid border-sub-color4 py-7">
        <Nickname
          changeVerification={changeVerification}
          verification={verification.nickname}
        />

        <PhoneNumber
          changeVerification={changeVerification}
          verification={verification.phoneNumber}
          defaultValue={phoneNumber}
        />
        {/* 추후 인증번호 로직 추가 예정 */}

        <Email
          changeVerification={changeVerification}
          verification={verification.email}
          defaultValue={email || ''}
        />
        {/* 추후 이메일 인증 로직 추가 예정 */}
      </ul>

      <ul className="flex flex-col gap-[1.31rem] py-7">
        <p className="flex items-center whitespace-nowrap font-semibold">
          계좌 등록<span className="text-sub-color1">*</span>
          <span className="ml-2 text-sm font-medium text-sub-color2">
            수업 정산금을 지급받을 계좌를 등록해주세요.
          </span>
        </p>

        <AccountList
          changeVerification={changeVerification}
          verification={verification.accountNumber}
        />
      </ul>
    </section>
  );
};

export default InstructorAuth;
