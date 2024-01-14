import { DOMAIN } from '@/constants/constants';
import { LecturerLike } from '@/types/instructor';
import { FetchError } from '@/types/types';

export const instructorsBlockCancel = async (lectureId: string | number) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/users/instructors/block-cancel?lectureId=${encodeURIComponent(
        lectureId,
      )}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('강사차단 취소 오류', error);
    throw error;
  }
};

export const instructorsLikeCancel = async (lectureId: string | number) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/users/instructors/like-cancel?lectureId=${encodeURIComponent(
        lectureId,
      )}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('강사좋아요 취소 오류', error);
    throw error;
  }
};

export const instructorsLikes = async (lectureId: string | number) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/users/instructors/likes?lectureId=${encodeURIComponent(
        lectureId,
      )}`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('강사 좋아요 오류', error);
    throw error;
  }
};

export const instructorsBlock = async (lectureId: string | number) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/users/instructors/block?lectureId=${encodeURIComponent(
        lectureId,
      )}`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('강사 차단 오류', error);
    throw error;
  }
};

export const getLikesInstructorList = async (): Promise<LecturerLike[]> => {
  try {
    const response = await fetch(`${DOMAIN}/api/users/instructors/get-like`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData.data.lecturerLike;
  } catch (error) {
    console.error('좋아요 강의 목록 불러오기:', error);
    throw error;
  }
};
