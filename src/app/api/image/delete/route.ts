import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const DELETE = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const data = await request.formData();

  const response = await fetch(END_POINT + '/uploads', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
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
