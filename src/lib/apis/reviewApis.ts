import { DOMAIN } from '@/constants/constants';
import {
  GetMyLecturersReviews,
  GetMyLecturersReviewsData,
  NewReviews,
  WriteReview,
} from '@/types/review';
import { FetchError } from '@/types/types';

export const getWriteReviews = async (
  orderBy: string,
): Promise<WriteReview[]> => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/review/user?orderBy=${orderBy}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return resData.data.review;
  } catch (error) {
    console.error('내 보유 강의 조회 오류', error);
    throw error;
  }
};

export const getMyLecturersReviews = async (
  data: GetMyLecturersReviews,
  signal?: AbortSignal,
): Promise<GetMyLecturersReviewsData> => {
  try {
    const params = new URLSearchParams();

    Object.entries(data)
      .filter(([_, v]) => v !== undefined)
      .forEach(([k, v]) => {
        params.append(k, String(v));
      });

    const response = await fetch(`${DOMAIN}/api/review/lecturer?${params}`, {
      method: 'GET',
      credentials: 'include',
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    console.log(resData);
    return { count: resData.data.count, item: resData.data.review };
  } catch (error) {
    console.error('강사 내 리뷰 불러오기', error);
    throw error;
  }
};

export const writeReview = async (data: NewReviews) => {
  try {
    const response = await fetch(`${DOMAIN}/api/review/new`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `리뷰 작성 오류: ${errorData.message || ''}, status: ${
          response.status
        }`,
      );
    }

    const responseData = await response.json();
    return responseData.data.coupon;
  } catch (error) {
    console.error('리뷰 작성 오류', error);
    throw error;
  }
};
