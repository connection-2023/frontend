import { IReportRequest, IReportResponse } from '@/types/report';

export const postUserReport = async (data: IReportRequest) => {
  try {
    const response = await fetch(`/api/report/user/submit`, {
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

export const postLecturerReport = async (data: IReportRequest) => {
  try {
    const response = await fetch(`/api/report/lecturer/submit`, {
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
): Promise<IReportResponse[]> => {
  const query = `take=${displayCount}&currentPage=${currentPage}&targetPage=${targetPage}&firstItemId=${firstItemId}&lastItemId=${lastItemId}&filterOption=${type}`;

  const response = await fetch(`/api/report/user/history?${query}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  if (response.statusCode !== 200) {
    throw new Error('유저 신고 목록 불러오기 요청 에러!');
  }

  return response.data.reportList;
};

export const getInstructorReport = async (
  displayCount: number,
  currentPage: number,
  targetPage: number,
  firstItemId: number,
  lastItemId: number,
  type: string,
): Promise<IReportResponse[]> => {
  const query = `take=${displayCount}&currentPage=${currentPage}&targetPage=${targetPage}&firstItemId=${firstItemId}&lastItemId=${lastItemId}&filterOption=${type}`;

  const response = await fetch(`/api/report/lecturer/history?${query}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  if (response.statusCode !== 200) {
    throw new Error('강사 신고 목록 불러오기 요청 에러!');
  }

  return response.data.reportList;
};
