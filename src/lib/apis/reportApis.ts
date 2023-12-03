import { DOMAIN } from '@/constants/constants';
import { IReportRequest } from '@/types/report';

export const postReportLecturer = async (data: IReportRequest) => {
  try {
    const response = await fetch(`${DOMAIN}/api/report/lecturer`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.status;
  } catch (error) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
  }
};
