import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const POST = async (req: NextRequest) => {
  if (!END_POINT) {
    throw new Error('environment variables are missing');
  }
  const cookieStore = cookies();
  const formData = await req.formData();

  let userToken;
  userToken = req.headers.get('Authorization');

  if (!userToken) {
    userToken = cookieStore.get('userAccessToken')?.value;
  }

  if (!userToken) {
    return new NextResponse('로그인된 유저가 아닙니다', { status: 401 });
  }

  if (!formData) {
    return new NextResponse('업로드된 이미지가 없습니다', { status: 400 });
  }

  const headers: Record<string, string> = {
    Authorization: `${userToken}`,
  };

  const response = await fetch(END_POINT + '/users/images', {
    method: 'POST',
    credentials: 'include',
    headers,
    body: formData,
  });

  const data = await response.json();

  return NextResponse.json(data);
};
