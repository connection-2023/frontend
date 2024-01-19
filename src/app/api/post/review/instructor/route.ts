import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

if (!END_POINT) {
  throw new Error('환경 변수 누락');
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const lecturerId = searchParams.get('id');
  const order = searchParams.get('orderBy');

  const token = request.cookies.get('userAccessToken')?.value;

  const {
    displayCount,
    currentPage,
    targetPage,
    firstItemId,
    lastItemId,
    lecturerReviewType,
  } = Object.fromEntries(searchParams);

  const query = `take=${displayCount}&currentPage=${currentPage}&targetPage=${targetPage}&firstItemId=${firstItemId}&lastItemId=${lastItemId}&lecturerReviewType=${lecturerReviewType}`;

  const headers: Record<string, string> = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  const serverResponse = await fetch(
    END_POINT + `/lecture-reviews/lecturers/${lecturerId}?${query}`,
    {
      headers,
    },
  ).then((data) => data.json());

  if (serverResponse.statusCode !== 200) {
    throw new Error('강사 리뷰 조회 요청 에러!');
  }

  return NextResponse.json(serverResponse);
};
