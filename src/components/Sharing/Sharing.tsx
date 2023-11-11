'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { DOMAIN } from '@/constants/constants';
import { KaKaoTalkSVG, FacebookSVG, TwitterSVG, LinkSVG } from '@/icons/svg';
import {
  shareToKakaoTalk,
  shareToFacebook,
  shareToTwitter,
} from '@/utils/socialShare';

interface ShareItem {
  label: string;
  button: JSX.Element;
}

const shareOptions = [
  {
    label: '카카오톡',
    button: (
      <button className="bg-kakao flex h-[35px] w-[35px] items-center justify-center rounded-full">
        <KaKaoTalkSVG width="17" height="16" />
      </button>
    ),
  },
  {
    label: '페이스북',
    button: <FacebookSVG />,
  },
  {
    label: 'X',
    button: <TwitterSVG />,
  },
  {
    label: '링크복사',
    button: (
      <button className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-sub-color1 ">
        <LinkSVG className="fill-white" />
      </button>
    ),
  },
];

interface ISharingProps {
  header: string;
  mode: 'class' | 'instructor';
}

const Sharing = ({ mode, header }: ISharingProps) => {
  return (
    <div className="flex flex-col items-center">
      <p className="flex w-full items-center justify-center border-b border-solid border-gray-700 py-3 text-sm font-semibold">
        공유하기
      </p>
      <div className="border-box flex items-center gap-[1.41rem] px-4 py-[0.69rem]">
        {shareOptions.map((option) => (
          <ShareButton
            key={option.label}
            mode={mode}
            header={header}
            label={option.label}
            button={option.button}
          />
        ))}
      </div>
    </div>
  );
};

export default Sharing;

const ShareButton = ({
  label,
  button,
  header,
  mode,
}: ShareItem & ISharingProps) => {
  const title =
    mode === 'class'
      ? 'Connection - ' + header
      : 'Connection - 강사 프로필 ' + header;
  const pageUrl = DOMAIN + usePathname();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = () => {
    switch (label) {
      case '카카오톡':
        shareToKakaoTalk(pageUrl);
        break;
      case '페이스북':
        shareToFacebook(title, pageUrl);
        break;
      case 'X':
        shareToTwitter(title, pageUrl);
        break;
      case '링크복사':
        navigator.clipboard
          .writeText(pageUrl)
          .then(() => {
            console.log('클립보드 url 복사'); // 토스트 메세지로 바꿀 예정
          })
          .catch((err) => {
            console.error('Could not copy text: ', err);
          });
        break;
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer flex-col items-center justify-center whitespace-nowrap"
    >
      {button}
      <label className="mt-[0.41rem] cursor-pointer text-xs font-semibold">
        {label}
      </label>
    </div>
  );
};
