import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const PATCH = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const chatRoomId = request.nextUrl.searchParams.get('chatRoomId');

  const tokenValue =
    request.cookies.get('userAccessToken')?.value ||
    request.cookies.get('lecturerAccessToken')?.value;

  if (!chatRoomId) {
    return NextResponse.json(
      {
        status: 400,
        message: '채팅방 Id 값이 존재하지 않습니다.',
      },
      { status: 400 },
    );
  }

  const response = await fetch(`${END_POINT}/chat-rooms/${chatRoomId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${tokenValue}`,
      'Content-Type': 'application/json',
    },
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
