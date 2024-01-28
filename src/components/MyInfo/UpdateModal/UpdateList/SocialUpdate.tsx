import { GoogleSVG, KaKaoTalkSVG, NaverSVG } from '@/icons/svg';
import UpdateModalContainer from '../UpdateModalContainer';
import { social } from '@/types/auth';
import { useEffect, useState } from 'react';

interface SocialUpdateProps {
  socialImage: JSX.Element | null;
  email: string;
  social: social;
  closeModalHandler?: () => void;
}

const SocialUpdate = ({
  social,
  socialImage,
  email,
  closeModalHandler,
}: SocialUpdateProps) => {
  const [selectSocial, setSelectSocail] = useState<social | null>(null);

  const selectSocailHandler = (newSocial: social) => {
    setSelectSocail((prevSocial) =>
      prevSocial === newSocial ? null : newSocial,
    );
  };

  const socials = {
    KAKAO: (
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-kakao ${
          selectSocial === 'KAKAO'
            ? 'border-2 border-solid border-sub-color1'
            : ''
        }`}
      >
        <KaKaoTalkSVG className="h-6 w-6" />
      </div>
    ),
    GOOGLE: (
      <div
        className={`h-10 w-10 ${
          selectSocial === 'GOOGLE'
            ? 'rounded-full border-2 border-solid border-sub-color1'
            : ''
        }`}
      >
        <GoogleSVG />
      </div>
    ),
    NAVER: (
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-naver ${
          selectSocial === 'NAVER'
            ? 'border-2 border-solid border-sub-color1'
            : ''
        }`}
      >
        <NaverSVG className="h-5 w-5" />
      </div>
    ),
  };

  const updateSocial = async () => {
    if (closeModalHandler) {
      closeModalHandler();
    }
  };

  return (
    <UpdateModalContainer
      title="소설 계정 변경"
      disabled={!selectSocial}
      closeEvent={closeModalHandler}
      updateEvent={updateSocial}
    >
      <p className="mb-7 mt-6 w-60 px-4 text-main-color sm:mx-auto sm:w-auto sm:px-0 sm:text-sm">
        * 기존 계정의 정보는 변경한 소셜로그인 계정으로 이동되며, 기존 계정은
        7일 후 삭제됩니다.
      </p>
      <section className="flex flex-grow flex-col gap-7 px-4 sm:px-8 sm:pt-0">
        <dl className="grid grid-rows-2 items-center gap-y-3 text-lg font-semibold sm:grid-cols-[9rem_1fr] sm:grid-rows-none sm:gap-y-0 sm:text-base">
          <dt>소셜로그인 계정</dt>
          <dd className="flex gap-2">
            {socialImage}
            {email}
          </dd>
        </dl>
        <div className="grid grid-rows-2 items-center gap-y-3 text-lg font-semibold sm:grid-cols-[9rem_1fr] sm:grid-rows-none sm:gap-y-0 sm:text-base">
          <label className="self-start">변경할 소셜 선택</label>
          <ul className="flex gap-4">
            {Object.entries(socials).map(
              ([socialKey, socialIcon]) =>
                socialKey !== social && (
                  <li key={socialKey}>
                    <button
                      onClick={() => selectSocailHandler(socialKey as social)}
                    >
                      {socialIcon}
                    </button>
                  </li>
                ),
            )}
          </ul>
        </div>
      </section>
    </UpdateModalContainer>
  );
};

export default SocialUpdate;
