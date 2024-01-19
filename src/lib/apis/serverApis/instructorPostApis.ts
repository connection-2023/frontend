import { cookies } from 'next/headers';
import { IClassPostResponse } from '@/types/class';
import { instructorPostResponse } from '@/types/instructor';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getInstructorClassLists = async (
  lecturerId: string,
): Promise<IClassPostResponse[] | Error> => {
  const cookieStroe = cookies();
  const userToken = cookieStroe.get('userAccessToken')?.value;
  const headers: Record<string, string> = userToken
    ? {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  try {
    const response = await fetch(
      `${END_POINT}/lecturers/lectures${lecturerId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      },
    ).then((data) => data.json());

    return response.data.lecture;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};

export const getInstructor = async (
  id: string,
  isLogin: boolean,
): Promise<instructorPostResponse | undefined> => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${authorization}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${END_POINT}/lecturers/profile/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: isLogin
        ? headers
        : {
            'Content-Type': 'application/json',
          },
    });

    if (!response.ok) {
      throw new Error(`강사 프로필 불러오기: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data.lecturerProfile;
  } catch (error) {
    console.error(error);
  }
};
