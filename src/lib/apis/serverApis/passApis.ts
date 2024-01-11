import { cookies } from 'next/headers';
import { IgetPassFunction, IresponsePassData } from '@/types/pass';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getLecturerPassList = async (lecturerId: string) => {
  try {
    const response = await fetch(
      `${END_POINT}/passes/lecturers/${lecturerId}`,
      {
        cache: 'no-store',
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(`강사 패스권 목록 불러오기: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data.passList;
  } catch (error) {
    console.error(error);
  }
};

export const getIssuedPassList = async (
  data: IgetPassFunction,
  type: 'lecturer' | 'user',
): Promise<IresponsePassData> => {
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

  const response = await fetch(`${END_POINT}/passes/lecturer?${params}`, {
    cache: 'no-store',
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(`발급한 패스권 목록 불러오기: ${response.status}`);
  }

  const resData = await response.json();

  const { passList: itemList, totalItemCount } = resData?.data ?? {
    totalItemCount: 0,
    passList: [],
  };

  return { itemList: itemList, totalItemCount };
};
