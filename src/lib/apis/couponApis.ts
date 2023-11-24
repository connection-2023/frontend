import { DOMAIN } from '@/constants/constants';
import { createCouponData } from '@/types/coupon';

export const createNewCoupon = async (data: createCouponData) => {
  try {
    const response = await fetch(`${DOMAIN}/api/coupon/new`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `쿠폰 생성 오류: ${errorData.message || ''}, status: ${
          response.status
        }`,
      );
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('쿠폰 생성 오류', error);
    throw error;
  }
};
