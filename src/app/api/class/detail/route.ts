import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('userAccessToken')?.value;
  const lectureId = request.nextUrl.searchParams.get('id');

  const headers: Record<string, string> = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  const serverResponse = await fetch(
    `${END_POINT}/lectures/${lectureId}/details`,
    {
      credentials: 'include',
      headers,
    },
  ).then((data) => data.json());

  if (serverResponse.statusCode !== 200) {
    throw new Error('클래스 세부 데이터 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
