import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('userAccessToken')?.value;
  const query = request.nextUrl.searchParams.toString();

  if (!token) {
    return;
  }

  const serverResponse = await fetch(END_POINT + `/user-reports?${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  return NextResponse.json(serverResponse);
};
