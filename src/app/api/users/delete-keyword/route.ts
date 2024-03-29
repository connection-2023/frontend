import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const DELETE = async (request: NextRequest) => {
  const user = request.cookies.get('userAccessToken')?.value;
  const lecturer = request.cookies.get('lecturerAccessToken')?.value;
  const authorization = user || lecturer;

  const historyId = request.nextUrl.searchParams.get('historyId');

  if (!authorization)
    return new NextResponse('토큰이 존재하지 않습니다! ', { status: 401 });

  try {
    const serverResponse = await fetch(
      END_POINT + `/search/history/${historyId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authorization}`,
        },
      },
    ).then((data) => data.json());

    return NextResponse.json(serverResponse);
  } catch (error) {
    return new NextResponse('최근 검색어 삭제 요청 에러: ', { status: 500 });
  }
};
