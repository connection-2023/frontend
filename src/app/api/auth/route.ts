import { AuthResponse } from '@/types/auth';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;
const URL = process.env.NEXT_PUBLIC_API_LOG_IN;

if (!END_POINT || !URL) {
  throw new Error('Required environment variables are missing');
}

export const getAuth = async (
  social: 'naver' | 'kakao' | 'google',
  token: string,
): Promise<AuthResponse> => {
  return fetch(
    END_POINT + URL + social.replace(/^'|'$/g, '') + '?access-token=' + token,
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    const data = await response.json();

    return { status: response.status, data };
  });
};
