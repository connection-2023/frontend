import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const POST = async (request: NextRequest) => {
  const token = request.cookies.get('lecturerAccessToken')?.value;
  const requestData = await request.json();

  if (!token) {
    return;
  }

  const serverResponse = await fetch(END_POINT + `/lecturer-reports`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  }).then((data) => data.json());

  return NextResponse.json(serverResponse);
};
