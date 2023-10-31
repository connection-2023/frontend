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
    const serverResponse = await fetch(
      END_POINT + '/users/nicknames/' + encodeURI(nickname),
    );
    console.log(serverResponse.status);

    // HTTP 상태 코드만 포함하는 응답 객체
    return new NextResponse('', { status: serverResponse.status });
  } catch (error) {
    // 네트워크 요청이 실패하거나 서버에서 오류 상태 코드(403 제외)를 반환한 경우
    console.error('네트워크 요청 에러: ', error);

    // 에러 메시지와 오류 상태 코드 반환
    return new NextResponse('네트워크 요청 에러', { status: 500 });
  }
};
