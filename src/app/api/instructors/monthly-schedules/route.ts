import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const GET = async (request: NextRequest) => {
  const tokenValue = request.cookies.get('lecturerAccessToken')?.value;

  if (!tokenValue)
    return new NextResponse('토큰이 존재하지 않습니다! ', { status: 500 });

  const searchParams = request.nextUrl.searchParams;
  const { year, month } = Object.fromEntries(searchParams);

  const query = `year=${year}&month=${month}`;

  const serverResponse = await fetch(
    END_POINT + `/lectures/schedules?${query}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenValue}`,
      },
    },
  ).then((data) => data.json());

  return NextResponse.json(serverResponse);
};
