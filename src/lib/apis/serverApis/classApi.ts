import { cookies } from 'next/headers';
import {
  IGetClassDraft,
  IGetClassDrafts,
  Lecture,
  LikedLecture,
  IApplyDetailResponse,
  IRecentApply,
} from '@/types/class';
import { FetchError } from '@/types/types';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getClassDrafts = async (): Promise<IGetClassDrafts[]> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(END_POINT + '/lecture-temporarily-save', {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(`임시저장 목록 불러오기: ${response.status}`);
  }

  const data = await response.json();

  return data.data.temporaryLectures;
};

export const getClassDraft = async (
  lectureId: string | number,
): Promise<IGetClassDraft> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(
    END_POINT + '/lecture-temporarily-save/' + lectureId,
    {
      method: 'GET',
      credentials: 'include',
      headers,
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(errorData.message || '');
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return data.data;
};

export const createClassDraft = async () => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(END_POINT + '/lecture-temporarily-save', {
    method: 'POST',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(errorData.message || '');
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return data.data;
};

export const getMyLecture = async (): Promise<Lecture[]> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(END_POINT + '/lecturers/lectures', {
    cache: 'no-store',
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(`강의 조회 에러: ${response.status}`);
  }

  const data = await response.json();

  return data.data.lecture;
};

export const getLikesClassList = async (): Promise<
  LikedLecture[] | undefined
> => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${authorization}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${END_POINT}/lecture-likes/users`, {
      method: 'GET',
      credentials: 'include',
      headers,
    });

    if (!response.ok) {
      throw new Error(`좋아요 강의 목록 불러오기: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data.likedLecture;
  } catch (error) {
    console.error(error);
  }
};


export const getApplyClassDetail = async (
  scheduleId: string | number,
  type: string,
): Promise<IApplyDetailResponse> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('userAccessToken')?.value;

  const response = await fetch(
    END_POINT + `/lectures/enroll-schedule-detail/${scheduleId}?type=${type}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    },
  ).then((data) => data.json());

  if (response.statusCode !== 200) {
    throw new Error(`유저 신청 강의 상세 조회 에러: ${response.status}`);
  }

  return response.data;
}


export const getRecentApply = async (): Promise<IRecentApply[]> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  if (!authorization) {
    throw new Error('대시보드 - 최근 신청한 수강생 조회 요청 오류: 권한 없음');
  }

  const response = await fetch(
    END_POINT + `/lecturers/my-reservations?take=5`,
    {
      cache: 'no-store',
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `대시보드 - 최근 신청한 수강생 조회 오류: ${response.status}`,
    );
  }

  const resData = await response.json();

  return resData.data.myReservationList;

};
