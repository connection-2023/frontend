import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('userAccessToken')?.value;
  if (!token) return new Response('유저 권한 없음!', { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const paymentId = searchParams.get('id');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const serverResponse = await fetch(
      END_POINT + `/user-payments/${paymentId}/virtual-account`,
      {
        credentials: 'include',
        headers,
      },
    ).then((res) => res.json());

    return NextResponse.json(serverResponse);
  } catch (error) {
    console.error('무통장 정보 요청 에러: ', error);

    return NextResponse.json(error);
  }
};
