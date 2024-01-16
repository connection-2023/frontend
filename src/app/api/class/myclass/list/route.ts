import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('userAccessToken')?.value;
  if (!token) return new Response('권한 없음!', { status: 401 });

  const query = request.nextUrl.searchParams.toString();

  const serverResponse = await fetch(END_POINT + `/lectures/users?${query}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.json());

  if (serverResponse.statusCode !== 200) {
    throw new Error('유저 신청 강의 조회 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
