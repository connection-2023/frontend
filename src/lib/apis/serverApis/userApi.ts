import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { DOMAIN } from '@/constants/constants';
import { instructorProfile, userProfile } from '@/types/auth';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

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

export const accessTokenReissuance = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(END_POINT + '/auth/token/refresh', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `refresh 조회 에러: ${errorData.message || ''}, status: ${
        response.status
      }`,
    );
  }

  const resCookies = response.headers.get('set-cookie')?.split('; ');
  const refreshTokenCookie = resCookies!.find((cookie) =>
    cookie.startsWith('refreshToken='),
  );
  const data = await response.json();
  const userAccessToken = data.data.userAccessToken;
  const lecturerAccessToken = data.data.lecturerAccessToken;
  const resRefreshToken = refreshTokenCookie!.split('=')[1];

  if (userAccessToken) {
    return { accessToken: userAccessToken, refreshToken: resRefreshToken };
  } else if (lecturerAccessToken) {
    return { accessToken: lecturerAccessToken, refreshToken: resRefreshToken };
  } else {
    throw new Error('엑세스 토큰 미 발급');
  }
};

export const checkAccessToken = async (
  tokenType: 'userAccessToken' | 'lecturerAccessToken',
) => {
  const cookieStore = cookies();
  const authorization = cookieStore.get(tokenType)?.value;
  const point =
    tokenType === 'userAccessToken'
      ? 'user-access-token'
      : 'lecturer-access-token';

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(`${END_POINT}/auth/token/verify/${point}`, {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `토큰 검증 에러: ${errorData.message || ''}, status: ${response.status}`,
    );
  }
};
