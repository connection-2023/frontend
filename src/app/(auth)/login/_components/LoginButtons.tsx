'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getAuth, getMyProfile } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import GoogleAuth from './GoogleAuth';
import KakaoAuth from './KakaoAuth';
import { LoginResponse } from '@/types/auth';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const LoginButtons = () => {
  const store = useUserStore();
  const router = useRouter();
  // --- 로그인 로직 하나로 합치기 ---
  const kakaoOnSuccess = async (resData: { response: LoginResponse }) => {
    const idToken = resData.response.access_token;
    const response = await getAuth('KAKAO', idToken);
    const { status, data } = response;

    if (status === 200) {
      const profileRes = await getMyProfile(data.userAccessToken);

      store.setAuthUser(profileRes.data.myProfile);
      store.setUserType('user');
      toast.success('로그인 성공!');
      router.push('/');
    } else if (status === 201) {
      const { authEmail, signUpType } = data;

      router.push(
        `/register?token=${idToken}&userEmail=${authEmail}&type=${signUpType}`,
      );
    }
  };

  const googleOnSuccess = async (idToken: string) => {
    const response = await getAuth('GOOGLE', idToken);
    const { status, data } = response;

    if (status === 200) {
      const profileRes = await getMyProfile(data.userAccessToken);

      store.setAuthUser(profileRes.data.myProfile);
      store.setUserType('user');
      toast.success('로그인 성공!');
      router.push('/');
    } else if (status === 201) {
      console.log(data);
      const { authEmail, signUpType } = data;
      console.log(authEmail, signUpType);

      router.push(
        `/register?token=${idToken}&userEmail=${authEmail}&type=${signUpType}`,
      );
    }
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
