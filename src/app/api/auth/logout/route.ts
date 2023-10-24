import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const response = new NextResponse(JSON.stringify({ status: 200 }));

  response.cookies.set({
    name: 'token',
    value: '',
    maxAge: -1,
  });

  return response;
};
