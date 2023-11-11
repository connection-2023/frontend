import { DOMAIN } from '@/constants/constants';
import {
  IClassInfoResponse,
  IClassScheduleResponse,
  IUserReview,
  ReviewOrderType,
} from '@/types/class';

export const getClassPost = async (
  id: string,
): Promise<IClassInfoResponse | Error> => {
  try {
    const response = await fetch(`${DOMAIN}/api/post/class/info?id=${id}`, {
      method: 'GET',
    }).then((data) => data.json());

    return response.data;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};

export const getClassSchedules = async (
  id: string,
): Promise<IClassScheduleResponse | Error> => {
  try {
    const response = await fetch(`${DOMAIN}/api/post/class/schedule?id=${id}`, {
      method: 'GET',
    }).then((data) => data.json());

    return response.data;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};

export const getClassReviews = async (
  id: string,
  order: ReviewOrderType,
): Promise<IUserReview[] | Error> => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/post/class/review?id=${id}?orderBy=${order}`,
      {
        method: 'GET',
      },
    ).then((data) => data.json());

    return response.data.review;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};
