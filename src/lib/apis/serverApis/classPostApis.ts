import { cookies } from 'next/headers';
import {
  IClassScheduleResponse,
  IClassPreviewResponse,
  IClassDetailResponse,
  searchBestClassData,
} from '@/types/class';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getClassPreview = async (
  lectureId: string,
): Promise<IClassPreviewResponse> => {
  const cookieStore = cookies();
  const token = cookieStore.get('userAccessToken')?.value;

  const headers: Record<string, string> = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  const response = await fetch(`${END_POINT}/lectures/${lectureId}/previews`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((data) => data.json());

  if (response.statusCode !== 200) {
    throw new Error('클래스 상세 조회 상단 데이터 요청 에러!');
  }

  return response.data.lecturePreview;
};

export const getClassDetail = async (
  lectureId: string,
): Promise<IClassDetailResponse | Error> => {
  const cookieStore = cookies();
  const token = cookieStore.get('userAccessToken')?.value;

  const headers: Record<string, string> = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  const response = await fetch(`${END_POINT}/lectures/${lectureId}/details`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((data) => data.json());

  if (response.statusCode !== 200) {
    throw new Error('클래스 상세 조회 세부 데이터 요청 에러!');
  }

  return response.data.lectureDetail;
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

export const getUserReservation = async (id: string): Promise<boolean> => {
  const cookieStore = cookies();
  const token = cookieStore.get('userAccessToken')?.value;

  if (!token) return false;
  const response = await fetch(
    END_POINT + '/lectures/' + id + '/reservations',
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.status === 200) {
    return true;
  }
  return false;
};

export const getLatestClassLists = async (): Promise<searchBestClassData[]> => {
  const cookieStore = cookies();
  const token = cookieStore.get('userAccessToken')?.value;
  const path = token ? 'users' : 'non-members';
  const headers: Record<string, string> = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  const response = await fetch(END_POINT + `/latest-lectures/${path}`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((data) => data.json());

  if (response.statusCode !== 200) {
    throw new Error('최신 클래스 조회 요청 에러!');
  }

  return response.data.lectures;
};
