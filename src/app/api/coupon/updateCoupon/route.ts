import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const PATCH = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }
  const searchParams = request.nextUrl.searchParams;
  const couponId = searchParams.get('couponId');

  const tokenValue = request.cookies.get('lecturerAccessToken')?.value;
  const data = await request.json();

  if (!couponId) {
    return NextResponse.json(
      {
        status: 403,
        message: '쿠폰 id값이 존재하지 않습니다.',
      },
      { status: 403 },
    );
  }

  if (!tokenValue) {
    return NextResponse.json(
      {
        status: 401,
        message: '토큰이 존재하지 않습니다.',
      },
      { status: 401 },
    );
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${tokenValue}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(END_POINT + `/coupons/${couponId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json(
      {
        status: response.status,
        message: errorData.message || '서버 요청 오류',
      },
      { status: response.status },
    );
  }

  const result = await response.json();

  return NextResponse.json(result);
};
