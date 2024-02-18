import { cookies } from 'next/headers';
import { IClassPostResponse } from '@/types/class';
import {
  GetMyMemberData,
  GetMyMemberPassesData,
  GetMyMembersData,
  GetMyMembersParameter,
  bankAccount,
  instructorPostResponse,
} from '@/types/instructor';
import { FetchError } from '@/types/types';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getInstructorClassLists = async (
  lecturerId: string,
): Promise<IClassPostResponse[] | Error> => {
  const cookieStroe = cookies();
  const userToken = cookieStroe.get('userAccessToken')?.value;
  const headers: Record<string, string> = userToken
    ? {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  try {
    const response = await fetch(
      `${END_POINT}/lecturers/lectures/${lecturerId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers,
      },
    ).then((data) => data.json());

    return response.data.lecture.lecture;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};

export const getInstructor = async (
  id: string,
  isLogin: boolean,
): Promise<instructorPostResponse | undefined> => {
  try {
    const cookieStroe = cookies();
    const authorization = cookieStroe.get('userAccessToken')?.value;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${authorization}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${END_POINT}/lecturers/profile/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: isLogin
        ? headers
        : {
            'Content-Type': 'application/json',
          },
    });

    if (!response.ok) {
      throw new Error(`강사 프로필 불러오기: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data.lecturerProfile;
  } catch (error) {
    console.error(error);
  }
};

export const getBankAccount = async (): Promise<bankAccount> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(
    `${END_POINT}/lecturer-payments/recent-bank-account`,
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

  const resData = await response.json();

  return resData.data.lecturerRecentBankAccount;
};

export const getMyMembers = async (
  data: GetMyMembersParameter,
): Promise<GetMyMembersData> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const params = new URLSearchParams();

  Object.entries(data)
    .filter(([_, v]) => v !== undefined)
    .forEach(([k, v]) => {
      params.append(k, String(v));
    });

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${END_POINT}/lecturers/learners?${params}`, {
    cache: 'no-store',
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData.message);
    throw new Error(`회원관리 회원 목록 불러오기 에러: ${response.status}`);
  }

  const resData = await response.json();
  return {
    count: resData.data.totalItemCount,
    item: resData.data.lecturerLearnerList,
  };
};

export const getMyMember = async (
  userId: number | string,
): Promise<GetMyMemberData[]> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(`${END_POINT}/lecturers/learners/${userId}`, {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData.message);
    throw new Error(`수강생의 신청한 클래스 에러: ${response.status}`);
  }

  const resData = await response.json();

  return resData.data.learnerPaymentsOverView;
};

export const getMyMemberPasses = async (
  userId: number | string,
): Promise<GetMyMemberPassesData[]> => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(
    `${END_POINT}/lecturers/learners/${userId}/passes`,
    {
      method: 'GET',
      credentials: 'include',
      headers,
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData.message);
    throw new Error(`수강생의 보유중인 패스권 조회 에러: ${response.status}`);
  }

  const resData = await response.json();

  return resData.data.lecturerLearnerPassList;
};
