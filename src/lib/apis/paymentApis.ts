import { DOMAIN } from '@/constants/constants';
import { IPaymentInfo, IPaymentConfirm } from '@/types/payment';
const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT; // 추후 파일 이동 예정

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

// 추후 파일 이동 예정
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

    const responseData = await response.json();

    return responseData.data.paymentResult;
  } catch (error) {
    console.error('결제 승인 오류', error);
    throw error;
  }
};
