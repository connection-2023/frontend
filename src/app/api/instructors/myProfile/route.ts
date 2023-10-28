import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const GET = async (request: NextRequest) => {
  const cookies = request.headers.get('cookie');

  let tokenValue = '';
  if (cookies) {
    const [cookieName, cookieValue] = cookies.split('=');

    if (cookieName === 'lecturerAccessToken') {
      tokenValue = cookieValue.trim();
    }
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${tokenValue}`,
  };

  const serverResponse = await fetch(
    END_POINT + '/lecturers/my-basic-profile',
    {
      method: 'GET',
      credentials: 'include',
      headers,
    },
  ).then((data) => data.json());

  return NextResponse.json(serverResponse);
};
