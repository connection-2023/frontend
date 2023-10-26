import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getCheckNickname } from '@/lib/apis/lecturersApi';
import BankSelect from './BankSelect';

const InstructorAuth = () => {
  const { register, watch, getValues, setFocus, control, clearErrors } =
    useFormContext();

  const [verification, setVerification] = useState({
    nickname: false,
    email: true,
    phoneNumber: true,
    accountNumber: true,
  });
  // phoneNumber, accountNumber 추후 api 생기면 false 로 변경 및 인증 로직 추가 예정

  // useEffect(() => {
  //   const subscription = watch((_, { name }) => {
  //     const key = name?.split('-')[0];
  //     if (key && key in verification) {
  //       setVerification((prev) => ({ ...prev, [key]: false }));
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);
  // 잠시 테스트 용으로 주석

  const nickNameOverlapping = async () => {
    const pattern = /^[가-힣a-zA-Z0-9]{2,12}$/;
    const nickname = getValues('nickname');
    if (!pattern.test(nickname)) {
      setFocus('nickname');
      return toast.error('올바른 닉네임을 작성 해주세요.');
    }

    if (await getCheckNickname(nickname)) {
      toast.success('사용가능한 닉네임 입니다.');
      setVerification((prev) => ({ ...prev, nickname: true }));
      clearErrors('nickname');
    } else {
      toast.error('중복된 닉네임 입니다.');
    }
  };

  return (
    <section className="mt-2 flex w-full max-w-[40rem] flex-col text-base">
      <ul className="flex flex-col gap-[1.69rem] border-b border-solid border-sub-color4 py-7">
        <li className="flex items-center">
          <Label htmlFor="nickname" isNormal={true}>
            강사 닉네임
            <RequiredMark />
          </Label>
          <input
            type="text"
            {...register('nickname', {
              required: '닉네임',
              validate: {
                isVerified: () => {
                  if (!verification.nickname) return '닉네임';
                },
              },
            })}
            readOnly={verification.nickname}
            id="nickname"
            className={`h-7 w-full max-w-[24.75rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
          />
          <button
            className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] px-2 py-1 text-white  ${
              verification.nickname ? 'bg-sub-color2' : 'bg-black'
            } `}
            onClick={nickNameOverlapping}
            disabled={verification.nickname}
          >
            중복 확인
          </button>
        </li>

        <li className="flex items-center ">
          <Label htmlFor="phoneNumber" isNormal={true}>
            휴대폰 번호
            <RequiredMark />
          </Label>
          <input
            type="number"
            {...register('phoneNumber', {
              required: '휴대폰 번호',
              validate: {
                isVerified: () => {
                  if (!verification.phoneNumber) return '휴대폰 번호';
                },
              },
            })}
            id="phoneNumber"
            className={`h-7 w-full max-w-[24.75rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
          />
          <button
            className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] px-2 py-1 text-white ${
              verification.phoneNumber ? 'bg-sub-color2' : 'bg-black'
            }`}
            disabled={verification.phoneNumber}
          >
            인증번호 전송
          </button>
        </li>

        <li className="flex items-center">
          <Label htmlFor="email-front" isNormal={true}>
            이메일
            <RequiredMark />
          </Label>
          <input
            type="email"
            {...register('email-front', {
              required: '이메일',
              validate: {
                isVerified: () => {
                  if (!verification.email) return '이메일';
                },
              },
            })}
            id="email-front"
            className={`h-7 w-full max-w-[11.4rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
          />
          <span className="mx-2">@</span>
          <input
            type="email"
            {...register('email-back', {
              required: '이메일',
              validate: {
                isVerified: () => {
                  if (!verification.email) return '이메일';
                },
              },
            })}
            id="email-back"
            className={`h-7 w-full max-w-[11.4rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
          />

          <button
            className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] px-2 py-1 text-white ${
              verification.email ? 'bg-sub-color2' : 'bg-black'
            }`}
            disabled={verification.email}
          >
            이메일 변경
          </button>
        </li>
      </ul>

      <ul className="flex flex-col gap-[1.31rem] py-7">
        <p className="flex items-center whitespace-nowrap font-semibold">
          계좌 등록<span className="text-sub-color1">*</span>
          <span className="ml-2 text-sm font-medium text-sub-color2">
            수업 정산금을 지급받을 계좌를 등록해주세요.
          </span>
        </p>

        <li className="flex items-center">
          <Label htmlFor="bankholder" isNormal={false}>
            예금주
          </Label>
          <input
            type="text"
            {...register('bankholder', { required: '예금주' })}
            id="bankholder"
            className={`h-7 w-full max-w-[10rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
          />
        </li>

        <li className="flex items-center">
          <Label htmlFor="birth" isNormal={false}>
            생년월일
          </Label>
          <input
            type="number"
            {...register('birth', { required: '생년월일' })}
            id="birth"
            className={`h-7 w-full max-w-[10rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
          />
        </li>

        <li className="flex items-center">
          <Label htmlFor="bank" isNormal={false}>
            은행
          </Label>
          <div className="w-full max-w-[10rem]">
            <Controller
              name="bank"
              control={control}
              rules={{
                required: '은행',
              }}
              render={({ field: { onChange } }) => (
                <BankSelect onChange={onChange} />
              )}
            />
          </div>
        </li>

        <li className="flex items-center">
          <Label htmlFor="accountNumber" isNormal={false}>
            계좌번호
          </Label>
          <input
            type="number"
            {...register('accountNumber', {
              required: '계좌번호',
              validate: {
                isVerified: () => {
                  if (!verification.accountNumber) return '계좌번호';
                },
              },
            })}
            id="accountNumber"
            className={`h-7 w-full max-w-[24.75rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
          />
          <button
            className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] bg-black px-2 py-1 text-white ${
              verification.accountNumber ? 'bg-sub-color2' : 'bg-black'
            }`}
            disabled={verification.accountNumber}
          >
            인증하기
          </button>
        </li>
      </ul>
    </section>
  );
};

export default InstructorAuth;

interface LabelProps {
  htmlFor: string;
  isNormal: boolean;
  children: React.ReactNode;
}

const Label = ({ htmlFor, isNormal, children }: LabelProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <label
      htmlFor={htmlFor !== 'bank' ? htmlFor : undefined}
      className={`mr-10 whitespace-nowrap ${
        isNormal ? 'w-20 font-semibold' : 'w-14 font-normal'
      } ${errors[htmlFor] && 'animate-vibration text-main-color'}`}
    >
      {children}
    </label>
  );
};

const RequiredMark = () => <span className="text-sub-color1">*</span>;
