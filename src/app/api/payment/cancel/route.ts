import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const token = request.cookies.get('userAccessToken');

  if (token) {
    const tokenValue = token.value;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenValue}`,
    };

    try {
      const serverResponse = await fetch(
        END_POINT + '/payments/toss/' + id + '/cancel',
        {
          method: 'POST',
          credentials: 'include',
          headers,
        },
      );
      revalidateTag('schedules');

      return NextResponse.json(serverResponse);
    } catch (error) {
      console.error('결제 취소 요청 에러: ', error);

      return NextResponse.json(error);
    }
  }
};
