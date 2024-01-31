import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const response = NextResponse.json({}, { status: 200 });

    response.cookies.set({
      name: 'userAccessToken',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });
    response.cookies.set({
      name: 'lecturerAccessToken',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });
    response.cookies.set({
      name: 'refreshToken',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: 500, message: '로그아웃에 실패하였습니다' }),
    );
  }
};
