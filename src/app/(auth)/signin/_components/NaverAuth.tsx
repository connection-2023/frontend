import { nanoid } from 'nanoid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { DOMAIN } from '@/constants/constants';
import { NaverSVG } from '@/icons/svg';

const NaverAuth = ({
  onSuccess,
}: {
  onSuccess: (idToken: string) => Promise<void>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const isLoading = useRef(false);

  useEffect(() => {
    if (code && state && !isLoading.current) {
      isLoading.current = true;

      fetch(`${DOMAIN}/api/auth/naver-login?code=${code}&state=${state}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          onSuccess(data.access_token);
        })
        .catch((error) => {
          toast.error('네이버 로그인 실패, 다시 시도해 주세요.');
          console.error('네이버 로그인 에러:', error);
        })
        .finally(() => {
          isLoading.current = false;
        });
    }
  }, [code, state]);

  const handleNaverLogin = () => {
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
    }&redirect_uri=${
      process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI
    }&state=${nanoid()}`;

    router.push(naverLoginUrl);
  };

  return (
    <button
      type="button"
      className="flex h-[3.5625rem] w-[3.5625rem] items-center justify-center rounded-full bg-naver"
      onClick={handleNaverLogin}
    >
      <NaverSVG width="27" height="24" />
    </button>
  );
};

export default NaverAuth;
