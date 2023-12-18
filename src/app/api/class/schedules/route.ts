import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const GET = async (request: NextRequest) => {
  const lectureId = request.nextUrl.searchParams.get('id');

  const serverResponse = await fetch(
    END_POINT + `/lectures/${lectureId}/schedules`,
  ).then((data) => data.json());

  if (serverResponse.statusCode !== 200) {
    throw new Error('클래스 일정 조회 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
