import { cookies } from 'next/headers';
import {
  GetMyLecturersReviews,
  GetMyLecturersReviewsData,
  ReservationDetails,
  WriteReview,
} from '@/types/review';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getWriteReviews = async (
  orderBy: string,
): Promise<WriteReview[]> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('userAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(
    END_POINT + `/lecture-reviews/my-reviews/users?orderBy=${orderBy}`,
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

export const getReservationDetails = async (): Promise<
  ReservationDetails[]
> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('userAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(END_POINT + '/lecture-reviews/reservations', {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(`작성가능한 예약 내역 불러오기: ${response.status}`);
  }

  const resData = await response.json();
  return resData.data.reservation;
};

export const getMyLecturersReviews = async (
  data: GetMyLecturersReviews,
): Promise<GetMyLecturersReviewsData> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const params = new URLSearchParams();

  Object.entries(data)
    .filter(([_, v]) => v !== undefined)
    .forEach(([k, v]) => {
      params.append(k, String(v));
    });

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(
    END_POINT + `/lecture-reviews/my-reviews/lecturers?${params}`,
    {
      cache: 'no-store',
      method: 'GET',
      credentials: 'include',
      headers,
    },
  );

  if (!response.ok) {
    throw new Error(`강사 내 리뷰 불러오기: ${response.status}`);
  }

  const resData = await response.json();
  return { count: resData.data.count, item: resData.data.review };
};
