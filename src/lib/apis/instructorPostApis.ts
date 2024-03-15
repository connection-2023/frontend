import { instructorPostResponse, InstructorUpdate } from '@/types/instructor';
import { FetchError } from '@/types/types';

export const getInstructorPost = async (
  id: string,
): Promise<instructorPostResponse | Error> => {
  try {
    const response = await fetch(`/api/post/instructor?id=${id}`, {
      method: 'GET',
    }).then((data) => data.json());

    return response.data.lecturerProfile;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};

export const updateInstructor = async (data: InstructorUpdate) => {
  try {
    const response = await fetch(`/api/instructors/update`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return resData.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
