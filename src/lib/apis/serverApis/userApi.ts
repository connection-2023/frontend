import { cookies } from 'next/headers';
import { instructorProfile, userProfile } from '@/types/auth';
import { FetchError } from '@/types/types';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;
const END_POINT_DOMAIN = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

export const getInstructorProfile = async (): Promise<instructorProfile> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(END_POINT + '/lecturers/my-basic-profile', {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `강사 프로필 조회 에러: ${errorData.message || ''}, status: ${
        response.status
      }`,
    );
  }

  const data = await response.json();

  return data.data.lecturerBasicProfile;
};

export const getMyProfile = async (): Promise<userProfile> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('userAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(END_POINT + '/users/my-pages', {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `유저 프로필 조회 에러: ${errorData.message || ''}, status: ${
        response.status
      }`,
    );
  }

  const data = await response.json();

  return data.data.myProfile;
};

export const accessTokenReissuance = async (
  refreshToken: string,
): Promise<Response> => {
  const response = await fetch(`${END_POINT_DOMAIN}/auth/token/refresh`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(errorData.message || '');
    error.status = response.status;
    throw error;
  }

  const resCookies = response.headers.get('set-cookie')?.split('; ');
  const refreshTokenCookie = resCookies!.find((cookie) =>
    cookie.startsWith('refreshToken='),
  );

  const data = await response.json();
  const userAccessToken = data.data.userAccessToken;
  const lecturerAccessToken = data.data.lecturerAccessToken;
  const resRefreshToken = refreshTokenCookie!.split('=')[1];

  let result;

  if (userAccessToken) {
    result = {
      accessToken: userAccessToken,
      refreshToken: resRefreshToken,
    };
  } else if (lecturerAccessToken) {
    result = {
      accessToken: lecturerAccessToken,
      refreshToken: resRefreshToken,
    };
  } else {
    throw new Error('엑세스 토큰 미 발급');
  }

  return new Response(JSON.stringify(result));
};

export const checkAccessToken = async (
  tokenType: 'user' | 'lecturer',
  token: string,
) => {
  const point =
    tokenType === 'user' ? 'user-access-token' : 'lecturer-access-token';

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `${END_POINT_DOMAIN}/auth/token/verify/${point}`,
    {
      method: 'GET',
      credentials: 'include',
      headers,
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(errorData.message || '');
    error.status = response.status;
    throw error;
  }

  return response;
};
