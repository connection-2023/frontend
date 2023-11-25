import { DOMAIN } from '@/constants/constants';
import { IUserReview, ReviewOrderType } from '@/types/class';

export const getClassReviews = async (
  id: string,
  order: ReviewOrderType,
): Promise<IUserReview[] | Error> => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/post/class/review?id=${id}&orderBy=${order}`,
      {
        method: 'GET',
      },
    ).then((data) => data.json());

    return response.data.review;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};

export const postClassLikes = async (id: string) => {
  try {
    const response = await fetch(`${DOMAIN}/api/class/likes/add?id=${id}`, {
      method: 'POST',
    });

    return response;
  } catch (error) {
    return new Error('클래스 좋아요 요청 오류!');
  }
};

export const deleteClassLikes = async (id: string) => {
  try {
    const response = await fetch(`${DOMAIN}/api/class/likes/delete?id=${id}`, {
      method: 'DELETE',
    });

    return response;
  } catch (error) {
    return new Error('클래스 좋아요 취소 요청 오류!');
  }
};
