import { IPaymentConfirm } from '@/types/payment';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const patchPaymentConfirm = async (
  token: string,
  data: IPaymentConfirm,
) => {
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

    return response.data.paymentResult;
  } catch (error) {
    console.error('결제 승인 오류', error);
    throw error;
  }
};
