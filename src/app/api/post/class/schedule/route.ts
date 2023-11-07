import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  const serverResponse = await fetch(END_POINT + '/lectures/schedules/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  if (serverResponse.statusCode !== 200) {
    throw new Error('클래스 스케쥴 조회 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
