import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const token = request.cookies.get('userAccessToken')?.value;

  if (!token) {
    return;
  }

  const serverResponse = await fetch(
    END_POINT + `/lecture-review/${id}/likes`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  ).then((data) => data.json());

  if (serverResponse.statusCode !== 201) {
    throw new Error('강의 좋아요 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
