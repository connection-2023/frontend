import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const GET = async (req: NextRequest) => {
  if (!END_POINT) {
    throw new Error('environment variables are missing');
  }
  const cookieStore = cookies();

  let userToken;
  userToken = req.headers.get('Authorization');

  if (!userToken) {
    userToken = cookieStore.get('token')?.value;
  }

  if (!userToken) {
    return new NextResponse('로그인된 유저가 아닙니다', { status: 401 });
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `${userToken}`,
  };

  const response = await fetch(END_POINT + '/users/my-pages', {
    credentials: 'include',
    headers,
  });

  const data = await response.json();

  return NextResponse.json(data);
};
