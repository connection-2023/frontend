import { cookies } from 'next/headers';
import { IcouponsData, IgetFunction } from '@/types/coupon';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getCouponList = async (
  data: IgetFunction,
  type: 'lecturer' | 'user',
): Promise<IcouponsData | null> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get(
    type === 'lecturer' ? 'lecturerAccessToken' : 'userAccessToken',
  )?.value;
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

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${END_POINT}/coupons/${type}?${params}`, {
    cache: 'no-store',
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(`쿠폰 목록 불러오기: ${response.status}`);
  }

  const resData = await response.json();

  const { couponList: itemList, totalItemCount } = resData.data;

  return { itemList: itemList ?? [], totalItemCount };
};

export const getClassCouponList = async (lectureId: string) => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    //추후 백엔드 상의 후 토큰 필요 로직, 필요 없는 로직

    const headers: Record<string, string> = {
      Authorization: `Bearer ${authorization}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${END_POINT}/coupons/lectures/${lectureId}`, {
      cache: 'no-store',
      method: 'GET',
      credentials: 'include',
      headers,
    });

    if (!response.ok) {
      throw new Error(`쿠폰 목록 불러오기: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data.applicableCoupons;
  } catch (error) {
    console.error(error);
  }
};
