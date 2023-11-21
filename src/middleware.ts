import { NextRequest, NextResponse } from 'next/server';
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
      } else if (lecturer) {
        await checkAccessToken('lecturerAccessToken');
      }

      return NextResponse.next();
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        try {
          const response = NextResponse.redirect(new URL(request.url));

          const { accessToken, refreshToken } = await accessTokenReissuance();

          const tokenName = user ? 'userAccessToken' : 'lecturerAccessToken';

          setCookie(response, tokenName, accessToken);
          setCookie(response, 'refreshToken', refreshToken);

          return response;
        } catch (error) {
          console.log('refresh 에러', error.message);
          //logout 로직 발동
        }
      }
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/my/:path*', '/', '/instructor/apply'], // '/login', '/api/my/:path*', '/api/auth/logout
};

// let token: string | undefined;

// if (req.cookies.has('token')) {
//   token = req.cookies.get('token')?.value;
// } else if (req.headers.get('Authorization')?.startsWith('Bearer ')) {
//   token = req.headers.get('Authorization')?.substring(7);
// }

// if (req.nextUrl.pathname.startsWith('/login') && !token) return;

// if (
//   !token &&
//   (req.nextUrl.pathname.startsWith('/api/users') ||
//     req.nextUrl.pathname.startsWith('/api/auth/logout'))
// ) {
//   return console.log(401, '로그인 후 이용해주세요');
// }

// const response = NextResponse.next();

// if (req.url.includes('/my') && !token) {
//   return NextResponse.redirect(new URL('/', req.url));
// }
