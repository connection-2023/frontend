import { NextResponse } from 'next/server';

const client_id = 'GFpzIKoTjXieCD52CWsD';
const client_secret = 'HdQnXkf8ZJ';

export async function GET({ nextUrl }) {
  const searchParams = nextUrl.searchParams;
  const query = searchParams.get('q');

  try {
    const response = await fetch(
      'https://openapi.naver.com/v1/search/local.json?query=' +
        encodeURIComponent(query) +
        '&display=5&sort=random',
      {
        headers: {
          'X-Naver-Client-Id': client_id,
          'X-Naver-Client-Secret': client_secret,
        },
      },
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    // Extract the data from the response
    const data = await response.json();

    return NextResponse.json(data); // Return the data, not the response object
  } catch (error) {
    console.error('Failed to fetch data:', error);

    return new NextResponse(500, { message: error.toString() });
  }
}
