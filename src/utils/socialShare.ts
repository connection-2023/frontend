declare global {
  interface Window {
    Kakao: any;
  }
}

export const shareToKakaoTalk = (url: string) => {
  if (window.Kakao === undefined) {
    return;
  }

  const kakao = window.Kakao;

  if (!kakao.isInitialized()) {
    kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_KEY);
  }

  kakao.Share.sendScrap({
    templateId: 98927,
    requestUrl: url,
  });
};

export const shareToTwitter = (title: string, url: string) => {
  const sharedLink =
    'text=' + encodeURIComponent(title + ' \n ') + encodeURIComponent(url);

  window.open(
    `https://twitter.com/intent/tweet?${sharedLink}`,
    '_blank',
    'width=500,height=700',
  );
};

export const shareToFacebook = (title: string, url: string) => {
  const sharedLink = encodeURIComponent(url);

  window.open(
    `http://www.facebook.com/sharer/sharer.php?u=${sharedLink}`,
    '_blank',
    'width=500,height=700',
  );
};
