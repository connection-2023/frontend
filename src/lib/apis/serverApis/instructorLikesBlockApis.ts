import { cookies } from 'next/headers';
import { ILecturerBlock, ILecturerLike } from '@/types/instructor';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getLikesInstructorList = async (): Promise<
  ILecturerLike | undefined
> => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${authorization}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${END_POINT}/lecturer-likes`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    if (!response.ok) {
      throw new Error(`좋아요 강사 목록 불러오기: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBlockInstructorList = async (): Promise<
  ILecturerBlock | undefined
> => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${authorization}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${END_POINT}/lecturer-block`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    if (!response.ok) {
      throw new Error(`차단된 강사 목록 불러오기: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data;
  } catch (error) {
    console.error(error);
  }
};
