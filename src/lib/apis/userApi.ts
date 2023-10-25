import { DOMAIN } from '@/constants/constants';

export const getAuth = async (
  social: 'NAVER' | 'KAKAO' | 'GOOGLE',
  idToken: string,
) => {
  try {
    const response = await fetch(
      DOMAIN +
        `/api/auth/login?social=${social}&token=${encodeURIComponent(idToken)}`,
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('Server responded with an error');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('로그인 fetch 요청 오류: ', error.message);
    }
  }
};

export const getMyProfile = async (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${DOMAIN}/api/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  const res = await response.json();

  return res;
};

export const getLogout = async () => {
  const response = await fetch(`${DOMAIN}/api/auth/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  return response;
};

export const postProfileImage = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await fetch(`${DOMAIN}/api/users/upload-profile`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  }).then((data) => data.json());

  return response;
};

export const getSwitchUserRole = async () => {
  const response = await fetch(`${DOMAIN}/api/auth/switch-user`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  return response;
};
