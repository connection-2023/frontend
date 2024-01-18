import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const GET = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const token = request.cookies.get('userAccessToken')?.value;
  const path = token ? 'users' : 'non-members';

  const headers: Record<string, string> = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  const serverResponse = await fetch(END_POINT + `/latest-lectures/${path}`, {
    credentials: 'include',
    headers,
  }).then((data) => data.json());

  if (serverResponse.statusCode !== 200) {
    throw new Error('최신 클래스 조회 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
