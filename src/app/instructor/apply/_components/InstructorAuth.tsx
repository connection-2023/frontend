import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useUserStore } from '@/store';
import AccountList from './InstructorAuth/AccountList';
import Email from './InstructorAuth/Email';
import Nickname from './InstructorAuth/Nickname';
import PhoneNumber from './InstructorAuth/PhoneNumber';
import { Verification } from '@/types/types';

const InstructorAuth = () => {
  const { watch, trigger } = useFormContext();

  const authUser = useUserStore((state) => state.authUser);

  const [verification, setVerification] = useState({
    nickname: false,
    email: false,
    phoneNumber: false,
    accountNumber: false,
  });
  // phoneNumber, accountNumber, email 추후 api 생기면  로직 추가 예정

  useEffect(() => {
    if (
      verification.nickname &&
      verification.email &&
      verification.phoneNumber &&
      verification.accountNumber
    ) {
      trigger();
    }
  }, [verification]);

  useEffect(() => {
    setVerification((prev) => ({
      ...prev,
      email: !!authUser?.email,
      phoneNumber: !!authUser?.email,
    }));
  }, []);

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      const key = name?.includes('email') ? 'email' : name;
      if (key && key in verification) {
        setVerification((prev) => ({ ...prev, [key]: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const changeVerification = (key: keyof Verification, value: boolean) => {
    setVerification((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="mt-2 flex w-full max-w-[40rem] flex-col text-base">
      <ul className="flex flex-col gap-5 border-b border-solid border-gray-700 py-7 sm:gap-[1.69rem]">
        <Nickname
          changeVerification={changeVerification}
          verification={verification.nickname}
        />

        <PhoneNumber
          changeVerification={changeVerification}
          verification={verification.phoneNumber}
          defaultValue={authUser?.phoneNumber ?? ''}
        />
        {/* 추후 인증번호 로직 추가 예정 */}

        <Email
          changeVerification={changeVerification}
          verification={verification.email}
          defaultValue={authUser?.email ?? ''}
        />
        {/* 추후 이메일 인증 로직 추가 예정 */}
      </ul>

      <ul className="flex flex-col gap-[1.31rem] py-7">
        <p className="flex items-center whitespace-nowrap font-semibold">
          계좌 등록<span className="text-sub-color1">*</span>
          <span className="ml-2 text-sm font-medium text-gray-500">
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
