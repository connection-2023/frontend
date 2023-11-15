import React, { useState, useEffect } from 'react';
import { KaKaoTalkSVG } from '@/icons/svg';
import { ExtendedWindow, KakaoAuthProps } from '@/types/auth';

declare const window: ExtendedWindow;

const KakaoAuth = ({
  throughTalk = true,
  useLoginForm = false,
  onSuccess,
  onFail,
}: KakaoAuthProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleKakaoLogIn = () => {
    if (window.Kakao === undefined) {
      return;
    }

    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_KEY);
    }

    const method = useLoginForm ? 'loginForm' : 'login';

    kakao.Auth[method]({
      throughTalk,
      success: function (response) {
        setIsLoggedIn(true);
        onSuccess({ response });
      },
      fail: onFail,
    });
  };

  return (
    <button
      type="button"
      className="flex h-[3.5625rem] w-[3.5625rem] items-center justify-center rounded-full bg-kakao"
      onClick={handleKakaoLogIn}
    >
      <KaKaoTalkSVG width="27" height="24" />
    </button>
  );
};

export default KakaoAuth;
