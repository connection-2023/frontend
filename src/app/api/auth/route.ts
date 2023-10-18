import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;
const URL = process.env.NEXT_PUBLIC_API_LOG_IN;

if (!END_POINT || !URL) {
  throw new Error('Required environment variables are missing');
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const social = searchParams.get('social');
  const token = searchParams.get('token');

  return await fetch(END_POINT + URL + social + '?access-token=' + token).then(
    async (response) => {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      const data = await response.json();

      return NextResponse.json({ status: response.status, data });
    },
  );
};

export const POST = async (request: Request) => {
  const requestData = await request.json();

  const serverResponse = await fetch(END_POINT + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const responseData = await serverResponse.json();

  return NextResponse.json(responseData);
};
