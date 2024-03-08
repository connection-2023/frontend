import {
  IPaymentInfo,
  IRefundRequest,
  IPaymentInfoResponse,
  IVirtualAccountInfo,
  PaymentPassInfoParam,
} from '@/types/payment';
import { FetchError, IMyPaymentResponse } from '@/types/types';

export const postPaymentInfo = async (data: IPaymentInfo) => {
  try {
    const response = await fetch(`/api/payment/payInfo`, {
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
    const response = await fetch(`/api/payment/cancel?id=${id}`, {
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
): Promise<IMyPaymentResponse> => {
  const query = `displayCount=${displayCount}&currentPage=${currentPage}&targetPage=${targetPage}&firstItemId=${firstItemId}&lastItemId=${lastItemId}&option=${option}`;

  const response = await fetch(`/api/payment/history?${query}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('유저 결제 내역 조회 오류!');
  }

  const res = await response.json();

  return res.data;
};

export const getAccountInfo = async (
  id: number,
): Promise<IVirtualAccountInfo | Error> => {
  try {
    const response = await fetch(`/api/payment/accountInfo?id=${id}`, {
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

export const postPassPaymentInfo = async (
  data: PaymentPassInfoParam,
): Promise<IPaymentInfoResponse> => {
  try {
    const response = await fetch(`/api/payment/pass`, {
      method: 'POST',
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

    const responseData = await response.json();
    return responseData.data.pendingPaymentInfo;
  } catch (error) {
    console.error('패스권 결제 정보 생성 오류', error);
    throw error;
  }
};

export const postRefund = async (id: number | string, data: IRefundRequest) => {
  const response = await fetch(`/api/payment/refund?id=${id}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());

  return response;
};

export const postPassPaymentClassWithPass = async (data: IPaymentInfo) => {
  try {
    const response = await fetch(`/api/payment/class-with-pass`, {
      method: 'POST',
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

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('패스권으로 클래스 결제 오류 ', error);
    throw error;
  }
};
