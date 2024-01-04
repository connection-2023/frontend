import { cookies } from 'next/headers';
import { searchClass } from '@/types/class';
import {
  searchBestInstructorNonMembers,
  searchInstructor,
  searchInstructorParameters,
} from '@/types/instructor';

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

export const searchInstructors = async (
  data: searchInstructorParameters,
  userState: boolean,
): Promise<searchInstructor[]> => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    const params = new URLSearchParams();

    Object.entries(data)
      .filter(([_, v]) => v !== undefined)
      .forEach(([k, v]) => {
        if (Array.isArray(v)) {
          v.forEach((value) => params.append(`${k}[]`, value));
        } else {
          params.append(k, String(v));
        }
      });

    const headers: Record<string, string> = userState
      ? {
          Authorization: `Bearer ${authorization}`,
          'Content-Type': 'application/json',
        }
      : { 'Content-Type': 'application/json' };

    const response = await fetch(`${END_POINT}/search/lecturer?${params}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    if (!response.ok) {
      throw new Error(`강사 검색 오류: ${response.status}`);
    }

    const resData = await response.json();
    return resData.data.lecturerList ?? [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchBestInstructor = async (
  userState: boolean,
): Promise<searchBestInstructorNonMembers[]> => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // userState
    //   ? {
    //       Authorization: `Bearer ${authorization}`,
    //       'Content-Type': 'application/json',
    //     }
    //   : 백엔드 500 에러 인기강사 유저용

    //    userState
    // ? '/popular-lecturers/users'
    // :
    const response = await fetch(
      `${END_POINT}${'/popular-lecturers/non-members'}`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(`인기 강사 검색 오류: ${response.status}`);
    }

    const resData = await response.json();
    return resData.data.lecturers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
