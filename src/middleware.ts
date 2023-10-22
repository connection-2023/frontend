import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  let token: string | undefined;

  if (req.cookies.has('token')) {
    token = req.cookies.get('token')?.value;
  } else if (req.headers.get('Authorization')?.startsWith('Bearer ')) {
    token = req.headers.get('Authorization')?.substring(7);
  }

  if (req.nextUrl.pathname.startsWith('/login') && !token) return;

  if (
    !token &&
    (req.nextUrl.pathname.startsWith('/api/users') ||
      req.nextUrl.pathname.startsWith('/api/auth/logout'))
  ) {
    return console.log(401, '로그인 후 이용해주세요');
  }

  const response = NextResponse.next();

  if (req.url.includes('/my') && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return response;
};

export const config = {
  matcher: ['/my/:path*', '/'], // '/login', '/api/my/:path*', '/api/auth/logout
};
