import Button from '@/components/Button/Button';
import UpdateModalContainer from './UpdateModalContainer';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

//추후 이메일 인증, 이메일 변경 api 연결 필요

interface EmailUpdateProps {
  email: string;
  closeModalHandler?: () => void;
}

const EmailUpdate = ({ email, closeModalHandler }: EmailUpdateProps) => {
  const { handleSubmit, register, getValues, setFocus, setValue } = useForm({
    defaultValues: {
      emailFront: '',
      emailBack: '',
      authenticationCode: '',
    },
  });

  const [verification, setVerification] = useState({
    sendAuthenticationCode: false,
    authenticationCodeView: false,
    authenticationCode: false,
    certification: false,
  });

  useEffect(() => {
    if (verification.authenticationCodeView) {
      setFocus('authenticationCode');
      setValue('authenticationCode', '');
    }
  }, [verification.authenticationCodeView]);

  const changeEmailInput = (
    event: ChangeEvent<HTMLInputElement>,
    type: 'FRONT' | 'BACK',
  ) => {
    const value = event.target.value;
    if (!value) {
      setVerification(() => ({
        sendAuthenticationCode: false,
        authenticationCodeView: false,
        authenticationCode: false,
        certification: false,
      }));
    } else if (verification.authenticationCodeView) {
      setVerification((prev) => ({
        ...prev,
        authenticationCodeView: false,
        authenticationCode: false,
        certification: false,
      }));
    } else {
      if (type === 'BACK' && getValues('emailFront')) {
        setVerification((prev) => ({ ...prev, sendAuthenticationCode: true }));
      }

      if (type === 'FRONT' && getValues('emailBack')) {
        setVerification((prev) => ({ ...prev, sendAuthenticationCode: true }));
      }
    }
  };

  const sendAuthenticationCode = (data: any) => {
    //인증 코드 전송 성공 했을때
    setVerification((prev) => ({ ...prev, authenticationCodeView: true }));
  };

  const authentication = (data: any) => {
    const { authenticationCode } = data;

    //인증 코드 인증 성공 했을때
    setVerification((prev) => ({ ...prev, certification: true }));
  };

  const invalid = (data: Record<string, any>) => {
    Object.values(data).forEach((value) => toast.error(value.message));
  };

  const updateEmail = async () => {};

  return (
    <UpdateModalContainer
      title="이메일 변경"
      disabled={!verification.certification}
      closeEvent={closeModalHandler}
      updateEvent={updateEmail}
    >
      <section className="flex flex-grow flex-col gap-4 px-5 pt-7 sm:justify-center sm:px-8 sm:pt-0">
        <dl className="grid grid-rows-2 items-center gap-y-3 text-lg font-semibold sm:grid-cols-[7rem_1fr] sm:grid-rows-none sm:gap-y-0 sm:text-base">
          <dt>현재 이메일</dt>
          <dd>{email}</dd>
        </dl>
        <div className="w-full text-lg font-semibold sm:grid sm:grid-cols-[7rem_1fr] sm:grid-rows-none sm:text-base">
          <label className="self-start">변경할 이메일</label>
          <div className="grid grid-cols-[1fr_7.7rem] gap-x-2 gap-y-4 sm:grid-cols-[1fr_1rem_1fr_8.625rem]">
            <input
              {...register('emailFront', {
                required: '변경할 이메일을 입력해 주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+$/,
                  message: '올바른 이메일 형식을 입력해 주세요.',
                },
              })}
              onChange={(e) => changeEmailInput(e, 'FRONT')}
              className="h-11 w-full flex-grow rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7"
            />
            <span className="self-center text-xl sm:text-base">@</span>
            <input
              {...register('emailBack', {
                required: '변경할 이메일을 입력해 주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '올바른 이메일 형식을 입력해 주세요.',
                },
              })}
              onChange={(e) => changeEmailInput(e, 'BACK')}
              className="h-11 w-full flex-grow rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7"
            />
            <form
              onSubmit={handleSubmit(sendAuthenticationCode, invalid)}
              className="h-11 w-full sm:h-7"
            >
              <Button
                size="full"
                color="secondary"
                type="submit"
                disabled={
                  !verification.sendAuthenticationCode ||
                  verification.authenticationCodeView
                }
              >
                인증코드 전송
              </Button>
            </form>

            {verification.authenticationCodeView && (
              <>
                <input
                  {...register('authenticationCode', {
                    required: '이메일로 전송된 인증코드를 입력해 주세요.',
                  })}
                  className="h-11 w-full rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:col-span-3 sm:h-7"
                  onChange={(e) => {
                    if (e.target.value) {
                      setVerification((prev) => ({
                        ...prev,
                        authenticationCode: true,
                      }));
                    } else {
                      setVerification((prev) => ({
                        ...prev,
                        authenticationCode: false,
                      }));
                    }
                  }}
                  disabled={verification.certification}
                />
                <form
                  className="h-11 w-full sm:h-7"
                  onSubmit={handleSubmit(authentication, invalid)}
                >
                  <Button
                    size="full"
                    color="secondary"
                    type="submit"
                    disabled={
                      !verification.authenticationCode ||
                      verification.certification
                    }
                  >
                    인증하기
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </UpdateModalContainer>
  );
};

export default EmailUpdate;
