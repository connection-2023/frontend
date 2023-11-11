import { GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { ConnectionLogoSVG } from '@/icons/svg';
import { getAuth, getMyProfile } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import GoogleAuth from './GoogleAuth';
import KakaoAuth from './KakaoAuth';
import { LoginResponse, SignInResponse } from '@/types/auth';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

interface IAuthHome {
  handleStatusCode: (code: number) => void;
  handleUserInfo: (data: SignInResponse) => void;
}

const AuthHome = ({ handleStatusCode, handleUserInfo }: IAuthHome) => {
  const store = useUserStore();

  // --- 로그인 로직 하나로 합치기 ---
  const kakaoOnSuccess = async (resData: { response: LoginResponse }) => {
    const idToken = resData.response.access_token;
    const response = await getAuth('KAKAO', idToken);
    const { status, data } = response;

    handleStatusCode(status);

    if (status === 200) {
      const profileRes = await getMyProfile(data.userAccessToken);

      store.setAuthUser(profileRes.data.myProfile);
      store.setUserType('user');
      toast.success('로그인 성공!');
    } else if (status === 201) {
      handleUserInfo({ ...data, idToken });
    }
  };

  const googleOnSuccess = async (idToken: string) => {
    const response = await getAuth('GOOGLE', idToken);
    const { status, data } = response;

    handleStatusCode(status);

    if (status === 200) {
      const profileRes = await getMyProfile(data.userAccessToken);

      store.setAuthUser(profileRes.data.myProfile);
      store.setUserType('user');
      toast.success('로그인 성공!');
    } else if (status === 201) {
      handleUserInfo({ ...data, idToken });
    }
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
        <div className="flex h-[1px] w-full flex-1 border-t border-solid border-gray-500" />
        <span className="mx-3 whitespace-nowrap text-sm text-gray-500">
          소셜로그인으로 간편하게 시작하기
        </span>
        <div className="flex h-[1px] w-full flex-1  border-t border-solid border-gray-500" />
      </div>

      <div className="mb-[2.13rem] flex items-center justify-center gap-6">
        <KakaoAuth
          onSuccess={kakaoOnSuccess}
          onFail={(error) => {
            console.error('카카오 로그인 실패:', error);
            toast.error('Kakao 로그인에 실패했습니다. 다시 시도해 주세요.');
          }}
          useLoginForm
        />
        {GOOGLE_CLIENT_ID && (
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleAuth
              onSuccess={googleOnSuccess}
              onError={(error) => {
                console.error('구글 로그인 실패:', error);

                toast.error(
                  'Google 로그인에 실패했습니다. 다시 시도해 주세요.',
                );
              }}
            />
          </GoogleOAuthProvider>
        )}
      </div>
    </section>
  );
};

export default AuthHome;
