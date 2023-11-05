import { DOMAIN } from '@/constants/constants';
import { IPaymentInfo, IPaymentConfirm } from '@/types/payment';

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

    return response.data.lecturePaymentInfo;
  } catch (error) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
  }
};

export const patchPaymentConfirm = async (data: IPaymentConfirm) => {
  try {
    const response = await fetch(`${DOMAIN}/api/payment/confirm`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());

    return response;
  } catch (error) {
    console.error('결제 승인 오류', error);
    throw error;
  }
};
