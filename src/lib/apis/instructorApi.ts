import { instructorProfile } from '@/types/auth';
import { IMonthlyClassSchedules } from '@/types/class';
import {
  IInstructorRegister,
  IApproveList,
  IUpdatePaymentStatusRequestData,
  CommonBankAccount,
  bankAccount,
  GetMyMembersParameter,
  GetMyMembersData,
} from '@/types/instructor';
import { FetchError } from '@/types/types';

export const getInstructorProfile = async (): Promise<instructorProfile> => {
  const response = await fetch(`/api/instructors/myProfile`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());
  if (!response.ok) new Error('강사 기본 프로필 조회 API 오류!');

  return response.data.lecturerBasicProfile;
};

export const getCheckNickname = async (nickname: string) => {
  try {
    const response = await fetch(
      `/api/instructors/check-nickname?nickname=${encodeURIComponent(
        nickname,
      )}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData.data.isAvailable;
  } catch (error) {
    console.error('강사 닉네임 중복 검사 오류', error);
    throw error;
  }
};

export const patchInstructorNickname = async (nickname: string) => {
  try {
    const response = await fetch(
      `/api/instructors/change-nickname?nickname=${encodeURIComponent(
        nickname,
      )}`,
      {
        credentials: 'include',
        method: 'PATCH',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData;
  } catch (error) {
    console.error('강사 닉네임 수정 오류', error);
    throw error;
  }
};

export const instructorRegister = async (data: IInstructorRegister) => {
  try {
    const response = await fetch(`/api/instructors/register`, {
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
        `강사 등록 오류: ${errorData.message || ''}, status: ${
          response.status
        }`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('강사 등록 오류', error);
    throw error;
  }
};

export const updateBankAccount = async (data: CommonBankAccount) => {
  try {
    const response = await fetch(`/api/instructors/change-account`, {
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

    return await response.json();
  } catch (error) {
    console.error('계좌 등록 & 변경 오류', error);
    throw error;
  }
};

export const getMonthlyClassPlan = async (
  year: number,
  month: number,
): Promise<IMonthlyClassSchedules[]> => {
  try {
    const response = await fetch(
      `/api/instructors/monthly-schedules?year=${year}&month=${month}`,
    ).then((data) => data.json());

    return response.data.schedules;
  } catch (error) {
    console.error('월별 강의 스케쥴 조회 오류', error);
    throw error;
  }
};

export const getPendingCount = async () => {
  try {
    const response = await fetch(`/api/instructors/mypage/approve/count`).then(
      (data) => data.json(),
    );

    return response.data.requestCount;
  } catch (error) {
    console.error('승인 대기 개수 조회 오류', error);
    throw error;
  }
};

export const getPendingList = async (): Promise<IApproveList[] | Error> => {
  try {
    const response = await fetch(`/api/instructors/mypage/approve/list`).then(
      (data) => data.json(),
    );

    return response.data?.requestList;
  } catch (error) {
    console.error('승인 대기 리스트 조회 오류', error);
    throw error;
  }
};

export const patchPendingStatus = async (
  data: IUpdatePaymentStatusRequestData,
) => {
  try {
    const response = await fetch(`/api/instructors/mypage/approve/status`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(data),
    }).then((data) => data.json());

    if (response.status !== 200) {
      throw Error(response.message);
    }

    return response.status;
  } catch (error) {
    console.error('승인 대기 상태 변경 오류', error);
    throw error;
  }
};

export const getBankAccount = async (): Promise<bankAccount> => {
  try {
    const response = await fetch(`/api/instructors/get-account`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData.data.lecturerRecentBankAccount;
  } catch (error) {
    console.error('강사 닉네임 중복 검사 오류', error);
    throw error;
  }
};

export const getMyMembers = async (
  data: GetMyMembersParameter,
  signal?: AbortSignal,
): Promise<GetMyMembersData> => {
  try {
    const params = new URLSearchParams();

    Object.entries(data)
      .filter(([_, v]) => v !== undefined)
      .forEach(([k, v]) => {
        params.append(k, String(v));
      });

    const response = await fetch(`/api/instructors/my-member?${params}`, {
      method: 'GET',
      credentials: 'include',
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();
    return {
      count: resData.data.totalItemCount,
      item: resData.data.lecturerLearnerList,
    };
  } catch (error) {
    console.error('회원 불러오기 에러', error);
    throw error;
  }
};
