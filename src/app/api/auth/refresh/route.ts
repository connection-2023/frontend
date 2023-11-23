import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const GET = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(END_POINT + '/auth/token/refresh', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refreshToken=${refreshToken}`,
    },
  }).then(async (response) => {
    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        const response = NextResponse.redirect(new URL('/login', request.url));

        response.cookies.delete('userAccessToken');
        response.cookies.delete('lecturerAccessToken');
        response.cookies.delete('refreshToken');
        return response;
      }

      return NextResponse.json(
        {
          status: response.status,
          message: errorData.message || '서버 요청 오류',
        },
        { status: response.status },
      );
    }

    const { data, statusCode } = await response.json();

    const clientResponse = new NextResponse();

    const resCookies = response.headers.get('set-cookie')?.split('; ');
    const refreshTokenCookie = resCookies!.find((cookie) =>
      cookie.startsWith('refreshToken='),
    );
    const resRefreshToken = refreshTokenCookie!.split('=')[1];

    const tokenName = Object.keys(data)[0];

    clientResponse.cookies.set({
      name: tokenName,
      value: data[tokenName],
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });

    clientResponse.cookies.set({
      name: 'refreshToken',
      value: resRefreshToken,
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });

    return clientResponse;
  });

  return response;
};
