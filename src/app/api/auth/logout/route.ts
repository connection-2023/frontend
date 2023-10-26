import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const clientResponse = new NextResponse(JSON.stringify({ status: 200 }));

    await Promise.all([
      clientResponse.cookies.delete('userAccessToken'),
      clientResponse.cookies.delete('lecturerAccessToken'),
    ]);

    return clientResponse;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: 500, message: '로그아웃에 실패하였습니다' }),
    );
  }
};
