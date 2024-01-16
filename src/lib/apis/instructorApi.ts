import { DOMAIN } from '@/constants/constants';
import { IInstructorRegister } from '@/types/instructor';

export const getInstructorProfile = async () => {
  const response = await fetch(`${DOMAIN}/api/instructors/myProfile`, {
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
      `${DOMAIN}/api/instructors/check-nickname?nickname=${encodeURIComponent(
        nickname,
      )}`,
    ).then((data) => data.json());

    return response.data.isAvailable;
  } catch (error) {
    console.error('닉네임 중복 검사 오류', error);
    throw error;
  }
};

export const instructorRegister = async (data: IInstructorRegister) => {
  try {
    const response = await fetch(`${DOMAIN}/api/instructors/register`, {
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

export const getMonthlyClassPlan = async (year: number, month: number) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/instructors/monthly-schedules?year=${year}&month=${month}`,
    ).then((data) => data.json());

    return response.data.schedules;
  } catch (error) {
    console.error('월별 강의 스케쥴 조회 오류', error);
    throw error;
  }
};

export const getPendingCount = async () => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/instructors/mypage/approve/count`,
    ).then((data) => data.json());

    return response.data.requestCount;
  } catch (error) {
    console.error('승인 대기 개수 조회 오류', error);
    throw error;
  }
};
