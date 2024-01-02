import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const POST = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const lectureId = searchParams.get('lectureId');

  if (!lectureId) {
    return NextResponse.json(
      {
        status: 401,
        message: 'id값이 존재하지 않습니다.',
      },
      { status: 401 },
    );
  }

  const tokenValue = request.cookies.get('userAccessToken')?.value;

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

  const serverResponse = await fetch(
    END_POINT + `/lecturer-likes/${lectureId}`,
    {
      method: 'POST',
      credentials: 'include',
      headers,
    },
  );

  if (!serverResponse.ok) {
    const errorData = await serverResponse.json();
    return NextResponse.json(
      {
        status: serverResponse.status,
        message: errorData.message || '서버 요청 오류',
      },
      { status: serverResponse.status },
    );
  }

  const result = await serverResponse.json();

  return NextResponse.json(result);
};
