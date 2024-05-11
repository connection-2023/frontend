import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const PATCH = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const lecturerToken = request.cookies.get('lecturerAccessToken')?.value;
  const userToken = request.cookies.get('userAccessToken')?.value;
  const tokenValue = lecturerToken || userToken;

  const data = await request.json();
  const deviceToken = data.deviceToken;

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

  const response = await fetch(
    `${END_POINT}/notifications/notificationsId/register-device-token`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers,
      body: JSON.stringify(data),
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

  const clientResponse = new NextResponse();

  clientResponse.cookies.set({
    name: 'deviceToken',
    value: deviceToken,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });

  return clientResponse;
};
