'use client';

import { ChangeEvent, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { accessTokenReissuance, updateMyProfile } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import UpdateModalContainer from '../UpdateModalContainer';
import { Button } from '@/components/Button';
import { certificationAction, certificationState } from '@/types/info';
import { FetchError } from '@/types/types';

interface PhoneNumberUpdateProps {
  phoneNumber: string;
  closeModalHandler?: () => void;
}

const PhoneNumberUpdate = ({
  phoneNumber,
  closeModalHandler,
}: PhoneNumberUpdateProps) => {
  const { handleSubmit, register, setFocus, setValue, getValues } = useForm({
    defaultValues: {
      phoneNumber: '',
      authenticationCode: '',
    },
  });

  const initialState = {
    sendAuthenticationCode: false,
    authenticationCodeView: false,
    authenticationCode: false,
    certification: false,
  };

  const verificationReducer = (
    state: certificationState,
    action: certificationAction,
  ) => {
    switch (action.type) {
      case 'RESET':
        return initialState;
      case 'TOGGLE_AUTHENTICATION_CODE_VIEW':
        return {
          ...state,
          authenticationCodeView: !state.authenticationCodeView,
          authenticationCode: false,
          certification: false,
        };
      case 'ENABLE_SEND_AUTHENTICATION_CODE':
        return { ...state, sendAuthenticationCode: true };
      case 'TOGGLE_AUTHENTICATION_CODE':
        return { ...state, authenticationCode: !state.authenticationCode };
      case 'CERTIFY':
        return { ...state, certification: true };
      case 'VERIFICATION_CODE_SENT_SUCCESSFULLY':
        return { ...state, authenticationCodeView: true };
      case 'ENABLE_AUTHENTICATION_BUTTON':
        return { ...state, authenticationCode: true };
      case 'DISABLED_AUTHENTICATION_BUTTON':
        return { ...state, authenticationCode: false };
    }
  };

  const [state, dispatch] = useReducer(verificationReducer, initialState);
  const { setAuthUserField, userType } = useUserStore((state) => ({
    setAuthUserField: state.setAuthUserField,
    userType: state.userType,
  }));

  useEffect(() => {
    if (state.authenticationCodeView) {
      setFocus('authenticationCode');
      setValue('authenticationCode', '');
    }
  }, [state.authenticationCodeView]);

  const changePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      dispatch({ type: 'RESET' });
    } else if (state.authenticationCodeView) {
      dispatch({ type: 'TOGGLE_AUTHENTICATION_CODE_VIEW' });
    } else {
      dispatch({ type: 'ENABLE_SEND_AUTHENTICATION_CODE' });
    }
  };

  const sendAuthenticationCode = (data: any) => {
    //인증 코드 전송 성공 했을때
    dispatch({ type: 'VERIFICATION_CODE_SENT_SUCCESSFULLY' });
  };

  const authentication = (data: any) => {
    const { authenticationCode } = data;

    //인증 코드 인증 성공 했을때
    dispatch({ type: 'CERTIFY' });
  };

  const invalid = (data: Record<string, any>) => {
    Object.values(data).forEach((value) => toast.error(value.message));
  };

  const updatePhoneNumber = async () => {
    const phoneNumber = getValues('phoneNumber');

    const changePhoneNumberAction = async () => {
      if (userType === 'user') {
        await updateMyProfile({
          phoneNumber,
        });
      } else {
      }
      setAuthUserField('phoneNumber', phoneNumber);
      toast.success('휴대폰 번호 변경 완료');
      if (closeModalHandler) {
        closeModalHandler();
      }
    };

    try {
      await changePhoneNumberAction();
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await changePhoneNumberAction();
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
          console.error(error);
        }
      }
    }
  };

  return (
    <UpdateModalContainer
      title="휴대폰 번호 변경"
      disabled={!state.certification}
      closeEvent={closeModalHandler}
      updateEvent={updatePhoneNumber}
    >
      <section className="flex h-[12rem] flex-grow flex-col gap-4 px-5 pt-7 sm:justify-center sm:px-8 sm:pt-0">
        {phoneNumber && (
          <dl className="grid grid-rows-2 items-center gap-y-3 text-lg font-semibold sm:grid-cols-[7rem_1fr] sm:grid-rows-none sm:gap-y-0 sm:text-base">
            <dt>현재 번호</dt>
            <dd>{phoneNumber}</dd>
          </dl>
        )}
        <div className="w-full text-lg font-semibold sm:grid sm:grid-cols-[7rem_1fr] sm:grid-rows-none sm:text-base">
          <label className="self-start">
            {phoneNumber ? '변경할' : '등록할'} 번호
          </label>
          <div className="mt-4 grid grid-cols-[1fr_7.7rem] gap-x-2 gap-y-4 sm:mt-0 sm:grid-cols-[1fr_8.625rem]">
            <input
              {...register('phoneNumber', {
                required: '변경할 휴대폰 번호를 입력해 주세요.',
                pattern: {
                  value: /^01(?:0|1|[6-9])?\d{7,8}$/,
                  message: '올바른 휴대폰 번호 형식을 입력해 주세요.',
                },
                validate: {
                  isNotSameAsA: (value) =>
                    value !== phoneNumber ||
                    '현재 등록된 번호와 같은 번호 입니다.',
                },
              })}
              placeholder={`'-'없이 숫자 입력`}
              type="number"
              onChange={changePhoneNumber}
              className="h-11 w-full rounded-md px-2 outline outline-1 outline-gray-500 placeholder:text-base placeholder:font-normal focus:outline-sub-color1 sm:h-7"
            />
            <form
              onSubmit={handleSubmit(sendAuthenticationCode, invalid)}
              className="h-11 w-full sm:h-7"
            >
              <Button
                disabled={
                  !state.sendAuthenticationCode || state.authenticationCodeView
                }
                size="full"
                color="secondary"
                type="submit"
              >
                인증코드 전송
              </Button>
            </form>

            {state.authenticationCodeView && (
              <>
                <input
                  onChange={(e) => {
                    if (e.target.value) {
                      dispatch({ type: 'ENABLE_AUTHENTICATION_BUTTON' });
                    } else {
                      dispatch({ type: 'DISABLED_AUTHENTICATION_BUTTON' });
                    }
                  }}
                  type="text"
                  className="h-11 w-full rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7"
                  disabled={state.certification}
                />
                <form
                  onSubmit={handleSubmit(authentication, invalid)}
                  className="h-11 w-full sm:h-7"
                >
                  <Button
                    disabled={!state.authenticationCode || state.certification}
                    size="full"
                    color="secondary"
                    type="submit"
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

export default PhoneNumberUpdate;
