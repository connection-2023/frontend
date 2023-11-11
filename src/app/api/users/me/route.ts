import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('environment variables are missing');
}

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get('userAccessToken');

  if (!token)
    return new NextResponse('로그인된 유저가 아닙니다', { status: 500 });

  const userToken = token.value;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };

  try {
    const serverResponse = await fetch(END_POINT + '/users/my-pages', {
      credentials: 'include',
      headers,
    }).then((data) => data.json());

    return NextResponse.json(serverResponse);
  } catch (error) {
    return new NextResponse('네트워크 요청 에러: ', { status: 500 });
  }
};
