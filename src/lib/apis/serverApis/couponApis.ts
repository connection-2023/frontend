import { cookies } from 'next/headers';
import { IcouponsData, IgetFunction, IuserCouponsData } from '@/types/coupon';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getCouponList = async (
  data: IgetFunction,
  type: 'lecturer' | 'user',
): Promise<IcouponsData | null> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get(
    type === 'lecturer' ? 'lecturerAccessToken' : 'userAccessToken',
  )?.value;

  const params = new URLSearchParams({
    ...Object.fromEntries(
      Object.entries(data)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    ),
  }).toString();

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
