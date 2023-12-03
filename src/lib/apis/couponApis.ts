import { DOMAIN } from '@/constants/constants';
import { IcouponsData, IgetFunction, createCouponData } from '@/types/coupon';

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

export const getCouponLists = async (
  data: IgetFunction,
  type: 'lecturer' | 'user',
  signal?: AbortSignal,
): Promise<IcouponsData> => {
  const params = new URLSearchParams({
    ...Object.fromEntries(
      Object.entries(data)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, Array.isArray(v) ? JSON.stringify(v) : String(v)]),
    ),
  }).toString();

  try {
    const response = await fetch(
      `${DOMAIN}/api/coupon/getCouponList?${params}`,
      {
        method: 'GET',
        credentials: 'include',
        signal,
        headers: {
          'Content-Type': 'application/json',
          type: type,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '');
    }

    const resData = await response.json();

    const { couponList: itemList, totalItemCount } = resData.data;

    return { itemList, totalItemCount };
  } catch (error) {
    console.error('쿠폰 조회 오류', error);
    throw error;
  }
};

export const getPrivateCode = async (couponId: number) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/coupon/getPrivateCode?couponId=${couponId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '');
    }

    const resData = await response.json();

    return resData.data;
  } catch (error) {
    console.error('쿠폰 조회 오류', error);
    throw error;
  }
};
