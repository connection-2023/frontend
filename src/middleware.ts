import { NextRequest, NextResponse } from 'next/server';
import {
  LECTURER_NO_ACCESS,
  LOGIN_REQUIRED_URLS,
  NON_ACCESSIBLE_AFTER_LOGIN,
  USER_NO_ACCESS,
} from './constants/constants';
import {
  checkAccessToken,
  accessTokenReissuance,
} from './lib/apis/serverApis/userApi';

const setCookie = (response: NextResponse, name: string, value: string) => {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
  });
};

export const middleware = async (request: NextRequest) => {
  const user = request.cookies.get('userAccessToken')?.value;
  const lecturer = request.cookies.get('lecturerAccessToken')?.value;

  if (user || lecturer) {
    try {
      if (user) {
        await checkAccessToken('userAccessToken');

        if (USER_NO_ACCESS.includes(request.nextUrl.pathname)) {
          // 유저가 가면 안되는 lecturer 링크
          return NextResponse.redirect(new URL('/', request.url));
        }
      } else if (lecturer) {
        await checkAccessToken('lecturerAccessToken');

        if (LECTURER_NO_ACCESS.includes(request.nextUrl.pathname)) {
          // 강사가 가면 안되는 user 링크 확인
          return NextResponse.redirect(new URL('/', request.url));
        }
      }

      // if (NON_ACCESSIBLE_AFTER_LOGIN.includes(request.nextUrl.pathname)) {
      //   //로그인해서 가면 안되는 링크
      //   return NextResponse.redirect(new URL('/', request.url));
      // }

      return NextResponse.next();
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        try {
          const response = NextResponse.redirect(request.url);

          const { accessToken, refreshToken } = await accessTokenReissuance();

          const tokenName = user ? 'userAccessToken' : 'lecturerAccessToken';

          setCookie(response, tokenName, accessToken);
          setCookie(response, 'refreshToken', refreshToken);

          return response;
        } catch (error) {
          const response = LOGIN_REQUIRED_URLS.includes(
            request.nextUrl.pathname,
          )
            ? NextResponse.redirect(new URL('/login', request.url))
            : NextResponse.redirect(request.url);

          response.cookies.delete('userAccessToken');
          response.cookies.delete('lecturerAccessToken');
          response.cookies.delete('refreshToken');

          return response;
        }
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (LOGIN_REQUIRED_URLS.includes(request.nextUrl.pathname)) {
    //강사 토큰이 필요한 링크
    //유저 토큰이 필요한 링크
    // 로그인이 필요한 링크
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/my/:path*', '/', '/instructor/apply', '/class/create'], // '/login', '/api/my/:path*', '/api/auth/logout
};
