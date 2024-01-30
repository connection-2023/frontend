import {
  instructorPostResponse,
  IInstructorReviewList,
  InstructorUpdate,
} from '@/types/instructor';
import { FetchError } from '@/types/types';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const getInstructorPost = async (
  id: string,
): Promise<instructorPostResponse | Error> => {
  try {
    const response = await fetch(`${DOMAIN}/api/post/instructor?id=${id}`, {
      method: 'GET',
    }).then((data) => data.json());

    return response.data.lecturerProfile;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};

export const getReviews = async (
  id: string,
  displayCount: number,
  currentPage: number,
  targetPage: number,
  firstItemId: number,
  lastItemId: number,
  lecturerReviewType: string,
): Promise<{ review: IInstructorReviewList[] } | Error> => {
  const query = `displayCount=${displayCount}&currentPage=${currentPage}&targetPage=${targetPage}&firstItemId=${firstItemId}&lastItemId=${lastItemId}&lecturerReviewType=${lecturerReviewType}`;

  try {
    const response = await fetch(
      `${DOMAIN}/api/post/review/instructor?id=${id}&${query}`,
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((data) => data.json());

    return response.data;
  } catch (error) {
    return new Error('강사 리뷰 조회 요청 오류!');
  }
};

export const updateInstructor = async (data: InstructorUpdate) => {
  try {
    const response = await fetch(`${DOMAIN}/api/instructors/update`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return resData.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
