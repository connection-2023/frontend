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
