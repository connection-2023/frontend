import Button from '@/components/Button/Button';
import UpdateModalContainer from '../UpdateModalContainer';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Action, State } from '@/types/info';

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

  const initialState = {
    sendAuthenticationCode: false,
    authenticationCodeView: false,
    authenticationCode: false,
    certification: false,
  };

  const verificationReducer = (state: State, action: Action) => {
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

  const changeEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      dispatch({ type: 'RESET' });
    } else if (state.authenticationCodeView) {
      dispatch({ type: 'TOGGLE_AUTHENTICATION_CODE_VIEW' });
    } else {
      if (getValues('emailFront') || getValues('emailBack')) {
        dispatch({ type: 'ENABLE_SEND_AUTHENTICATION_CODE' });
      }
    }
  };

  useEffect(() => {
    if (state.authenticationCodeView) {
      setFocus('authenticationCode');
      setValue('authenticationCode', '');
    }
  }, [state.authenticationCodeView]);

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

  const updateEmail = async () => {};

  return (
    <UpdateModalContainer
      title="이메일 변경"
      disabled={!state.certification}
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
          <div className="mt-4 grid grid-cols-[1fr_7.7rem] gap-x-2 gap-y-4 sm:mt-0 sm:grid-cols-[1fr_1rem_1fr_8.625rem]">
            <input
              {...register('emailFront', {
                required: '변경할 이메일을 입력해 주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+$/,
                  message: '올바른 이메일 형식을 입력해 주세요.',
                },
              })}
              onChange={changeEmailInput}
              className="h-11 w-full flex-grow rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7"
              type="text"
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
              onChange={changeEmailInput}
              className="h-11 w-full flex-grow rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7"
              type="text"
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
                  !state.sendAuthenticationCode || state.authenticationCodeView
                }
              >
                인증코드 전송
              </Button>
            </form>

            {state.authenticationCodeView && (
              <>
                <input
                  {...register('authenticationCode', {
                    required: '이메일로 전송된 인증코드를 입력해 주세요.',
                  })}
                  className="h-11 w-full rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:col-span-3 sm:h-7"
                  onChange={(e) => {
                    if (e.target.value) {
                      dispatch({ type: 'ENABLE_AUTHENTICATION_BUTTON' });
                    } else {
                      dispatch({ type: 'DISABLED_AUTHENTICATION_BUTTON' });
                    }
                  }}
                  disabled={state.certification}
                  type="text"
                />
                <form
                  className="h-11 w-full sm:h-7"
                  onSubmit={handleSubmit(authentication, invalid)}
                >
                  <Button
                    size="full"
                    color="secondary"
                    type="submit"
                    disabled={!state.authenticationCode || state.certification}
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
