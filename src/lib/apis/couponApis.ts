import { IcouponsData, IgetFunction, createCouponData } from '@/types/coupon';
import { FetchError } from '@/types/types';

export const createNewCoupon = async (data: createCouponData) => {
  try {
    const response = await fetch(`/api/coupon/new`, {
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
  const params = new URLSearchParams();

  Object.entries(data)
    .filter(([_, v]) => v !== undefined)
    .forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((value) => params.append(`${k}[]`, value));
      } else {
        params.append(k, String(v));
      }
    });

  try {
    const response = await fetch(`/api/coupon/getCouponList?${params}`, {
      method: 'GET',
      credentials: 'include',
      signal,
      headers: {
        'Content-Type': 'application/json',
        type: type,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
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
      `/api/coupon/getPrivateCode?couponId=${couponId}`,
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
    console.error('비공개 쿠폰 코드 발급 오류', error);
    throw error;
  }
};

export const getPrivateCoupon = async (couponCode: string) => {
  try {
    const response = await fetch(
      `/api/coupon/getPrivateCoupon?couponCode=${couponCode}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData.data;
  } catch (error) {
    console.error('비공개 쿠폰 다운 오류', error);
    throw error;
  }
};

export const getClassCoupon = async (couponId: number) => {
  try {
    const response = await fetch(
      `/api/coupon/getClassCoupon?couponId=${couponId}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData.data;
  } catch (error) {
    console.error('클래스 공개 쿠폰 다운 오류', error);
    throw error;
  }
};
