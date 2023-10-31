import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  const serverResponse = await fetch(END_POINT + '/lecturers/profile/' + id, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  if (serverResponse.statusCode !== 200) {
    throw new Error('강사 프로필 조회 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
