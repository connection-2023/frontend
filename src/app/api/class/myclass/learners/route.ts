import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('lecturerAccessToken')?.value;
  if (!token) return;

  const lectureId = request.nextUrl.searchParams.get('lectureId');
  const searchParams = request.nextUrl.searchParams;
  const { displayCount, lastItemId } = Object.fromEntries(searchParams);

  const query = `take=${displayCount}&lastItemId=${lastItemId}`;

  const serverResponse = await fetch(
    END_POINT + `/lectures/${lectureId}/learners?${query}`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((data) => data.json());

  if (serverResponse.statusCode !== 200) {
    throw new Error('강사 클래스 관리 전체 수강생 조회 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
