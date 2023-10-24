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

  return await fetch(
    END_POINT + '/auth/oauth/signin/' + social + '?access-token=' + token,
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    const data = await response.json();

    const res = new NextResponse(
      JSON.stringify({ status: response.status, data }),
      {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      },
    );
    if (response.status === 200) {
      await Promise.all([
        res.cookies.set({
          name: 'token',
          value: 'Bearer ' + data.userAccessToken,
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV !== 'development',
        }),
      ]);

      return res;
    }

    return res;
  });
};
