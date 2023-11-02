import { NextRequest, NextResponse } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const POST = async (request: NextRequest) => {
  if (!END_POINT) {
    throw new Error('environment variables are missing');
  }
  const searchParams = request.nextUrl.searchParams;
  const folder = searchParams.get('folder');

  const formData = await request.formData();

  const response = await fetch(END_POINT + '/uploads/' + folder + '/image', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data = await response.json();

  return NextResponse.json(data);
};
