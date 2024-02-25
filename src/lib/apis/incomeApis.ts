import { IIncomeHistoryResponse } from '@/types/payment';

export const getIncomeStatics = async (type: 'MONTHLY' | 'DAILY') => {
  const query =
    type === 'DAILY'
      ? `statisticsType=${type}&date=${new Date()}`
      : `statisticsType=${type}`;

  try {
    const response = await fetch(`/api/income/stat?${query}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => data.json());

    return response.data.revenueStatistics;
  } catch (error) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
  }
};

export const getRecentAccount = async () => {
  try {
    const response = await fetch(`/api/income/recent-account`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => data.json());

    return response.data.lecturerRecentBankAccount;
  } catch (error) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
  }
};

export const getTotalIncome = async (
  startDate: Date,
  endDate: Date,
  productType: string,
  lectureId?: number,
) => {
  const startISODate = startDate.toISOString().split('T')[0];
  const endISODate = endDate.toISOString().split('T')[0];
  const query = `startDate=${startISODate}&endDate=${endISODate}&productType=${productType}${
    lectureId ? `&lectureId=${lectureId}` : ''
  }`;

  const response = await fetch(`/api/income/total-income?${query}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  return response.data.totalRevenue;
};

export const getIncomeHistory = async (
  range: { from: Date; to: Date },
  productType: string,
  displayCount: number,
  itemsId: { firstItemId: number; lastItemId: number },
  lectureId?: number,
): Promise<IIncomeHistoryResponse> => {
  const { firstItemId, lastItemId } = itemsId;
  const startISODate = range.from.toISOString().split('T')[0];
  const endISODate = range.to.toISOString().split('T')[0];
  const query = `take=${displayCount}&startDate=${startISODate}&endDate=${endISODate}&productType=${productType}&firstItemId=${firstItemId}&lastItemId=${lastItemId}${
    lectureId ? `&lectureId=${lectureId}` : ''
  }`;

  const response = await fetch(`/api/income/history?${query}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  return response.data;
};
