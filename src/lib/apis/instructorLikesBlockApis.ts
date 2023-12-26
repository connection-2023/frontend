import { DOMAIN } from '@/constants/constants';
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
