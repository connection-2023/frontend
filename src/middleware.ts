import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
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
import { FetchError } from './types/types';

const setCookie = (response: NextResponse, name: string, value: string) => {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
  });
};

const handleInvalidToken = (request: NextRequest, includes: boolean) => {
  const response = includes
    ? NextResponse.redirect(new URL('/login', request.url))
    : NextResponse.redirect(request.url);

  if (!includes) response.cookies.set('reload', 'true');

  response.cookies.delete('userAccessToken');
  response.cookies.delete('lecturerAccessToken');
  response.cookies.delete('refreshToken');

  return response;
};

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const user = request.cookies.get('userAccessToken')?.value;
  const lecturer = request.cookies.get('lecturerAccessToken')?.value;
  const authorization = user || lecturer;

  if (authorization) {
    try {
      if (user) {
        await checkAccessToken('user', authorization);

        if (USER_NO_ACCESS.includes(request.nextUrl.pathname)) {
          // 유저가 가면 안되는 lecturer 링크
          return NextResponse.redirect(new URL('/', request.url));
        }
      } else if (lecturer) {
        await checkAccessToken('lecturer', authorization);

        if (LECTURER_NO_ACCESS.includes(request.nextUrl.pathname)) {
          // 강사가 가면 안되는 user 링크 확인
          return NextResponse.redirect(new URL('/', request.url));
        }
      }

      if (NON_ACCESSIBLE_AFTER_LOGIN.includes(request.nextUrl.pathname)) {
        //로그인해서 가면 안되는 링크
        return NextResponse.redirect(new URL('/', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          const currentRefreshToken =
            request.cookies.get('refreshToken')?.value;
          try {
            if (currentRefreshToken) {
              const response = NextResponse.redirect(request.url);

              const { accessToken, refreshToken } = await (
                await accessTokenReissuance(currentRefreshToken)
              ).json();

              const tokenName = user
                ? 'userAccessToken'
                : 'lecturerAccessToken';

              setCookie(response, tokenName, accessToken);
              setCookie(response, 'refreshToken', refreshToken);

              return response;
            } else {
              throw new Error('refreshToken 존재하지 않음');
            }
          } catch (error) {
            console.error(error);
            const includes = LOGIN_REQUIRED_URLS.includes(
              request.nextUrl.pathname,
            );
            // 로그인이 필요한 링크 (강사 || 유저)

            return handleInvalidToken(request, includes);
          }
        } else {
          const includes = LOGIN_REQUIRED_URLS.includes(
            request.nextUrl.pathname,
          );
          // 로그인이 필요한 링크 (강사 || 유저)

          return handleInvalidToken(request, includes);
        }
      }
    }
  }

  if (LOGIN_REQUIRED_URLS.includes(request.nextUrl.pathname)) {
    // 로그인이 필요한 링크 (강사 || 유저)
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/class/:path*',
    '/instructor/:path*',
    '/coupon/:path*',
    '/dashboard',
    '/login',
    '/notify',
    '/register/:path*',
    '/report ',
    '/search',
    '/signin',
    '/mypage/:path*',
  ],
};
