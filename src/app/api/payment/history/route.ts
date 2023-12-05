import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('userAccessToken')?.value;
  if (!token) return;

  const searchParams = request.nextUrl.searchParams;
  const {
    displayCount,
    currentPage,
    targetPage,
    firstItemId,
    lastItemId,
    option,
  } = Object.fromEntries(searchParams);

  const query = `take=${displayCount}&currentPage=${currentPage}&targetPage=${targetPage}&firstItemId=${firstItemId}&lastItemId=${lastItemId}&paymentHistoryType=${option}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const serverResponse = await fetch(
      END_POINT + '/user-payments/history?' + query,
      {
        credentials: 'include',
        headers,
      },
    ).then((res) => res.json());

    return NextResponse.json(serverResponse);
  } catch (error) {
    console.error('결제 내역 요청 에러: ', error);

    return NextResponse.json(error);
  }
};
