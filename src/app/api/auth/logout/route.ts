import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const response = new NextResponse(JSON.stringify({ status: 200 }));

    await Promise.all([
      response.cookies.delete('userAccessToken'),
      response.cookies.delete('lecturerAccessToken'),
    ]);

    return response;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: 500, message: '로그아웃에 실패하였습니다' }),
    );
  }
};
