import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const userType = searchParams.get('userType');

  const tokenName =
    userType === 'user' ? 'userAccessToken' : 'lecturerAccessToken';

  const token = request.cookies.get(tokenName);

  const requestUrl =
    tokenName === 'userAccessToken'
      ? '/auth/token/switch-user-to-lecturer'
      : '/auth/token/switch-lecturer-to-user';

  if (!token)
    return new NextResponse('토큰이 존재하지 않습니다! ', { status: 500 });

  const tokenValue = token.value;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${tokenValue}`,
  };

  try {
    const serverResponse = await fetch(END_POINT + requestUrl, {
      credentials: 'include',
      headers,
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error('HTTP error ' + res.status);
      }

      const { statusCode, data } = await res.json();

      const clientResponse = new NextResponse(
        JSON.stringify({ status: statusCode }),
        {
          status: statusCode,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': res.headers.get('Set-Cookie') || '',
          },
        },
      );

      if (statusCode === 200) {
        if (tokenName === 'userAccessToken') {
          await Promise.all([
            clientResponse.cookies.set({
              name: 'lecturerAccessToken',
              value: data.lecturerAccessToken,
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
              value: data.userAccessToken,
              httpOnly: true,
              path: '/',
              secure: process.env.NODE_ENV !== 'development',
            }),
            clientResponse.cookies.delete('lecturerAccessToken'),
          ]);
        }
      }

      return clientResponse;
    });

    return serverResponse;
  } catch (error) {
    return new NextResponse('유저 전환 네트워크 요청 에러: ', { status: 500 });
  }
};
