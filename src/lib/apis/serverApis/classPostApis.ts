import { IClassInfoResponse, IClassScheduleResponse } from '@/types/class';
import { cookies } from 'next/headers';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getClassInfo = async (
  id: string,
): Promise<IClassInfoResponse | Error> => {
  const cookieStore = cookies();
  const token = cookieStore.get('userAccessToken')?.value;
  const path = token ? '/users' : '/non-members';

  const headers: Record<string, string> = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  const response = await fetch(END_POINT + '/lectures/' + id + path, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((data) => data.json());

  if (response.statusCode !== 200) {
    throw new Error('클래스 상세 조회 요청 에러!');
  }

  return response.data;
};

export const getClassSchedules = async (
  id: string,
): Promise<IClassScheduleResponse | Error> => {
  try {
    const response = await fetch(END_POINT + '/lectures/' + id + '/schedules', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['schedules'] },
    }).then((data) => data.json());

    if (response.statusCode !== 200) {
      throw new Error('클래스 스케쥴 조회 요청 에러!');
    }

    return response.data;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};
