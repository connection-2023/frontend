import { DOMAIN } from '@/constants/constants';
import {
  instructorPostResponse,
  IInstructorReviewList,
} from '@/types/instructor';

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
