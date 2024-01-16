import { DOMAIN } from '@/constants/constants';
import { searchClass, searchClassParameters } from '@/types/class';
import {
  searchInstructor,
  searchInstructorParameters,
} from '@/types/instructor';
import { FetchError } from '@/types/types';

export const searchInstructors = async (
  data: searchInstructorParameters,
  userState: boolean,
): Promise<searchInstructor[]> => {
  try {
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

    const response = await fetch(`${DOMAIN}/api/instructors/search?${params}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        userState: `${userState}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return resData.data.lecturerList ?? [];
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

    const response = await fetch(`${DOMAIN}/api/class/search?${params}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        userState: `${userState}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return resData.data.lectureList ?? [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
