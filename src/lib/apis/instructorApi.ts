import { DOMAIN } from '@/constants/constants';

export const getInstructorProfile = async () => {
  const response = await fetch(`${DOMAIN}/api/instructors/myProfile`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  if (!response.ok) new Error('강사 기본 프로필 조회 API 오류!');

  return response.data.lecturerBasicProfile;
};
