import { DOMAIN } from '@/constants/constants';

export const getInstructorPost = async (id: string) => {
  const response = await fetch(`${DOMAIN}/api/post/instructor?id=${id}`, {
    method: 'GET',
  }).then((data) => data.json());

  return response.data.lecturerProfile;
};
