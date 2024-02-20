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

const redirectWithMessage = (
  message: string,
  response: NextResponse<unknown>,
) => {
  const toast = {
    toast: message,
    date: new Date().toISOString(),
    state: 'error',
  };

  response.cookies.set({
    name: 'toast',
    value: JSON.stringify(toast),
  });

  return response;
};

const isProtectedUrl = (
  patterns: (string | RegExp)[],
  url: string,
): boolean => {
  for (const pattern of patterns) {
    if (pattern instanceof RegExp) {
      if (pattern.test(url)) {
        return true;
      }
    } else if (pattern === url) {
      return true;
    }
  }
  return false;
};

export async function middleware(request: NextRequest) {
  const user = request.cookies.get('userAccessToken')?.value;
  const lecturer = request.cookies.get('lecturerAccessToken')?.value;
  const authorization = user || lecturer;

  if (authorization) {
    try {
      if (user) {
        await checkAccessToken('user', authorization);

        if (isProtectedUrl(USER_NO_ACCESS, request.nextUrl.pathname)) {
          // 유저가 가면 안되는 lecturer 링크

          return redirectWithMessage(
            '강사로 전환이 필요한 페이지 입니다.',
            NextResponse.redirect(new URL('/', request.url)),
          );
        }
      } else if (lecturer) {
        await checkAccessToken('lecturer', authorization);

        if (isProtectedUrl(LECTURER_NO_ACCESS, request.nextUrl.pathname)) {
          // 강사가 가면 안되는 user 링크 확인

          return redirectWithMessage(
            '유저로 전환이 필요한 페이지 입니다.',
            NextResponse.redirect(new URL('/', request.url)),
          );
        }
      }

      if (
        isProtectedUrl(NON_ACCESSIBLE_AFTER_LOGIN, request.nextUrl.pathname)
      ) {
        //로그인해서 가면 안되는 링크
        return redirectWithMessage(
          '잘못된 접근입니다.',
          NextResponse.redirect(new URL('/', request.url)),
        );
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
            const includes = isProtectedUrl(
              LOGIN_REQUIRED_URLS,
              request.nextUrl.pathname,
            );
            // 로그인이 필요한 링크 (강사 || 유저)

            return redirectWithMessage(
              '세션이 만료되었습니다. 다시 로그인해주세요.',
              handleInvalidToken(request, includes),
            );
          }
        } else {
          const includes = isProtectedUrl(
            LOGIN_REQUIRED_URLS,
            request.nextUrl.pathname,
          );
          // 로그인이 필요한 링크 (강사 || 유저)

          return redirectWithMessage(
            '세션이 만료되었습니다. 다시 로그인해주세요.',
            handleInvalidToken(request, includes),
          );
        }
      }
    }
  }

  if (isProtectedUrl(LOGIN_REQUIRED_URLS, request.nextUrl.pathname)) {
    // 로그인이 필요한 링크 (강사 || 유저)
    return redirectWithMessage(
      '로그인이 필요한 페이지입니다.',
      NextResponse.redirect(new URL('/login', request.url)),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|error).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
