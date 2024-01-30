import { IPaymentInfo, IVirtualAccountInfo } from '@/types/payment';
import { IMyPaymentResponse } from '@/types/types';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const postPaymentInfo = async (data: IPaymentInfo) => {
  try {
    const response = await fetch(`${DOMAIN}/api/payment/payInfo`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());

    if (response.statusCode === 400 || response.statusCode === 401) {
      return response.message;
    }

    return response.data.pendingPaymentInfo;
  } catch (error) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
  }
};

export const postPaymentCancel = async (id: string) => {
  try {
    const response = await fetch(`${DOMAIN}/api/payment/cancel?id=${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
  }
};

export const getPaymentHistory = async (
  displayCount: number,
  currentPage: number,
  targetPage: number,
  firstItemId: number,
  lastItemId: number,
  option: string,
): Promise<IMyPaymentResponse | Error> => {
  const query = `displayCount=${displayCount}&currentPage=${currentPage}&targetPage=${targetPage}&firstItemId=${firstItemId}&lastItemId=${lastItemId}&option=${option}`;

  try {
    const response = await fetch(`${DOMAIN}/api/payment/history?${query}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccountInfo = async (
  id: number,
): Promise<IVirtualAccountInfo | Error> => {
  try {
    const response = await fetch(`${DOMAIN}/api/payment/accountInfo?id=${id}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return response.data.virtualAccountPaymentInfo;
  } catch (error) {
    throw error;
  }
};
