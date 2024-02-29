import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const paymentId = searchParams.get('id');
  const token = request.cookies.get('userAccessToken')?.value;

  if (!token)
    return NextResponse.json({
      status: 401,
      message: '토큰이 존재하지 않습니다.',
    });

  const data = await request.json();

  const serverResponse = await fetch(
    END_POINT + `/payments/${paymentId}/refund`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  ).then((res) => res.json());

  return NextResponse.json(serverResponse);
};
