import { toast } from 'react-toastify';
import { userProfile, userType, userProfileupdate } from '@/types/auth';
import { IRegisterForm } from '@/types/form';
import { social } from '@/types/auth';
import { FetchError } from '@/types/types';

export const checkUserNickname = async (nickname: string) => {
  try {
    const response = await fetch(
      `/api/users/check-nickname?nickname=${encodeURIComponent(nickname)}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getAuth = async (social: social, idToken: string) => {
  try {
    const response = await fetch(
      `/api/auth/login?social=${social}&token=${encodeURIComponent(idToken)}`,
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 400) {
        toast.error('이미 존재하는 이메일로 가입 했습니다.');
      } else {
        toast.error(`${social} 로그인 실패, 다시 시도해 주세요.`);
      }

      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('로그인 fetch 요청 오류: ', error.message);
    }
  }
};

export const postUserRegister = async (data: IRegisterForm) => {
  const response = await fetch('api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());

  return response;
};

export const getMyProfile = async (token?: string): Promise<userProfile> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`/api/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  const res = await response.json();

  return res.data.myProfile;
};

export const getLogout = async () => {
  const response = await fetch(`/api/auth/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const postProfileImage = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await fetch(`/api/users/upload-profile`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const res = await response.json();

  return res;
};

export const getSwitchUserRole = async (userType: userType) => {
  const response = await fetch(`/api/auth/switch-user?userType=${userType}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = await response.json();

  return res;
};

export const accessTokenReissuance = async () => {
  try {
    const response = await fetch(`/api/auth/refresh`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'manual',
    });

    if (response.type === 'opaqueredirect') {
      window.location.href = response.url;
    }

    return response;
  } catch (error) {
    console.error('엑세스 토큰 재발급 오류', error);
    throw error;
  }
};

export const updateMyProfile = async (data: userProfileupdate) => {
  try {
    const response = await fetch(`/api/users/update-profile`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return resData.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
