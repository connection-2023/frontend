import { cookies } from 'next/headers';
import {
  searchBestClassData,
  searchClass,
  searchClassParameters,
} from '@/types/class';
import {
  searchBestInstructorData,
  searchInstructor,
  searchInstructorParameters,
} from '@/types/instructor';
import { searchPass } from '@/types/pass';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const searchAll = async (
  query: string,
  take: number,
  userState: boolean,
): Promise<{
  searchedLecturers: searchInstructor[];
  searchedLectures: searchClass[];
  searchedPasses: searchPass[];
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
): Promise<searchBestInstructorData[]> => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    const headers: Record<string, string> = userState
      ? {
          Authorization: `Bearer ${authorization}`,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        };

    const response = await fetch(`${END_POINT}/popular-lecturers`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

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

export const searchBestClass = async (
  userState: boolean,
): Promise<searchBestClassData[]> => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    const headers: Record<string, string> = userState
      ? {
          Authorization: `Bearer ${authorization}`,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        };

    const response = await fetch(`${END_POINT}/popular-lectures`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    if (!response.ok) {
      throw new Error(`인기 강의 검색 오류: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data.lectures;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchClasses = async (
  data: searchClassParameters,
  userState: boolean,
): Promise<searchClass[]> => {
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

    const response = await fetch(`${END_POINT}/search/lecture?${params}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    if (!response.ok) {
      throw new Error(`강의 검색 오류: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data.lectureList ?? [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
