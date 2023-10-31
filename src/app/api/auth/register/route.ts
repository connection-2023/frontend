import { NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const POST = async (request: Request) => {
  const requestData = await request.json();

  const serverResponse = await fetch(END_POINT + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  }).then((data) => data.json());

  return NextResponse.json(serverResponse);
};
