import { DOMAIN } from '@/constants/constants';
import { IgetLecturerCoupons, createCouponData } from '@/types/coupon';

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
    return responseData.data.coupon;
  } catch (error) {
    console.error('쿠폰 생성 오류', error);
    throw error;
  }
};

export const getLecturerCoupons = async (data: IgetLecturerCoupons) => {
  const params = new URLSearchParams({
    ...Object.fromEntries(
      Object.entries(data)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    ),
  }).toString();

  try {
    const response = await fetch(`${DOMAIN}/api/coupon/getLecturer?${params}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '');
    }

    const resData = await response.json();

    return resData.data.couponList;
  } catch (error) {
    console.error('쿠폰 조회 오류', error);
    throw error;
  }
};
