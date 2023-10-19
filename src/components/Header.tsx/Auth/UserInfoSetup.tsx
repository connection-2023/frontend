import { useState, ChangeEvent } from 'react';
import { KaKaoTalkSVG, NaverSVG, GoogleSVG } from '@/icons/svg';
import { SignInResponse } from '@/types/auth';

const inputStyle =
  'w-36 rounded-[0.31rem] px-3 py-2 outline outline-1 outline-sub-color2';

const UserInfoSetup = ({ userInfo }: { userInfo: SignInResponse }) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [contact, setContact] = useState('');

  const handleContact = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // "000-0000-0000" 형식
    setContact(formattedValue);
  };

  return (
    //   --- 폼 유효성 검사 API 연결할 때 추가 에정---
    <section className="flex h-full w-full flex-col justify-between">
      <div className="mb-7 flex h-20 flex-col items-center justify-center gap-2 border-b border-solid border-sub-color4 text-sm text-sub-color3">
        <h2>로그인 정보</h2>
        <div className="flex items-center gap-2">
          {SocialIcons(userInfo.signUpType)}
          {userInfo.authEmail}
        </div>
      </div>

      <div className="mb-[2.81rem] px-[1.31rem] font-semibold">
        <ul className="flex flex-col gap-[0.62rem] text-sm">
          <li className="flex h-8 items-center gap-4">
            <label htmlFor="signup-name" className="w-9">
              이름
            </label>
            <input
              id="signup-name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputStyle}
            />
          </li>

          <li className="flex h-8 items-center gap-4">
            <label htmlFor="signup-nickname">닉네임</label>
            <input
              id="signup-nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={inputStyle}
            />
            <span className="cursor-pointer text-sub-color2 hover:text-black">
              중복확인
            </span>
          </li>

          <li className="flex h-8 items-center gap-4">
            <label htmlFor="signup-contact">연락처</label>
            <input
              id="signup-contact"
              value={contact}
              onChange={handleContact}
              className={inputStyle}
            />
            <span className="cursor-pointer text-sub-color2 hover:text-black">
              인증하기
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default UserInfoSetup;

const SocialIcons = (socialType: SignInResponse['signUpType']) => {
  if (socialType === 'NAVER')
    return (
      <button className="flex h-[21px] w-[21px] items-center justify-center rounded-full bg-[#03C75A]">
        <NaverSVG width="9" height="9" />
      </button>
    );
  else if (socialType === 'KAKAO')
    return (
      <button className="flex h-[21px] w-[21px] items-center justify-center rounded-full bg-[#FEE500]">
        <KaKaoTalkSVG width="11.28" height="10.56" />
      </button>
    );
  else
    return (
      // google
      <button className="flex h-[21px] w-[21px] items-center justify-center rounded-full">
        <GoogleSVG width="58" height="57" />
      </button>
    );
};
