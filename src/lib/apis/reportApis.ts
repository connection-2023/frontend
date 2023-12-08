import { DOMAIN } from '@/constants/constants';
import { IReportRequest } from '@/types/report';

export const postUserReport = async (data: IReportRequest) => {
  try {
    const response = await fetch(`${DOMAIN}/api/report/user/submit`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());

    return response.statusCode;
  } catch (error) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
  }
};

export const getUserReport = async (
  displayCount: number,
  currentPage: number,
  targetPage: number,
  firstItemId: number,
  lastItemId: number,
  type: string,
) => {
  const query = `take=${displayCount}&currentPage=${currentPage}&targetPage=${targetPage}&firstItemId=${firstItemId}&lastItemId=${lastItemId}&filterOption=${type}`;

  try {
    const response = await fetch(`${DOMAIN}/api/report/user/history?${query}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => data.json());

    return response.data;
  } catch (error) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
  }
};
