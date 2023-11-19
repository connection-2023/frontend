import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('Required environment variables are missing');
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const social = searchParams.get('social');
  const token = searchParams.get('token');

  const serverResponse = await fetch(
    END_POINT + '/auth/oauth/signin/' + social + '?access-token=' + token,
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    const { statusCode, data } = await response.json();

    const clientResponse = new NextResponse(
      JSON.stringify({ status: statusCode, data }),
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': response.headers.get('Set-Cookie') || '',
        },
      },
    );

    if (statusCode === 200) {
      await Promise.all([
        clientResponse.cookies.set({
          name: Object.keys(data)[0],
          value: data.userAccessToken,
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV !== 'development',
        }),
      ]);
    }

    return clientResponse;
  });

  return serverResponse;
};
