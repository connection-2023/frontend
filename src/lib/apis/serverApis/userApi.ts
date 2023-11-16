import { cookies } from 'next/headers';
import { instructorProfile, userProfile } from '@/types/auth';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getInstructorProfile = async (): Promise<instructorProfile> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(END_POINT + '/lecturers/my-basic-profile', {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();

  return data.data.lecturerBasicProfile;
};

export const getMyProfile = async (): Promise<userProfile> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('userAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(END_POINT + '/users/my-pages', {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();

  return data.data.myProfile;
};
