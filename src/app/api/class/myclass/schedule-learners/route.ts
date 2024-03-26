import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('lecturerAccessToken')?.value;
  if (!token) return new Response('강사 권한 없음!', { status: 401 });

  const scheduleId = request.nextUrl.searchParams.get('scheduleId');
  const lectureId = request.nextUrl.searchParams.get('lectureId');

  const serverResponse = await fetch(
    END_POINT + `/lectures/${lectureId}/schedules/${scheduleId}/learners`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((data) => data.json());

  if (serverResponse.statusCode !== 200) {
    return new Response('강사 클래스 관리 - 수강생 요청 모달 조회 요청 에러!', {
      status: serverResponse.statusCode,
    });
  }

  return NextResponse.json(serverResponse);
};
