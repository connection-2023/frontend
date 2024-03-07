import { cookies } from 'next/headers';
import {
  IPaymentConfirmRequest,
  IPaymentConfirmResponse,
  IReceiptResponse,
} from '@/types/payment';
import { FetchError } from '@/types/types';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const patchPaymentConfirm = async (data: IPaymentConfirmRequest) => {
  const cookieStore = cookies();
  const token = cookieStore.get('userAccessToken')?.value;

  if (!token) throw new Error(`유저 토큰 에러!`);

  const response = await fetch(END_POINT + '/payments/toss/confirm', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  return resData;
};

export const getPaymentInfo = async (
  orderId: string,
): Promise<IPaymentConfirmResponse> => {
  const cookieStore = cookies();
  const token = cookieStore.get('userAccessToken')?.value;

  if (!token) throw new Error(`유저 토큰 에러!`);

  const response = await fetch(END_POINT + `/payments/${orderId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(errorData.message || '');
    error.status = response.status;
    throw new Error(`결제 승인 오류: ${error.status} ${error}`);
  }

  const { data } = await response.json();

  return data.paymentResult;
};

export const getReceipt = async (
  orderId: string,
): Promise<IReceiptResponse | Error> => {
  const cookieStore = cookies();
  const token = cookieStore.get('userAccessToken')?.value;

  if (!token) throw new Error(`유저 토큰 에러!`);

  try {
    const response = await fetch(
      END_POINT + `/user-payments/history/${orderId}`,
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((data) => data.json());

    return response.data.receipt;
  } catch (error) {
    console.error('영수증 요청 오류', error);
    throw error;
  }
};
