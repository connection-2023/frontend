import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const nickname = searchParams.get('nickname');

  if (!nickname) return;

  try {
    const response = await fetch(
      END_POINT + '/lecturers/nickname/' + encodeURI(nickname),
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
  } catch (error) {
    console.error('네트워크 요청 에러: ', error);

    return new NextResponse('네트워크 요청 에러: ', { status: 500 });
  }
};
