import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const token = request.cookies.get('userAccessToken')?.value;

  if (!token) {
    return;
  }

  const serverResponse = await fetch(
    END_POINT + `/lecture-review/${id}/likes`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (serverResponse.status !== 200) {
    throw new Error('강의 좋아요 취소 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
