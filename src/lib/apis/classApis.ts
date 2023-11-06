import { DOMAIN } from '@/constants/constants';
import { IClassPostResponse } from '@/types/class';

export const getClassPost = async (
  id: string,
): Promise<IClassPostResponse | Error> => {
  try {
    const response = await fetch(`${DOMAIN}/api/post/class?id=${id}`, {
      method: 'GET',
    }).then((data) => data.json());

    return response.data.lecture;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};
