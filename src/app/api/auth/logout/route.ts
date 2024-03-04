import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const token =
    request.cookies.get('userAccessToken')?.value ||
    request.cookies.get('lecturerAccessToken')?.value;

  if (!token) {
    return new NextResponse(
      JSON.stringify({ status: 401, message: '로그인된 유저가 아닙니다!' }),
    );
  }

  try {
    const clientResponse = new NextResponse();

    clientResponse.cookies.delete('userAccessToken');
    clientResponse.cookies.delete('lecturerAccessToken');
    clientResponse.cookies.delete('refreshToken');

    return clientResponse;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: 500, message: '로그아웃에 실패하였습니다' }),
    );
  }
};
