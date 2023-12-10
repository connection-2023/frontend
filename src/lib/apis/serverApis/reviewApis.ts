import { cookies } from 'next/headers';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getWriteReviews = async (orderBy: string) => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('userAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(
    END_POINT + `/lecture-reviews/my-reviews?orderBy=${orderBy}`,
    {
      method: 'GET',
      credentials: 'include',
      headers,
    },
  );

  if (!response.ok) {
    throw new Error(`작성한 리뷰 목록 불러오기: ${response.status}`);
  }

  const resData = await response.json();

  return resData.data.review;
};
