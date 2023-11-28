import {
  IPaymentConfirmRequest,
  IPaymentConfirmResponse,
  IReceiptResponse,
} from '@/types/payment';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const patchPaymentConfirm = async (
  token: string,
  data: IPaymentConfirmRequest,
): Promise<IPaymentConfirmResponse | Error> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(END_POINT + '/payments/lecture/confirm', {
      method: 'PATCH',
      credentials: 'include',
      headers,
      body: JSON.stringify(data),
    }).then((data) => data.json());

    return response.data?.paymentResult;
  } catch (error) {
    console.error('결제 승인 오류', error);
    throw error;
  }
};

export const getReceipt = async (
  token: string,
  orderId: string,
): Promise<IReceiptResponse | Error> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      END_POINT + '/payments/user-receipt?orderId=' + orderId,
      {
        credentials: 'include',
        headers,
      },
    ).then((data) => data.json());

    return response.data.receipt;
  } catch (error) {
    console.error('영수증 요청 오류', error);
    throw error;
  }
};
