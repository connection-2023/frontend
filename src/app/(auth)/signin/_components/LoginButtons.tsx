'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getAuth, getMyProfile } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import { convertToProfileInfo } from '@/utils/apiDataProcessor';
import GoogleAuth from './GoogleAuth';
import KakaoAuth from './KakaoAuth';
import NaverAuth from './NaverAuth';
import { LoginResponse, social } from '@/types/auth';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const LoginButtons = () => {
  const store = useUserStore();
  const router = useRouter();

  const handleAuthSuccess = async (social: social, idToken: string) => {
    const toastId = toast.loading('로그인 중...');

    const response = await getAuth(social, idToken);
    const { status, data } = response;

    if (status === 200) {
      const profileRes = await getMyProfile(data.userAccessToken);

      const authUser = convertToProfileInfo(profileRes);

      store.setAuthUser(authUser);
      store.setUserType('user');

      toast.update(toastId, {
        render: '로그인 성공!',
        type: 'success',
        isLoading: false,
        autoClose: 1500,
      });

      router.replace('/');
      router.refresh();
    } else if (status === 201) {
      const { authEmail, signUpType } = data;

      router.replace(
        `/register?token=${idToken}&userEmail=${authEmail}&type=${signUpType}`,
      );
    }
  };

  const kakaoOnSuccess = async (resData: { response: LoginResponse }) => {
    const idToken = resData.response.access_token;
    handleAuthSuccess('KAKAO', idToken);
  };

  const googleOnSuccess = async (idToken: string) => {
    handleAuthSuccess('GOOGLE', idToken);
  };

  const naverOnSuccess = async (idToken: string) => {
    handleAuthSuccess('NAVER', idToken);
  };

  return (
    <div className="flex items-center gap-6">
      <KakaoAuth
        onSuccess={kakaoOnSuccess}
        onFail={(error) => {
          console.error('카카오 로그인 실패:', error);
          toast.error('Kakao 로그인에 실패했습니다. 다시 시도해 주세요.');
        }}
        useLoginForm
      />

      <NaverAuth onSuccess={naverOnSuccess} />
      {GOOGLE_CLIENT_ID && (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleAuth
            onSuccess={googleOnSuccess}
            onError={(error) => {
              console.error('구글 로그인 실패:', error);

              toast.error('Google 로그인에 실패했습니다. 다시 시도해 주세요.');
            }}
          />
        </GoogleOAuthProvider>
      )}
    </div>
  );
};

export default LoginButtons;
