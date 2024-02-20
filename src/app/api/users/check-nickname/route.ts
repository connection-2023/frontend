import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const GET = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const nickname = searchParams.get('nickname');

  if (!nickname) {
    return NextResponse.json(
      {
        status: 500,
        message: '닉네임 값이 존재하지 않습니다.',
      },
      { status: 500 },
    );
  }

  const response = await fetch(
    END_POINT + '/users/nicknames/' + encodeURI(nickname),
    {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    },
  );

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
