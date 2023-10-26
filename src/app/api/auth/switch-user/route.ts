import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const GET = async (req: NextRequest) => {
  const cookies = req.headers.get('cookie');
  let tokenName = '';
  let tokenValue = '';

  if (cookies) {
    const cookieArray = cookies.split(';');

    const foundCookie =
      cookieArray.find((cookie) => {
        const [name, value] = cookie.split('=');

        if (
          name.trim() === 'userAccessToken' ||
          name.trim() === 'lecturerAccessToken'
        ) {
          tokenName = name.trim();
          tokenValue = value.trim();
          return true;
        }

        return false;
      }) || '';

    if (foundCookie) {
      const [foundCookieName, foundCookieValue] = foundCookie.split('=');
      tokenName = foundCookieName.trim();
      tokenValue = foundCookieValue.trim();
    }
  }
  const requestUrl =
    tokenName === 'userAccessToken'
      ? '/auth/token/switch-user-to-lecturer'
      : '/auth/token/switch-lecturer-to-user';

  const headers: Record<string, string> = {
    Authorization: `Bearer ${tokenValue}`,
  };

  try {
    const serverResponse = await fetch(END_POINT + requestUrl, {
      credentials: 'include',
      headers,
    }).then((res) => res.json());

    const clientResponse = new NextResponse(
      JSON.stringify({ status: serverResponse.statusCode }),
    );

    if (serverResponse.statusCode === 200) {
      if (tokenName === 'userAccessToken') {
        await Promise.all([
          clientResponse.cookies.set({
            name: 'lecturerAccessToken',
            value: serverResponse.data.lecturerAccessToken,
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV !== 'development',
          }),
          clientResponse.cookies.delete('userAccessToken'),
        ]);
      } else if (tokenName === 'lecturerAccessToken') {
        await Promise.all([
          clientResponse.cookies.set({
            name: 'userAccessToken',
            value: serverResponse.data.lecturerAccessToken,
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV !== 'development',
          }),
          clientResponse.cookies.delete('lecturerAccessToken'),
        ]);
      }
    }
    return clientResponse;
  } catch (error) {
    return new NextResponse('네트워크 요청 에러: ', { status: 500 });
  }
};
