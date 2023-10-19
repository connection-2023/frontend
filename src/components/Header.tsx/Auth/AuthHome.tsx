import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConnectionLogoSVG } from '@/icons/svg';
import GoogleAuth from './GoogleAuth';
import KakaoAuth from './KakaoAuth';
import { LoginResponse, SignInResponse } from '@/types/auth';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

interface IAuthHome {
  handleStatusCode: (code: number) => void;
  handleUserInfo: (data: SignInResponse) => void;
}

const AuthHome = ({ handleStatusCode, handleUserInfo }: IAuthHome) => {
  const getAuth = async (
    social: 'naver' | 'kakao' | 'google',
    idToken: string,
  ) => {
    const URL = {
      kakao: `api/auth?social=kakao&token=${encodeURIComponent(idToken)}`,
      google: `api/auth?social=google&token=${encodeURIComponent(idToken)}`,
      naver: `api/auth?social=naver&token=${encodeURIComponent(idToken)}`,
    };

    try {
      const res = await fetch(URL[social]);
      const { status, data } = await res.json();

      handleStatusCode(status);

      if (status === 201) handleUserInfo(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      }
    }
  };

  const kakaoOnSuccess = async (resData: { response: LoginResponse }) => {
    const idToken = resData.response.access_token;
    getAuth('kakao', idToken);
  };

  const googleOnSuccess = async (idToken: string) => {
    getAuth('google', idToken);
  };

  return (
    <section className="mt-[2.3rem] w-full">
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-lg font-semibold">
          즐거운 배움으로 이어주는 연결고리
        </h1>
        <ConnectionLogoSVG className="scale-75" />
      </div>

      <div className="mb-6 mt-12 flex w-full items-center ">
        <div className="flex h-[1px] w-full flex-1 border-t border-solid border-sub-color2" />
        <span className="mx-3 whitespace-nowrap text-sm text-sub-color2">
          소셜로그인으로 간편하게 시작하기
        </span>
        <div className="flex h-[1px] w-full flex-1  border-t border-solid border-sub-color2" />
      </div>

      <div className="mb-[2.13rem] flex items-center justify-center gap-6">
        <KakaoAuth
          onSuccess={kakaoOnSuccess}
          onFail={(error) => {
            console.error('로그인 실패:', error);
            // --- 오류 토스트 메시지 표시 예정 ---
          }}
          useLoginForm
        />
        {GOOGLE_CLIENT_ID && (
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleAuth
              onSuccess={googleOnSuccess}
              onError={(error) => {
                console.error('로그인 실패:', error);
                // --- 오류 토스트 메시지 표시 예정 ---
              }}
            />
          </GoogleOAuthProvider>
        )}
      </div>
    </section>
  );
};

export default AuthHome;
