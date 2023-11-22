import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('lecturerAccessToken');

  if (!token)
    return new NextResponse('토큰이 존재하지 않습니다! ', { status: 500 });

  const tokenValue = token.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${tokenValue}`,
  };

  const serverResponse = await fetch(
    END_POINT + '/lecturers/my-basic-profile',
    {
      method: 'GET',
      credentials: 'include',
      headers,
    },
  ).then((data) => data.json());

  return NextResponse.json(serverResponse);
};
