import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('lecturerAccessToken')?.value;

  if (!token) {
    return NextResponse.json(
      {
        status: 401,
        message: '강사 토큰이 존재하지 않습니다.',
      },
      { status: 401 },
    );
  }

  const query = request.nextUrl.searchParams.toString();

  const serverResponse = await fetch(
    `${END_POINT}/lecturer-payments?${query}`,
    {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  ).then((data) => data.json());

  if (serverResponse.statusCode !== 200) {
    throw new Error('강사 수입 내역 조회 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
