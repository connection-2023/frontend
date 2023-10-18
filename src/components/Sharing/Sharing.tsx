'use client';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useClickAway } from 'react-use';
import { DOMAIN } from '@/constants/constants';
import {
  KaKaoTalkSVG,
  ShareSVG,
  FacebookSVG,
  TwitterSVG,
  LinkSVG,
} from '@/icons/svg';
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
      <button className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#FFEC3F]">
        <KaKaoTalkSVG />
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
  const [isOpened, setIsOpened] = useState(false);
  const modalRef = useRef(null);

  useClickAway(modalRef, () => {
    if (isOpened) setIsOpened(false);
  });

  const handleOpenModal = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <div ref={modalRef} className="relative">
      <ShareSVG
        onClick={handleOpenModal}
        className={`cursor-pointer ${
          isOpened ? 'fill-sub-color3' : 'fill-sub-color2'
        }  hover:fill-sub-color3`}
      />

      {isOpened && (
        <div className="absolute right-0 top-8 z-10 flex h-28 flex-col items-center rounded-[0.31rem] bg-white shadow-[0_1px_3px_1px_rgba(0,0,0,0.25)] ">
          <p className="flex h-[35px] w-full items-center justify-center border-b border-solid border-sub-color4 text-sm font-semibold ">
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
      )}
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
