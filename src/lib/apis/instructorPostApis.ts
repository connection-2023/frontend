import { DOMAIN } from '@/constants/constants';

export const getInstructorPost = async (id: string) => {
  try {
    const response = await fetch(`${DOMAIN}/api/post/instructor?id=${id}`, {
      method: 'GET',
    }).then((data) => data.json());

    return response.data.lecturerProfile;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};
