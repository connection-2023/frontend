import { cookies } from 'next/headers';
import { Lecture, searchClass } from '@/types/class';
import { searchInstructor } from '@/types/instructor';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const searchAll = async (
  query: string,
  take: number,
  userState: boolean,
): Promise<{
  searchedLecturers: searchInstructor[];
  searchedLectures: searchClass[];
}> => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    const headers: Record<string, string> = userState
      ? {
          Authorization: `Bearer ${authorization}`,
          'Content-Type': 'application/json',
        }
      : { 'Content-Type': 'application/json' };

    const response = await fetch(
      `${END_POINT}/search?value=${query}&take=${take}`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(`전체 검색 오류: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
